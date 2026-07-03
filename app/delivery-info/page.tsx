import { DELIVERY_FEES, FREE_DELIVERY_THRESHOLD } from '@/lib/constants';
import { formatPrice } from '@/lib/currency';

export const metadata = {
  title: 'Delivery Info',
  description: 'Delivery fees, free delivery threshold, and order handling information.',
};

export default function DeliveryInfoPage() {
  return (
    <div className="min-h-screen bg-surface-secondary">
      <section className="bg-walnut-900 py-14 text-white">
        <div className="container-wide">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-gold-300">
            Shipping
          </p>
          <h1 className="font-display text-4xl font-bold">Delivery Info</h1>
          <p className="mt-3 max-w-2xl text-walnut-200">
            Delivery costs are calculated by city and order value during checkout.
          </p>
        </div>
      </section>

      <section className="container-wide py-12">
        <div className="mb-8 rounded-lg bg-white p-6 shadow-sm ring-1 ring-walnut-900/5 dark:bg-walnut-950">
          <p className="text-lg font-semibold text-walnut-800 dark:text-walnut-100">
            Free delivery on orders over {formatPrice(FREE_DELIVERY_THRESHOLD)}.
          </p>
          <p className="mt-2 text-walnut-600 dark:text-walnut-400">
            Some made-to-order items may require delivery coordination after confirmation.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(DELIVERY_FEES).map(([city, fee]) => (
            <div key={city} className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm ring-1 ring-walnut-900/5 dark:bg-walnut-950">
              <span className="font-medium">{city}</span>
              <span className="text-walnut-600 dark:text-walnut-400">
                {fee === 0 ? 'Free' : formatPrice(fee)}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
