// Single source of truth for Dealio's public-facing business identity.
// Used by legal pages, the SMS opt-in form, the opt-in API, and the footer.
// All values can be overridden at runtime via env vars so that staging /
// production / preview environments can ship different contacts without
// rebuilding the static legal pages.

export const BUSINESS = {
  legalName: "Dealio Inc.",
  brandName: "Dealio",
  websiteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dealio.com",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "support@dealio.com",
  complianceEmail:
    process.env.NEXT_PUBLIC_COMPLIANCE_EMAIL ?? "compliance@dealio.com",
  supportPhone: process.env.NEXT_PUBLIC_SUPPORT_PHONE ?? "+1 (888) 318-3001",
  address: {
    street:
      process.env.NEXT_PUBLIC_BUSINESS_ADDRESS_STREET ??
      "1209 N Orange St, Suite 200",
    city: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS_CITY ?? "Wilmington",
    region: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS_REGION ?? "DE",
    postal: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS_POSTAL ?? "19801",
    country: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS_COUNTRY ?? "USA",
  },
} as const;

export const formatAddress = () => {
  const a = BUSINESS.address;
  return `${a.street}, ${a.city}, ${a.region} ${a.postal}, ${a.country}`;
};
