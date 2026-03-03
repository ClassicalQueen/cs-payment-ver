import { initials } from "@/lib/utils";
import { COLORS as C } from "@/lib/data";

interface AvatarProps {
  name: string;
  size?: number;
}

export default function Avatar({ name, size = 32 }: AvatarProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 8,
        background: "#1a2a50",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.35,
        fontFamily: "monospace",
        color: C.accent,
        fontWeight: "bold",
        flexShrink: 0,
      }}
    >
      {initials(name)}
    </div>
  );
}