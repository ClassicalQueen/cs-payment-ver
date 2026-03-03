"use client";

import { useState } from "react";
import { PaymentEntry, PaymentList } from "@/lib/types";
import { COLORS as C } from "@/lib/data";

interface PaymentListsTabProps {
  lists: PaymentList[];
  entries: PaymentEntry[];
  onCreateList: (name: string, endTime: string) => void;
}

const PlusIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const CopyIcon = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
    <rect x="4" y="3" width="7" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M2.5 4.5H2a1 1 0 00-1 1v6a1 1 0 001 1h7a1 1 0 001-1v-.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

export default function PaymentListsTab({ lists, entries, onCreateList }: PaymentListsTabProps) {
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEnd, setNewEnd] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  function handleCreate() {
    if (!newName.trim()) return;
    onCreateList(newName, newEnd);
    setShowModal(false);
    setNewName("");
    setNewEnd("");
  }

  function handleCopy(id: string) {
    navigator.clipboard.writeText(id).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ color: "#e0ecff", fontSize: 20, fontWeight: "bold", margin: 0 }}>
            Payment Lists
          </h2>
          <p style={{ color: C.muted, fontSize: 13, marginTop: 4, fontFamily: "monospace" }}>
            Create and manage records. Share the ID with students to verify.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            background: `linear-gradient(135deg,${C.accent},${C.accent2})`,
            border: "none", borderRadius: 10, padding: "10px 18px",
            color: "white", cursor: "pointer", fontWeight: "bold",
            fontSize: 13, fontFamily: "monospace",
          }}
        >
          <PlusIcon /> New List
        </button>
      </div>

      {/* Cards grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 14 }}>
        {lists.map((pl) => {
          const cnt = entries.filter((e) => e.paymentId === pl.id).length;
          const vcnt = entries.filter((e) => e.paymentId === pl.id && e.isVerified).length;
          const pct = cnt ? Math.round((vcnt / cnt) * 100) : 0;

          return (
            <div
              key={pl.id}
              style={{
                background: C.card, border: `1px solid ${C.border}`,
                borderRadius: 14, padding: "18px 20px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "#e0ecff", fontWeight: "bold", fontSize: 14, marginBottom: 3 }}>
                    {pl.name}
                  </div>
                  <div style={{ color: C.dimmed, fontSize: 10, fontFamily: "monospace" }}>
                    Created: {pl.createdAt}
                  </div>
                  <div style={{ color: C.dimmed, fontSize: 10, fontFamily: "monospace" }}>
                    Ends: {pl.endTime}
                  </div>
                </div>
                <div
                  style={{
                    background: "rgba(30,77,216,.15)", border: "1px solid rgba(30,77,216,.3)",
                    borderRadius: 8, padding: "4px 8px", color: "#7aa8ff",
                    fontSize: 11, fontFamily: "monospace",
                  }}
                >
                  {cnt} entries
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ height: 4, background: "#1a2a50", borderRadius: 2, marginBottom: 12, overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%", width: `${pct}%`,
                    background: `linear-gradient(90deg,${C.green},#16a34a)`,
                    borderRadius: 2, transition: "width .4s",
                  }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: C.dimmed, fontSize: 11, fontFamily: "monospace" }}>
                  {vcnt}/{cnt} verified
                </span>
                <button
                  onClick={() => handleCopy(pl.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 5,
                    background: "#0f1e45", border: "1px solid #1e3070",
                    borderRadius: 8, padding: "5px 10px", cursor: "pointer",
                    color: copiedId === pl.id ? C.green : C.muted,
                    fontSize: 11, fontFamily: "monospace", transition: "color .2s",
                  }}
                >
                  <CopyIcon /> {copiedId === pl.id ? "Copied!" : pl.id}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* New list modal */}
      {showModal && (
        <div
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,.7)",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50,
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              background: C.card, border: `1px solid ${C.border}`,
              borderRadius: 16, padding: 28, width: 380,
              boxShadow: "0 20px 60px rgba(0,0,0,.8)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ color: "#e0ecff", margin: "0 0 20px", fontSize: 17 }}>
              Create New Payment List
            </h3>

            <label style={{ color: C.muted, fontSize: 11, fontFamily: "monospace", letterSpacing: ".08em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>
              List Name
            </label>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. Departmental Dues"
              style={{
                width: "100%", background: "#080f28", border: `1px solid ${C.border}`,
                borderRadius: 9, color: C.text, padding: "11px 14px",
                fontSize: 13, outline: "none", fontFamily: "Georgia,serif",
                boxSizing: "border-box", marginBottom: 14,
              }}
            />

            <label style={{ color: C.muted, fontSize: 11, fontFamily: "monospace", letterSpacing: ".08em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>
              End Date
            </label>
            <input
              value={newEnd}
              onChange={(e) => setNewEnd(e.target.value)}
              type="date"
              style={{
                width: "100%", background: "#080f28", border: `1px solid ${C.border}`,
                borderRadius: 9, color: C.text, padding: "11px 14px",
                fontSize: 13, outline: "none", fontFamily: "monospace",
                boxSizing: "border-box", marginBottom: 20,
              }}
            />

            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  flex: 1, background: "transparent", border: `1px solid ${C.border}`,
                  borderRadius: 9, padding: "10px", color: C.muted, cursor: "pointer", fontSize: 13,
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                style={{
                  flex: 2, background: `linear-gradient(135deg,${C.accent},${C.accent2})`,
                  border: "none", borderRadius: 9, padding: "10px",
                  color: "white", cursor: "pointer", fontWeight: "bold", fontSize: 13,
                }}
              >
                Create List
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}