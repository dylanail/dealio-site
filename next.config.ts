import type { NextConfig } from "next";

// Security headers applied to every route. Of note:
//  - frame-ancestors 'none' prevents the /opt-in (and every other) page from
//    being embedded in another site's iframe, so a third party can't display
//    our SMS consent form under their brand and pipe submissions back to us.
//  - X-Content-Type-Options: nosniff and Referrer-Policy follow common
//    hardening defaults.
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'none'",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
