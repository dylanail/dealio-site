// Single source of truth for Dealio's public-facing business identity.
//
// Behavior:
//  - In production (NODE_ENV === "production") every public-facing field is
//    REQUIRED via env var. If any are missing, importing this module throws,
//    which (intentionally) breaks `next build` and any request that touches
//    a legal page. We never want to ship a placeholder address or phone
//    number to a real user or a TCR / carrier vetter.
//  - In development, missing values fall back to obvious "[CONFIGURE ...]"
//    sentinels so the dev server still runs but the placeholders are
//    impossible to overlook.

type EnvKey =
  | "NEXT_PUBLIC_SITE_URL"
  | "NEXT_PUBLIC_SUPPORT_EMAIL"
  | "NEXT_PUBLIC_COMPLIANCE_EMAIL"
  | "NEXT_PUBLIC_SUPPORT_PHONE"
  | "NEXT_PUBLIC_BUSINESS_ADDRESS_STREET"
  | "NEXT_PUBLIC_BUSINESS_ADDRESS_CITY"
  | "NEXT_PUBLIC_BUSINESS_ADDRESS_REGION"
  | "NEXT_PUBLIC_BUSINESS_ADDRESS_POSTAL"
  | "NEXT_PUBLIC_BUSINESS_ADDRESS_COUNTRY";

const isProd = process.env.NODE_ENV === "production";

const required = (key: EnvKey, devSentinel: string): string => {
  const raw = process.env[key];
  const value = typeof raw === "string" ? raw.trim() : "";
  if (value.length > 0) return value;
  if (isProd) {
    throw new Error(
      `[a2p-config] Missing required env var ${key}. Set it before deploying — ` +
        `Dealio's legal pages, SMS opt-in flow, and welcome messages refuse ` +
        `to render with placeholder data.`,
    );
  }
  return devSentinel;
};

// Detect known-bad defaults that may have slipped through previous deploys —
// e.g., the CT Corporation registered-agent address that thousands of
// Delaware C-corps use only on their incorporation paperwork. Used as a
// belt-and-braces check on top of `required(...)` above.
const PLACEHOLDER_BLOCKLIST = [
  "1209 N Orange",
  "CT Corporation",
  "EXAMPLE",
  "[CONFIGURE",
  "thedealioteam@gmail.com",
];

const reject = (key: EnvKey, value: string): string => {
  for (const needle of PLACEHOLDER_BLOCKLIST) {
    if (value.toLowerCase().includes(needle.toLowerCase())) {
      if (isProd) {
        throw new Error(
          `[a2p-config] Env var ${key} contains a known placeholder ` +
            `("${needle}"). Refusing to render Dealio legal pages with this ` +
            `value. Set a real production value.`,
        );
      }
      // In dev, allow but flag — so the developer sees the warning in logs.
      console.warn(
        `[a2p-config] WARNING: ${key} contains placeholder text "${needle}".`,
      );
    }
  }
  return value;
};

export const BUSINESS = {
  legalName: "Dealio Inc.",
  brandName: "Dealio",
  websiteUrl: reject(
    "NEXT_PUBLIC_SITE_URL",
    required("NEXT_PUBLIC_SITE_URL", "[CONFIGURE NEXT_PUBLIC_SITE_URL]"),
  ),
  supportEmail: reject(
    "NEXT_PUBLIC_SUPPORT_EMAIL",
    required(
      "NEXT_PUBLIC_SUPPORT_EMAIL",
      "[CONFIGURE NEXT_PUBLIC_SUPPORT_EMAIL]",
    ),
  ),
  complianceEmail: reject(
    "NEXT_PUBLIC_COMPLIANCE_EMAIL",
    required(
      "NEXT_PUBLIC_COMPLIANCE_EMAIL",
      "[CONFIGURE NEXT_PUBLIC_COMPLIANCE_EMAIL]",
    ),
  ),
  supportPhone: reject(
    "NEXT_PUBLIC_SUPPORT_PHONE",
    required(
      "NEXT_PUBLIC_SUPPORT_PHONE",
      "[CONFIGURE NEXT_PUBLIC_SUPPORT_PHONE]",
    ),
  ),
  address: {
    street: reject(
      "NEXT_PUBLIC_BUSINESS_ADDRESS_STREET",
      required(
        "NEXT_PUBLIC_BUSINESS_ADDRESS_STREET",
        "[CONFIGURE NEXT_PUBLIC_BUSINESS_ADDRESS_STREET]",
      ),
    ),
    city: reject(
      "NEXT_PUBLIC_BUSINESS_ADDRESS_CITY",
      required(
        "NEXT_PUBLIC_BUSINESS_ADDRESS_CITY",
        "[CONFIGURE NEXT_PUBLIC_BUSINESS_ADDRESS_CITY]",
      ),
    ),
    region: reject(
      "NEXT_PUBLIC_BUSINESS_ADDRESS_REGION",
      required(
        "NEXT_PUBLIC_BUSINESS_ADDRESS_REGION",
        "[CONFIGURE NEXT_PUBLIC_BUSINESS_ADDRESS_REGION]",
      ),
    ),
    postal: reject(
      "NEXT_PUBLIC_BUSINESS_ADDRESS_POSTAL",
      required(
        "NEXT_PUBLIC_BUSINESS_ADDRESS_POSTAL",
        "[CONFIGURE NEXT_PUBLIC_BUSINESS_ADDRESS_POSTAL]",
      ),
    ),
    country: reject(
      "NEXT_PUBLIC_BUSINESS_ADDRESS_COUNTRY",
      required(
        "NEXT_PUBLIC_BUSINESS_ADDRESS_COUNTRY",
        "[CONFIGURE NEXT_PUBLIC_BUSINESS_ADDRESS_COUNTRY]",
      ),
    ),
  },
} as const;

export const formatAddress = () => {
  const a = BUSINESS.address;
  return `${a.street}, ${a.city}, ${a.region} ${a.postal}, ${a.country}`;
};
