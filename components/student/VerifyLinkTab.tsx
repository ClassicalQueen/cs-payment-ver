"use client";

import { useState } from "react";
import { PaymentEntry } from "@/lib/types";
import { COLORS as C, STUDENT_USER, PAYMENT_LISTS } from "@/lib/data";
import { formatDate } from "@/lib/utils";

interface VerifyLinkTabProps {
  entries: PaymentEntry[];
  onAddEntry: (entry: PaymentEntry) => void;
}

type VerifyStatus = { ok: boolean; msg: string } | null;

export default function VerifyLinkTab({ entries, onAddEntry }: VerifyLinkTabProps) {
  const [verifyLink, setVerifyLink] = useState("");
  const [nameOnAccount, setNameOnAccount] = useState("");
  const [status, setStatus] = useState<VerifyStatus>(null);

  function handleSubmit() {
    if (!verifyLink.trim() || !nameOnAccount.trim()) {
      setStatus({ ok: false, msg: "Please fill in all fields." });
      return;
    }

    const found = PAYMENT_LISTS.find((r) => verifyLink.trim() === r.id);

    if (found) {
      const alreadyIn = entries.some(
        (e) => e.paymentId === found.id && e.matric === STUDENT_USER.matric
      );
      if (alreadyIn) {
        setStatus({ ok: false, msg: "You have already submitted for this list." });
      } else {
        const newEntry: PaymentEntry = {
          id: "e" + Date.now(),
          paymentId: found.id,
          student: STUDENT_USER.name,
          matric: STUDENT_USER.matric,
          nameOnAccount,
          isVerified: false,
          enteredAt: formatDate(new Date()),
        };
        onAddEntry(newEntry);
        setStatus({ ok: true, msg: `✓ Successfully added to "${found.name}". Awaiting HOC verification.` });
        setVerifyLink("");
        setNameOnAccount("");
      }
    } else {
      setStatus({ ok: false, msg: "✗ Invalid record ID. Please check and try again." });
    }

    setTimeout(() => setStatus(null), 4000);
  }

  const fieldStyle = {
    width: "100%",
    background: "#080f28",
    border: `1px solid ${C.border}`,
    borderRadius: 10,
    color: C.text,
    padding: "12px 16px",
    fontSize: 13,
    outline: "none",
    fontFamily: "Georgia,serif",
    boxSizing: "border-box" as const,
    marginBottom: 16,
  };

  const labelStyle = {
    color: C.muted,
    fontSize: 11,
    fontFamily: "monospace",
    letterSpacing: ".08em",
    textTransform: "uppercase" as const,
    display: "block",
    marginBottom: 6,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 620 }}>
      <div>
        <h2 style={{ color: "#e0ecff", fontSize: 20, fontWeight: "bold", margin: 0 }}>
          Verify a Payment Link
        </h2>
        <p style={{ color: C.muted, fontSize: 13, marginTop: 4, fontFamily: "monospace" }}>
          Your HOC shared a record ID. Paste it below and fill in your details.
        </p>
      </div>

      <div
        style={{
          background: C.card, border: `1px solid ${C.border}`,
          borderRadius: 14, padding: 24,
        }}
      >
        {/* Auto-filled fields */}
        <label style={labelStyle}>Student Full Name (auto)</label>
        <div
          style={{
            ...fieldStyle, color: C.muted,
            fontFamily: "monospace", marginBottom: 16,
          }}
        >
          {STUDENT_USER.name}
        </div>

        <label style={labelStyle}>Matric Number (auto)</label>
        <div
          style={{
            ...fieldStyle, color: C.muted,
            fontFamily: "monospace", marginBottom: 16,
          }}
        >
          {STUDENT_USER.matric}
        </div>

        {/* User inputs */}
        <label style={labelStyle}>Name on Account *</label>
        <input
          value={nameOnAccount}
          onChange={(e) => setNameOnAccount(e.target.value)}
          placeholder="Name on bank account used for payment"
          style={fieldStyle}
        />

        <label style={labelStyle}>Payment ID (from HOC message) *</label>
        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <input
            value={verifyLink}
            onChange={(e) => setVerifyLink(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="e.g. pl-001"
            style={{
              flex: 1, background: "#080f28",
              border: `1px solid ${status?.ok === false ? C.red : C.border}`,
              borderRadius: 10, color: C.text,
              padding: "12px 16px", fontSize: 13,
              outline: "none", fontFamily: "monospace",
            }}
          />
          <button
            onClick={handleSubmit}
            style={{
              background: `linear-gradient(135deg,${C.accent},${C.accent2})`,
              border: "none", borderRadius: 10, padding: "0 24px",
              cursor: "pointer", color: "white",
              fontWeight: "bold", fontSize: 13, fontFamily: "monospace",
            }}
          >
            Submit
          </button>
        </div>

        {status && (
          <div style={{ color: status.ok ? C.green : C.red, fontSize: 12, fontFamily: "monospace", marginBottom: 8 }}>
            {status.msg}
          </div>
        )}

        {/* Helper — shows available IDs in dev/demo */}
        <div
          style={{
            marginTop: 18, padding: "12px 16px",
            background: "rgba(30,77,216,.08)",
            border: "1px solid rgba(30,77,216,.2)", borderRadius: 10,
          }}
        >
          <div style={{ color: "#7aa8ff", fontSize: 12, fontFamily: "monospace", marginBottom: 4 }}>
            ℹ Available record IDs (demo)
          </div>
          {PAYMENT_LISTS.map((l) => (
            <div key={l.id} style={{ color: C.muted, fontSize: 11, fontFamily: "monospace" }}>
              {l.id} → {l.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}