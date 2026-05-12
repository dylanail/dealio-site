import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { BUSINESS, formatAddress } from "@/lib/business";

export const metadata: Metadata = {
  title: "SMS Terms & Conditions · Dealio",
  description:
    "Terms governing Dealio's SMS messaging program: program description, message frequency, charges, opt-out instructions, and supported carriers.",
};

export default function SmsTermsPage() {
  return (
    <LegalPage
      eyebrow="SMS terms"
      title="SMS Terms & Conditions"
      updated="May 12, 2026"
    >
      <p>
        These SMS Terms &amp; Conditions (the &ldquo;SMS Terms&rdquo;) govern
        the text-messaging program operated by{" "}
        <strong>{BUSINESS.legalName}</strong> (&ldquo;Dealio,&rdquo;
        &ldquo;we,&rdquo; or &ldquo;us&rdquo;). By opting in via our{" "}
        <Link href="/opt-in">opt-in form</Link>, by texting a Dealio keyword,
        or by providing your mobile number to Dealio in any other consent
        flow, you agree to these SMS Terms.
      </p>

      <h2>1. Program description</h2>
      <ul>
        <li>
          <strong>Program name:</strong> Dealio Leads
        </li>
        <li>
          <strong>Program operator:</strong> {BUSINESS.legalName}
        </li>
        <li>
          <strong>Operator address:</strong> {formatAddress()}
        </li>
        <li>
          <strong>Operator support:</strong>{" "}
          <a href={`mailto:${BUSINESS.supportEmail}`}>
            {BUSINESS.supportEmail}
          </a>{" "}
          · {BUSINESS.supportPhone}
        </li>
        <li>
          <strong>Purpose:</strong> account onboarding, real-time lead
          delivery notifications, billing &amp; account alerts, customer
          support replies, and marketing messages about Dealio products.
        </li>
        <li>
          <strong>Audience:</strong> U.S. mobile subscribers age 18+ who have
          explicitly opted in.
        </li>
      </ul>

      <h2>2. Consent</h2>
      <p>
        You agree to receive recurring SMS text messages from Dealio at the
        mobile number you provided, <strong>including messages sent using an
        automatic telephone dialing system (ATDS) or other automated
        technology</strong>.{" "}
        <strong>
          Consent to receive marketing texts is not required as a condition of
          purchasing any goods or services.
        </strong>{" "}
        We obtain your consent through an unchecked checkbox on our opt-in
        page that displays these SMS Terms and our{" "}
        <Link href="/privacy">Privacy Policy</Link> at the moment of opt-in,
        by you texting <code>START</code> or <code>YES</code> to a Dealio long
        code or short code, or by an equivalent verifiable opt-in flow.
      </p>
      <p>
        We retain a record of your opt-in — including the exact consent
        language (version-stamped), the time and date, the IP address, the
        user agent, and the URL on which you opted in — solely to comply with
        the Telephone Consumer Protection Act (TCPA), CTIA Messaging
        Principles &amp; Best Practices, and carrier requirements for A2P
        10DLC programs. After opt-in we send a one-time welcome message that
        identifies Dealio, restates the program frequency, repeats STOP/HELP
        instructions, and links to these SMS Terms.
      </p>

      <h2>3. Message frequency &amp; cost</h2>
      <p>
        Message frequency varies by your account activity:
      </p>
      <ul>
        <li>
          <strong>Marketing messages:</strong> up to approximately ten (10) per
          month.
        </li>
        <li>
          <strong>Transactional/account messages:</strong> sent as needed,
          including one text per lead delivered to operators who have opted
          in, plus billing, security, and customer-support replies.
        </li>
      </ul>
      <p>
        <strong>Message and data rates may apply.</strong> Your wireless
        carrier may charge you for sending and receiving text messages
        according to your plan. Dealio does not charge a separate fee for the
        SMS program itself.
      </p>

      <h2>4. Opt-out (STOP and equivalents)</h2>
      <p>
        You can cancel the SMS service at any time. Reply{" "}
        <code>STOP</code>, <code>STOPALL</code>, <code>UNSUBSCRIBE</code>,{" "}
        <code>CANCEL</code>, <code>END</code>, or <code>QUIT</code> to any
        message you receive from Dealio. After we receive any of these
        keywords we&apos;ll send you one final confirmation message and you
        will not receive additional messages from the program. If you want to
        rejoin, sign up again on our <Link href="/opt-in">opt-in page</Link>{" "}
        or text <code>START</code> to the originating number. You may also opt
        out by emailing{" "}
        <a href={`mailto:${BUSINESS.supportEmail}`}>
          {BUSINESS.supportEmail}
        </a>{" "}
        from the address associated with your account, or by writing to us at{" "}
        {formatAddress()}.
      </p>

      <h2>5. Help (HELP)</h2>
      <p>
        Reply <code>HELP</code> (or <code>INFO</code>) to any Dealio text
        message for help. You can also email{" "}
        <a href={`mailto:${BUSINESS.supportEmail}`}>
          {BUSINESS.supportEmail}
        </a>{" "}
        or call {BUSINESS.supportPhone}. Our reply will identify Dealio,
        restate the opt-out instructions, and provide a link to these SMS
        Terms and our Privacy Policy.
      </p>

      <h2>6. Supported carriers</h2>
      <p>
        The Dealio SMS program is supported on major U.S. carriers including
        AT&amp;T, Verizon Wireless, T-Mobile, US Cellular, Boost Mobile,
        Cricket Wireless, MetroPCS / Metro by T-Mobile, Google Fi, Mint
        Mobile, and most other Tier-1 and MVNO carriers.{" "}
        <strong>
          Wireless carriers are not liable for delayed or undelivered
          messages.
        </strong>
      </p>

      <h2>7. Eligibility &amp; accuracy</h2>
      <p>
        You represent that you are at least 18 years old, that the mobile
        number you provided belongs to you (or that you are authorized to
        enroll that number), and that you will notify us promptly if you stop
        using or transfer ownership of that number so we can remove it from
        the program.
      </p>

      <h2>8. Privacy &amp; mobile information sharing</h2>
      <p>
        Our <Link href="/privacy">Privacy Policy</Link> describes how we
        collect, use, and protect your information.{" "}
        <strong>
          Mobile information — including phone numbers and SMS consent — is
          never shared with third parties or affiliates for their marketing or
          promotional purposes.
        </strong>{" "}
        We do use sub-processors (e.g., a CPaaS such as Twilio) to deliver
        messages on our behalf; those sub-processors are contractually
        restricted to providing the messaging service to Dealio and are not
        permitted to use mobile data for their own marketing.
      </p>

      <h2>9. Changes to these SMS Terms</h2>
      <p>
        We may update these SMS Terms from time to time. Material changes will
        be communicated by SMS or email to opted-in subscribers before they
        take effect, and the updated terms will be posted on this page with a
        new &ldquo;Last updated&rdquo; date.
      </p>

      <h2>10. Contact</h2>
      <p>
        {BUSINESS.legalName} — questions or complaints about the SMS program
        can be sent to{" "}
        <a href={`mailto:${BUSINESS.supportEmail}`}>
          {BUSINESS.supportEmail}
        </a>{" "}
        or {BUSINESS.supportPhone}. Postal address: {formatAddress()}.
      </p>

      <div className="callout">
        <strong>Summary of required disclosures:</strong> Program: Dealio
        Leads · Operator: {BUSINESS.legalName} · Frequency: up to ~10
        marketing msgs/month plus transactional msgs triggered by account
        activity · Cost: msg &amp; data rates may apply · Opt-out: reply{" "}
        <code>STOP</code>, <code>STOPALL</code>, <code>UNSUBSCRIBE</code>,{" "}
        <code>CANCEL</code>, <code>END</code>, or <code>QUIT</code> · Help:
        reply <code>HELP</code> or email{" "}
        <a href={`mailto:${BUSINESS.supportEmail}`}>
          {BUSINESS.supportEmail}
        </a>{" "}
        · Carriers are not liable for delayed or undelivered messages · See{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </div>
    </LegalPage>
  );
}
