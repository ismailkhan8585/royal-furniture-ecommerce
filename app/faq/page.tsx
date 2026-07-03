export const metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about Royal Furniture orders and services.',
};

const faqs = [
  {
    question: 'Do you make custom furniture?',
    answer:
      'Yes. Use the Custom Orders page to submit measurements, materials, budget, and reference images.',
  },
  {
    question: 'How can I track my order?',
    answer:
      'Use the Track Order page with your order number and phone number.',
  },
  {
    question: 'Are price-on-inquiry products available online?',
    answer:
      'Yes. Contact us through WhatsApp from the product page and our team will confirm pricing and availability.',
  },
  {
    question: 'Do you offer delivery?',
    answer:
      'Yes. Delivery fees are calculated by city, and qualifying orders receive free delivery.',
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-surface-secondary">
      <section className="bg-walnut-900 py-14 text-white">
        <div className="container-wide">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-gold-300">
            Help
          </p>
          <h1 className="font-display text-4xl font-bold">Frequently Asked Questions</h1>
        </div>
      </section>

      <section className="container-wide py-12">
        <div className="max-w-3xl space-y-4">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-walnut-900/5 dark:bg-walnut-950">
              <h2 className="text-lg font-semibold text-walnut-800 dark:text-walnut-100">
                {faq.question}
              </h2>
              <p className="mt-2 text-walnut-600 dark:text-walnut-400">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
