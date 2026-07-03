import { Settings } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { formatPrice } from '@/lib/currency';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSettings.findFirst({
    orderBy: { updated_at: 'desc' },
  });

  const rows = settings
    ? [
        ['Store Name', settings.store_name],
        ['Tagline', settings.tagline_en || 'Not set'],
        ['Phone', settings.phone],
        ['WhatsApp', settings.whatsapp],
        ['Email', settings.email],
        ['Address', settings.address],
        ['JazzCash', settings.jazzcash_number || 'Not set'],
        ['Easypaisa', settings.easypaisa_number || 'Not set'],
        ['Bank IBAN', settings.bank_iban || 'Not set'],
        ['Free Delivery From', formatPrice(Number(settings.free_delivery_min))],
        ['Facebook', settings.facebook_url || 'Not set'],
        ['Instagram', settings.instagram_url || 'Not set'],
        ['TikTok', settings.tiktok_url || 'Not set'],
      ]
    : [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-walnut-800 dark:text-walnut-200">
          Settings
        </h1>
        <p className="mt-2 text-walnut-500 dark:text-walnut-400">
          Review website, contact, payment, and admin store settings.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Settings className="h-5 w-5" />
            Website / Admin Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!settings ? (
            <p className="py-8 text-center text-walnut-500">No site settings found.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {rows.map(([label, value]) => (
                <div key={label} className="rounded-lg border p-4">
                  <p className="text-sm text-walnut-500">{label}</p>
                  <p className="mt-1 break-words font-medium text-walnut-800 dark:text-walnut-200">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
