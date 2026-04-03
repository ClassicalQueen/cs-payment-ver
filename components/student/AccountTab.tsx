"use client";
// components/student/AccountTab.tsx

import Avatar from "@/components/shared/Avatar";
import { COLORS as C } from "@/lib/data";
import { StudentUser } from "@/lib/api";

interface AccountTabProps {
  student: StudentUser;
}

export default function AccountTab({ student }: AccountTabProps) {
  const fields: [string, string][] = [
    ["Full Name",     student.full_name],
    ["Matric Number", student.matric_no],
    ["Department",    "Computer Science"],
    ["Level",         "100 Level"],
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
        <div
          style={{
            display: "flex", alignItems: "center", gap: 16,
            marginBottom: 24, paddingBottom: 20,
            borderBottom: `1px solid ${C.border2}`,
          }}
        >
          <Avatar name={student.full_name} size={56} />
          <div>
            <div style={{ color: "#e0ecff", fontWeight: "bold", fontSize: 18 }}>
              {student.full_name}
            </div>
            <div style={{ color: C.muted, fontSize: 13, fontFamily: "monospace" }}>
              {student.matric_no}
            </div>
            <div style={{ color: C.dimmed, fontSize: 12, marginTop: 2 }}>
              Computer Science · 100 Level
            </div>
          </div>
        </div>

        {fields.map(([label, value]) => (
          <div
            key={label}
            style={{
              display: "flex", justifyContent: "space-between",
              padding: "12px 0", borderBottom: `1px solid ${C.border2}`,
            }}
          >
            <span style={{ color: C.muted, fontSize: 13, fontFamily: "monospace" }}>{label}</span>
            <span style={{ color: C.text, fontSize: 13 }}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}