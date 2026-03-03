import { COLORS as C } from "@/lib/data";

interface StatCardProps {
  label: string;
  value: number;
  sub?: string;
  color?: string;
}

export default function StatCard({ label, value, sub, color }: StatCardProps) {
  return (
    <div
      style={{
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 14,
        padding: "20px 24px",
        borderTop: `3px solid ${color || C.accent}`,
      }}
    >
      <div
        style={{
          color: C.muted,
          fontSize: 11,
          fontFamily: "monospace",
          letterSpacing: ".08em",
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <div
        style={{ color: "#e0ecff", fontSize: 36, fontWeight: "bold", lineHeight: 1 }}
      >
        {value}
      </div>
      {sub && (
        <div
          style={{ color: C.dimmed, fontSize: 11, fontFamily: "monospace", marginTop: 6 }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}