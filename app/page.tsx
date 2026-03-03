"use client";

import { useState } from "react";

export default function LoginForm() {
  const [surname, setSurname] = useState("");
  const [matricNumber, setMatricNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate async login
    await new Promise((r) => setTimeout(r, 1800));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0f1e] relative overflow-hidden">
      {/* Ambient background orbs */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-[#0d2157] opacity-40 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-[#0a1a4a] opacity-50 blur-[100px] pointer-events-none" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#5b8dee 1px, transparent 1px), linear-gradient(90deg, #5b8dee 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Card */}
      <div className="relative w-full max-w-md mx-4">
        {/* Glow border effect */}
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-[#2a4a9e] via-[#1a2d6b] to-transparent opacity-70 blur-[1px]" />

        <div className="relative bg-[#0d1635] rounded-2xl p-10 shadow-[0_30px_80px_rgba(0,0,0,0.7)] border border-[#1e3070]/60 backdrop-blur-sm">
         {/* Logo / Institution mark */}
<div className="flex flex-col items-center mb-10">
  <div className="mb-5">
    <img
      src="/laslogo.jpg"
      alt="Lagos State University of Science and Technology"
      width={80}
      height={80}
      className="rounded-full shadow-[0_0_30px_rgba(30,77,216,0.4)]"
    />
  </div>
            <h1
              className="text-white text-2xl font-bold tracking-tight"
              style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.02em" }}
            >
              Student Portal
            </h1>
            <p className="text-[#4a6aad] text-sm mt-1 tracking-widest uppercase font-medium"
              style={{ fontFamily: "monospace", fontSize: "0.65rem" }}
            >
              Academic Access System
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Surname field */}
            <div className="group">
              <label
                htmlFor="surname"
                className="block text-xs font-semibold text-[#4a6aad] uppercase tracking-widest mb-2"
                style={{ fontFamily: "monospace" }}
              >
                Surname
              </label>
              <div
                className={`relative rounded-xl transition-all duration-300 ${
                  focused === "surname"
                    ? "shadow-[0_0_0_2px_#1e4dd8,0_0_20px_rgba(30,77,216,0.25)]"
                    : "shadow-[0_0_0_1px_#1e3070]"
                }`}
              >
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="5" r="3" stroke={focused === "surname" ? "#5b8dee" : "#2a4a9e"} strokeWidth="1.5" />
                    <path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke={focused === "surname" ? "#5b8dee" : "#2a4a9e"} strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <input
                  id="surname"
                  type="text"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  onFocus={() => setFocused("surname")}
                  onBlur={() => setFocused(null)}
                  placeholder="Enter your surname"
                  required
                  className="w-full bg-[#080f28] text-white placeholder-[#2a4060] pl-10 pr-4 py-3.5 rounded-xl outline-none text-sm font-medium transition-colors duration-200"
                  style={{ fontFamily: "'Georgia', serif" }}
                />
              </div>
            </div>

            {/* Matric Number field */}
            <div className="group">
              <label
                htmlFor="matric"
                className="block text-xs font-semibold text-[#4a6aad] uppercase tracking-widest mb-2"
                style={{ fontFamily: "monospace" }}
              >
                Matric Number
              </label>
              <div
                className={`relative rounded-xl transition-all duration-300 ${
                  focused === "matric"
                    ? "shadow-[0_0_0_2px_#1e4dd8,0_0_20px_rgba(30,77,216,0.25)]"
                    : "shadow-[0_0_0_1px_#1e3070]"
                }`}
              >
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="2" y="2" width="12" height="12" rx="2" stroke={focused === "matric" ? "#5b8dee" : "#2a4a9e"} strokeWidth="1.5" />
                    <path d="M5 6h6M5 9h4" stroke={focused === "matric" ? "#5b8dee" : "#2a4a9e"} strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <input
                  id="matric"
                  type="text"
                  value={matricNumber}
                  onChange={(e) => setMatricNumber(e.target.value)}
                  onFocus={() => setFocused("matric")}
                  onBlur={() => setFocused(null)}
                  placeholder="e.g. CSC/2021/001"
                  required
                  className="w-full bg-[#080f28] text-white placeholder-[#2a4060] pl-10 pr-4 py-3.5 rounded-xl outline-none text-sm font-medium transition-colors duration-200"
                  style={{ fontFamily: "monospace" }}
                />
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative overflow-hidden rounded-xl py-4 font-bold text-sm tracking-widest uppercase text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(30,77,216,0.5)] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              style={{
                fontFamily: "monospace",
                background: "linear-gradient(135deg, #1e4dd8 0%, #0d2a8a 100%)",
              }}
            >
              {/* Button shimmer */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />

              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Authenticating...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-[#2a4060] text-xs mt-8" style={{ fontFamily: "monospace" }}>
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