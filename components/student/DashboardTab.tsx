"use client";

import StatCard from "@/components/shared/StatCard";
import Badge from "@/components/shared/Badge";
import { COLORS as C } from "@/lib/data";
import { PaymentRecord, StudentUser } from "@/lib/api";

interface DashboardTabProps {
  student: StudentUser;
  myPayments: PaymentRecord[];
  onViewAll: () => void;
  onPaymentAdded: (p: PaymentRecord) => void;
}

export default function DashboardTab({ student, myPayments, onViewAll }: DashboardTabProps) {
  const approved = myPayments.filter((p) => p.status === "approved").length;
  const pending  = myPayments.filter((p) => p.status === "pending").length;
  const rejected = myPayments.filter((p) => p.status === "rejected").length;

  const firstName = student.full_name.split(" ")[1] || student.full_name.split(" ")[0];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h2 style={{ color: "#e0ecff", fontSize: 20, fontWeight: "bold", margin: 0 }}>
          Welcome back, {firstName} 👋
        </h2>
        <p style={{ color: C.muted, fontSize: 13, marginTop: 4, fontFamily: "monospace" }}>
          Computer Science · 100 Level · {student.matric_no}
        </p>
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
        <StatCard label="My Submissions" value={myPayments.length} sub="Total submitted"      color={C.accent} />
        <StatCard label="Approved"        value={approved}          sub="Confirmed by HOC"    color={C.green}  />
        <StatCard label="Pending"         value={pending}           sub="Awaiting review"     color={C.yellow} />
      </div>

      {rejected > 0 && (
        <div
          style={{
            background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.2)",
            borderRadius: 10, padding: "12px 16px",
            color: C.red, fontSize: 13, fontFamily: "monospace",
          }}
        >
          ✕ You have {rejected} rejected submission{rejected > 1 ? "s" : ""}. Check &quot;My Records&quot; for details.
        </div>
      )}

      {/* Recent submissions */}
      {myPayments.length > 0 ? (
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
                {["Payment ID", "Name on Account", "Status", "Submitted"].map((h) => (
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
              {myPayments.slice(0, 4).map((p, i) => (
                <tr
                  key={p.id}
                  style={{ borderBottom: i < Math.min(myPayments.length, 4) - 1 ? `1px solid ${C.border2}` : "none" }}
                  onMouseEnter={(ev) => (ev.currentTarget.style.background = "#0a1530")}
                  onMouseLeave={(ev) => (ev.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "12px 20px", color: C.accent, fontSize: 12, fontFamily: "monospace" }}>
                    {p.payment_id}
                  </td>
                  <td style={{ padding: "12px 20px", color: C.muted, fontSize: 12, fontFamily: "monospace" }}>
                    {p.account_name}
                  </td>
                  <td style={{ padding: "12px 20px" }}>
                    <Badge verified={p.status === "approved"} status={p.status} />
                  </td>
                  <td style={{ padding: "12px 20px", color: C.muted, fontSize: 11, fontFamily: "monospace" }}>
                    {new Date(p.submitted_at).toLocaleDateString("en-GB", {
                      day: "2-digit", month: "short", year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div
          style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 14, padding: 40, textAlign: "center",
            color: C.dimmed, fontFamily: "monospace", fontSize: 13,
          }}
        >
          No submissions yet. Use &quot;Verify Link&quot; to add your first.
        </div>
      )}
    </div>
  );
}