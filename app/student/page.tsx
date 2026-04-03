"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/shared/Sidebar";
import DashboardTab from "@/components/student/DashboardTab";
import VerifyLinkTab from "@/components/student/VerifyLinkTab";
import HistoryTab from "@/components/student/HistoryTab";
import AccountTab from "@/components/student/AccountTab";
import { TabSection } from "@/lib/types";
import { COLORS as C } from "@/lib/data";
import {
  getStudentSession,
  clearSession,
  apiGetMyPayments,
  PaymentRecord,
  StudentUser,
} from "@/lib/api";

// ── Icons ───────────────────────────────────────────────────────────────────
const GridIcon  = () => <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><rect x="2" y="2" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="2" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><rect x="2" y="9" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="9" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.4"/></svg>;
const LinkIcon  = () => <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M6.5 9.5a3.5 3.5 0 005 0l2-2a3.5 3.5 0 00-5-5L7 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M9.5 6.5a3.5 3.5 0 00-5 0l-2 2a3.5 3.5 0 005 5L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
const ListIcon  = () => <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M5 4h8M5 8h8M5 12h8M2 4h.5M2 8h.5M2 12h.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
const UserIcon  = () => <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.4"/><path d="M2.5 13c0-3.038 2.462-5 5.5-5s5.5 1.962 5.5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>;
const MenuIcon  = () => <svg width="18" height="18" fill="none" viewBox="0 0 18 18"><rect x="2" y="4" width="14" height="1.5" rx=".75" fill="currentColor"/><rect x="2" y="8.25" width="14" height="1.5" rx=".75" fill="currentColor"/><rect x="2" y="12.5" width="14" height="1.5" rx=".75" fill="currentColor"/></svg>;

const TABS: TabSection[] = [
  {
    section: "Main",
    items: [{ id: "dashboard", label: "Dashboard", icon: <GridIcon /> }],
  },
  {
    section: "Payments",
    items: [
      { id: "verify",  label: "Verify Link", icon: <LinkIcon /> },
      { id: "history", label: "My Records",  icon: <ListIcon /> },
    ],
  },
  {
    section: "Settings",
    items: [{ id: "account", label: "Account", icon: <UserIcon /> }],
  },
];

export default function StudentPage() {
  const router = useRouter();
  const [tab, setTab]           = useState("dashboard");
  const [sideOpen, setSideOpen] = useState(true);
  const [student, setStudent]   = useState<StudentUser | null>(null);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading]   = useState(true);

  // Auth guard + load student + load payments
  useEffect(() => {
    const s = getStudentSession();
    if (!s) {
      router.push("/");
      return;
    }
    setStudent(s);
    loadPayments(s.matric_no);
  }, [router]);

  async function loadPayments(matric_no: string) {
    setLoading(true);
    try {
      const data = await apiGetMyPayments(matric_no);
      setPayments(data);
    } catch {
      // silently fail on initial load
    } finally {
      setLoading(false);
    }
  }

  function handlePaymentAdded(newPayment: PaymentRecord) {
    setPayments((prev) => [newPayment, ...prev]);
  }

  function handleLogout() {
    clearSession();
    router.push("/");
  }

  if (!student) return null; // waiting for auth check

  const sidebarUser = {
    name: student.full_name,
    matric: student.matric_no,
    dept: "Computer Science",
    level: "100 Level",
  };

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
          user={sidebarUser}
          isAdmin={false}
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
          <div
            style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "rgba(34,197,94,.1)", border: "1px solid rgba(34,197,94,.25)",
              borderRadius: 20, padding: "4px 12px",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, boxShadow: `0 0 6px ${C.green}`, display: "inline-block" }} />
            <span style={{ fontSize: 11, color: "#86efac", fontFamily: "monospace" }}>STUDENT</span>
          </div>
          <span style={{ fontSize: 11, color: C.muted, fontFamily: "monospace" }}>
            LASUSTECH IKORODU — PAYMENT PORTAL
          </span>
        </header>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
          {loading ? (
            <div style={{ color: C.muted, fontFamily: "monospace", fontSize: 13 }}>
              Loading…
            </div>
          ) : (
            <>
              {tab === "dashboard" && (
                <DashboardTab
                  student={student}
                  myPayments={payments}
                  onViewAll={() => setTab("history")}
                  onPaymentAdded={handlePaymentAdded}
                />
              )}
              {tab === "verify" && (
                <VerifyLinkTab
                  student={student}
                  payments={payments}
                  onPaymentAdded={handlePaymentAdded}
                />
              )}
              {tab === "history" && (
                <HistoryTab
                  myPayments={payments}
                  onRefresh={() => loadPayments(student.matric_no)}
                />
              )}
              {tab === "account" && <AccountTab student={student} />}
            </>
          )}
        </div>
      </main>
    </div>
  );
}