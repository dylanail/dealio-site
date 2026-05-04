import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dealio — Better leads. Lower prices. Zero competition.",
  description: "Pay-per-lead acquisition for home services operators. Real leads, warmed and ready — and never sold to anyone else.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
