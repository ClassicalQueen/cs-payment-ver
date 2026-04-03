// lib/api.ts — All API calls wired to Next.js backend routes

// ─── Types ────────────────────────────────────────────────────────────────────
export interface StudentUser {
  id: number;
  matric_no: string;
  full_name: string;
  surname: string;
}

export interface PaymentRecord {
  id: number;
  student_id: number;
  matric_no: string;
  full_name: string;
  account_name: string;
  payment_id: string;
  proof_url: string | null;
  status: "pending" | "approved" | "rejected";
  rejection_reason: string | null;
  submitted_at: string;
  reviewed_at: string | null;
  reviewed_by: string | null;
}

export interface PaymentIdRecord {
  id: number;
  payment_id: string;
  description: string;
  amount: number;
  is_active: boolean;
  created_at: string;
}

// ─── Session helpers ──────────────────────────────────────────────────────────
export function saveStudentSession(student: StudentUser) {
  sessionStorage.setItem("student", JSON.stringify(student));
}

export function getStudentSession(): StudentUser | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem("student");
  return raw ? JSON.parse(raw) : null;
}

export function clearSession() {
  sessionStorage.removeItem("student");
  sessionStorage.removeItem("adminKey");
}

export function saveAdminSession(key: string) {
  sessionStorage.setItem("adminKey", key);
}

export function getAdminKey(): string {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem("adminKey") || "";
}

// ─── Shared fetch helper ──────────────────────────────────────────────────────
async function handle<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data as T;
}

// ═════════════════════════════════════════════════════════════════════════════
// AUTH
// ═════════════════════════════════════════════════════════════════════════════

/** Student login: POST /api/auth/login */
export async function apiStudentLogin(
  surname: string,
  matric_no: string
): Promise<StudentUser> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ surname, matric_no }),
  });
  const data = await handle<{ student: StudentUser }>(res);
  return data.student;
}

/** Admin login — validates the admin key against the server */
// export async function apiAdminLogin(adminKey: string): Promise<boolean> {
//   const res = await fetch("/api/admin/payments", {
//     headers: { "x-admin-key": adminKey },
//   });
//   return res.ok;
// }

export async function apiAdminLogin(adminKey: string): Promise<boolean> {
  
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ adminKey }),
  });

  if (!res.ok) return false;

  saveAdminSession(adminKey);
  return true;
}

// ═════════════════════════════════════════════════════════════════════════════
// STUDENT — Payments
// ═════════════════════════════════════════════════════════════════════════════

/** Submit payment: POST /api/payments/submit (multipart/form-data) */
export async function apiSubmitPayment(payload: {
  matric_no: string;
  full_name: string;
  account_name: string;
  payment_id: string;
  proof?: File | null;
}): Promise<PaymentRecord> {
  const form = new FormData();
  form.append("matric_no", payload.matric_no);
  form.append("full_name", payload.full_name);
  form.append("account_name", payload.account_name);
  form.append("payment_id", payload.payment_id);
  if (payload.proof) form.append("proof", payload.proof);

  const res = await fetch("/api/payments/submit", {
    method: "POST",
    body: form,
  });
  const data = await handle<{ payment: PaymentRecord }>(res);
  return data.payment;
}

/** Get student's payment history: GET /api/payments/status?matric_no=... */
export async function apiGetMyPayments(matric_no: string): Promise<PaymentRecord[]> {
  const res = await fetch(`/api/payments/status?matric_no=${encodeURIComponent(matric_no)}`);
  const data = await handle<{ payments: PaymentRecord[] }>(res);
  return data.payments;
}

// ═════════════════════════════════════════════════════════════════════════════
// ADMIN — Payments
// ═════════════════════════════════════════════════════════════════════════════

/** Get all payments (admin): GET /api/admin/payments */
export async function apiAdminGetPayments(status?: string): Promise<PaymentRecord[]> {
  const url = status ? `/api/admin/payments?status=${status}` : "/api/admin/payments";
  const res = await fetch(url, {
    headers: { "x-admin-key": getAdminKey() },
  });
  const data = await handle<{ payments: PaymentRecord[] }>(res);
  return data.payments;
}

/** Approve or reject a payment (admin): PATCH /api/admin/payments */
export async function apiAdminReviewPayment(
  payment_id_row: number,
  action: "approved" | "rejected",
  rejection_reason?: string
): Promise<PaymentRecord> {
  const res = await fetch("/api/admin/payments", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-admin-key": getAdminKey(),
    },
    body: JSON.stringify({ payment_id_row, action, rejection_reason }),
  });
  const data = await handle<{ payment: PaymentRecord }>(res);
  return data.payment;
}

// ═════════════════════════════════════════════════════════════════════════════
// ADMIN — Payment IDs
// ═════════════════════════════════════════════════════════════════════════════

/** Get all payment IDs: GET /api/admin/payment-ids */
export async function apiAdminGetPaymentIds(): Promise<PaymentIdRecord[]> {
  const res = await fetch("/api/admin/payment-ids", {
    headers: { "x-admin-key": getAdminKey() },
  });
  const data = await handle<{ payment_ids: PaymentIdRecord[] }>(res);
  return data.payment_ids;
}

/** Create a payment ID: POST /api/admin/payment-ids */
export async function apiAdminCreatePaymentId(payload: {
  description: string;
  amount: number;
}): Promise<PaymentIdRecord> {
  const res = await fetch("/api/admin/payment-ids", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-key": getAdminKey(),
    },
    body: JSON.stringify(payload),
  });
  const data = await handle<{ payment_id: PaymentIdRecord }>(res);
  return data.payment_id;
}

/** Deactivate/activate a payment ID: PATCH /api/admin/payment-ids */
export async function apiAdminTogglePaymentId(
  id: number,
  is_active: boolean
): Promise<PaymentIdRecord> {
  const res = await fetch("/api/admin/payment-ids", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-admin-key": getAdminKey(),
    },
    body: JSON.stringify({ id, is_active }),
  });
  const data = await handle<{ payment_id: PaymentIdRecord }>(res);
  return data.payment_id;
}