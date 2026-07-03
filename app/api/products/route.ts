import { NextRequest, NextResponse } from 'next/server';
import {
  getProducts,
  isValidProductCategory,
  isValidProductPriceType,
} from '@/lib/product-queries';

export const dynamic = 'force-dynamic';

function parseNumber(value: string | null) {
  if (!value) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const priceType = searchParams.get('priceType');
    const inStockOnly = searchParams.get('inStockOnly') === 'true';
    const materials = searchParams
      .get('materials')
      ?.split(',')
      .map((material) => material.trim())
      .filter(Boolean);
    const search = searchParams.get('search')?.trim();
    const priceMin = parseNumber(searchParams.get('priceMin'));
    const priceMax = parseNumber(searchParams.get('priceMax'));
    const sortBy = searchParams.get('sortBy') || 'featured';

    if (!isValidProductCategory(category)) {
      return NextResponse.json(
        { success: false, error: 'Invalid product category' },
        { status: 400 }
      );
    }

    if (!isValidProductPriceType(priceType)) {
      return NextResponse.json(
        { success: false, error: 'Invalid price type' },
        { status: 400 }
      );
    }

    const products = await getProducts({
      category,
      priceType,
      inStockOnly,
      materials,
      search,
      priceMin,
      priceMax,
      sortBy,
    });

    return NextResponse.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error('Products API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
