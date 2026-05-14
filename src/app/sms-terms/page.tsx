import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";

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
        the text-messaging program operated by <strong>Dealio LLC</strong>{" "}
        (&ldquo;Dealio,&rdquo; &ldquo;we,&rdquo; or &ldquo;us&rdquo;). By
        texting a Dealio keyword or providing your mobile number to Dealio in
        any consent flow, you agree to these SMS Terms.
      </p>

      <h2>1. Program description</h2>
      <ul>
        <li>
          <strong>Program name:</strong> Dealio Leads
        </li>
        <li>
          <strong>Program operator:</strong> Dealio LLC
        </li>
        <li>
          <strong>Purpose:</strong> account onboarding, real-time lead
          delivery notifications, billing &amp; account alerts, customer
          support replies, and occasional marketing updates about Dealio
          products.
        </li>
        <li>
          <strong>Audience:</strong> U.S. mobile subscribers (age 18+) who
          have explicitly opted in.
        </li>
      </ul>

      <h2>2. Consent</h2>
      <p>
        You agree to receive recurring SMS text messages from Dealio at the
        mobile number you provided. <strong>Consent is not a condition</strong>{" "}
        of any purchase. We obtain your consent by you texting{" "}
        <code>START</code> or <code>YES</code> to a Dealio short code or long
        code, or through an equivalent verifiable opt-in flow that displays
        these SMS Terms and our <Link href="/privacy">Privacy Policy</Link>.
      </p>
      <p>
        We retain a record of your opt-in, including the exact consent
        language, the time and date, the IP address, the user agent, and the
        URL on which you opted in. This record is kept solely to comply with
        the Telephone Consumer Protection Act (TCPA), CTIA Messaging
        Principles &amp; Best Practices, and carrier requirements for A2P
        10DLC programs.
      </p>

      <h2>3. Message frequency &amp; cost</h2>
      <p>
        Message frequency varies by activity. For marketing traffic, you
        will receive <strong>up to four (4) messages per month</strong>.
        For transactional and account messages — onboarding, lead-delivery
        notifications to opted-in operators, billing alerts, customer
        support replies — you will receive{" "}
        <strong>up to thirty (30) messages per month</strong>.
      </p>
      <p>
        <strong>Message and data rates may apply.</strong> Your wireless
        carrier may charge you for sending and receiving text messages
        according to your plan. Dealio does not charge a separate fee for the
        SMS program itself.
      </p>

      <h2>4. Opt-out (STOP)</h2>
      <p>
        You can cancel the SMS service at any time. Reply <code>STOP</code> to
        any message you receive from Dealio. After you send <code>STOP</code>,
        we&apos;ll send you one final confirmation message and you will not
        receive additional messages from that program. If you want to rejoin,
        text <code>START</code> to the originating number. You may also opt
        out by emailing{" "}
        <a href="mailto:hello@trydeal.io">hello@trydeal.io</a>.
      </p>

      <h2>5. Help (HELP)</h2>
      <p>
        Reply <code>HELP</code> to any Dealio text message for help. You can
        also email{" "}
        <a href="mailto:hello@trydeal.io">hello@trydeal.io</a>
        . Our reply will identify Dealio, restate the opt-out instructions,
        and provide a link to these SMS Terms and our Privacy Policy.
      </p>

      <h2>6. Supported carriers</h2>
      <p>
        The Dealio SMS program is supported on major U.S. carriers
        including AT&amp;T, Verizon Wireless, T-Mobile, UScellular, Boost
        Mobile, Cricket Wireless, Metro by T-Mobile, Google Fi, and most
        other Tier-1 and MVNO carriers.{" "}
        <strong>Carriers are not liable for delayed or undelivered messages.</strong>
      </p>

      <h2>7. Eligibility &amp; accuracy</h2>
      <p>
        You represent that you are at least 18 years old, that the mobile
        number you provided belongs to you (or that you are authorized to
        enroll that number), and that you will notify us promptly if you stop
        using or transfer ownership of that number, so we can remove it from
        the program.
      </p>

      <h2>8. Privacy</h2>
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
        restricted to providing the messaging service to Dealio.
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
        Dealio LLC — questions or complaints about the SMS program can be
        sent to{" "}
        <a href="mailto:hello@trydeal.io">hello@trydeal.io</a>{" "}
        or by phone at{" "}
        <a href="tel:+14804158462">(480) 415-8462</a>. Mailing address:
        Dealio LLC, 9451 E. Becker Lane, Scottsdale, AZ 85260.
      </p>

      <div className="callout">
        <strong>Summary of required disclosures:</strong> Program: Dealio
        Leads · Operator: Dealio LLC · Frequency: up to 4 marketing
        msgs/month plus up to 30 transactional msgs/month · Cost: msg &amp;
        data rates
        may apply · Opt-out: reply <code>STOP</code> · Help: reply{" "}
        <code>HELP</code> or email{" "}
        <a href="mailto:hello@trydeal.io">hello@trydeal.io</a>{" "}
        · Carriers are not liable for delayed or undelivered messages · See{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </div>
    </LegalPage>
  );
}
