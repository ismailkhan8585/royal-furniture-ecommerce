'use client';

import { MessageCircle } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/constants';

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 hover:scale-105 transition-all duration-300 animate-pulse-gentle"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
        <span className="w-2 h-2 bg-green-500 rounded-full" />
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
