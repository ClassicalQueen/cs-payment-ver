"use client";

import Badge from "@/components/shared/Badge";
import { PaymentEntry, PaymentList } from "@/lib/types";
import { COLORS as C } from "@/lib/data";

interface VerifyTabProps {
  entries: PaymentEntry[];
  lists: PaymentList[];
  activeList: PaymentList;
  onSelectList: (list: PaymentList) => void;
  onToggleVerify: (id: string) => void;
  onDelete: (id: string) => void;
}

const TrashIcon = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
    <path d="M2 4h10M5 4V2.5h4V4M5.5 6.5v4M8.5 6.5v4M3 4l.7 7.5h6.6L11 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TABLE_HEADERS = ["Student", "Matric", "Name on Account", "Status", "Entered At", "Actions"];

export default function VerifyTab({
  entries,
  lists,
  activeList,
  onSelectList,
  onToggleVerify,
  onDelete,
}: VerifyTabProps) {
  const listEntries = entries.filter((e) => e.paymentId === activeList.id);

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

      {/* List filter tabs */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {lists.map((l) => (
          <button
            key={l.id}
            onClick={() => onSelectList(l)}
            style={{
              padding: "7px 14px", borderRadius: 9, border: "1px solid",
              borderColor: activeList.id === l.id ? C.accent : C.border,
              background: activeList.id === l.id ? "#0f1e45" : "transparent",
              color: activeList.id === l.id ? "#a0c4ff" : C.muted,
              fontSize: 12, fontFamily: "monospace", cursor: "pointer",
            }}
          >
            {l.name}{" "}
            <span style={{ opacity: 0.6 }}>
              ({entries.filter((e) => e.paymentId === l.id).length})
            </span>
          </button>
        ))}
      </div>

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
            {listEntries.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  style={{
                    padding: 40, textAlign: "center",
                    color: C.dimmed, fontFamily: "monospace", fontSize: 13,
                  }}
                >
                  No entries for this list.
                </td>
              </tr>
            ) : (
              listEntries.map((e, i) => (
                <tr
                  key={e.id}
                  style={{ borderBottom: i < listEntries.length - 1 ? `1px solid ${C.border2}` : "none" }}
                  onMouseEnter={(ev) => (ev.currentTarget.style.background = "#0a1530")}
                  onMouseLeave={(ev) => (ev.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "13px 18px", color: C.text, fontSize: 13 }}>{e.student}</td>
                  <td style={{ padding: "13px 18px", color: C.accent, fontSize: 12, fontFamily: "monospace" }}>{e.matric}</td>
                  <td style={{ padding: "13px 18px", color: C.muted, fontSize: 12, fontFamily: "monospace" }}>{e.nameOnAccount}</td>
                  <td style={{ padding: "13px 18px" }}><Badge verified={e.isVerified} /></td>
                  <td style={{ padding: "13px 18px", color: C.muted, fontSize: 11, fontFamily: "monospace" }}>{e.enteredAt}</td>
                  <td style={{ padding: "13px 18px" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        onClick={() => onToggleVerify(e.id)}
                        style={{
                          display: "flex", alignItems: "center", gap: 5,
                          padding: "5px 10px", borderRadius: 7, border: "1px solid",
                          borderColor: e.isVerified ? "rgba(239,68,68,.4)" : "rgba(34,197,94,.4)",
                          background: e.isVerified ? "rgba(239,68,68,.1)" : "rgba(34,197,94,.1)",
                          color: e.isVerified ? C.red : C.green,
                          cursor: "pointer", fontSize: 11, fontFamily: "monospace",
                        }}
                      >
                        {e.isVerified ? "✕ Unverify" : "✓ Verify"}
                      </button>
                      <button
                        onClick={() => onDelete(e.id)}
                        style={{
                          padding: "5px 8px", borderRadius: 7,
                          border: "1px solid rgba(239,68,68,.3)",
                          background: "rgba(239,68,68,.08)",
                          color: C.red, cursor: "pointer",
                        }}
                      >
                        <TrashIcon />
                      </button>
                    </div>
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