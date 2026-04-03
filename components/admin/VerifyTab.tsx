"use client";
// components/admin/VerifyTab.tsx

import { useState } from "react";
import Badge from "@/components/shared/Badge";
import { COLORS as C } from "@/lib/data";
import { PaymentRecord, PaymentIdRecord } from "@/lib/api";

interface VerifyTabProps {
  payments: PaymentRecord[];
  paymentIds: PaymentIdRecord[];
  activePaymentId: string | null;
  onSelectPaymentId: (id: string) => void;
  onReview: (
    paymentRowId: number,
    action: "approved" | "rejected",
    rejectionReason?: string
  ) => Promise<void>;
}

const TrashIcon = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
    <path d="M2 4h10M5 4V2.5h4V4M5.5 6.5v4M8.5 6.5v4M3 4l.7 7.5h6.6L11 4"
      stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EyeIcon = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
    <path d="M1 7s2.5-4 6-4 6 4 6 4-2.5 4-6 4-6-4-6-4z" stroke="currentColor" strokeWidth="1.3"/>
    <circle cx="7" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.3"/>
  </svg>
);

const TABLE_HEADERS = ["Student", "Matric", "Account Name", "Proof", "Status", "Date", "Actions"];

export default function VerifyTab({
  payments,
  paymentIds,
  activePaymentId,
  onSelectPaymentId,
  onReview,
}: VerifyTabProps) {
  const [loadingId, setLoadingId]         = useState<number | null>(null);
  const [rejectingId, setRejectingId]     = useState<number | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [filterStatus, setFilterStatus]   = useState<"all" | "pending" | "approved" | "rejected">("all");

  // Payments for the currently selected payment ID
  const listPayments = payments.filter(
    (p) => !activePaymentId || p.payment_id === activePaymentId
  );

  // Then filter by status
  const visible = filterStatus === "all"
    ? listPayments
    : listPayments.filter((p) => p.status === filterStatus);

  async function handleApprove(p: PaymentRecord) {
    setLoadingId(p.id);
    await onReview(p.id, "approved");
    setLoadingId(null);
  }

  async function handleReject(p: PaymentRecord) {
    if (!rejectionReason.trim()) {
      alert("Please enter a rejection reason.");
      return;
    }
    setLoadingId(p.id);
    await onReview(p.id, "rejected", rejectionReason.trim());
    setLoadingId(null);
    setRejectingId(null);
    setRejectionReason("");
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h2 style={{ color: "#e0ecff", fontSize: 20, fontWeight: "bold", margin: 0 }}>
          Verify Entries
        </h2>
        <p style={{ color: C.muted, fontSize: 13, marginTop: 4, fontFamily: "monospace" }}>
          Review and confirm student payment submissions.
        </p>
      </div>

      {/* Payment ID filter tabs */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <button
          onClick={() => onSelectPaymentId("")}
          style={{
            padding: "7px 14px", borderRadius: 9, border: "1px solid",
            borderColor: !activePaymentId ? C.accent : C.border,
            background: !activePaymentId ? "#0f1e45" : "transparent",
            color: !activePaymentId ? "#a0c4ff" : C.muted,
            fontSize: 12, fontFamily: "monospace", cursor: "pointer",
          }}
        >
          All ({payments.length})
        </button>
        {paymentIds.map((pid) => {
          const count = payments.filter((p) => p.payment_id === pid.payment_id).length;
          return (
            <button
              key={pid.id}
              onClick={() => onSelectPaymentId(pid.payment_id)}
              style={{
                padding: "7px 14px", borderRadius: 9, border: "1px solid",
                borderColor: activePaymentId === pid.payment_id ? C.accent : C.border,
                background: activePaymentId === pid.payment_id ? "#0f1e45" : "transparent",
                color: activePaymentId === pid.payment_id ? "#a0c4ff" : C.muted,
                fontSize: 12, fontFamily: "monospace", cursor: "pointer",
              }}
            >
              {pid.payment_id}
              {pid.description && ` · ${pid.description}`}
              <span style={{ opacity: 0.6, marginLeft: 4 }}>({count})</span>
            </button>
          );
        })}
      </div>

      {/* Status filter */}
      <div style={{ display: "flex", gap: 6 }}>
        {(["all", "pending", "approved", "rejected"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            style={{
              padding: "5px 12px", borderRadius: 7, border: "1px solid",
              borderColor: filterStatus === s ? C.accent : C.border,
              background: filterStatus === s ? "rgba(30,77,216,.15)" : "transparent",
              color: filterStatus === s ? "#a0c4ff" : C.muted,
              fontSize: 11, fontFamily: "monospace", cursor: "pointer",
              textTransform: "capitalize",
            }}
          >
            {s === "all" ? `All (${listPayments.length})` :
             s === "pending"  ? `Pending (${listPayments.filter(p => p.status === "pending").length})` :
             s === "approved" ? `Approved (${listPayments.filter(p => p.status === "approved").length})` :
             `Rejected (${listPayments.filter(p => p.status === "rejected").length})`}
          </button>
        ))}
      </div>

      {/* Rejection reason modal overlay */}
      {rejectingId !== null && (
        <div
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,.7)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 100,
          }}
        >
          <div
            style={{
              background: C.card, border: `1px solid ${C.border}`,
              borderRadius: 14, padding: 28, width: 400, maxWidth: "90vw",
            }}
          >
            <h3 style={{ color: "#e0ecff", margin: "0 0 6px", fontSize: 16 }}>
              Rejection Reason
            </h3>
            <p style={{ color: C.muted, fontSize: 12, fontFamily: "monospace", margin: "0 0 16px" }}>
              This will be shown to the student. Be specific.
            </p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g. Payment amount does not match. Please re-submit with correct receipt."
              rows={3}
              style={{
                width: "100%", background: "#080f28",
                border: `1px solid ${C.border}`, borderRadius: 10,
                color: C.text, padding: "10px 14px",
                fontSize: 13, fontFamily: "Georgia,serif",
                outline: "none", resize: "vertical",
                boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <button
                onClick={() => {
                  const p = payments.find((x) => x.id === rejectingId);
                  if (p) handleReject(p);
                }}
                disabled={loadingId === rejectingId}
                style={{
                  flex: 1, padding: "11px", borderRadius: 9, border: "none",
                  background: "rgba(239,68,68,.2)", color: C.red,
                  cursor: "pointer", fontSize: 13, fontFamily: "monospace", fontWeight: "bold",
                  opacity: loadingId === rejectingId ? 0.6 : 1,
                }}
              >
                {loadingId === rejectingId ? "Rejecting…" : "✕ Confirm Reject"}
              </button>
              <button
                onClick={() => { setRejectingId(null); setRejectionReason(""); }}
                style={{
                  padding: "11px 20px", borderRadius: 9,
                  border: `1px solid ${C.border}`, background: "transparent",
                  color: C.muted, cursor: "pointer",
                  fontSize: 13, fontFamily: "monospace",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Entries table */}
      <div
        style={{
          background: C.card, border: `1px solid ${C.border}`,
          borderRadius: 14, overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${C.border2}` }}>
              {TABLE_HEADERS.map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left", padding: "11px 18px",
                    color: C.dimmed, fontSize: 10, fontFamily: "monospace",
                    letterSpacing: ".1em", textTransform: "uppercase", fontWeight: "normal",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  style={{
                    padding: 40, textAlign: "center",
                    color: C.dimmed, fontFamily: "monospace", fontSize: 13,
                  }}
                >
                  No entries found.
                </td>
              </tr>
            ) : (
              visible.map((p, i) => (
                <tr
                  key={p.id}
                  style={{
                    borderBottom: i < visible.length - 1 ? `1px solid ${C.border2}` : "none",
                    opacity: loadingId === p.id ? 0.5 : 1,
                    transition: "opacity .2s",
                  }}
                  onMouseEnter={(ev) => (ev.currentTarget.style.background = "#0a1530")}
                  onMouseLeave={(ev) => (ev.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "13px 18px", color: C.text, fontSize: 13 }}>
                    {p.full_name}
                  </td>
                  <td style={{ padding: "13px 18px", color: C.accent, fontSize: 12, fontFamily: "monospace" }}>
                    {p.matric_no}
                  </td>
                  <td style={{ padding: "13px 18px", color: C.muted, fontSize: 12, fontFamily: "monospace" }}>
                    {p.account_name}
                  </td>
                  <td style={{ padding: "13px 18px" }}>
                    {p.proof_url ? (
                      <a
                        href={p.proof_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex", alignItems: "center", gap: 5,
                          color: "#a0c4ff", fontSize: 11, fontFamily: "monospace",
                          textDecoration: "none",
                          background: "rgba(30,77,216,.1)", border: "1px solid rgba(30,77,216,.25)",
                          borderRadius: 6, padding: "4px 8px",
                        }}
                      >
                        <EyeIcon /> View
                      </a>
                    ) : (
                      <span style={{ color: C.dimmed, fontSize: 11, fontFamily: "monospace" }}>—</span>
                    )}
                  </td>
                  <td style={{ padding: "13px 18px" }}>
                    <Badge verified={p.status === "approved"} status={p.status} />
                  </td>
                  <td style={{ padding: "13px 18px", color: C.muted, fontSize: 11, fontFamily: "monospace" }}>
                    {new Date(p.submitted_at).toLocaleDateString("en-GB", {
                      day: "2-digit", month: "short", year: "numeric",
                    })}
                  </td>
                  <td style={{ padding: "13px 18px" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      {/* Approve button — hidden if already approved */}
                      {p.status !== "approved" && (
                        <button
                          onClick={() => handleApprove(p)}
                          disabled={loadingId === p.id}
                          style={{
                            display: "flex", alignItems: "center", gap: 5,
                            padding: "5px 10px", borderRadius: 7,
                            border: "1px solid rgba(34,197,94,.4)",
                            background: "rgba(34,197,94,.1)",
                            color: C.green, cursor: "pointer",
                            fontSize: 11, fontFamily: "monospace",
                            opacity: loadingId === p.id ? 0.5 : 1,
                          }}
                        >
                          ✓ Approve
                        </button>
                      )}

                      {/* Reject button — hidden if already rejected */}
                      {p.status !== "rejected" && (
                        <button
                          onClick={() => setRejectingId(p.id)}
                          disabled={loadingId === p.id}
                          style={{
                            display: "flex", alignItems: "center", gap: 5,
                            padding: "5px 10px", borderRadius: 7,
                            border: "1px solid rgba(239,68,68,.4)",
                            background: "rgba(239,68,68,.1)",
                            color: C.red, cursor: "pointer",
                            fontSize: 11, fontFamily: "monospace",
                          }}
                        >
                          ✕ Reject
                        </button>
                      )}

                      {/* Undo — show Approve again if rejected, or unverify if approved */}
                      {p.status === "approved" && (
                        <button
                          onClick={() => onReview(p.id, "rejected", "Manually unverified by admin.")}
                          style={{
                            padding: "5px 10px", borderRadius: 7,
                            border: `1px solid ${C.border}`,
                            background: "transparent",
                            color: C.muted, cursor: "pointer",
                            fontSize: 11, fontFamily: "monospace",
                          }}
                        >
                          Undo
                        </button>
                      )}

                      {/* Proof icon replaced by table cell — no trash needed (soft reject instead) */}
                    </div>

                    {/* Rejection reason display */}
                    {p.status === "rejected" && p.rejection_reason && (
                      <div style={{ color: C.red, fontSize: 10, fontFamily: "monospace", marginTop: 4, maxWidth: 180 }}>
                        ↳ {p.rejection_reason}
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}