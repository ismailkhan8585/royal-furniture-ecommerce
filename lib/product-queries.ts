import { Category, PriceType, Prisma } from '@prisma/client';
import { CATEGORIES } from './constants';
import { serializeProduct } from './db-serializers';
import { prisma } from './prisma';

const validCategories = new Set<string>(Object.values(CATEGORIES));
const validPriceTypes = new Set<string>(['FIXED', 'INQUIRY']);
const validSorts = new Set<string>([
  'featured',
  'newest',
  'price_asc',
  'price_desc',
]);

export type ProductQueryOptions = {
  category?: string | null;
  priceType?: string | null;
  inStockOnly?: boolean;
  materials?: string[];
  search?: string | null;
  priceMin?: number | null;
  priceMax?: number | null;
  sortBy?: string | null;
  take?: number;
};

export function isValidProductCategory(category: string | null | undefined) {
  return !category || validCategories.has(category);
}

export function isValidProductPriceType(priceType: string | null | undefined) {
  return !priceType || priceType === 'ALL' || validPriceTypes.has(priceType);
}

export async function getProducts(options: ProductQueryOptions = {}) {
  const {
    category,
    priceType,
    inStockOnly = false,
    materials = [],
    search,
    priceMin,
    priceMax,
    sortBy,
    take,
  } = options;

  const and: Prisma.ProductWhereInput[] = [];
  const where: Prisma.ProductWhereInput = {
    is_active: true,
  };

  if (category && validCategories.has(category)) {
    where.category = category as Category;
  }

  if (priceType && priceType !== 'ALL' && validPriceTypes.has(priceType)) {
    where.price_type = priceType as PriceType;
  }

  if (inStockOnly) {
    where.stock_type = 'IN_STOCK';
  }

  if (materials.length > 0) {
    where.material = { in: materials };
  }

  if (search) {
    and.push({
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { material: { contains: search, mode: 'insensitive' } },
        { tags: { has: search } },
      ],
    });
  }

  if (priceMin !== null || priceMax !== null) {
    and.push({
      OR: [
        { price_type: 'INQUIRY' },
        {
          price: {
            ...(priceMin !== null && priceMin !== undefined ? { gte: priceMin } : {}),
            ...(priceMax !== null && priceMax !== undefined ? { lte: priceMax } : {}),
          },
        },
      ],
    });
  }

  if (and.length > 0) {
    where.AND = and;
  }

  const safeSort = validSorts.has(sortBy || '') ? sortBy : 'featured';
  const orderBy: Prisma.ProductOrderByWithRelationInput[] =
    safeSort === 'newest'
      ? [{ created_at: 'desc' }]
      : safeSort === 'price_asc'
        ? [{ price: { sort: 'asc', nulls: 'last' } }, { created_at: 'desc' }]
        : safeSort === 'price_desc'
          ? [{ price: { sort: 'desc', nulls: 'last' } }, { created_at: 'desc' }]
          : [{ featured: 'desc' }, { created_at: 'desc' }];

  const products = await prisma.product.findMany({
    where,
    orderBy,
    take: take ?? (search ? 50 : 100),
  });

  return products.map(serializeProduct);
}
