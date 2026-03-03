import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CS Payment Verification Portal",
  description: "LASUSTECH Ikorodu — Computer Science Department Payment Verification System",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}