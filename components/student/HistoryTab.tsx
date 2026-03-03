"use client";

import Badge from "@/components/shared/Badge";
import { PaymentEntry } from "@/lib/types";
import { COLORS as C, PAYMENT_LISTS } from "@/lib/data";

interface HistoryTabProps {
  myEntries: PaymentEntry[];
}

export default function HistoryTab({ myEntries }: HistoryTabProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h2 style={{ color: "#e0ecff", fontSize: 20, fontWeight: "bold", margin: 0 }}>
          My Payment Records
        </h2>
        <p style={{ color: C.muted, fontSize: 13, marginTop: 4, fontFamily: "monospace" }}>
          All your submitted payment verifications.
        </p>
      </div>

      <div
        style={{
          background: C.card, border: `1px solid ${C.border}`,
          borderRadius: 14, overflow: "hidden",
        }}
      >
        {myEntries.length === 0 ? (
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
                {["Payment List", "Name on Account", "Status", "Entered At"].map((h) => (
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
              {myEntries.map((e, i) => (
                <tr
                  key={e.id}
                  style={{ borderBottom: i < myEntries.length - 1 ? `1px solid ${C.border2}` : "none" }}
                  onMouseEnter={(ev) => (ev.currentTarget.style.background = "#0a1530")}
                  onMouseLeave={(ev) => (ev.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "14px 20px", color: C.text, fontSize: 13 }}>
                    {PAYMENT_LISTS.find((l) => l.id === e.paymentId)?.name || e.paymentId}
                  </td>
                  <td style={{ padding: "14px 20px", color: C.muted, fontSize: 12, fontFamily: "monospace" }}>
                    {e.nameOnAccount}
                  </td>
                  <td style={{ padding: "14px 20px" }}><Badge verified={e.isVerified} /></td>
                  <td style={{ padding: "14px 20px", color: C.muted, fontSize: 11, fontFamily: "monospace" }}>
                    {e.enteredAt}
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