import {
  TreeDeciduous,
  Palette,
  Truck,
  Shield,
  Wrench,
  BadgeDollarSign,
} from 'lucide-react';

const reasons = [
  {
    icon: TreeDeciduous,
    title: 'Premium Quality Materials',
    description: '100% solid wood and premium fabrics for lasting durability',
  },
  {
    icon: Palette,
    title: 'Elegant Designs',
    description: 'Timeless aesthetics that complement any interior style',
  },
  {
    icon: Truck,
    title: 'Nationwide Delivery',
    description: 'Free delivery in major cities, coverage across Pakistan',
  },
  {
    icon: BadgeDollarSign,
    title: 'Best Price Guaranteed',
    description: 'WhatsApp us for unbeatable prices and exclusive deals',
  },
  {
    icon: Wrench,
    title: 'Free Assembly Service',
    description: 'Professional installation included with every purchase',
  },
  {
    icon: Shield,
    title: 'Warranty Included',
    description: '1-2 year warranty on all premium furniture items',
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-12 lg:py-16">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="section-heading mb-2">Why Choose Royal Furniture?</h2>
          <p className="section-subheading">
            Quality, service, and value you can trust
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="flex items-start gap-4 p-6 rounded-xl bg-white dark:bg-walnut-950 border border-walnut-100 dark:border-walnut-800 hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 rounded-full bg-walnut-100 dark:bg-walnut-800 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-7 h-7 text-walnut-700 dark:text-gold-400" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-walnut-800 dark:text-walnut-200 mb-1">
                    {reason.title}
                  </h3>
                  <p className="text-walnut-600 dark:text-walnut-400 text-sm">
                    {reason.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
