export const metadata = {
  title: 'Terms of Service',
  description: 'Royal Furniture terms of service.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-surface-secondary">
      <section className="bg-walnut-900 py-14 text-white">
        <div className="container-wide">
          <h1 className="font-display text-4xl font-bold">Terms of Service</h1>
          <p className="mt-3 max-w-2xl text-walnut-200">
            Terms for using the Royal Furniture website and placing orders.
          </p>
        </div>
      </section>

      <section className="container-wide py-12">
        <div className="max-w-3xl space-y-5 text-walnut-700 dark:text-walnut-300">
          <p>
            Product availability, delivery timelines, and prices may be confirmed before final order processing.
          </p>
          <p>
            Custom furniture orders depend on approved specifications, material availability, and agreed timelines.
          </p>
          <p>
            Customers are responsible for providing accurate contact, delivery, and payment information.
          </p>
        </div>
      </section>
    </div>
  );
}
