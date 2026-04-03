"use client";

import { useState } from "react";
import { COLORS as C } from "@/lib/data";
import { apiSubmitPayment, PaymentRecord, StudentUser } from "@/lib/api";

interface VerifyLinkTabProps {
  student: StudentUser;
  payments: PaymentRecord[];
  onPaymentAdded: (payment: PaymentRecord) => void;
}

export default function VerifyLinkTab({ student, payments, onPaymentAdded }: VerifyLinkTabProps) {
  const [accountName, setAccountName] = useState("");
  const [paymentId,   setPaymentId]   = useState("");
  const [proof,       setProof]       = useState<File | null>(null);
  const [loading,     setLoading]     = useState(false);
  const [status,      setStatus]      = useState<{ ok: boolean; msg: string } | null>(null);

  async function handleSubmit() {
    if (!accountName.trim() || !paymentId.trim()) {
      setStatus({ ok: false, msg: "Please fill in all fields." });
      return;
    }

    // Check for duplicate submission locally before hitting server
    const duplicate = payments.find(
      (p) => p.payment_id.toUpperCase() === paymentId.trim().toUpperCase()
    );
    if (duplicate) {
      setStatus({ ok: false, msg: `You already submitted for this Payment ID. Status: ${duplicate.status.toUpperCase()}.` });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const newPayment = await apiSubmitPayment({
        matric_no:    student.matric_no,
        full_name:    student.full_name,
        account_name: accountName.trim(),
        payment_id:   paymentId.trim(),
        proof:        proof,
      });

      onPaymentAdded(newPayment);
      setStatus({ ok: true, msg: "✓ Payment submitted successfully! Awaiting HOC verification." });
      setAccountName("");
      setPaymentId("");
      setProof(null);
    } catch (err: unknown) {
      setStatus({
        ok: false,
        msg: err instanceof Error ? err.message : "Submission failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }

    setTimeout(() => setStatus(null), 5000);
  }

  const fieldStyle = {
    width: "100%",
    background: "#080f28",
    border: `1px solid ${C.border}`,
    borderRadius: 10,
    color: C.text,
    padding: "12px 16px",
    fontSize: 13,
    outline: "none",
    fontFamily: "Georgia,serif",
    boxSizing: "border-box" as const,
    marginBottom: 16,
  };

  const labelStyle = {
    color: C.muted,
    fontSize: 11,
    fontFamily: "monospace",
    letterSpacing: ".08em",
    textTransform: "uppercase" as const,
    display: "block",
    marginBottom: 6,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 620 }}>
      <div>
        <h2 style={{ color: "#e0ecff", fontSize: 20, fontWeight: "bold", margin: 0 }}>
          Verify a Payment Link
        </h2>
        <p style={{ color: C.muted, fontSize: 13, marginTop: 4, fontFamily: "monospace" }}>
          Your HOC shared a Payment ID. Fill in your details to submit.
        </p>
      </div>

      <div
        style={{
          background: C.card, border: `1px solid ${C.border}`,
          borderRadius: 14, padding: 24,
        }}
      >
        {/* Auto-filled: Full Name */}
        <label style={labelStyle}>Student Full Name (auto)</label>
        <div style={{ ...fieldStyle, color: C.muted, fontFamily: "monospace" }}>
          {student.full_name}
        </div>

        {/* Auto-filled: Matric */}
        <label style={labelStyle}>Matric Number (auto)</label>
        <div style={{ ...fieldStyle, color: C.muted, fontFamily: "monospace" }}>
          {student.matric_no}
        </div>

        {/* Name on Account */}
        <label style={labelStyle}>Name on Account *</label>
        <input
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          placeholder="Name on bank account used for payment"
          style={fieldStyle}
        />

        {/* Payment ID */}
        <label style={labelStyle}>Payment ID (from HOC message) *</label>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <input
            value={paymentId}
            onChange={(e) => setPaymentId(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="e.g. LASU-CS-A3F9B2"
            style={{
              flex: 1, background: "#080f28",
              border: `1px solid ${status?.ok === false ? C.red : C.border}`,
              borderRadius: 10, color: C.text,
              padding: "12px 16px", fontSize: 13,
              outline: "none", fontFamily: "monospace",
            }}
          />
        </div>

        {/* Upload Proof */}
        <label style={labelStyle}>Payment Proof (optional — screenshot / receipt)</label>
        <div
          style={{
            marginBottom: 20,
            border: `1px dashed ${C.border}`,
            borderRadius: 10,
            padding: "16px",
            textAlign: "center",
            background: "#080f28",
          }}
        >
          <input
            id="proof-upload"
            type="file"
            accept="image/*,.pdf"
            style={{ display: "none" }}
            onChange={(e) => setProof(e.target.files?.[0] || null)}
          />
          <label
            htmlFor="proof-upload"
            style={{
              cursor: "pointer",
              color: proof ? C.green : C.muted,
              fontSize: 12,
              fontFamily: "monospace",
            }}
          >
            {proof ? `✓ ${proof.name}` : "Click to upload proof (image or PDF)"}
          </label>
          {proof && (
            <button
              onClick={() => setProof(null)}
              style={{
                display: "block", margin: "8px auto 0",
                background: "transparent", border: "none",
                color: C.red, cursor: "pointer",
                fontSize: 11, fontFamily: "monospace",
              }}
            >
              ✕ Remove
            </button>
          )}
        </div>

        {/* Status message */}
        {status && (
          <div
            style={{
              color: status.ok ? C.green : C.red,
              fontSize: 12, fontFamily: "monospace",
              marginBottom: 14,
              padding: "10px 14px",
              borderRadius: 8,
              background: status.ok ? "rgba(34,197,94,.08)" : "rgba(239,68,68,.08)",
              border: `1px solid ${status.ok ? "rgba(34,197,94,.2)" : "rgba(239,68,68,.2)"}`,
            }}
          >
            {status.msg}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%",
            background: `linear-gradient(135deg,${C.accent},${C.accent2})`,
            border: "none", borderRadius: 10, padding: "13px",
            cursor: loading ? "not-allowed" : "pointer",
            color: "white", fontWeight: "bold",
            fontSize: 13, fontFamily: "monospace",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Submitting…" : "Submit Payment"}
        </button>
      </div>
    </div>
  );
}