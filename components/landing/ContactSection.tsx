import { Phone, MessageCircle, Mail, MapPin, Clock } from 'lucide-react';
import { PHONE_NUMBER, EMAIL, ADDRESS, WHATSAPP_URL, WORKING_HOURS } from '@/lib/constants';

export function ContactSection() {
  return (
    <section className="py-12 lg:py-16 bg-walnut-800 text-white">
      <div className="container-wide">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
            Have a Question? Contact Royal Furniture
          </h2>
          <p className="text-walnut-300 text-lg">
            We&apos;re here to help you find the perfect furniture
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Call */}
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="flex flex-col items-center gap-3 p-6 rounded-xl bg-walnut-700/50 hover:bg-walnut-700 transition-colors"
          >
            <div className="w-14 h-14 rounded-full bg-walnut-600 flex items-center justify-center">
              <Phone className="w-6 h-6 text-gold-400" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-lg">Call Now</p>
              <p className="text-walnut-300">{PHONE_NUMBER}</p>
            </div>
          </a>

          {/* WhatsApp */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 p-6 rounded-xl bg-walnut-700/50 hover:bg-walnut-700 transition-colors"
          >
            <div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-lg">WhatsApp Us</p>
              <p className="text-walnut-300">Quick Response</p>
            </div>
          </a>

          {/* Email */}
          <a
            href={`mailto:${EMAIL}`}
            className="flex flex-col items-center gap-3 p-6 rounded-xl bg-walnut-700/50 hover:bg-walnut-700 transition-colors"
          >
            <div className="w-14 h-14 rounded-full bg-walnut-600 flex items-center justify-center">
              <Mail className="w-6 h-6 text-gold-400" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-lg">Email</p>
              <p className="text-walnut-300">{EMAIL}</p>
            </div>
          </a>

          {/* Address */}
          <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-walnut-700/50">
            <div className="w-14 h-14 rounded-full bg-walnut-600 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-gold-400" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-lg">Visit Showroom</p>
              <p className="text-walnut-300">{ADDRESS}</p>
            </div>
          </div>
        </div>

        {/* Working Hours */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-walnut-300">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span>Mon - Sat: {WORKING_HOURS.weekdays}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span>Sunday: {WORKING_HOURS.sunday}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
