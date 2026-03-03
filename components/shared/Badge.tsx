import { COLORS as C } from "@/lib/data";

interface BadgeProps {
  verified: boolean;
}

export default function Badge({ verified }: BadgeProps) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "3px 10px",
        borderRadius: 20,
        background: verified ? "rgba(34,197,94,.12)" : "rgba(239,68,68,.12)",
        color: verified ? C.green : C.red,
        fontSize: 11,
        fontFamily: "monospace",
        border: `1px solid ${verified ? "rgba(34,197,94,.3)" : "rgba(239,68,68,.3)"}`,
      }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: verified ? C.green : C.red,
          display: "inline-block",
        }}
      />
      {verified ? "Verified" : "Pending"}
    </span>
  );
}