// import { BASE_URL } from "./constants";
// import { getToken } from "./utils";
// import { PaymentList, PaymentRecord, AuthUser } from "./types";

// // ─── Shared response types matching backend schemas ───────────────────────────
// // PaymentOut        → PaymentList
// // StudentPaymentRecordOut / SpecificStudentPaymentRecordOut → PaymentRecord
// // UserOut           → AuthUser

// // ─── Helpers ──────────────────────────────────────────────────────────────────
// function authHeaders(): HeadersInit {
//   const token = getToken();
//   return {
//     "Content-Type": "application/json",
//     ...(token ? { Authorization: `Bearer ${token}` } : {}),
//   };
// }

// async function handle<T>(res: Response): Promise<T> {
//   if (!res.ok) {
//     const err = await res.json().catch(() => ({ detail: "Request failed" }));
//     throw new Error(
//       Array.isArray(err.detail)
//         ? err.detail.map((d: { msg: string }) => d.msg).join(", ")
//         : (err.detail ?? "Request failed")
//     );
//   }
//   // 204 No Content — return empty object
//   if (res.status === 204) return {} as T;
//   return res.json() as Promise<T>;
// }

// // ═════════════════════════════════════════════════════════════════════════════
// // AUTH
// // POST /api/users/login  — application/x-www-form-urlencoded
// // ═════════════════════════════════════════════════════════════════════════════
// export async function apiLogin(
//   username: string,
//   password: string
// ): Promise<{ access_token: string; token_type: string }> {
//   const formData = new URLSearchParams();
//   formData.append("username", username);
//   formData.append("password", password);

//   const res = await fetch(`${BASE_URL}/api/users/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     body: formData.toString(),
//   });
//   return handle(res);
// }

// // ═════════════════════════════════════════════════════════════════════════════
// // USERS — accessible by both roles
// // ═════════════════════════════════════════════════════════════════════════════

// /** GET /api/users/me — currently logged-in user (any role) */
// export async function apiGetMe(): Promise<AuthUser> {
//   const res = await fetch(`${BASE_URL}/api/users/me`, { headers: authHeaders() });
//   return handle(res);
// }

// /** GET /api/users/admin-dashboard — currently logged-in admin */
// export async function apiGetAdminDashboard(): Promise<AuthUser> {
//   const res = await fetch(`${BASE_URL}/api/users/admin-dashboard`, { headers: authHeaders() });
//   return handle(res);
// }

// /** GET /api/users/student-dashboard — currently logged-in student */
// export async function apiGetStudentDashboard(): Promise<AuthUser> {
//   const res = await fetch(`${BASE_URL}/api/users/student-dashboard`, { headers: authHeaders() });
//   return handle(res);
// }

// // ═════════════════════════════════════════════════════════════════════════════
// // USERS — admin only
// // ═════════════════════════════════════════════════════════════════════════════

// /** GET /api/users/ — get all users */
// export async function apiGetAllUsers(): Promise<AuthUser[]> {
//   const res = await fetch(`${BASE_URL}/api/users/`, { headers: authHeaders() });
//   return handle(res);
// }

// /** POST /api/users/create — create a new user (UserCreate schema) */
// export async function apiCreateUser(payload: {
//   surname: string;
//   matric_number: string;
//   password: string;
//   role: string;
// }): Promise<AuthUser> {
//   const res = await fetch(`${BASE_URL}/api/users/create`, {
//     method: "POST",
//     headers: authHeaders(),
//     body: JSON.stringify(payload),
//   });
//   return handle(res);
// }

// /** PUT /api/users/edit/{user_id} — edit user (UserUpdate schema) */
// export async function apiEditUser(
//   userId: string,
//   payload: Partial<{ surname: string; matric_number: string; password: string }>
// ): Promise<AuthUser> {
//   const res = await fetch(`${BASE_URL}/api/users/edit/${userId}`, {
//     method: "PUT",
//     headers: authHeaders(),
//     body: JSON.stringify(payload),
//   });
//   return handle(res);
// }

// /** DELETE /api/users/delete/{user_id} — delete a user */
// export async function apiDeleteUser(userId: string): Promise<void> {
//   const res = await fetch(`${BASE_URL}/api/users/delete/${userId}`, {
//     method: "DELETE",
//     headers: authHeaders(),
//   });
//   return handle(res);
// }

// // ═════════════════════════════════════════════════════════════════════════════
// // PAYMENTS — admin only
// // ═════════════════════════════════════════════════════════════════════════════

// /** GET /api/payments/ — get all payment lists */
// export async function apiGetAllPayments(): Promise<PaymentList[]> {
//   const res = await fetch(`${BASE_URL}/api/payments/`, { headers: authHeaders() });
//   return handle(res);
// }

// /** GET /api/payments/{payment_id} — get single payment details */
// export async function apiGetPayment(paymentId: string): Promise<PaymentList> {
//   const res = await fetch(`${BASE_URL}/api/payments/${paymentId}`, { headers: authHeaders() });
//   return handle(res);
// }

// /** POST /api/payments/create — create payment list (PaymentCreate schema) */
// export async function apiCreatePayment(payload: {
//   name: string;
//   end_time: string;
// }): Promise<PaymentList> {
//   const res = await fetch(`${BASE_URL}/api/payments/create`, {
//     method: "POST",
//     headers: authHeaders(),
//     body: JSON.stringify(payload),
//   });
//   return handle(res);
// }

// /** PUT /api/payments/edit/{payment_id} — edit payment (PaymentUpdate schema) */
// export async function apiEditPayment(
//   paymentId: string,
//   payload: Partial<{ name: string; end_time: string }>
// ): Promise<PaymentList> {
//   const res = await fetch(`${BASE_URL}/api/payments/edit/${paymentId}`, {
//     method: "PUT",
//     headers: authHeaders(),
//     body: JSON.stringify(payload),
//   });
//   return handle(res);
// }

// /** PUT /api/payments/status/{payment_id} — toggle active status (PaymentChangeStatus schema) */
// export async function apiTogglePaymentStatus(paymentId: string): Promise<PaymentList> {
//   const res = await fetch(`${BASE_URL}/api/payments/status/${paymentId}`, {
//     method: "PUT",
//     headers: authHeaders(),
//   });
//   return handle(res);
// }

// /** DELETE /api/payments/delete/{payment_id} — delete payment list */
// export async function apiDeletePayment(paymentId: string): Promise<void> {
//   const res = await fetch(`${BASE_URL}/api/payments/delete/${paymentId}`, {
//     method: "DELETE",
//     headers: authHeaders(),
//   });
//   return handle(res);
// }

// // ═════════════════════════════════════════════════════════════════════════════
// // STUDENT PAYMENT RECORDS — both roles
// // ═════════════════════════════════════════════════════════════════════════════

// /** GET /api/records/user — get current user's payment records */
// export async function apiGetMyRecords(): Promise<PaymentRecord[]> {
//   const res = await fetch(`${BASE_URL}/api/records/user`, { headers: authHeaders() });
//   return handle(res);
// }

// /** POST /api/records/add — add a student record (StudentPaymentRecordCreate schema) */
// export async function apiSubmitRecord(payload: {
//   payment_id: string;
//   name_on_account: string;
// }): Promise<PaymentRecord> {
//   const res = await fetch(`${BASE_URL}/api/records/add`, {
//     method: "POST",
//     headers: authHeaders(),
//     body: JSON.stringify(payload),
//   });
//   return handle(res);
// }

// /** GET /api/records/{record_id} — get single record details */
// export async function apiGetRecord(recordId: string): Promise<PaymentRecord> {
//   const res = await fetch(`${BASE_URL}/api/records/${recordId}`, { headers: authHeaders() });
//   return handle(res);
// }

// // ═════════════════════════════════════════════════════════════════════════════
// // STUDENT PAYMENT RECORDS — admin only
// // ═════════════════════════════════════════════════════════════════════════════

// /** GET /api/records/payment/{payment_id} — get all records under a payment list */
// export async function apiGetRecordsForPayment(paymentId: string): Promise<PaymentRecord[]> {
//   const res = await fetch(`${BASE_URL}/api/records/payment/${paymentId}`, { headers: authHeaders() });
//   return handle(res);
// }

// /** POST /api/records/verify/{record_id} — verify a student record */
// export async function apiVerifyRecord(recordId: string): Promise<PaymentRecord> {
//   const res = await fetch(`${BASE_URL}/api/records/verify/${recordId}`, {
//     method: "POST",
//     headers: authHeaders(),
//   });
//   return handle(res);
// }

// /** POST /api/records/edit/{record_id} — edit a record (StudentPaymentRecordUpdate schema) */
// export async function apiEditRecord(
//   recordId: string,
//   payload: Partial<{ name_on_account: string }>
// ): Promise<PaymentRecord> {
//   const res = await fetch(`${BASE_URL}/api/records/edit/${recordId}`, {
//     method: "POST",
//     headers: authHeaders(),
//     body: JSON.stringify(payload),
//   });
//   return handle(res);
// }

// /** DELETE /api/records/delete/{record_id} — delete a student record */
// export async function apiDeleteRecord(recordId: string): Promise<void> {
//   const res = await fetch(`${BASE_URL}/api/records/delete/${recordId}`, {
//     method: "DELETE",
//     headers: authHeaders(),
//   });
//   return handle(res);
// }