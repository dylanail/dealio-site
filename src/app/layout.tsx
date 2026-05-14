import type { Metadata } from "next";
import Script from "next/script";
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
      <body>
        {children}
        <Script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="6a05ffd30d6444d9d0c29946"
          data-source="WEB_USER"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
