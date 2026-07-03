import { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import { ProductDetail } from './ProductDetail';

interface Props {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error || !product) {
    return null;
  }

  return product;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} | Royal Furniture`,
    description: product.description || `Shop ${product.name} at Royal Furniture. Premium ${product.category.toLowerCase()} furniture with nationwide delivery.`,
    openGraph: {
      title: `${product.name} | Royal Furniture`,
      description: product.description || '',
      images: product.photos.slice(0, 1),
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
