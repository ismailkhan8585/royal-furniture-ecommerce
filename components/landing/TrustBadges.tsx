import {
  TreeDeciduous,
  Truck,
  Shield,
  MessageCircle,
  CreditCard,
  Wrench,
} from 'lucide-react';
import { TRUST_BADGES } from '@/lib/constants';

const iconMap = {
  tree: TreeDeciduous,
  truck: Truck,
  shield: Shield,
  'message-circle': MessageCircle,
  'credit-card': CreditCard,
  wrench: Wrench,
};

export function TrustBadges() {
  return (
    <section className="bg-walnut-700 py-5 text-white sm:py-4">
      <div className="container-wide">
        <div className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {TRUST_BADGES.map((badge) => {
            const Icon = iconMap[badge.icon as keyof typeof iconMap];
            return (
              <div
                key={badge.title}
                className="flex min-h-[72px] min-w-0 items-center gap-2.5 rounded-lg bg-white/5 px-3 py-3 sm:gap-3 lg:min-h-0 lg:bg-transparent lg:py-2"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-walnut-600">
                  {Icon && <Icon className="h-5 w-5 text-gold-400" />}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-snug text-white">
                    {badge.title}
                  </p>
                  <p className="mt-0.5 text-xs leading-snug text-walnut-100 sm:text-walnut-300">
                    {badge.subtitle}
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
