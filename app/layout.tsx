import './globals.css';
import type { Metadata } from 'next';
import {
  Inter,
  JetBrains_Mono,
  Noto_Nastaliq_Urdu,
  Playfair_Display,
} from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from 'next-themes';
import { Navbar, Footer, WhatsAppButton, MobileBottomNav } from '@/components/layout';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-noto-urdu',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Royal Furniture | Comfort Meets Class',
    template: '%s | Royal Furniture',
  },
  description:
    'Premium furniture store in Pakistan. Shop office furniture, sofas, beds, dining sets & custom-made furniture. Quality craftsmanship, nationwide delivery.',
  keywords: [
    'office furniture Pakistan',
    'buy sofa set Pakistan',
    'bedroom furniture Lahore',
    'custom furniture Pakistan',
    'office chairs Pakistan price',
  ],
  authors: [{ name: 'Royal Furniture' }],
  creator: 'Royal Furniture',
  publisher: 'Royal Furniture',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://royalfurniture.pk'),
  openGraph: {
    title: 'Royal Furniture | Comfort Meets Class',
    description:
      'Premium furniture store in Pakistan. Shop office furniture, sofas, beds, dining sets & custom-made furniture.',
    url: 'https://royalfurniture.pk',
    siteName: 'Royal Furniture',
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Royal Furniture | Comfort Meets Class',
    description:
      'Premium furniture store in Pakistan. Shop office furniture, sofas, beds, dining sets & custom-made furniture.',
  },
  robots: {
    index: true,
    follow: true,
  },
  themeColor: '#faf7f2',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${playfairDisplay.variable} ${notoNastaliqUrdu.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="min-h-screen pt-16 pb-24 lg:pt-20 lg:pb-0">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
          <MobileBottomNav />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
