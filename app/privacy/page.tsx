export const metadata = {
  title: 'Privacy Policy',
  description: 'Royal Furniture privacy policy.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-surface-secondary">
      <section className="bg-walnut-900 py-14 text-white">
        <div className="container-wide">
          <h1 className="font-display text-4xl font-bold">Privacy Policy</h1>
          <p className="mt-3 max-w-2xl text-walnut-200">
            How Royal Furniture handles customer information.
          </p>
        </div>
      </section>

      <section className="container-wide py-12">
        <div className="max-w-3xl space-y-5 text-walnut-700 dark:text-walnut-300">
          <p>
            We collect only the information needed to process orders, custom requests, payments, delivery, and customer support.
          </p>
          <p>
            Order and contact details are stored securely and used to communicate about your purchase or request. Payment screenshots are used only for payment verification.
          </p>
          <p>
            We do not sell customer information. Third-party services such as payment, hosting, analytics, and image storage may process data needed to operate the website.
          </p>
        </div>
      </section>
    </div>
  );
}
