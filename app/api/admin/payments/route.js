// app/api/admin/payments/route.js
// -------------------------------------------------------
// HOC/Admin: View all payments, approve or reject them

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Simple admin key guard (replace with proper session auth if needed)
function isAuthorized(req) {
  const adminKey = req.headers.get('x-admin-key');
  return adminKey === process.env.ADMIN_SECRET_KEY;
}

// GET all payments (with optional status filter)
export async function GET(req) {
  if (!isAuthorized(req)) {
    return Response.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status'); // pending | approved | rejected

  let query = supabase
    .from('payments')
    .select('*')
    .order('submitted_at', { ascending: false });

  if (status) query = query.eq('status', status);

  const { data, error } = await query;

  if (error) return Response.json({ error: 'Failed to fetch payments.' }, { status: 500 });

  return Response.json({ success: true, payments: data }, { status: 200 });
}

// PATCH - Approve or reject a payment
export async function PATCH(req) {
  if (!isAuthorized(req)) {
    return Response.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const { payment_id_row, action, rejection_reason, reviewed_by } = await req.json();
    // payment_id_row = the DB row id (integer), not the payment code

    if (!payment_id_row || !action) {
      return Response.json({ error: 'payment_id_row and action are required.' }, { status: 400 });
    }

    if (!['approved', 'rejected'].includes(action)) {
      return Response.json({ error: 'Action must be "approved" or "rejected".' }, { status: 400 });
    }

    if (action === 'rejected' && !rejection_reason) {
      return Response.json({ error: 'Rejection reason is required.' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('payments')
      .update({
        status: action,
        rejection_reason: action === 'rejected' ? rejection_reason : null,
        reviewed_at: new Date().toISOString(),
        reviewed_by: reviewed_by || 'admin',
      })
      .eq('id', payment_id_row)
      .select()
      .single();

    if (error) return Response.json({ error: 'Failed to update payment.' }, { status: 500 });

    return Response.json({ success: true, payment: data }, { status: 200 });

  } catch (err) {
    console.error('Admin PATCH error:', err);
    return Response.json({ error: 'Server error.' }, { status: 500 });
  }
}