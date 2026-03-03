"use client";

import { useState } from "react";
import Avatar from "./Avatar";
import { COLORS as C } from "@/lib/data";
import { TabSection, AdminUser, StudentUser } from "@/lib/types";

interface SidebarProps {
  user: AdminUser | StudentUser;
  isAdmin: boolean;
  tabs: TabSection[];
  activeTab: string;
  setActiveTab: (id: string) => void;
  onLogout: () => void;
}

const LogoutIcon = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
    <path d="M9 7H3m0 0l2-2M3 7l2 2M11 2v10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const ChevronIcon = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
    <path d="M4 5l3 3 3-3" stroke={C.muted} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" fill="none" viewBox="0 0 12 12">
    <path d="M2 6l3 3 5-5" stroke={C.accent} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export default function Sidebar({
  user,
  isAdmin,
  tabs,
  activeTab,
  setActiveTab,
  onLogout,
}: SidebarProps) {
  const [showMenu, setShowMenu] = useState(false);

  const displayName = isAdmin
    ? (user as AdminUser).role
    : (user as StudentUser).matric;

  const subLabel = isAdmin ? (user as AdminUser).role : (user as StudentUser).matric;

  return (
    <aside
      style={{
        width: 260,
        background: C.sidebar,
        borderRight: `1px solid ${C.border}`,
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}
    >
      {/* Department header */}
      <div style={{ padding: "20px 16px 16px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36, height: 36, borderRadius: 8,
              background: `linear-gradient(135deg,${C.accent},${C.accent2})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, color: "#a0c4ff", fontFamily: "monospace", fontWeight: "bold",
            }}
          >
            CS
          </div>
          <div>
            <div style={{ color: "#e0ecff", fontWeight: "bold", fontSize: 13 }}>
              Computer Science
            </div>
            <div style={{ color: C.muted, fontSize: 11, fontFamily: "monospace" }}>
              {isAdmin ? "HOC Dashboard" : "100 Level"}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ padding: "16px 10px", flex: 1 }}>
        {tabs.map((section) => (
          <div key={section.section}>
            <div
              style={{
                color: C.dimmed, fontSize: 10, fontFamily: "monospace",
                letterSpacing: ".12em", textTransform: "uppercase",
                padding: "0 6px", margin: "12px 0 4px",
              }}
            >
              {section.section}
            </div>
            {section.items.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 10,
                  padding: "9px 10px", borderRadius: 8,
                  background: activeTab === item.id ? "#0f1e45" : "transparent",
                  border: "none",
                  color: activeTab === item.id ? "#a0c4ff" : C.muted,
                  cursor: "pointer", fontSize: 13, fontFamily: "Georgia,serif",
                  transition: "all .15s",
                }}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div
        style={{ borderTop: `1px solid ${C.border}`, padding: "12px 14px", position: "relative" }}
      >
        <button
          onClick={() => setShowMenu(!showMenu)}
          style={{
            width: "100%", display: "flex", alignItems: "center", gap: 10,
            background: "transparent", border: "none", cursor: "pointer",
          }}
        >
          <Avatar name={user.name} size={32} />
          <div style={{ textAlign: "left", flex: 1 }}>
            <div style={{ color: "#e0ecff", fontSize: 12, fontWeight: "bold" }}>
              {user.name.split(" ")[0]} {user.name.split(" ")[1]}
            </div>
            <div style={{ color: C.muted, fontSize: 10, fontFamily: "monospace" }}>
              {subLabel}
            </div>
          </div>
          <ChevronIcon />
        </button>

        {showMenu && (
          <div
            style={{
              position: "absolute", bottom: "100%", left: 10, right: 10,
              background: "#0d1635", border: `1px solid ${C.border}`,
              borderRadius: 10, padding: 8, marginBottom: 4,
              boxShadow: "0 -10px 40px rgba(0,0,0,.6)",
            }}
          >
            <button
              onClick={onLogout}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 8,
                padding: "9px 10px", borderRadius: 6,
                background: "transparent", border: "none",
                color: "#ef8080", cursor: "pointer",
                fontSize: 12, fontFamily: "Georgia,serif",
              }}
            >
              <LogoutIcon /> Log out
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}