import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { ADDRESS, EMAIL, PHONE_NUMBER, WHATSAPP_URL } from '@/lib/constants';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Contact Us',
  description: 'Contact Royal Furniture for orders, custom furniture, and support.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-surface-secondary">
      <section className="bg-walnut-900 py-14 text-white">
        <div className="container-wide">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-gold-300">
            Support
          </p>
          <h1 className="font-display text-4xl font-bold">Contact Us</h1>
          <p className="mt-3 max-w-2xl text-walnut-200">
            Talk to our team about products, pricing, delivery, or a custom furniture request.
          </p>
        </div>
      </section>

      <section className="container-wide py-12">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <a href={`tel:${PHONE_NUMBER}`} className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-walnut-900/5 dark:bg-walnut-950">
            <Phone className="mb-4 h-6 w-6 text-gold-600" />
            <p className="font-semibold">Phone</p>
            <p className="mt-1 text-sm text-walnut-600 dark:text-walnut-400">{PHONE_NUMBER}</p>
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-walnut-900/5 dark:bg-walnut-950">
            <MessageCircle className="mb-4 h-6 w-6 text-green-600" />
            <p className="font-semibold">WhatsApp</p>
            <p className="mt-1 text-sm text-walnut-600 dark:text-walnut-400">Quick response for quotes</p>
          </a>
          <a href={`mailto:${EMAIL}`} className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-walnut-900/5 dark:bg-walnut-950">
            <Mail className="mb-4 h-6 w-6 text-gold-600" />
            <p className="font-semibold">Email</p>
            <p className="mt-1 text-sm text-walnut-600 dark:text-walnut-400">{EMAIL}</p>
          </a>
          <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-walnut-900/5 dark:bg-walnut-950">
            <MapPin className="mb-4 h-6 w-6 text-gold-600" />
            <p className="font-semibold">Showroom</p>
            <p className="mt-1 text-sm text-walnut-600 dark:text-walnut-400">{ADDRESS}</p>
          </div>
        </div>

        <div className="mt-10">
          <Button asChild className="bg-green-500 hover:bg-green-600">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              Message on WhatsApp
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
