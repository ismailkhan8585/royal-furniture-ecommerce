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
    <section className="py-4 bg-walnut-700 text-white">
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {TRUST_BADGES.map((badge) => {
            const Icon = iconMap[badge.icon as keyof typeof iconMap];
            return (
              <div
                key={badge.title}
                className="flex items-center gap-3 py-2 px-3"
              >
                <div className="w-10 h-10 rounded-full bg-walnut-600 flex items-center justify-center flex-shrink-0">
                  {Icon && <Icon className="w-5 h-5 text-gold-400" />}
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-white">{badge.title}</p>
                  <p className="text-xs text-walnut-300">{badge.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
