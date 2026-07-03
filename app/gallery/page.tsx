import { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';
import { GalleryImage } from '@/lib/database.types';
import { GalleryClient } from './GalleryClient';

export const metadata: Metadata = {
  title: 'Gallery | Royal Furniture',
  description:
    'Browse our showroom gallery and see our delivered furniture across Pakistan. Get inspired for your next furniture purchase.',
};

async function getGalleryImages(): Promise<GalleryImage[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return [];
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase
    .from('gallery_images')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching gallery images:', error);
    return [];
  }

  return data || [];
}

export default async function GalleryPage() {
  const images = await getGalleryImages();
  return <GalleryClient images={images} />;
}
