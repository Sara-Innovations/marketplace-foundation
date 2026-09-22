import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/layout/LegalLayout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | BargainShop" },
      { name: "description", content: "Terms and Conditions for using BargainShop." },
    ],
  }),
  component: TermsPage,
});

const SECTIONS = [
  { id: "introduction", title: "Introduction" },
  { id: "account-registration", title: "Account Registration" },
  { id: "marketplace-services", title: "Marketplace Services" },
  { id: "product-listings", title: "Product Listings" },
  { id: "orders", title: "Orders" },
  { id: "pricing", title: "Pricing" },
  { id: "payments", title: "Payments" },
  { id: "shipping", title: "Shipping & Delivery" },
  { id: "returns", title: "Returns & Refunds" },
  { id: "reviews", title: "Product Reviews" },
  { id: "vendor-responsibilities", title: "Vendor Responsibilities" },
  { id: "customer-responsibilities", title: "Customer Responsibilities" },
  { id: "intellectual-property", title: "Intellectual Property" },
  { id: "prohibited", title: "Prohibited Activities" },
  { id: "limitation", title: "Limitation of Liability" },
  { id: "changes", title: "Changes to Terms" },
  { id: "contact", title: "Contact Information" },
];

function TermsPage() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <LegalLayout title="Terms & Conditions" lastUpdated={currentDate} sections={SECTIONS}>
      <section id="introduction">
        <h2>1. Introduction</h2>
        <p>
          These terms and conditions outline the rules and regulations for the use of BargainShop's
          Website. By accessing this website we assume you accept these terms and conditions. Do not
          continue to use BargainShop if you do not agree to take all of the terms and conditions
          stated on this page.
        </p>
        <p>
          The following terminology applies to these Terms and Conditions, Privacy Statement and
          Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person
          log on this website and compliant to the Company's terms and conditions. "The Company",
          "Ourselves", "We", "Our" and "Us", refers to our Company.
        </p>
      </section>

      <section id="account-registration">
        <h2>2. Account Registration</h2>
        <p>
          To use certain features of the Platform, you must register for an account. You agree to
          provide accurate, current, and complete information during the registration process and to
          update such information to keep it accurate, current, and complete. We reserve the right
          to suspend or terminate your account if any information provided during the registration
          process or thereafter proves to be inaccurate, not current, or incomplete.
        </p>
        <p>
          You are responsible for safeguarding your password. You agree that you will not disclose
          your password to any third party and that you will take sole responsibility for any
          activities or actions under your account, whether or not you have authorized such
          activities or actions.
        </p>
      </section>

      <section id="marketplace-services">
        <h2>3. Marketplace Services</h2>
        <p>
          BargainShop acts as a venue to allow users who comply with these Terms to offer, sell, and
          buy just about anything in a variety of pricing formats and locations. We are not directly
          involved in the transaction between buyers and sellers. As a result, we have no control
          over the quality, safety, morality, or legality of any aspect of the items listed, the
          truth or accuracy of the listings, the ability of sellers to sell items, or the ability of
          buyers to pay for items.
        </p>
      </section>

      <section id="product-listings">
        <h2>4. Product Listings</h2>
        <p>
          Vendors are responsible for the accuracy and content of their product listings. Listings
          must comply with our policies and must not contain any misleading or false information. We
          reserve the right to remove any listing that violates our policies or is otherwise deemed
          inappropriate.
        </p>
      </section>

      <section id="orders">
        <h2>5. Orders</h2>
        <p>
          All orders are subject to acceptance and availability. Once you place an order, you will
          receive an acknowledgment email confirming receipt of your order. This email is only an
          acknowledgment and will not constitute acceptance of your order. A contract between you
          and the vendor will not be formed until we send you a confirmation by email that the goods
          which you ordered have been dispatched to you.
        </p>
      </section>

      <section id="pricing">
        <h2>6. Pricing</h2>
        <p>
          All prices are subject to change without notice. Prices for items may vary based on the
          vendor and availability. We make every effort to ensure that prices are correct, but
          errors may occur. If we discover an error in the price of any goods which you have
          ordered, we will inform you of this as soon as possible and give you the option of
          reconfirming your order at the correct price or cancelling it.
        </p>
      </section>

      <section id="payments">
        <h2>7. Payments</h2>
        <p>
          Payment must be made by one of the methods accepted by the Platform. By providing payment
          information, you represent and warrant that you are authorized to use the designated
          payment method and that you authorize us (or our third-party payment processor) to charge
          your payment method for the total amount of your order (including any applicable taxes and
          other charges).
        </p>
      </section>

      <section id="shipping">
        <h2>8. Shipping & Delivery</h2>
        <p>
          Delivery times and costs are estimated and provided by the vendors. We are not responsible
          for any delays or issues with delivery. Risk of loss and title for items purchased from
          vendors pass to you upon delivery of the items to the carrier.
        </p>
      </section>

      <section id="returns">
        <h2>9. Returns & Refunds</h2>
        <p>
          Returns and refunds are subject to the policies of the individual vendors. Please review
          the vendor's return policy before making a purchase. If you have an issue with an item,
          please contact the vendor directly. We may intervene in disputes between buyers and
          sellers if necessary, but we are not obligated to do so.
        </p>
      </section>

      <section id="reviews">
        <h2>10. Product Reviews</h2>
        <p>
          Users may leave reviews for products they have purchased. Reviews must be honest,
          accurate, and comply with our guidelines. We reserve the right to remove any review that
          violates our policies or is deemed inappropriate.
        </p>
      </section>

      <section id="vendor-responsibilities">
        <h2>11. Vendor Responsibilities</h2>
        <p>
          Vendors must comply with all applicable laws and regulations in relation to their sales.
          Vendors are responsible for accurately describing their items, providing excellent
          customer service, and resolving any issues with buyers in a timely manner.
        </p>
      </section>

      <section id="customer-responsibilities">
        <h2>12. Customer Responsibilities</h2>
        <p>
          Customers must provide accurate information when placing orders and must comply with these
          Terms and the policies of the individual vendors. Customers are expected to communicate
          respectfully with vendors and our support team.
        </p>
      </section>

      <section id="intellectual-property">
        <h2>13. Intellectual Property</h2>
        <p>
          All content included on the Website, such as text, graphics, logos, button icons, images,
          audio clips, digital downloads, data compilations, and software, is the property of
          BargainShop or its content suppliers and protected by international copyright laws. The
          compilation of all content on this site is the exclusive property of BargainShop.
        </p>
      </section>

      <section id="prohibited">
        <h2>14. Prohibited Activities</h2>
        <p>
          You may not use the Platform for any illegal or unauthorized purpose. You must not, in the
          use of the Service, violate any laws in your jurisdiction (including but not limited to
          copyright laws). You must not transmit any worms or viruses or any code of a destructive
          nature.
        </p>
      </section>

      <section id="limitation">
        <h2>15. Limitation of Liability</h2>
        <p>
          In no event shall BargainShop, nor its directors, employees, partners, agents, suppliers,
          or affiliates, be liable for any indirect, incidental, special, consequential or punitive
          damages, including without limitation, loss of profits, data, use, goodwill, or other
          intangible losses, resulting from (i) your access to or use of or inability to access or
          use the Service; (ii) any conduct or content of any third party on the Service; (iii) any
          content obtained from the Service; and (iv) unauthorized access, use or alteration of your
          transmissions or content, whether based on warranty, contract, tort (including negligence)
          or any other legal theory, whether or not we have been informed of the possibility of such
          damage, and even if a remedy set forth herein is found to have failed of its essential
          purpose.
        </p>
      </section>

      <section id="changes">
        <h2>16. Changes to Terms</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any
          time. If a revision is material we will try to provide at least 30 days notice prior to
          any new terms taking effect. What constitutes a material change will be determined at our
          sole discretion.
        </p>
      </section>

      <section id="contact">
        <h2>17. Contact Information</h2>
        <p>Questions about the Terms & Conditions should be sent to us at:</p>
        <p>
          <strong>Email:</strong> legal@bargainshop.com
          <br />
          <strong>Phone:</strong> +880 1234 567890
          <br />
          <strong>Address:</strong> 123 Commerce Avenue, Tech District, Dhaka 1212
        </p>
      </section>
    </LegalLayout>
  );
}
