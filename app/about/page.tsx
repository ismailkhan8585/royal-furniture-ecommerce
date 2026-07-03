import { BUSINESS_NAME, BUSINESS_TAGLINE, BUSINESS_LOCATION } from '@/lib/constants';

export const metadata = {
  title: 'About Us',
  description:
    'Learn about Royal Furniture and our commitment to quality furniture across Pakistan.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-surface-secondary">
      <section className="bg-walnut-900 py-14 text-white">
        <div className="container-wide">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-gold-300">
            {BUSINESS_TAGLINE}
          </p>
          <h1 className="font-display text-4xl font-bold">About {BUSINESS_NAME}</h1>
          <p className="mt-3 max-w-2xl text-walnut-200">
            Premium furniture crafted for homes, offices, and commercial spaces in {BUSINESS_LOCATION}.
          </p>
        </div>
      </section>

      <section className="container-wide py-12">
        <div className="max-w-3xl space-y-6 text-walnut-700 dark:text-walnut-300">
          <p>
            Royal Furniture helps customers choose durable, comfortable, and elegant pieces for every room. Our catalog includes office furniture, living room sets, bedroom furniture, dining collections, outdoor furniture, and custom-made pieces.
          </p>
          <p>
            We focus on practical design, reliable materials, clear communication, and delivery support so customers can shop with confidence.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {['Quality Materials', 'Custom Orders', 'Nationwide Delivery'].map((item) => (
              <div key={item} className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-walnut-900/5 dark:bg-walnut-950">
                <p className="font-semibold text-walnut-800 dark:text-walnut-100">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
