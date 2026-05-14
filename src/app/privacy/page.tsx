import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy · Dealio",
  description:
    "How Dealio LLC collects, uses, shares, and protects your personal information — including phone numbers and SMS consent.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacy Policy"
      updated="May 12, 2026"
    >
      <p>
        This Privacy Policy describes how <strong>Dealio LLC</strong>{" "}
        (&ldquo;Dealio,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;)
        collects, uses, shares, and protects information about you when you
        visit our website, fill out a form, opt in to our SMS program, or
        otherwise interact with us. By using our site or services, you agree to
        the practices described here.
      </p>

      <div className="callout">
        <strong>SMS / A2P 10DLC disclosure.</strong> Mobile information
        collected for Dealio&apos;s own SMS messaging program — including the
        phone numbers of SMS subscribers and the opt-in consent record itself
        — will <strong>never be shared</strong> with third parties or
        affiliates for their marketing or promotional purposes. No mobile
        opt-in data or consent record is sold, rented, or transferred to any
        third party for marketing. This SMS-program data is also excluded
        from any &ldquo;sharing&rdquo; or &ldquo;selling&rdquo; under U.S.
        state privacy laws.
      </div>
      <div className="callout">
        <strong>Separately: consumer quote-request leads.</strong> If you are
        a <em>consumer</em> who submits a moving-quote request through a
        Dealio form or chat (a &ldquo;Lead&rdquo;), your name, phone number,
        and job details will be delivered to a single Dealio operator
        customer who serves your area, so they can contact you about your
        move. This is the entire point of the Lead service and is described
        at the point of submission. That delivery is a separate flow from
        the SMS messaging program described above, and the protections in
        the SMS disclosure apply only to phone numbers given to receive
        SMS from <em>Dealio</em>.
      </div>

      <h2>1. Information we collect</h2>
      <p>We collect the following categories of information:</p>
      <ul>
        <li>
          <strong>Information you give us</strong> — your name, business name,
          email address, mobile phone number, mailing address, service area
          (ZIP codes), and any details you include in a form, email, or call.
        </li>
        <li>
          <strong>SMS opt-in records</strong> — the exact consent language you
          accepted, the date and time you opted in, the IP address and user
          agent of your browser at the time of submission, and the page URL
          where the form was hosted. We retain this record for as long as you
          remain opted in and for at least 5 years after opt-out, to comply
          with TCPA and carrier audit requirements.
        </li>
        <li>
          <strong>Lead and account data</strong> — for operators using our
          platform: company, billing details, lead history, and dispositions.
        </li>
        <li>
          <strong>Automatic data</strong> — device, browser, IP address,
          referring URL, pages viewed, and similar usage data from cookies and
          server logs.
        </li>
      </ul>

      <h2>2. How we use information</h2>
      <ul>
        <li>To provide, operate, and improve our website and services.</li>
        <li>
          To send SMS messages to numbers that have explicitly opted in — see
          our <Link href="/sms-terms">SMS Terms</Link> for the full program
          description, message frequency, and opt-out instructions.
        </li>
        <li>
          To respond to inquiries, deliver leads you&apos;ve purchased, send
          transactional notices (billing, account, security), and provide
          customer support.
        </li>
        <li>
          To send marketing communications about Dealio products where
          permitted by law and where you have opted in.
        </li>
        <li>
          To detect, investigate, and prevent fraud, abuse, and security
          incidents.
        </li>
        <li>To comply with legal obligations and enforce our agreements.</li>
      </ul>

      <h2>3. How we share information</h2>
      <p>We share personal information only as described below:</p>
      <ul>
        <li>
          <strong>Service providers (sub-processors)</strong> — vendors that
          help us run the business: hosting, analytics, email/SMS delivery
          (e.g., a CPaaS such as Twilio), payment processing, and CRM. These
          providers are contractually limited to using the information solely
          to provide services to Dealio.
        </li>
        <li>
          <strong>Operator customers (Lead delivery)</strong> — if you
          submit a request as a <em>consumer looking for a moving-services
          quote</em>, your contact information (name, phone, address, job
          details) is delivered to the one Dealio operator who purchases the
          Lead in your area, so that operator can contact you about your
          move. Each Lead is delivered to a single operator and is not
          resold. This delivery is the purpose of the form and is disclosed
          to you at the point of submission. <strong>Phone numbers
          collected as part of Dealio&apos;s SMS messaging program are
          handled separately and are not shared under this provision</strong>
          {" "}— see the SMS / A2P 10DLC disclosure at the top of this
          Policy.
        </li>
        <li>
          <strong>Legal &amp; safety</strong> — when required by subpoena,
          court order, or applicable law, or where we believe disclosure is
          necessary to protect our rights, your safety, or the safety of
          others.
        </li>
        <li>
          <strong>Corporate transactions</strong> — in connection with a
          merger, acquisition, financing, or sale of assets, subject to the
          confidentiality terms of this Policy.
        </li>
      </ul>
      <p>
        <strong>
          We do not share SMS opt-in data, SMS consent records, or the phone
          numbers of Dealio SMS subscribers with any third party or affiliate
          for that third party&apos;s marketing or promotional purposes. We
          do not sell those phone numbers.
        </strong>{" "}
        Consumer Lead data submitted through a Dealio quote form is delivered
        to a single operator customer as described above; that delivery is
        the service the consumer requested and is disclosed at the point of
        submission.
      </p>

      <h2>4. SMS messaging program</h2>
      <p>
        If you opt in to receive SMS messages from Dealio, you are enrolled in
        the program described in our{" "}
        <Link href="/sms-terms">SMS Terms &amp; Conditions</Link>. Message and
        data rates may apply. Message frequency varies. Reply <code>STOP</code>{" "}
        to any message to opt out, or <code>HELP</code> for help. You can also
        opt out by emailing{" "}
        <a href="mailto:hello@trydeal.io">hello@trydeal.io</a>.
      </p>
      <p>
        Phone numbers and SMS consent records collected for the Dealio SMS
        program are stored solely to deliver the SMS program you signed up
        for and to demonstrate consent if required by carriers or regulators.
        They are not shared, rented, or sold for any third-party marketing
        purpose. This protection applies to SMS-program data; consumer Lead
        submissions are handled under Section 3 above.
      </p>

      <h2>5. Cookies, analytics &amp; third-party widgets</h2>
      <p>
        We use a small number of first-party cookies for essential site
        functionality and aggregate analytics. We do not use cookies to
        build cross-site advertising profiles.
      </p>
      <p>
        Our website embeds a third-party chat / lead-capture widget provided
        by LeadConnector (operated by HighLevel, Inc.). When the widget
        loads, it may set its own cookies or local storage and, if you
        engage with it, will collect the information you submit (such as
        name, phone number, and message) in order to deliver it to Dealio.
        The widget operates under its own privacy notice surfaced inside
        the widget; information you submit to the widget is processed by
        LeadConnector as our service provider and is governed by this
        Privacy Policy and our{" "}
        <Link href="/sms-terms">SMS Terms</Link> once it reaches Dealio.
      </p>
      <p>
        You can disable cookies in your browser, although parts of the site
        and the chat widget may not work as expected.
      </p>

      <h2>6. Data retention</h2>
      <p>
        We retain personal information for as long as needed to provide the
        services, comply with legal and audit obligations (including TCPA /
        10DLC consent records for at least 5 years after opt-out), resolve
        disputes, and enforce our agreements. When information is no longer
        required, we delete or de-identify it.
      </p>

      <h2>7. Your rights</h2>
      <p>
        Depending on where you live, you may have rights to access, correct,
        delete, or port your personal information, to opt out of certain
        processing, and to withdraw consent. To exercise any of these rights,
        contact us using either of the following methods:
      </p>
      <ul>
        <li>
          Email:{" "}
          <a href="mailto:hello@trydeal.io">hello@trydeal.io</a>
        </li>
        <li>
          Phone: <a href="tel:+14804158462">(480) 415-8462</a>
        </li>
      </ul>
      <p>
        You can also write to us at Dealio LLC, 9451 E. Becker Lane,
        Scottsdale, AZ 85260. We will verify your request and respond
        within the time frame required by law.
      </p>
      <p>
        California residents have additional rights under the CCPA/CPRA,
        including the right to know, delete, correct, and limit the use of
        sensitive personal information, and the right not to be discriminated
        against for exercising those rights. Dealio does not &ldquo;sell&rdquo;
        or &ldquo;share&rdquo; personal information as those terms are defined
        under the CCPA.
      </p>

      <h2>8. Children</h2>
      <p>
        Our services and SMS program are intended for users 18 and older. We
        do not knowingly collect personal information from anyone under 18,
        and our SMS program is not directed at minors. If you believe we
        have collected information from someone under 18, contact us and we
        will delete it.
      </p>

      <h2>9. Security</h2>
      <p>
        We use commercially reasonable administrative, technical, and physical
        safeguards to protect your information. No system is perfectly secure,
        and we cannot guarantee absolute security.
      </p>

      <h2>10. International users</h2>
      <p>
        Dealio operates in the United States. If you access our services from
        outside the U.S., you understand that your information will be
        processed in the United States under U.S. law.
      </p>

      <h2>11. Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We&apos;ll post
        the new version with a revised &ldquo;Last updated&rdquo; date. If the
        changes are material, we&apos;ll notify opted-in users by SMS or
        email.
      </p>

      <h2>12. Contact us</h2>
      <p>
        Questions, requests, or complaints? Reach Dealio LLC at:
      </p>
      <ul>
        <li>
          Email:{" "}
          <a href="mailto:hello@trydeal.io">hello@trydeal.io</a>
        </li>
        <li>
          Phone: <a href="tel:+14804158462">(480) 415-8462</a>
        </li>
        <li>Mail: Dealio LLC, 9451 E. Becker Lane, Scottsdale, AZ 85260</li>
      </ul>
    </LegalPage>
  );
}
