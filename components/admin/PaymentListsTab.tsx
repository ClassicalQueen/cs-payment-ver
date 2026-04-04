"use client";
// components/admin/PaymentListsTab.tsx

import { useState } from "react";
import { COLORS as C } from "@/lib/data";
import { PaymentRecord, PaymentIdRecord } from "@/lib/api";
import ExportButton from "@/components/admin/ExportButton";

interface PaymentListsTabProps {
  paymentIds: PaymentIdRecord[];
  payments: PaymentRecord[];
  onCreatePaymentId: (description: string, amount: number) => Promise<void>;
  onTogglePaymentId: (id: number, is_active: boolean) => Promise<void>;
}

const CopyIcon = () => (
  <svg width="13" height="13" fill="none" viewBox="0 0 13 13">
    <rect x="3.5" y="2.5" width="6" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M2 4H1.5A1 1 0 00.5 5v6a1 1 0 001 1h6a1 1 0 001-1v-.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

export default function PaymentListsTab({
  paymentIds,
  payments,
  onCreatePaymentId,
  onTogglePaymentId,
}: PaymentListsTabProps) {
  const [desc, setDesc]             = useState("");
  const [amount, setAmount]         = useState("");
  const [creating, setCreating]     = useState(false);
  const [togglingId, setTogglingId] = useState<number | null>(null);
  const [copied, setCopied]         = useState<string | null>(null);
  const [error, setError]           = useState("");
  const [showForm, setShowForm]     = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  async function handleCreate() {
    if (!desc.trim()) { setError("Description is required."); return; }
    setError("");
    setCreating(true);
    try {
      await onCreatePaymentId(desc.trim(), parseFloat(amount) || 0);
      setDesc(""); setAmount(""); setShowForm(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create payment ID.");
    } finally {
      setCreating(false);
    }
  }

  async function handleToggle(pid: PaymentIdRecord) {
    setTogglingId(pid.id);
    try { await onTogglePaymentId(pid.id, !pid.is_active); }
    finally { setTogglingId(null); }
  }

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  }

  const inputStyle = {
    width: "100%", background: "#080f28",
    border: `1px solid ${C.border}`, borderRadius: 10,
    color: C.text, padding: "11px 14px", fontSize: 13,
    outline: "none", fontFamily: "Georgia,serif",
    boxSizing: "border-box" as const,
  };

  const labelStyle = {
    color: C.muted, fontSize: 11, fontFamily: "monospace",
    letterSpacing: ".08em", textTransform: "uppercase" as const,
    display: "block", marginBottom: 6,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h2 style={{ color: "#e0ecff", fontSize: 20, fontWeight: "bold", margin: 0 }}>Payment Lists</h2>
          <p style={{ color: C.muted, fontSize: 13, marginTop: 4, fontFamily: "monospace" }}>
            Create and manage payment IDs. Share the code with students.
          </p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 18px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accent2})`, color: "white", cursor: "pointer", fontSize: 13, fontFamily: "monospace", fontWeight: "bold" }}
        >
          + New Payment ID
        </button>
      </div>

      {/* Create form */}
      {showForm && (
        <div style={{ background: C.card, border: `1px solid ${C.accent}`, borderRadius: 14, padding: 24 }}>
          <h3 style={{ color: "#e0ecff", margin: "0 0 18px", fontSize: 15 }}>Generate New Payment ID</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Description *</label>
              <input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="e.g. Departmental Dues 2024/2025" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Amount (₦)</label>
              <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 5000" type="number" min="0" style={inputStyle} />
            </div>
          </div>
          {error && <div style={{ color: C.red, fontSize: 12, fontFamily: "monospace", marginBottom: 12 }}>✕ {error}</div>}
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={handleCreate} disabled={creating} style={{ padding: "10px 24px", borderRadius: 9, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accent2})`, color: "white", cursor: creating ? "not-allowed" : "pointer", fontSize: 13, fontFamily: "monospace", fontWeight: "bold", opacity: creating ? 0.7 : 1 }}>
              {creating ? "Generating…" : "Generate ID"}
            </button>
            <button onClick={() => { setShowForm(false); setError(""); }} style={{ padding: "10px 18px", borderRadius: 9, border: `1px solid ${C.border}`, background: "transparent", color: C.muted, cursor: "pointer", fontSize: 13, fontFamily: "monospace" }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Payment IDs table */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
        <div style={{ padding: "14px 20px", borderBottom: `1px solid ${C.border2}` }}>
          <span style={{ color: "#e0ecff", fontWeight: "bold", fontSize: 14 }}>All Payment IDs ({paymentIds.length})</span>
        </div>

        {paymentIds.length === 0 ? (
          <div style={{ padding: 48, textAlign: "center", color: C.dimmed, fontFamily: "monospace", fontSize: 13 }}>
            No payment IDs yet. Click &quot;+ New Payment ID&quot; to create one.
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border2}` }}>
                {["Payment ID", "Description", "Amount", "Submissions", "Status", "Created", "Actions"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "11px 18px", color: C.dimmed, fontSize: 10, fontFamily: "monospace", letterSpacing: ".1em", textTransform: "uppercase", fontWeight: "normal" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paymentIds.map((pid, i) => {
                const listPayments  = payments.filter((p) => p.payment_id === pid.payment_id);
                const approvedCount = listPayments.filter((p) => p.status === "approved").length;
                const pendingCount  = listPayments.filter((p) => p.status === "pending").length;
                const isExpanded    = expandedId === pid.id;
                const isLast        = i === paymentIds.length - 1;

                return (
                  <>
                    {/* Main row */}
                    <tr
                      key={pid.id}
                      style={{ borderBottom: `1px solid ${C.border2}`, opacity: togglingId === pid.id ? 0.5 : 1, transition: "opacity .2s" }}
                      onMouseEnter={(ev) => (ev.currentTarget.style.background = "#0a1530")}
                      onMouseLeave={(ev) => (ev.currentTarget.style.background = "transparent")}
                    >
                      {/* ID + copy */}
                      <td style={{ padding: "14px 18px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ color: "#a0c4ff", fontSize: 13, fontFamily: "monospace", fontWeight: "bold" }}>{pid.payment_id}</span>
                          <button
                            onClick={() => handleCopy(pid.payment_id)}
                            style={{ background: copied === pid.payment_id ? "rgba(34,197,94,.15)" : "rgba(30,77,216,.1)", border: `1px solid ${copied === pid.payment_id ? "rgba(34,197,94,.3)" : "rgba(30,77,216,.25)"}`, borderRadius: 6, padding: "3px 7px", color: copied === pid.payment_id ? C.green : C.muted, cursor: "pointer", fontSize: 10, fontFamily: "monospace", display: "flex", alignItems: "center", gap: 4 }}
                          >
                            <CopyIcon />
                            {copied === pid.payment_id ? "Copied!" : "Copy"}
                          </button>
                        </div>
                      </td>
                      <td style={{ padding: "14px 18px", color: C.text, fontSize: 13 }}>{pid.description || "—"}</td>
                      <td style={{ padding: "14px 18px", color: C.green, fontSize: 13, fontFamily: "monospace" }}>{pid.amount ? `₦${Number(pid.amount).toLocaleString()}` : "—"}</td>
                      <td style={{ padding: "14px 18px" }}>
                        <div style={{ color: C.text, fontSize: 13, fontFamily: "monospace" }}>{listPayments.length} total</div>
                        <div style={{ display: "flex", gap: 8, marginTop: 2 }}>
                          {approvedCount > 0 && <span style={{ color: C.green,  fontSize: 11, fontFamily: "monospace" }}>{approvedCount} approved</span>}
                          {pendingCount  > 0 && <span style={{ color: C.yellow, fontSize: 11, fontFamily: "monospace" }}>{pendingCount} pending</span>}
                        </div>
                      </td>
                      <td style={{ padding: "14px 18px" }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 20, background: pid.is_active ? "rgba(34,197,94,.12)" : "rgba(100,100,100,.12)", color: pid.is_active ? C.green : C.dimmed, fontSize: 11, fontFamily: "monospace", border: `1px solid ${pid.is_active ? "rgba(34,197,94,.3)" : "rgba(100,100,100,.3)"}` }}>
                          <span style={{ width: 5, height: 5, borderRadius: "50%", background: pid.is_active ? C.green : C.dimmed, display: "inline-block" }} />
                          {pid.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td style={{ padding: "14px 18px", color: C.muted, fontSize: 11, fontFamily: "monospace" }}>
                        {new Date(pid.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                      </td>
                      <td style={{ padding: "14px 18px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                          <button
                            onClick={() => handleToggle(pid)} disabled={togglingId === pid.id}
                            style={{ padding: "5px 10px", borderRadius: 7, border: `1px solid ${pid.is_active ? "rgba(239,68,68,.35)" : "rgba(34,197,94,.35)"}`, background: pid.is_active ? "rgba(239,68,68,.08)" : "rgba(34,197,94,.08)", color: pid.is_active ? C.red : C.green, cursor: togglingId === pid.id ? "not-allowed" : "pointer", fontSize: 11, fontFamily: "monospace", opacity: togglingId === pid.id ? 0.5 : 1 }}
                          >
                            {pid.is_active ? "Deactivate" : "Activate"}
                          </button>

                          {/* ── EXPORT BUTTON (approved only) ── */}
                          <ExportButton paymentId={pid} payments={payments} mode="approved" />

                          <button
                            onClick={() => setExpandedId(isExpanded ? null : pid.id)}
                            style={{ padding: "5px 10px", borderRadius: 7, border: `1px solid ${C.border}`, background: isExpanded ? "#0a1530" : "transparent", color: C.muted, cursor: "pointer", fontSize: 11, fontFamily: "monospace" }}
                          >
                            {isExpanded ? "▲ Hide" : "▼ Details"}
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expanded detail row */}
                    {isExpanded && (
                      <tr key={`${pid.id}-exp`} style={{ borderBottom: isLast ? "none" : `1px solid ${C.border2}` }}>
                        <td colSpan={7} style={{ padding: "0 18px 20px", background: "#060d1c" }}>
                          <div style={{ paddingTop: 16 }}>

                            {/* Export options */}
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                              <span style={{ color: "#e0ecff", fontSize: 13, fontWeight: "bold" }}>
                                Students in this list
                              </span>
                              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <span style={{ color: C.dimmed, fontSize: 11, fontFamily: "monospace" }}>Export:</span>
                                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                  <span style={{ color: C.muted, fontSize: 11, fontFamily: "monospace" }}>Approved only</span>
                                  <ExportButton paymentId={pid} payments={payments} mode="approved" />
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                  <span style={{ color: C.muted, fontSize: 11, fontFamily: "monospace" }}>All records</span>
                                  <ExportButton paymentId={pid} payments={payments} mode="all" />
                                </div>
                              </div>
                            </div>

                            {listPayments.length === 0 ? (
                              <p style={{ color: C.dimmed, fontFamily: "monospace", fontSize: 12, margin: 0 }}>No submissions yet.</p>
                            ) : (
                              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                                <thead>
                                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                                    {["#", "Full Name", "Matric No", "Account Name", "Status", "Date"].map((h) => (
                                      <th key={h} style={{ textAlign: "left", padding: "6px 10px", color: C.dimmed, fontFamily: "monospace", fontSize: 10, fontWeight: "normal", letterSpacing: ".08em", textTransform: "uppercase" }}>{h}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {listPayments.map((p, idx) => (
                                    <tr key={p.id} style={{ borderBottom: idx < listPayments.length - 1 ? `1px solid ${C.border2}` : "none" }}>
                                      <td style={{ padding: "8px 10px", color: C.dimmed, fontFamily: "monospace" }}>{idx + 1}</td>
                                      <td style={{ padding: "8px 10px", color: C.text }}>{p.full_name}</td>
                                      <td style={{ padding: "8px 10px", color: C.accent, fontFamily: "monospace" }}>{p.matric_no}</td>
                                      <td style={{ padding: "8px 10px", color: C.muted, fontFamily: "monospace" }}>{p.account_name}</td>
                                      <td style={{ padding: "8px 10px" }}>
                                        <span style={{ color: p.status === "approved" ? C.green : p.status === "rejected" ? C.red : C.yellow, fontFamily: "monospace", fontSize: 11, fontWeight: "bold" }}>
                                          {p.status.toUpperCase()}
                                        </span>
                                      </td>
                                      <td style={{ padding: "8px 10px", color: C.dimmed, fontFamily: "monospace" }}>
                                        {new Date(p.submitted_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* How-to guide */}
      <div style={{ background: "rgba(30,77,216,.06)", border: "1px solid rgba(30,77,216,.2)", borderRadius: 12, padding: "16px 20px" }}>
        <div style={{ color: "#7aa8ff", fontSize: 12, fontFamily: "monospace", marginBottom: 6, fontWeight: "bold" }}>ℹ How to share & export</div>
        <div style={{ color: C.muted, fontSize: 12, fontFamily: "monospace", lineHeight: 1.7 }}>
          1. Generate a Payment ID above (e.g. LASU-CS-A3F9B2)<br />
          2. Share the code via WhatsApp or your class group<br />
          3. Students paste the code in the &quot;Verify Link&quot; tab to submit<br />
          4. Approve submissions in &quot;Verify Entries&quot;, then click <strong style={{ color: C.green }}>Export</strong> to download the approved list as CSV or Excel
        </div>
      </div>
    </div>
  );
}