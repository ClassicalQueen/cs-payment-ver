"use client";
// components/admin/OverviewTab.tsx

import StatCard from "@/components/shared/StatCard";
import Badge from "@/components/shared/Badge";
import { COLORS as C } from "@/lib/data";
import { PaymentRecord, PaymentIdRecord } from "@/lib/api";

interface OverviewTabProps {
  payments: PaymentRecord[];
  paymentIds: PaymentIdRecord[];
  onViewAll: () => void;
}

export default function OverviewTab({ payments, paymentIds, onViewAll }: OverviewTabProps) {
  const total    = payments.length;
  const approved = payments.filter((p) => p.status === "approved").length;
  const pending  = payments.filter((p) => p.status === "pending").length;
  const rejected = payments.filter((p) => p.status === "rejected").length;

  const recent = payments.slice(0, 6);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h2 style={{ color: "#e0ecff", fontSize: 20, fontWeight: "bold", margin: 0 }}>
          Overview
        </h2>
        <p style={{ color: C.muted, fontSize: 13, marginTop: 4, fontFamily: "monospace" }}>
          CS Department · 100 Level · Payment Verification Dashboard
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
        <StatCard label="Total Submissions" value={total}    sub="All students"      color={C.accent} />
        <StatCard label="Approved"          value={approved} sub="Verified by HOC"   color={C.green}  />
        <StatCard label="Pending"           value={pending}  sub="Awaiting review"   color={C.yellow} />
        <StatCard label="Rejected"          value={rejected} sub="Needs attention"   color={C.red}    />
      </div>

      {/* Active payment IDs */}
      {paymentIds.filter(p => p.is_active).length > 0 && (
        <div
          style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 14, padding: "16px 20px",
          }}
        >
          <div style={{ color: "#e0ecff", fontWeight: "bold", fontSize: 14, marginBottom: 12 }}>
            Active Payment IDs
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {paymentIds.filter(p => p.is_active).map((pid) => (
              <div
                key={pid.id}
                style={{
                  background: "rgba(30,77,216,.1)", border: "1px solid rgba(30,77,216,.25)",
                  borderRadius: 8, padding: "6px 14px",
                  fontFamily: "monospace", fontSize: 12, color: "#a0c4ff",
                }}
              >
                <span style={{ fontWeight: "bold" }}>{pid.payment_id}</span>
                {pid.description && <span style={{ color: C.muted, marginLeft: 8 }}>— {pid.description}</span>}
                {pid.amount && <span style={{ color: C.green, marginLeft: 8 }}>₦{pid.amount.toLocaleString()}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent submissions */}
      <div
        style={{
          background: C.card, border: `1px solid ${C.border}`,
          borderRadius: 14, overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "14px 20px", borderBottom: `1px solid ${C.border2}`,
            display: "flex", justifyContent: "space-between",
          }}
        >
          <span style={{ color: "#e0ecff", fontWeight: "bold", fontSize: 14 }}>
            Recent Submissions
          </span>
          <button
            onClick={onViewAll}
            style={{
              background: "transparent", border: "none",
              color: C.muted, cursor: "pointer",
              fontSize: 12, fontFamily: "monospace", textDecoration: "underline",
            }}
          >
            View all →
          </button>
        </div>

        {recent.length === 0 ? (
          <div style={{ padding: 40, textAlign: "center", color: C.dimmed, fontFamily: "monospace", fontSize: 13 }}>
            No submissions yet.
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border2}` }}>
                {["Student", "Matric", "Payment ID", "Account Name", "Status", "Date"].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left", padding: "10px 18px",
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
              {recent.map((p, i) => (
                <tr
                  key={p.id}
                  style={{ borderBottom: i < recent.length - 1 ? `1px solid ${C.border2}` : "none" }}
                  onMouseEnter={(ev) => (ev.currentTarget.style.background = "#0a1530")}
                  onMouseLeave={(ev) => (ev.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "12px 18px", color: C.text, fontSize: 13 }}>{p.full_name}</td>
                  <td style={{ padding: "12px 18px", color: C.accent, fontSize: 12, fontFamily: "monospace" }}>{p.matric_no}</td>
                  <td style={{ padding: "12px 18px", color: C.muted, fontSize: 12, fontFamily: "monospace" }}>{p.payment_id}</td>
                  <td style={{ padding: "12px 18px", color: C.muted, fontSize: 12, fontFamily: "monospace" }}>{p.account_name}</td>
                  <td style={{ padding: "12px 18px" }}><Badge verified={p.status === "approved"} status={p.status} /></td>
                  <td style={{ padding: "12px 18px", color: C.muted, fontSize: 11, fontFamily: "monospace" }}>
                    {new Date(p.submitted_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}