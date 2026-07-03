import { Images } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { CATEGORY_LABELS } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SafeImage } from '@/components/shared/SafeImage';

export const dynamic = 'force-dynamic';

export default async function AdminGalleryPage() {
  const images = await prisma.galleryImage.findMany({
    orderBy: [{ sort_order: 'asc' }, { created_at: 'desc' }],
    take: 100,
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-walnut-800 dark:text-walnut-200">
          Gallery
        </h1>
        <p className="mt-2 text-walnut-500 dark:text-walnut-400">
          Manage showroom and project media used across the website gallery.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Images className="h-5 w-5" />
            Gallery / Media Management
          </CardTitle>
          <Badge variant="secondary">{images.length} images</Badge>
        </CardHeader>
        <CardContent>
          {images.length === 0 ? (
            <p className="py-8 text-center text-walnut-500">No gallery images found.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="overflow-hidden rounded-lg border bg-white dark:bg-walnut-950"
                >
                  <div className="relative aspect-[4/3] bg-walnut-100">
                    <SafeImage
                      src={image.image_url}
                      alt={image.caption || 'Gallery image'}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-2 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium text-walnut-800 dark:text-walnut-200">
                        {image.caption || 'Untitled image'}
                      </p>
                      <Badge variant="outline">#{image.sort_order}</Badge>
                    </div>
                    <p className="text-sm text-walnut-500">
                      {image.category ? CATEGORY_LABELS[image.category] : 'All categories'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
