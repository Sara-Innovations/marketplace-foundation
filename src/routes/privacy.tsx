import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/layout/LegalLayout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | BargainShop" },
      { name: "description", content: "Privacy Policy for BargainShop." },
    ],
  }),
  component: PrivacyPage,
});

const SECTIONS = [
  { id: "introduction", title: "Introduction" },
  { id: "information-we-collect", title: "Information We Collect" },
  { id: "how-we-use", title: "How We Use Information" },
  { id: "account-info", title: "Account Information" },
  { id: "order-info", title: "Order Information" },
  { id: "payment-info", title: "Payment Information" },
  { id: "cookies", title: "Cookies" },
  { id: "third-party", title: "Third-Party Services" },
  { id: "data-security", title: "Data Security" },
  { id: "data-retention", title: "Data Retention" },
  { id: "user-rights", title: "User Rights" },
  { id: "childrens-privacy", title: "Children's Privacy" },
  { id: "changes", title: "Changes to This Policy" },
  { id: "contact", title: "Contact Us" },
];

function PrivacyPage() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <LegalLayout title="Privacy Policy" lastUpdated={currentDate} sections={SECTIONS}>
      <section id="introduction">
        <h2>1. Introduction</h2>
        <p>
          Welcome to BargainShop. We respect your privacy and are committed to protecting your
          personal data. This privacy policy will inform you as to how we look after your personal
          data when you visit our website (regardless of where you visit it from) and tell you about
          your privacy rights and how the law protects you.
        </p>
        <p>
          This Privacy Policy applies to all products, services, and websites offered by
          BargainShop.
        </p>
      </section>

      <section id="information-we-collect">
        <h2>2. Information We Collect</h2>
        <p>
          We collect information to provide better services to all our users. The information we
          collect includes:
        </p>
        <ul>
          <li>
            <strong>Information you give us:</strong> For example, many of our services require you
            to sign up for a BargainShop Account. When you do, we'll ask for personal information,
            like your name, email address, telephone number, or credit card to store with your
            account.
          </li>
          <li>
            <strong>Information we get from your use of our services:</strong> We collect
            information about the services that you use and how you use them, like when you visit a
            product page or interact with our ads and content.
          </li>
        </ul>
      </section>

      <section id="how-we-use">
        <h2>3. How We Use Information</h2>
        <p>
          We use the information we collect from all our services to provide, maintain, protect and
          improve them, to develop new ones, and to protect BargainShop and our users. We also use
          this information to offer you tailored content – like giving you more relevant search
          results and ads.
        </p>
      </section>

      <section id="account-info">
        <h2>4. Account Information</h2>
        <p>
          When you create an account, you provide us with personal information that includes your
          name and a password. You can also choose to add a phone number or payment information to
          your account. Even if you aren't signed in to a BargainShop Account, you might choose to
          provide us with information — like an email address to receive updates about our services.
        </p>
      </section>

      <section id="order-info">
        <h2>5. Order Information</h2>
        <p>
          When you make a purchase on BargainShop, we collect information about the transaction.
          This includes your payment information, such as your credit or debit card number and other
          card information; other account and authentication information; and billing, shipping and
          contact details.
        </p>
      </section>

      <section id="payment-info">
        <h2>6. Payment Information</h2>
        <p>
          All payment data is encrypted and securely processed by our third-party payment gateways.
          We do not store your full credit card information on our servers. The processing of
          payments will be subject to the terms, conditions and privacy policies of the Payment
          Processor in addition to this Policy.
        </p>
      </section>

      <section id="cookies">
        <h2>7. Cookies</h2>
        <p>
          We use various technologies to collect and store information when you visit a BargainShop
          service, and this may include using cookies or similar technologies to identify your
          browser or device. We also use these technologies to collect and store information when
          you interact with services we offer to our partners, such as advertising services or
          BargainShop features that may appear on other sites.
        </p>
      </section>

      <section id="third-party">
        <h2>8. Third-Party Services</h2>
        <p>
          We do not share personal information with companies, organizations and individuals outside
          of BargainShop unless one of the following circumstances applies:
        </p>
        <ul>
          <li>
            <strong>With your consent:</strong> We will share personal information with companies,
            organizations or individuals outside of BargainShop when we have your consent to do so.
          </li>
          <li>
            <strong>For external processing:</strong> We provide personal information to our
            affiliates or other trusted businesses or persons to process it for us.
          </li>
          <li>
            <strong>For legal reasons:</strong> We will share personal information with companies,
            organizations or individuals outside of BargainShop if we have a good-faith belief that
            access, use, preservation or disclosure of the information is reasonably necessary to
            meet any applicable law, regulation, legal process or enforceable governmental request.
          </li>
        </ul>
      </section>

      <section id="data-security">
        <h2>9. Data Security</h2>
        <p>
          We work hard to protect BargainShop and our users from unauthorized access to or
          unauthorized alteration, disclosure or destruction of information we hold. In particular:
        </p>
        <ul>
          <li>We encrypt many of our services using SSL.</li>
          <li>
            We review our information collection, storage and processing practices, including
            physical security measures, to guard against unauthorized access to systems.
          </li>
          <li>
            We restrict access to personal information to BargainShop employees, contractors and
            agents who need to know that information in order to process it for us, and who are
            subject to strict contractual confidentiality obligations.
          </li>
        </ul>
      </section>

      <section id="data-retention">
        <h2>10. Data Retention</h2>
        <p>
          We retain personal data for as long as necessary to fulfill the purposes we collected it
          for, including for the purposes of satisfying any legal, accounting, or reporting
          requirements. To determine the appropriate retention period for personal data, we consider
          the amount, nature, and sensitivity of the personal data, the potential risk of harm from
          unauthorized use or disclosure of your personal data, the purposes for which we process
          your personal data and whether we can achieve those purposes through other means, and the
          applicable legal requirements.
        </p>
      </section>

      <section id="user-rights">
        <h2>11. User Rights</h2>
        <p>
          Under certain circumstances, you have rights under data protection laws in relation to
          your personal data. These include the right to:
        </p>
        <ul>
          <li>Request access to your personal data.</li>
          <li>Request correction of your personal data.</li>
          <li>Request erasure of your personal data.</li>
          <li>Object to processing of your personal data.</li>
          <li>Request restriction of processing your personal data.</li>
          <li>Request transfer of your personal data.</li>
          <li>Right to withdraw consent.</li>
        </ul>
        <p>If you wish to exercise any of the rights set out above, please contact us.</p>
      </section>

      <section id="childrens-privacy">
        <h2>12. Children's Privacy</h2>
        <p>
          Our website is not intended for children under 13 years of age. No one under age 13 may
          provide any personal information to or on the website. We do not knowingly collect
          personal information from children under 13. If you are under 13, do not use or provide
          any information on this website or on or through any of its features.
        </p>
      </section>

      <section id="changes">
        <h2>13. Changes to This Policy</h2>
        <p>
          Our Privacy Policy may change from time to time. We will not reduce your rights under this
          Privacy Policy without your explicit consent. We will post any privacy policy changes on
          this page and, if the changes are significant, we will provide a more prominent notice
          (including, for certain services, email notification of privacy policy changes).
        </p>
      </section>

      <section id="contact">
        <h2>14. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at:</p>
        <p>
          <strong>Email:</strong> privacy@bargainshop.com
          <br />
          <strong>Phone:</strong> +880 1234 567890
          <br />
          <strong>Address:</strong> 123 Commerce Avenue, Tech District, Dhaka 1212
        </p>
      </section>
    </LegalLayout>
  );
}
