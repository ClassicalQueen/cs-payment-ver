import { COLORS as C } from "@/lib/data";

interface BadgeProps {
  verified: boolean;
  status?: "pending" | "approved" | "rejected";
}

export default function Badge({ verified, status }: BadgeProps) {
  // Derive display from status if provided, else fall back to verified boolean
  const resolvedStatus = status ?? (verified ? "approved" : "pending");

  const config = {
    approved: {
      bg:     "rgba(34,197,94,.12)",
      color:  C.green,
      border: "rgba(34,197,94,.3)",
      dot:    C.green,
      label:  "Approved",
    },
    pending: {
      bg:     "rgba(245,158,11,.12)",
      color:  C.yellow,
      border: "rgba(245,158,11,.3)",
      dot:    C.yellow,
      label:  "Pending",
    },
    rejected: {
      bg:     "rgba(239,68,68,.12)",
      color:  C.red,
      border: "rgba(239,68,68,.3)",
      dot:    C.red,
      label:  "Rejected",
    },
  }[resolvedStatus];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "3px 10px",
        borderRadius: 20,
        background: config.bg,
        color: config.color,
        fontSize: 11,
        fontFamily: "monospace",
        border: `1px solid ${config.border}`,
      }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: config.dot,
          display: "inline-block",
        }}
      />
      {config.label}
    </span>
  );
}