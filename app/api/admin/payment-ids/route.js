// app/api/admin/payment-ids/route.js
// -------------------------------------------------------
// HOC/Admin: Generate payment IDs that students will use

import { createClient } from '@supabase/supabase-js';
import { randomBytes } from 'crypto';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function isAuthorized(req) {
  const adminKey = req.headers.get('x-admin-key');
  return adminKey === process.env.ADMIN_SECRET_KEY;
}

// GET all active payment IDs
export async function GET(req) {
  if (!isAuthorized(req)) {
    return Response.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('payment_ids')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return Response.json({ error: 'Failed to fetch payment IDs.' }, { status: 500 });

  return Response.json({ success: true, payment_ids: data });
}

// POST - Create a new payment ID
export async function POST(req) {
  if (!isAuthorized(req)) {
    return Response.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const { description, amount } = await req.json();

    // Generate a unique payment ID like: LASU-CS-A3F9B2
    const code = 'LASU-CS-' + randomBytes(3).toString('hex').toUpperCase();

    const { data, error } = await supabase
      .from('payment_ids')
      .insert({ payment_id: code, description, amount, is_active: true })
      .select()
      .single();

    if (error) return Response.json({ error: 'Failed to create payment ID.' }, { status: 500 });

    return Response.json({ success: true, payment_id: data }, { status: 201 });

  } catch (err) {
    return Response.json({ error: 'Server error.' }, { status: 500 });
  }
}

// PATCH - Deactivate a payment ID
export async function PATCH(req) {
  if (!isAuthorized(req)) {
    return Response.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const { id, is_active } = await req.json();

  const { data, error } = await supabase
    .from('payment_ids')
    .update({ is_active })
    .eq('id', id)
    .select()
    .single();

  if (error) return Response.json({ error: 'Failed to update.' }, { status: 500 });

  return Response.json({ success: true, payment_id: data });
}