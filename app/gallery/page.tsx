import { Metadata } from 'next';
import { GalleryImage } from '@/lib/database.types';
import { serializeGalleryImage } from '@/lib/db-serializers';
import { prisma } from '@/lib/prisma';
import { GalleryClient } from './GalleryClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Gallery | Royal Furniture',
  description:
    'Browse our showroom gallery and see our delivered furniture across Pakistan. Get inspired for your next furniture purchase.',
};

async function getGalleryImages(): Promise<GalleryImage[]> {
  try {
    const images = await prisma.galleryImage.findMany({
      orderBy: { sort_order: 'asc' },
    });

    return images.map(serializeGalleryImage);
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return [];
  }
}

export default async function GalleryPage() {
  const images = await getGalleryImages();
  return <GalleryClient images={images} />;
}
