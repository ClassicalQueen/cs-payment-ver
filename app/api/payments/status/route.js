// app/api/payments/status/route.js
// -------------------------------------------------------
// Get payment status for a student

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const matric_no = searchParams.get('matric_no')?.trim().toUpperCase();

    if (!matric_no) {
      return Response.json({ error: 'Matric number is required.' }, { status: 400 });
    }

    const { data: payments, error } = await supabase
      .from('payments')
      .select('*')
      .eq('matric_no', matric_no)
      .order('submitted_at', { ascending: false });

    if (error) {
      return Response.json({ error: 'Failed to fetch payment status.' }, { status: 500 });
    }

    return Response.json({ success: true, payments }, { status: 200 });

  } catch (err) {
    console.error('Status error:', err);
    return Response.json({ error: 'Server error.' }, { status: 500 });
  }
}