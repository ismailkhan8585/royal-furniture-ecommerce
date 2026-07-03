import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { Category as PrismaCategory } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { serializeProduct, serializeReview } from '@/lib/db-serializers';
import { ProductDetail } from './ProductDetail';

export const dynamic = 'force-dynamic';

interface Props {
  params: { slug: string };
}

async function getProduct(slug: string) {
  try {
    const product = await prisma.product.findFirst({
      where: {
        slug,
        is_active: true,
      },
    });

    return product ? serializeProduct(product) : null;
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
  }
}

async function getProductExtras(productId: string, category: PrismaCategory) {
  try {
    const [reviews, similarProducts] = await Promise.all([
      prisma.review.findMany({
        where: {
          product_id: productId,
          is_approved: true,
        },
        orderBy: { created_at: 'desc' },
      }),
      prisma.product.findMany({
        where: {
          is_active: true,
          category,
          NOT: { id: productId },
        },
        take: 6,
      }),
    ]);

    return {
      reviews: reviews.map(serializeReview),
      similarProducts: similarProducts.map(serializeProduct),
    };
  } catch (error) {
    console.error('Failed to fetch product extras:', error);
    return { reviews: [], similarProducts: [] };
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} | Royal Furniture`,
    description:
      product.description ||
      `Shop ${product.name} at Royal Furniture. Premium ${product.category.toLowerCase()} furniture with nationwide delivery.`,
    openGraph: {
      title: `${product.name} | Royal Furniture`,
      description: product.description || '',
      images: product.photos.slice(0, 1),
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  const extras = await getProductExtras(product.id, product.category);

  return (
    <ProductDetail
      product={product}
      initialReviews={extras.reviews}
      initialSimilarProducts={extras.similarProducts}
    />
  );
}
