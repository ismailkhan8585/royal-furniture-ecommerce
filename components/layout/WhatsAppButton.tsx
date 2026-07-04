'use client';

import { MessageCircle } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/constants';

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[85px] right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-green-600 lg:bottom-6 lg:right-6 lg:h-14 lg:w-14 animate-pulse-gentle"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6 lg:h-7 lg:w-7" />
      <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white lg:h-4 lg:w-4">
        <span className="h-1.5 w-1.5 rounded-full bg-green-500 lg:h-2 lg:w-2" />
      </span>
    </a>
  );
}

export function WhatsAppButtonSmall() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition-colors"
    >
      <MessageCircle className="w-5 h-5" />
      WhatsApp
    </a>
  );
}

export function WhatsAppLink({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
