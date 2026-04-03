"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/shared/Sidebar";
import OverviewTab from "@/components/admin/OverviewTab";
import PaymentListsTab from "@/components/admin/PaymentListsTab";
import VerifyTab from "@/components/admin/VerifyTab";
import { TabSection } from "@/lib/types";
import { COLORS as C, ADMIN_USER } from "@/lib/data";
import {
  getAdminKey,
  clearSession,
  apiAdminGetPayments,
  apiAdminGetPaymentIds,
  apiAdminReviewPayment,
  apiAdminCreatePaymentId,
  apiAdminTogglePaymentId,
  PaymentRecord,
  PaymentIdRecord,
} from "@/lib/api";

// ── Icons ────────────────────────────────────────────────────────────────────
const GridIcon   = () => <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><rect x="2" y="2" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="2" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><rect x="2" y="9" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="9" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.4"/></svg>;
const ListIcon   = () => <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M5 4h8M5 8h8M5 12h8M2 4h.5M2 8h.5M2 12h.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
const ShieldIcon = () => <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M8 2L3 4.5v4C3 11.5 5.5 14 8 14s5-2.5 5-5.5v-4L8 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M5.5 8l2 2 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const MenuIcon   = () => <svg width="18" height="18" fill="none" viewBox="0 0 18 18"><rect x="2" y="4" width="14" height="1.5" rx=".75" fill="currentColor"/><rect x="2" y="8.25" width="14" height="1.5" rx=".75" fill="currentColor"/><rect x="2" y="12.5" width="14" height="1.5" rx=".75" fill="currentColor"/></svg>;

const TABS: TabSection[] = [
  {
    section: "Main",
    items: [
      { id: "overview", label: "Overview",      icon: <GridIcon /> },
      { id: "records",  label: "Payment Lists", icon: <ListIcon /> },
    ],
  },
  {
    section: "Manage",
    items: [
      { id: "verify", label: "Verify Entries", icon: <ShieldIcon /> },
    ],
  },
];

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab]           = useState("overview");
  const [sideOpen, setSideOpen] = useState(true);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [paymentIds, setPaymentIds] = useState<PaymentIdRecord[]>([]);
  const [loading, setLoading]   = useState(true);
  const [activePaymentId, setActivePaymentId] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [allPayments, allIds] = await Promise.all([
        apiAdminGetPayments(),
        apiAdminGetPaymentIds(),
      ]);
      setPayments(allPayments);
      setPaymentIds(allIds);
      if (allIds.length > 0 && !activePaymentId) {
        setActivePaymentId(allIds[0].payment_id);
      }
    } catch {
      // If auth fails, kick back to login
      clearSession();
      router.push("/");
    } finally {
      setLoading(false);
    }
  }, [router, activePaymentId]);

  // Auth guard
  useEffect(() => {
    if (!getAdminKey()) {
      router.push("/");
      return;
    }
    loadData();
  }, [router, loadData]);

  async function handleReview(paymentRowId: number, action: "approved" | "rejected", rejectionReason?: string) {
    try {
      const updated = await apiAdminReviewPayment(paymentRowId, action, rejectionReason);
      setPayments((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update payment.");
    }
  }

  async function handleCreatePaymentId(description: string, amount: number) {
    try {
      const newId = await apiAdminCreatePaymentId({ description, amount });
      setPaymentIds((prev) => [newId, ...prev]);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to create payment ID.");
    }
  }

  async function handleTogglePaymentId(id: number, is_active: boolean) {
    try {
      const updated = await apiAdminTogglePaymentId(id, is_active);
      setPaymentIds((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update payment ID.");
    }
  }

  function handleLogout() {
    clearSession();
    router.push("/");
  }

  return (
    <div
      style={{
        display: "flex", height: "100vh",
        background: C.bg, color: C.text,
        fontFamily: "Georgia,serif", overflow: "hidden",
      }}
    >
      {sideOpen && (
        <Sidebar
          user={ADMIN_USER}
          isAdmin
          tabs={TABS}
          activeTab={tab}
          setActiveTab={setTab}
          onLogout={handleLogout}
        />
      )}

      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Topbar */}
        <header
          style={{
            height: 48, borderBottom: `1px solid ${C.border}`,
            display: "flex", alignItems: "center",
            padding: "0 20px", gap: 12,
            background: C.sidebar, flexShrink: 0,
          }}
        >
          <button
            onClick={() => setSideOpen(!sideOpen)}
            style={{ background: "transparent", border: "none", cursor: "pointer", color: C.muted }}
          >
            <MenuIcon />
          </button>
          <div style={{ flex: 1 }} />
          <button
            onClick={loadData}
            style={{
              background: "transparent", border: `1px solid ${C.border}`,
              borderRadius: 7, padding: "4px 10px",
              color: C.muted, cursor: "pointer",
              fontSize: 11, fontFamily: "monospace",
            }}
          >
            ↻ Refresh
          </button>
          <div
            style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.25)",
              borderRadius: 20, padding: "4px 12px",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.red, boxShadow: `0 0 6px ${C.red}`, display: "inline-block" }} />
            <span style={{ fontSize: 11, color: "#ef8080", fontFamily: "monospace" }}>ADMIN</span>
          </div>
          <span style={{ fontSize: 11, color: C.muted, fontFamily: "monospace" }}>
            LASUSTECH IKORODU — PAYMENT PORTAL
          </span>
        </header>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
          {loading ? (
            <div style={{ color: C.muted, fontFamily: "monospace", fontSize: 13 }}>
              Loading data…
            </div>
          ) : (
            <>
              {tab === "overview" && (
                <OverviewTab
                  payments={payments}
                  paymentIds={paymentIds}
                  onViewAll={() => setTab("verify")}
                />
              )}
              {tab === "records" && (
                <PaymentListsTab
                  paymentIds={paymentIds}
                  payments={payments}
                  onCreatePaymentId={handleCreatePaymentId}
                  onTogglePaymentId={handleTogglePaymentId}
                />
              )}
              {tab === "verify" && (
                <VerifyTab
                  payments={payments}
                  paymentIds={paymentIds}
                  activePaymentId={activePaymentId}
                  onSelectPaymentId={setActivePaymentId}
                  onReview={handleReview}
                />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}