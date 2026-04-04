"use client";
// components/admin/ExportButton.tsx
// Downloads a list of approved students for a given payment ID
// as either CSV (no deps) or Excel (.xlsx via SheetJS from CDN).

import { useState } from "react";
import { PaymentRecord, PaymentIdRecord } from "@/lib/api";
import { COLORS as C } from "@/lib/data";

interface ExportButtonProps {
  paymentId: PaymentIdRecord;
  payments: PaymentRecord[];
  /** Which records to export: "approved" | "all" */
  mode?: "approved" | "all";
}

const DownloadIcon = () => (
  <svg width="13" height="13" fill="none" viewBox="0 0 13 13">
    <path d="M6.5 1v8M3.5 6.5l3 3 3-3M1.5 10.5h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function toCSV(rows: PaymentRecord[], pidRecord: PaymentIdRecord): string {
  const headers = ["S/N", "Full Name", "Matric No", "Account Name", "Status", "Proof URL", "Submitted At"];
  const lines = [
    // Title rows
    [`LASUSTECH CS DEPT — ${pidRecord.description || pidRecord.payment_id}`],
    [`Payment ID: ${pidRecord.payment_id}`, pidRecord.amount ? `Amount: ₦${Number(pidRecord.amount).toLocaleString()}` : ""],
    [`Exported: ${new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}`],
    [],
    headers,
    ...rows.map((r, i) => [
      String(i + 1),
      r.full_name,
      r.matric_no,
      r.account_name,
      r.status.toUpperCase(),
      r.proof_url || "—",
      new Date(r.submitted_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    ]),
  ];
  return lines.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
}

function downloadCSV(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// Minimal type shape we need from SheetJS — avoids requiring the xlsx package
interface XLSXStatic {
  utils: {
    book_new: () => XLSXWorkbook;
    aoa_to_sheet: (data: unknown[][]) => XLSXWorksheet;
    book_append_sheet: (wb: XLSXWorkbook, ws: XLSXWorksheet, name: string) => void;
  };
  writeFile: (wb: XLSXWorkbook, filename: string) => void;
}
interface XLSXWorkbook  { [key: string]: unknown }
interface XLSXWorksheet { [key: string]: unknown; "!cols"?: unknown[]; "!merges"?: unknown[] }

async function downloadExcel(rows: PaymentRecord[], pidRecord: PaymentIdRecord, filename: string) {
  // Dynamically load SheetJS from CDN — no npm install needed
  const XLSX = await new Promise<XLSXStatic>((resolve, reject) => {
    const win = window as Window & { XLSX?: XLSXStatic };
    if (win.XLSX) { resolve(win.XLSX); return; }
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
    script.onload = () => resolve((window as unknown as Window & { XLSX: XLSXStatic }).XLSX);
    script.onerror = reject;
    document.head.appendChild(script);
  });

  const wb = XLSX.utils.book_new();

  // ── Build worksheet data ──────────────────────────────────────────────────
  const wsData: (string | number)[][] = [
    [`LASUSTECH CS DEPT — Payment Verification Export`],
    [`Payment ID: ${pidRecord.payment_id}`, "", `Description: ${pidRecord.description || "—"}`, "", `Amount: ${pidRecord.amount ? "₦" + Number(pidRecord.amount).toLocaleString() : "—"}`],
    [`Exported: ${new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}`, "", `Total Records: ${rows.length}`],
    [],
    ["S/N", "Full Name", "Matric No", "Account Name", "Status", "Submitted At"],
    ...rows.map((r, i) => [
      i + 1,
      r.full_name,
      r.matric_no,
      r.account_name,
      r.status.toUpperCase(),
      new Date(r.submitted_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    ]),
  ];

  const ws = XLSX.utils.aoa_to_sheet(wsData);

  // ── Column widths ─────────────────────────────────────────────────────────
  ws["!cols"] = [
    { wch: 5  },  // S/N
    { wch: 30 },  // Full Name
    { wch: 18 },  // Matric
    { wch: 25 },  // Account Name
    { wch: 12 },  // Status
    { wch: 18 },  // Submitted
  ];

  // ── Merge title row across columns ────────────────────────────────────────
  ws["!merges"] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 5 } }, // Title
  ];

  // ── Style header row (row index 4) ────────────────────────────────────────
  const headerRow = 4; // 0-indexed
  ["A", "B", "C", "D", "E", "F"].forEach((col) => {
    const cellRef = `${col}${headerRow + 1}`;
    const cell = ws[cellRef] as Record<string, unknown> | undefined;
    if (cell) {
      cell.s = {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "1E4DD8" } },
        alignment: { horizontal: "center" },
      };
    }
  });

  // ── Colour status cells ───────────────────────────────────────────────────
  rows.forEach((r, i) => {
    const rowIdx = headerRow + 1 + i + 1;
    const cellRef = `E${rowIdx}`;
    const cell = ws[cellRef] as Record<string, unknown> | undefined;
    if (cell) {
      const colour = r.status === "approved" ? "22C55E" : r.status === "rejected" ? "EF4444" : "F59E0B";
      cell.s = { font: { color: { rgb: colour }, bold: true } };
    }
  });

  XLSX.utils.book_append_sheet(wb, ws, "Payment Records");
  XLSX.writeFile(wb, filename);
}

export default function ExportButton({ paymentId, payments, mode = "approved" }: ExportButtonProps) {
  const [open, setOpen]       = useState(false);
  const [loading, setLoading] = useState<"csv" | "excel" | null>(null);

  const filtered = mode === "approved"
    ? payments.filter((p) => p.payment_id === paymentId.payment_id && p.status === "approved")
    : payments.filter((p) => p.payment_id === paymentId.payment_id);

  const label = mode === "approved" ? "approved" : "all";
  const baseName = `LASUSTECH_CS_${paymentId.payment_id}_${label}_${new Date().toISOString().slice(0, 10)}`;

  async function handleCSV() {
    setLoading("csv");
    const csv = toCSV(filtered, paymentId);
    downloadCSV(csv, `${baseName}.csv`);
    setLoading(null);
    setOpen(false);
  }

  async function handleExcel() {
    setLoading("excel");
    try {
      await downloadExcel(filtered, paymentId, `${baseName}.xlsx`);
    } catch {
      alert("Failed to generate Excel. Try CSV instead.");
    } finally {
      setLoading(null);
      setOpen(false);
    }
  }

  if (filtered.length === 0) {
    return (
      <span style={{ color: C.dimmed, fontSize: 11, fontFamily: "monospace", padding: "5px 10px" }}>
        No {label} records
      </span>
    );
  }

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "6px 12px", borderRadius: 8,
          border: "1px solid rgba(34,197,94,.35)",
          background: "rgba(34,197,94,.08)",
          color: C.green, cursor: "pointer",
          fontSize: 11, fontFamily: "monospace",
        }}
      >
        <DownloadIcon />
        Export ({filtered.length})
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setOpen(false)}
            style={{ position: "fixed", inset: 0, zIndex: 49 }}
          />
          {/* Dropdown */}
          <div
            style={{
              position: "absolute", top: "calc(100% + 6px)", right: 0,
              background: C.card, border: `1px solid ${C.border}`,
              borderRadius: 10, padding: 6, zIndex: 50,
              minWidth: 180, boxShadow: "0 8px 30px rgba(0,0,0,.5)",
            }}
          >
            <div style={{ color: C.dimmed, fontSize: 10, fontFamily: "monospace", padding: "4px 10px 6px", letterSpacing: ".08em", textTransform: "uppercase" }}>
              Download as
            </div>

            <button
              onClick={handleCSV}
              disabled={loading !== null}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 8,
                padding: "8px 12px", borderRadius: 7, border: "none",
                background: "transparent", color: C.text,
                cursor: "pointer", fontSize: 12, fontFamily: "monospace",
                textAlign: "left",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#0a1530")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <span style={{ fontSize: 16 }}>📄</span>
              {loading === "csv" ? "Generating…" : "CSV (.csv)"}
            </button>

            <button
              onClick={handleExcel}
              disabled={loading !== null}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 8,
                padding: "8px 12px", borderRadius: 7, border: "none",
                background: "transparent", color: C.text,
                cursor: "pointer", fontSize: 12, fontFamily: "monospace",
                textAlign: "left",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#0a1530")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <span style={{ fontSize: 16 }}>📊</span>
              {loading === "excel" ? "Generating…" : "Excel (.xlsx)"}
            </button>

            <div style={{ borderTop: `1px solid ${C.border2}`, margin: "4px 0" }} />

            <div style={{ color: C.dimmed, fontSize: 10, fontFamily: "monospace", padding: "4px 10px" }}>
              {filtered.length} {label} student{filtered.length !== 1 ? "s" : ""}
            </div>
          </div>
        </>
      )}
    </div>
  );
}