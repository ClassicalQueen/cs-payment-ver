"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { COLORS as C } from "@/lib/data";
import {
  apiStudentLogin,
  apiAdminLogin,
  saveStudentSession,
  saveAdminSession,
} from "@/lib/api";

type Role = "admin" | "student";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole]       = useState<Role>("student");
  const [surname, setSurname] = useState("");
  const [matric, setMatric]   = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [focused, setFocused] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  async function handleSubmit() {
    setError("");

    if (role === "student") {
      if (!surname.trim() || !matric.trim()) {
        setError("Please fill in all fields.");
        return;
      }
      setLoading(true);
      try {
        const student = await apiStudentLogin(surname.trim(), matric.trim());
        saveStudentSession(student);
        router.push("/student");
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Login failed. Check your details.");
      } finally {
        setLoading(false);
      }
    } else {
      // Admin login
      if (!adminKey.trim()) {
        setError("Please enter your admin key.");
        return;
      }
      setLoading(true);
      try {
        const ok = await apiAdminLogin(adminKey.trim());
        if (!ok) throw new Error("Invalid admin key.");
        saveAdminSession(adminKey.trim());
        router.push("/admin");
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Admin login failed.");
      } finally {
        setLoading(false);
      }
    }
  }

  const inputBorder = (id: string) =>
    focused === id
      ? `0 0 0 2px ${C.accent}, 0 0 20px rgba(30,77,216,.25)`
      : `0 0 0 1px ${C.border}`;

  const inputStyle = {
    width: "100%",
    background: "#080f28",
    border: "none",
    outline: "none",
    borderRadius: 12,
    color: "white",
    padding: "13px 16px",
    fontSize: 13,
    fontFamily: "Georgia,serif",
    boxSizing: "border-box" as const,
  };

  const labelStyle = {
    display: "block",
    color: C.muted,
    fontSize: 11,
    fontFamily: "monospace",
    letterSpacing: ".1em",
    textTransform: "uppercase" as const,
    marginBottom: 6,
  };

  return (
    <div
      style={{
        minHeight: "100vh", display: "flex",
        alignItems: "center", justifyContent: "center",
        background: C.bg, fontFamily: "Georgia,serif",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Ambient orbs */}
      <div style={{ position: "absolute", top: "-10%", left: "-5%", width: 500, height: 500, borderRadius: "50%", background: "#0d2157", opacity: 0.4, filter: "blur(120px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-10%", right: "-5%", width: 400, height: 400, borderRadius: "50%", background: "#0a1a4a", opacity: 0.5, filter: "blur(100px)", pointerEvents: "none" }} />
      {/* Grid overlay */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.03, backgroundImage: "linear-gradient(#5b8dee 1px,transparent 1px),linear-gradient(90deg,#5b8dee 1px,transparent 1px)", backgroundSize: "40px 40px" }} />

      <div style={{ position: "relative", width: "100%", maxWidth: 420, margin: "0 16px" }}>
        {/* Glow border */}
        <div style={{ position: "absolute", inset: -1, borderRadius: 20, background: `linear-gradient(135deg,#2a4a9e,#1a2d6b,transparent)`, opacity: 0.7, filter: "blur(1px)" }} />

        <div
          style={{
            position: "relative", background: C.card,
            borderRadius: 20, padding: "36px 32px",
            boxShadow: "0 30px 80px rgba(0,0,0,.7)",
            border: `1px solid rgba(30,48,112,.6)`,
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 28 }}>
            <div style={{ marginBottom: 14 }}>
              <Image
                src="/laslogo.jpg"
                alt="Lagos State University of Science and Technology"
                width={80}
                height={80}
                style={{ borderRadius: "50%", boxShadow: "0 0 30px rgba(30,77,216,.4)" }}
              />
            </div>
            <h1 style={{ color: "white", fontSize: 22, fontWeight: "bold", margin: 0, letterSpacing: "-.02em" }}>
              Student Portal
            </h1>
            <p style={{ color: C.muted, fontSize: 10, marginTop: 4, fontFamily: "monospace", letterSpacing: ".14em", textTransform: "uppercase" }}>
              Academic Access System
            </p>
          </div>

          {/* Role toggle */}
          <div
            style={{
              display: "flex", background: "#080f28",
              border: `1px solid ${C.border}`, borderRadius: 12,
              padding: 4, marginBottom: 22, gap: 4,
            }}
          >
            {(["student", "admin"] as Role[]).map((r) => (
              <button
                key={r}
                onClick={() => { setRole(r); setError(""); }}
                style={{
                  flex: 1, padding: "9px", borderRadius: 9, border: "none",
                  background: role === r ? `linear-gradient(135deg,${C.accent},${C.accent2})` : "transparent",
                  color: role === r ? "white" : C.muted,
                  cursor: "pointer",
                  fontWeight: role === r ? "bold" : "normal",
                  fontSize: 13, fontFamily: "Georgia,serif",
                  transition: "all .2s", textTransform: "capitalize",
                }}
              >
                {r === "admin" ? "HOC / Admin" : "Student"}
              </button>
            ))}
          </div>

          {role === "student" ? (
            <>
              {/* Surname */}
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Surname</label>
                <div style={{ borderRadius: 12, boxShadow: inputBorder("surname"), transition: "box-shadow .2s" }}>
                  <input
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    onFocus={() => setFocused("surname")}
                    onBlur={() => setFocused(null)}
                    placeholder="Enter your surname"
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Matric */}
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Matric Number</label>
                <div style={{ borderRadius: 12, boxShadow: inputBorder("matric"), transition: "box-shadow .2s" }}>
                  <input
                    value={matric}
                    onChange={(e) => setMatric(e.target.value)}
                    onFocus={() => setFocused("matric")}
                    onBlur={() => setFocused(null)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    placeholder="e.g. 250303010001"
                    style={{ ...inputStyle, fontFamily: "monospace" }}
                  />
                </div>
              </div>
            </>
          ) : (
            /* Admin key */
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Admin Key</label>
              <div style={{ borderRadius: 12, boxShadow: inputBorder("adminKey"), transition: "box-shadow .2s" }}>
                <input
                  type="password"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  onFocus={() => setFocused("adminKey")}
                  onBlur={() => setFocused(null)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder="Enter admin key"
                  style={{ ...inputStyle, fontFamily: "monospace" }}
                />
              </div>
            </div>
          )}

          {error && (
            <div style={{ color: C.red, fontSize: 12, fontFamily: "monospace", marginBottom: 10 }}>
              ✕ {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%", padding: "14px", borderRadius: 12, border: "none",
              background: `linear-gradient(135deg,${C.accent},${C.accent2})`,
              color: "white", fontWeight: "bold", fontSize: 13,
              fontFamily: "monospace", letterSpacing: ".08em",
              textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer",
              marginTop: 4, opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>

          <p style={{ textAlign: "center", color: C.dimmed, fontSize: 11, marginTop: 20, fontFamily: "monospace" }}>
            Having trouble?{" "}
            <a href="https://wa.me/2349130222183" className="text-[#4a6aad] hover:text-[#5b8dee] transition-colors underline underline-offset-2">
               Contact HOC
             </a>
          </p>
        </div>
      </div>
    </div>
  );
}