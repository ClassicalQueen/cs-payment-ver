// // app/api/auth/login/route.js  (Next.js App Router)
// // OR pages/api/auth/login.js  (Next.js Pages Router)
// // -------------------------------------------------------
// // Student Login: Surname + Matric Number

// import { createClient } from '@supabase/supabase-js';

// const supabase = createClient(
// //   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role key on server only
// );

// export async function POST(req) {
//   try {
//     const { surname, matric_no } = await req.json();

//     if (!surname || !matric_no) {
//       return Response.json({ error: 'Surname and Matric Number are required.' }, { status: 400 });
//     }

//     // Look up student — match surname (case-insensitive) AND matric number
//     const { data: student, error } = await supabase
//       .from('students')
//       .select('*')
//       .eq('matric_no', matric_no.trim().toUpperCase())
//       .ilike('surname', surname.trim())
//       .single();

//     if (error || !student) {
//       return Response.json({ error: 'Invalid surname or matric number.' }, { status: 401 });
//     }

//     // Return student info (no sensitive data — no passwords needed for students)
//     return Response.json({
//       success: true,
//       student: {
//         id: student.id,
//         matric_no: student.matric_no,
//         full_name: student.full_name,
//         surname: student.surname,
//       }
//     }, { status: 200 });

//   } catch (err) {
//     console.error('Login error:', err);
//     return Response.json({ error: 'Server error. Please try again.' }, { status: 500 });
//   }
// }


// app/api/auth/login/route.js

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    const body = await req.json();

    // ─────────────────────────────────────────────
    // ADMIN LOGIN
    // ─────────────────────────────────────────────
    if (body.adminKey) {
      if (body.adminKey === process.env.ADMIN_SECRET_KEY) {
        return Response.json(
          { success: true },
          { status: 200 }
        );
      }

      return Response.json(
        { error: "Invalid admin key" },
        { status: 401 }
      );
    }

    // ─────────────────────────────────────────────
    // STUDENT LOGIN
    // ─────────────────────────────────────────────
    const { surname, matric_no } = body;

    if (!surname || !matric_no) {
      return Response.json(
        { error: "Surname and Matric Number are required." },
        { status: 400 }
      );
    }

    const { data: student, error } = await supabase
      .from("students")
      .select("*")
      .eq("matric_no", matric_no.trim().toUpperCase())
      .ilike("surname", surname.trim())
      .single();

    if (error || !student) {
      return Response.json(
        { error: "Invalid surname or matric number." },
        { status: 401 }
      );
    }

    return Response.json(
      {
        success: true,
        student: {
          id: student.id,
          matric_no: student.matric_no,
          full_name: student.full_name,
          surname: student.surname,
        },
      },
      { status: 200 }
    );

  } catch (err) {
    console.error("Login error:", err);

    return Response.json(
      { error: "Server error. Please try again." },
      { status: 500 }
    );
  }
}