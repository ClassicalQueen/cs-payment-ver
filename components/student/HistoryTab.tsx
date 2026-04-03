"use client";
// components/student/HistoryTab.tsx

import Badge from "@/components/shared/Badge";
import { COLORS as C } from "@/lib/data";
import { PaymentRecord } from "@/lib/api";

interface HistoryTabProps {
  myPayments: PaymentRecord[];
  onRefresh: () => void;
}

export default function HistoryTab({ myPayments, onRefresh }: HistoryTabProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h2 style={{ color: "#e0ecff", fontSize: 20, fontWeight: "bold", margin: 0 }}>
            My Payment Records
          </h2>
          <p style={{ color: C.muted, fontSize: 13, marginTop: 4, fontFamily: "monospace" }}>
            All your submitted payment verifications.
          </p>
        </div>
        <button
          onClick={onRefresh}
          style={{
            background: "transparent", border: `1px solid ${C.border}`,
            borderRadius: 8, padding: "7px 14px",
            color: C.muted, cursor: "pointer",
            fontSize: 12, fontFamily: "monospace",
          }}
        >
          ↻ Refresh
        </button>
      </div>

      <div
        style={{
          background: C.card, border: `1px solid ${C.border}`,
          borderRadius: 14, overflow: "hidden",
        }}
      >
        {myPayments.length === 0 ? (
          <div
            style={{
              padding: 48, textAlign: "center",
              color: C.dimmed, fontFamily: "monospace", fontSize: 13,
            }}
          >
            No submissions yet. Use &quot;Verify Link&quot; to add your first.
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border2}` }}>
                {["Payment ID", "Name on Account", "Proof", "Status", "Reason", "Submitted"].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left", padding: "11px 20px",
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
              {myPayments.map((p, i) => (
                <tr
                  key={p.id}
                  style={{ borderBottom: i < myPayments.length - 1 ? `1px solid ${C.border2}` : "none" }}
                  onMouseEnter={(ev) => (ev.currentTarget.style.background = "#0a1530")}
                  onMouseLeave={(ev) => (ev.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "14px 20px", color: C.accent, fontSize: 12, fontFamily: "monospace" }}>
                    {p.payment_id}
                  </td>
                  <td style={{ padding: "14px 20px", color: C.muted, fontSize: 12, fontFamily: "monospace" }}>
                    {p.account_name}
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    {p.proof_url ? (
                      <a
                        href={p.proof_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: C.accent, fontSize: 11, fontFamily: "monospace", textDecoration: "underline" }}
                      >
                        View ↗
                      </a>
                    ) : (
                      <span style={{ color: C.dimmed, fontSize: 11, fontFamily: "monospace" }}>—</span>
                    )}
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <Badge verified={p.status === "approved"} status={p.status} />
                  </td>
                  <td style={{ padding: "14px 20px", color: C.red, fontSize: 11, fontFamily: "monospace", maxWidth: 160 }}>
                    {p.rejection_reason || "—"}
                  </td>
                  <td style={{ padding: "14px 20px", color: C.muted, fontSize: 11, fontFamily: "monospace" }}>
                    {new Date(p.submitted_at).toLocaleDateString("en-GB", {
                      day: "2-digit", month: "short", year: "numeric",
                    })}
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