import Link from 'next/link';
import { Crown, Facebook, Instagram, Music2, Phone, Mail, MapPin } from 'lucide-react';
import { BUSINESS_NAME, SOCIAL_URLS, EMAIL, ADDRESS, PHONE_NUMBER } from '@/lib/constants';

const shopLinks = [
  { name: 'Office Furniture', href: '/office-furniture' },
  { name: 'Living Room', href: '/living-room' },
  { name: 'Bedroom', href: '/bedroom' },
  { name: 'Dining', href: '/dining' },
  { name: 'Study & Kids', href: '/study-kids' },
  { name: 'Outdoor', href: '/outdoor' },
];

const helpLinks = [
  { name: 'Track Order', href: '/track-order' },
  { name: 'Custom Orders', href: '/custom-orders' },
  { name: 'Delivery Info', href: '/delivery-info' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact Us', href: '/contact' },
];

const companyLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-walnut-900 text-walnut-100">
      {/* Main Footer */}
      <div className="container-wide py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-walnut-500 to-walnut-700" />
                <div className="absolute inset-[3px] rounded-full bg-gradient-to-br from-silver-300 to-silver-500" />
                <Crown className="relative z-10 w-6 h-6 text-walnut-700" />
              </div>
              <div>
                <span className="font-display font-bold text-white text-xl">Royal Furniture</span>
                <p className="text-walnut-400 text-sm">Comfort Meets Class</p>
              </div>
            </div>
            <p className="text-walnut-400 text-sm mb-6 max-w-xs">
              Premium furniture store in Pakistan. Transform your home with our exquisite collection of
              office, living room, bedroom, and dining furniture.
            </p>
            <div className="flex items-center gap-4">
              {SOCIAL_URLS.facebook && (
                <a
                  href={SOCIAL_URLS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-walnut-800 flex items-center justify-center text-walnut-300 hover:bg-walnut-700 hover:text-white transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                  <span className="sr-only">Facebook</span>
                </a>
              )}
              {SOCIAL_URLS.instagram && (
                <a
                  href={SOCIAL_URLS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-walnut-800 flex items-center justify-center text-walnut-300 hover:bg-walnut-700 hover:text-white transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  <span className="sr-only">Instagram</span>
                </a>
              )}
              {SOCIAL_URLS.tiktok && (
                <a
                  href={SOCIAL_URLS.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-walnut-800 flex items-center justify-center text-walnut-300 hover:bg-walnut-700 hover:text-white transition-colors"
                >
                  <Music2 className="w-5 h-5" />
                  <span className="sr-only">TikTok</span>
                </a>
              )}
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h3 className="font-display font-semibold text-white text-lg mb-4">Shop</h3>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-walnut-400 hover:text-gold-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Column */}
          <div>
            <h3 className="font-display font-semibold text-white text-lg mb-4">Help</h3>
            <ul className="space-y-3">
              {helpLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-walnut-400 hover:text-gold-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-display font-semibold text-white text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-walnut-400 hover:text-gold-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-display font-semibold text-white text-lg mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                <span className="text-walnut-400">{ADDRESS}</span>
              </li>
              <li>
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="flex items-center gap-3 text-walnut-400 hover:text-gold-400 transition-colors"
                >
                  <Phone className="w-5 h-5 text-gold-500 flex-shrink-0" />
                  {PHONE_NUMBER}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-3 text-walnut-400 hover:text-gold-400 transition-colors"
                >
                  <Mail className="w-5 h-5 text-gold-500 flex-shrink-0" />
                  {EMAIL}
                </a>
              </li>
            </ul>
            <div className="mt-6 p-4 rounded-lg bg-walnut-800/50">
              <p className="text-sm text-walnut-300 font-medium mb-2">Business Hours</p>
              <p className="text-walnut-400 text-sm">Mon - Sat: 9:00 AM - 8:00 PM</p>
              <p className="text-walnut-400 text-sm">Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-walnut-800">
        <div className="container-wide py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-walnut-500 text-sm text-center md:text-left">
              {currentYear} {BUSINESS_NAME}. All rights reserved.
            </p>
            <p className="text-walnut-500 text-sm flex items-center gap-1">
              Made with <span className="text-red-400">&#10084;</span> in Pakistan
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
