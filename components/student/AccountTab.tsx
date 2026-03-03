"use client";

import Avatar from "@/components/shared/Avatar";
import { COLORS as C, STUDENT_USER } from "@/lib/data";

export default function AccountTab() {
  const fields: [string, string][] = [
    ["Full Name",      STUDENT_USER.name],
    ["Matric Number",  STUDENT_USER.matric],
    ["Department",     STUDENT_USER.dept],
    ["Level",          STUDENT_USER.level],
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 500 }}>
      <h2 style={{ color: "#e0ecff", fontSize: 20, fontWeight: "bold", margin: 0 }}>
        Account
      </h2>

      <div
        style={{
          background: C.card, border: `1px solid ${C.border}`,
          borderRadius: 14, padding: 24,
        }}
      >
        {/* Profile header */}
        <div
          style={{
            display: "flex", alignItems: "center", gap: 16,
            marginBottom: 24, paddingBottom: 20,
            borderBottom: `1px solid ${C.border2}`,
          }}
        >
          <Avatar name={STUDENT_USER.name} size={56} />
          <div>
            <div style={{ color: "#e0ecff", fontWeight: "bold", fontSize: 18 }}>
              {STUDENT_USER.name}
            </div>
            <div style={{ color: C.muted, fontSize: 13, fontFamily: "monospace" }}>
              {STUDENT_USER.matric}
            </div>
            <div style={{ color: C.dimmed, fontSize: 12, marginTop: 2 }}>
              {STUDENT_USER.dept} · {STUDENT_USER.level}
            </div>
          </div>
        </div>

        {/* Field rows */}
        {fields.map(([label, value]) => (
          <div
            key={label}
            style={{
              display: "flex", justifyContent: "space-between",
              padding: "12px 0", borderBottom: `1px solid ${C.border2}`,
            }}
          >
            <span style={{ color: C.muted, fontSize: 13, fontFamily: "monospace" }}>
              {label}
            </span>
            <span style={{ color: C.text, fontSize: 13 }}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}