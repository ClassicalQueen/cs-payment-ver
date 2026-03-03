"use client";

import StatCard from "@/components/shared/StatCard";
import Badge from "@/components/shared/Badge";
import { PaymentEntry, PaymentList } from "@/lib/types";
import { COLORS as C } from "@/lib/data";

interface OverviewTabProps {
  entries: PaymentEntry[];
  lists: PaymentList[];
  onViewAll: () => void;
}

const TABLE_HEADERS = ["Student", "Matric", "List", "Status", "Entered At"];

export default function OverviewTab({ entries, lists, onViewAll }: OverviewTabProps) {
  const verified = entries.filter((e) => e.isVerified).length;
  const pending = entries.filter((e) => !e.isVerified).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h2 style={{ color: "#e0ecff", fontSize: 20, fontWeight: "bold", margin: 0 }}>
          Admin Overview
        </h2>
        <p style={{ color: C.muted, fontSize: 13, marginTop: 4, fontFamily: "monospace" }}>
          Manage payment lists and verify student entries.
        </p>
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
        <StatCard label="Payment Lists" value={lists.length} sub="Active records" color={C.accent} />
        <StatCard label="Total Entries" value={entries.length} sub="Across all lists" color="#7c3aed" />
        <StatCard label="Verified" value={verified} sub={`${Math.round((verified / entries.length) * 100) || 0}% of entries`} color={C.green} />
        <StatCard label="Pending" value={pending} sub="Awaiting review" color={C.yellow} />
      </div>

      {/* Recent entries table */}
      <div
        style={{
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: 14,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "14px 20px",
            borderBottom: `1px solid ${C.border2}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ color: "#e0ecff", fontWeight: "bold", fontSize: 14 }}>
            Recent Entries
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
              {TABLE_HEADERS.map((h) => (
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
            {entries.slice(0, 5).map((e, i) => (
              <tr
                key={e.id}
                style={{ borderBottom: i < 4 ? `1px solid ${C.border2}` : "none" }}
                onMouseEnter={(ev) => (ev.currentTarget.style.background = "#0a1530")}
                onMouseLeave={(ev) => (ev.currentTarget.style.background = "transparent")}
              >
                <td style={{ padding: "12px 20px", color: C.text, fontSize: 13 }}>{e.student}</td>
                <td style={{ padding: "12px 20px", color: C.accent, fontSize: 12, fontFamily: "monospace" }}>{e.matric}</td>
                <td style={{ padding: "12px 20px", color: C.muted, fontSize: 11, fontFamily: "monospace" }}>
                  {lists.find((l) => l.id === e.paymentId)?.name || "—"}
                </td>
                <td style={{ padding: "12px 20px" }}><Badge verified={e.isVerified} /></td>
                <td style={{ padding: "12px 20px", color: C.muted, fontSize: 11, fontFamily: "monospace" }}>{e.enteredAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}