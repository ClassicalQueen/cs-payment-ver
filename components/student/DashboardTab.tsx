"use client";

import StatCard from "@/components/shared/StatCard";
import Badge from "@/components/shared/Badge";
import { PaymentEntry, PaymentList } from "@/lib/types";
import { COLORS as C, STUDENT_USER, PAYMENT_LISTS } from "@/lib/data";

interface DashboardTabProps {
  myEntries: PaymentEntry[];
  onViewAll: () => void;
  onVerifySuccess: (entry: PaymentEntry) => void;
}

export default function DashboardTab({ myEntries, onViewAll, onVerifySuccess }: DashboardTabProps) {
  const verified = myEntries.filter((e) => e.isVerified).length;
  const pending = myEntries.length - verified;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h2 style={{ color: "#e0ecff", fontSize: 20, fontWeight: "bold", margin: 0 }}>
          Welcome back, {STUDENT_USER.name.split(" ")[0]} 👋
        </h2>
        <p style={{ color: C.muted, fontSize: 13, marginTop: 4, fontFamily: "monospace" }}>
          {STUDENT_USER.dept} · {STUDENT_USER.level}
        </p>
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
        <StatCard label="My Submissions" value={myEntries.length} sub="Total across all lists" color={C.accent} />
        <StatCard label="Verified" value={verified} sub="Confirmed by HOC" color={C.green} />
        <StatCard label="Pending" value={pending} sub="Awaiting review" color={C.yellow} />
      </div>

      {/* Recent submissions table */}
      {myEntries.length > 0 && (
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
              My Recent Submissions
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

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border2}` }}>
                {["Payment List", "Name on Account", "Status", "Entered At"].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left", padding: "10px 20px",
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
              {myEntries.slice(0, 4).map((e, i) => (
                <tr
                  key={e.id}
                  style={{ borderBottom: i < Math.min(myEntries.length, 4) - 1 ? `1px solid ${C.border2}` : "none" }}
                  onMouseEnter={(ev) => (ev.currentTarget.style.background = "#0a1530")}
                  onMouseLeave={(ev) => (ev.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "12px 20px", color: C.text, fontSize: 13 }}>
                    {PAYMENT_LISTS.find((l) => l.id === e.paymentId)?.name || e.paymentId}
                  </td>
                  <td style={{ padding: "12px 20px", color: C.muted, fontSize: 12, fontFamily: "monospace" }}>
                    {e.nameOnAccount}
                  </td>
                  <td style={{ padding: "12px 20px" }}><Badge verified={e.isVerified} /></td>
                  <td style={{ padding: "12px 20px", color: C.muted, fontSize: 11, fontFamily: "monospace" }}>
                    {e.enteredAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}