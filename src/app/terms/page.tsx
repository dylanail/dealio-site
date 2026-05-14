import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service · Dealio",
  description:
    "The terms that govern your use of Dealio's website and lead-acquisition services.",
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      updated="May 12, 2026"
    >
      <p>
        These Terms of Service (the &ldquo;Terms&rdquo;) are a binding
        agreement between you and <strong>Dealio LLC</strong>{" "}
        (&ldquo;Dealio,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
        &ldquo;our&rdquo;) governing your use of the Dealio website (the
        &ldquo;Site&rdquo;) and any Dealio products or services that link to
        these Terms (collectively, the &ldquo;Services&rdquo;). By using the
        Services you agree to these Terms and to our{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <h2>1. Eligibility</h2>
      <p>
        You must be at least 18 years old and able to form a binding contract
        to use the Services. If you use the Services on behalf of a business,
        you represent that you have authority to bind that business to these
        Terms.
      </p>

      <h2>2. Account &amp; lead-purchase services</h2>
      <p>
        Dealio sells exclusive, pay-per-lead access to moving-services
        consumer inquiries. Lead pricing, ZIP-code allocation, exclusivity,
        refund
        eligibility, and billing terms are described in the order form or
        operator agreement you sign with us. The Site itself does not
        constitute an offer to sell leads; lead purchases are governed by your
        operator agreement.
      </p>

      <h2>3. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>
          Use the Services to violate any law or third-party right, including
          telemarketing, anti-spam, do-not-call, and consumer-protection laws.
        </li>
        <li>
          Submit false, misleading, or unauthorized information in any form on
          the Site (including a phone number you don&apos;t own).
        </li>
        <li>
          Scrape, copy, or resell leads obtained from Dealio, or share them
          with parties outside your own business.
        </li>
        <li>
          Interfere with or disrupt the Services, attempt to gain unauthorized
          access, or reverse engineer any part of the platform.
        </li>
        <li>
          Use the Services to send unsolicited SMS or email communications to
          consumers we&apos;ve delivered as leads.
        </li>
      </ul>

      <h2>4. SMS messaging</h2>
      <p>
        If you opt in to receive SMS messages from Dealio, your participation
        is governed by our <Link href="/sms-terms">SMS Terms</Link>. Message
        and data rates may apply; message frequency varies; reply{" "}
        <code>STOP</code> to cancel or <code>HELP</code> for help.
      </p>

      <h2>5. Intellectual property</h2>
      <p>
        The Site, including its design, copy, logos, and underlying code, is
        owned by Dealio or its licensors and is protected by intellectual
        property laws. We grant you a limited, non-exclusive, non-transferable
        license to use the Site for its intended purpose. All rights not
        expressly granted are reserved.
      </p>

      <h2>6. Disclaimers</h2>
      <p>
        The Services are provided &ldquo;as is&rdquo; and &ldquo;as
        available.&rdquo; To the maximum extent permitted by law, Dealio
        disclaims all warranties, express or implied, including warranties of
        merchantability, fitness for a particular purpose, and
        non-infringement. We do not warrant that any specific lead will close,
        or that the Services will be uninterrupted or error-free.
      </p>

      <h2>7. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, Dealio&apos;s aggregate
        liability arising from or related to these Terms or the Services will
        not exceed the greater of (a) the amounts you paid Dealio in the 3
        months preceding the claim, or (b) US $100. Dealio is not liable for
        indirect, incidental, special, consequential, or punitive damages,
        including lost profits or lost data, even if advised of the possibility
        of such damages.
      </p>

      <h2>8. Indemnification</h2>
      <p>
        You agree to indemnify and hold Dealio harmless from any claim, loss,
        or expense (including reasonable attorneys&apos; fees) arising out of
        your use of the Services, your breach of these Terms, or your
        violation of any law or third-party right — including, without
        limitation, your communications with consumers delivered as leads.
      </p>

      <h2>9. Termination</h2>
      <p>
        We may suspend or terminate your access to the Services at any time
        if you breach these Terms or if we reasonably believe your use poses
        risk to Dealio, other users, or third parties. You may stop using the
        Services at any time.
      </p>

      <h2>10. Governing law</h2>
      <p>
        These Terms are governed by the laws of the State of Arizona,
        without regard to its conflict-of-laws rules. The exclusive venue
        for disputes arising out of or relating to these Terms is the state
        and federal courts located in Maricopa County, Arizona, and you
        consent to the jurisdiction of those courts.
      </p>

      <h2>11. Changes</h2>
      <p>
        We may update these Terms from time to time. The updated version will
        be posted with a new &ldquo;Last updated&rdquo; date. Continued use of
        the Services after the update constitutes acceptance of the new
        Terms.
      </p>

      <h2>12. Contact</h2>
      <p>
        Dealio LLC — questions about these Terms can be sent to{" "}
        <a href="mailto:hello@trydeal.io">hello@trydeal.io</a>{" "}
        or by phone at <a href="tel:+14804158462">(480) 415-8462</a>.
        Mailing address: Dealio LLC, 9451 E. Becker Lane, Scottsdale, AZ
        85260.
      </p>
    </LegalPage>
  );
}
