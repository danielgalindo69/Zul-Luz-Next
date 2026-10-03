import type { ReactNode } from 'react'

type PolicySection = {
  title: string
  content: ReactNode
}

const updated = 'October 3, 2026'

export const termsOfService = {
  eyebrow: 'Legal',
  title: 'Terms of Service',
  intro: 'These Terms govern your use of the Zul Luz website and purchases made through our storefront.',
  lastUpdated: updated,
  sections: [
    {
      title: 'Acceptance of these terms',
      content: <p>By accessing our website or placing an order, you agree to these Terms of Service and to our Privacy, Shipping, and Return policies. If you do not agree, please do not use the website.</p>,
    },
    {
      title: 'Products and availability',
      content: <p>We make reasonable efforts to display product descriptions, colors, prices, and availability accurately. Screen settings may affect how colors appear. Product availability is not guaranteed, and we may limit quantities, correct errors, or discontinue products at any time.</p>,
    },
    {
      title: 'Orders and payment',
      content: <p>Submitting an order is an offer to purchase. We may accept, decline, or cancel an order where permitted by law, including because of inventory issues, suspected fraud, or an error in pricing or product information. Payments are processed securely by our checkout provider; we do not receive or store your full card number.</p>,
    },
    {
      title: 'Shipping and returns',
      content: <p>Shipping timelines, eligibility, and costs are described in our Shipping Policy. Returns and refunds are governed by our Return & Refund Policy. Please review both policies before completing your purchase.</p>,
    },
    {
      title: 'Intellectual property and acceptable use',
      content: <p>The Zul Luz name, website content, product imagery, designs, and trademarks are protected by applicable laws. You may use the site for personal, lawful shopping only. You may not copy, scrape, disrupt, misuse, or attempt to gain unauthorized access to the site or its services.</p>,
    },
    {
      title: 'Contact and changes',
      content: <p>We may update these Terms when our services or legal obligations change. The version posted on this page applies from its last-updated date. Questions can be sent to info@zulluz.shop.</p>,
    },
  ] satisfies PolicySection[],
}

export const privacyPolicy = {
  eyebrow: 'Legal',
  title: 'Privacy Policy',
  intro: 'This policy explains what information Zul Luz collects, why we use it, and the choices available to you.',
  lastUpdated: updated,
  sections: [
    {
      title: 'Information we collect',
      content: <p>Depending on how you use our store, we may collect contact and delivery details, order history, customer-service messages, device and browsing information, and information needed to prevent fraud. Payment details are processed by our payment providers and checkout platform.</p>,
    },
    {
      title: 'How we use information',
      content: <p>We use information to provide the store, process and deliver orders, communicate about purchases, improve the storefront, protect against fraud and abuse, comply with legal obligations, and—where permitted—send marketing communications you can opt out of.</p>,
    },
    {
      title: 'Cookies and similar technologies',
      content: <p>We and service providers may use cookies or similar technologies to keep the store functioning, remember cart activity, measure performance, and protect the checkout. Your browser settings can limit certain cookies, although doing so may affect site functionality.</p>,
    },
    {
      title: 'How information is shared',
      content: <p>We share information only as needed with service providers that help operate the store, including Shopify, payment processors, shipping carriers, analytics providers, and professional advisers. We may also disclose information when required by law or to protect our rights, customers, and services.</p>,
    },
    {
      title: 'Your privacy choices',
      content: <p>You may request access, correction, or deletion of personal information, subject to applicable law and legitimate recordkeeping requirements. To make a request or opt out of marketing, email info@zulluz.shop. We may need to verify your identity before responding.</p>,
    },
    {
      title: 'Policy updates',
      content: <p>We may revise this policy from time to time. We will post the updated version and change the date above when we do.</p>,
    },
  ] satisfies PolicySection[],
}

export const shippingPolicy = {
  eyebrow: 'Store policy',
  title: 'Shipping Policy',
  intro: 'Our current storefront is intended for customers in the United States, including all 50 states.',
  lastUpdated: updated,
  sections: [
    {
      title: 'Processing and delivery',
      content: <p>Orders are generally processed within 1–2 business days, excluding weekends and federal holidays. Delivery estimates shown at checkout are estimates only and begin after the carrier receives the shipment. Carrier delays, weather, and other events outside our control may affect delivery dates.</p>,
    },
    {
      title: 'Shipping costs and methods',
      content: <p>Available shipping methods, delivery estimates, and any applicable shipping charges are shown during checkout before you place your order. Free-shipping promotions, if offered, are subject to their stated requirements and may change or end at any time.</p>,
    },
    {
      title: 'Address accuracy and tracking',
      content: <p>Please review your shipping address before submitting an order. We cannot guarantee changes after an order is placed. When tracking is available, it will be sent to the email address used at checkout after the order ships.</p>,
    },
    {
      title: 'Missing, damaged, or delayed shipments',
      content: <p>If a shipment is damaged, appears lost, or has not arrived within a reasonable period after its estimated date, contact us at info@zulluz.shop with your order number. We will review the situation and work with the carrier where appropriate.</p>,
    },
  ] satisfies PolicySection[],
}

export const returnPolicy = {
  eyebrow: 'Store policy',
  title: 'Return & Refund Policy',
  intro: 'We want you to feel confident in your purchase while protecting the hygiene and safety of every customer.',
  lastUpdated: updated,
  sections: [
    {
      title: 'Return window and condition',
      content: <p>Eligible items may be requested for return within 14 days of delivery. Items must be unworn, unwashed, unused, with original tags and packaging, and in the same condition in which they were received. Proof of purchase is required.</p>,
    },
    {
      title: 'Non-returnable items',
      content: <p>For hygiene reasons, panties, underwear, intimate items, and any item marked final sale are not eligible for return unless they arrive damaged, defective, or incorrect. Gift cards are also non-returnable.</p>,
    },
    {
      title: 'Starting a return',
      content: <p>Email info@zulluz.shop with your order number, the item you wish to return, and the reason for your request. Please wait for return instructions before sending anything back. Returns sent without authorization may not be accepted.</p>,
    },
    {
      title: 'Refunds and exchanges',
      content: <p>After we receive and inspect an approved return, we will notify you of the outcome. Approved refunds are issued to the original payment method; your bank or payment provider may take additional time to post the credit. Shipping charges are non-refundable unless the return is due to our error. We do not currently guarantee direct exchanges; a replacement order may be required.</p>,
    },
    {
      title: 'Damaged or incorrect items',
      content: <p>If your order arrives damaged, defective, or incorrect, contact us promptly and include your order number and clear photos of the item and packaging. Do not discard the item or packaging until we provide instructions.</p>,
    },
  ] satisfies PolicySection[],
}
