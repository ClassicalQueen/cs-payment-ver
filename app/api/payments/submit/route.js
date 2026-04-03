// app/api/payments/submit/route.js
// -------------------------------------------------------
// Payment Submission: student fills form + uploads proof

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    const formData = await req.formData();

    const matric_no    = formData.get('matric_no')?.trim().toUpperCase();
    const full_name    = formData.get('full_name')?.trim();
    const account_name = formData.get('account_name')?.trim();
    const payment_id   = formData.get('payment_id')?.trim().toUpperCase();
    const proofFile    = formData.get('proof'); // File object

    // --- Validation ---
    if (!matric_no || !full_name || !account_name || !payment_id) {
      return Response.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // Check student exists
    const { data: student, error: studentError } = await supabase
      .from('students')
      .select('id')
      .eq('matric_no', matric_no)
      .single();

    if (studentError || !student) {
      return Response.json({ error: 'Student not found.' }, { status: 404 });
    }

    // Check payment_id is valid and active
    const { data: paymentRef, error: paymentRefError } = await supabase
      .from('payment_ids')
      .select('*')
      .eq('payment_id', payment_id)
      .eq('is_active', true)
      .single();

    if (paymentRefError || !paymentRef) {
      return Response.json({ error: 'Invalid or expired Payment ID. Please contact the HOC.' }, { status: 400 });
    }

    // Check if student already submitted for this payment_id
    const { data: existing } = await supabase
      .from('payments')
      .select('id, status')
      .eq('matric_no', matric_no)
      .eq('payment_id', payment_id)
      .single();

    if (existing) {
      return Response.json({
        error: `You already submitted for this Payment ID. Current status: ${existing.status.toUpperCase()}.`
      }, { status: 409 });
    }

    // --- Upload proof to Supabase Storage ---
    let proof_url = null;
    if (proofFile && proofFile.size > 0) {
      const fileExt = proofFile.name.split('.').pop();
      const fileName = `${matric_no}_${payment_id}_${Date.now()}.${fileExt}`;

      const arrayBuffer = await proofFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('payment-proofs')
        .upload(fileName, buffer, {
          contentType: proofFile.type,
          upsert: false,
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        return Response.json({ error: 'Failed to upload proof. Try again.' }, { status: 500 });
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('payment-proofs')
        .getPublicUrl(fileName);

      proof_url = urlData.publicUrl;
    }

    // --- Insert payment record ---
    const { data: payment, error: insertError } = await supabase
      .from('payments')
      .insert({
        student_id: student.id,
        matric_no,
        full_name,
        account_name,
        payment_id,
        proof_url,
        status: 'pending',
      })
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      return Response.json({ error: 'Failed to save payment. Try again.' }, { status: 500 });
    }

    return Response.json({
      success: true,
      message: 'Payment submitted successfully! Awaiting verification.',
      payment,
    }, { status: 201 });

  } catch (err) {
    console.error('Submit error:', err);
    return Response.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}