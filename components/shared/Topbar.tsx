"use client";

import { C, FONT } from "@/lib/constants";

interface TopbarProps {
  isAdmin: boolean;
  onMenuClick: () => void;
}

export default function Topbar({ isAdmin, onMenuClick }: TopbarProps) {
  return (
    <header
      className="flex items-center h-12 px-4 flex-shrink-0 gap-3"
      style={{ background: C.sidebar, borderBottom: `1px solid ${C.border}` }}
    >
      <button
        onClick={onMenuClick}
        className="flex items-center justify-center w-8 h-8 rounded-lg transition-all md:hidden"
        style={{ color: C.muted, background: C.card, border: `1px solid ${C.border}` }}
      >
        <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
          <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      {/* Desktop hamburger - just decorative spacing */}
      <div className="hidden md:block w-8" />

      <div className="flex-1" />

      <span
        className="hidden sm:block text-xs uppercase tracking-widest"
        style={{ color: C.dimmed, fontFamily: FONT.mono }}
      >
        LASUSTECH Ikorodu · Payment Portal
      </span>

      <div
        className="flex items-center gap-2 px-3 py-1 rounded-full text-xs"
        style={{
          background: isAdmin ? C.redBg : C.greenBg,
          border: `1px solid ${isAdmin ? "rgba(217,83,79,0.3)" : "rgba(76,175,130,0.3)"}`,
          color: isAdmin ? C.red : C.green,
          fontFamily: FONT.mono,
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: isAdmin ? C.red : C.green, boxShadow: `0 0 5px ${isAdmin ? C.red : C.green}` }}
        />
        {isAdmin ? "ADMIN" : "STUDENT"}
      </div>
    </header>
  );
}