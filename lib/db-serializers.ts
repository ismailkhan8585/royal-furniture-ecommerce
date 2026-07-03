import type {
  GalleryImage as PrismaGalleryImage,
  Order as PrismaOrder,
  OrderItem as PrismaOrderItem,
  Product as PrismaProduct,
  Review as PrismaReview,
  CustomOrderRequest as PrismaCustomOrderRequest,
  Prisma,
} from '@prisma/client';
import type {
  CustomOrderRequest,
  GalleryImage,
  Order,
  OrderItem,
  Product,
  Review,
} from './database.types';

type DecimalLike = Prisma.Decimal | number | null | undefined;

const money = (value: DecimalLike): number | null =>
  value === null || value === undefined ? null : Number(value);

const date = (value: Date | null | undefined): string | null =>
  value ? value.toISOString() : null;

export function serializeProduct(product: PrismaProduct): Product {
  return {
    ...product,
    price: money(product.price),
    compare_price: money(product.compare_price),
    rating: Number(product.rating),
    created_at: product.created_at.toISOString(),
    updated_at: product.updated_at.toISOString(),
  };
}

export function serializeReview(review: PrismaReview): Review {
  return {
    ...review,
    created_at: review.created_at.toISOString(),
  };
}

export function serializeGalleryImage(image: PrismaGalleryImage): GalleryImage {
  return {
    ...image,
    created_at: image.created_at.toISOString(),
  };
}

export function serializeOrderItem(item: PrismaOrderItem): OrderItem {
  return {
    ...item,
    product_id: item.product_id,
    unit_price: Number(item.unit_price),
    total_price: Number(item.total_price),
  };
}

export function serializeOrder(
  order: PrismaOrder & { items?: PrismaOrderItem[] }
): Order {
  return {
    ...order,
    delivery_fee: Number(order.delivery_fee),
    subtotal: Number(order.subtotal),
    total_amount: Number(order.total_amount),
    estimated_delivery: date(order.estimated_delivery),
    delivered_at: date(order.delivered_at),
    created_at: order.created_at.toISOString(),
    updated_at: order.updated_at.toISOString(),
    items: order.items?.map(serializeOrderItem) ?? [],
  };
}

export function serializeCustomOrderRequest(
  request: PrismaCustomOrderRequest
): CustomOrderRequest {
  return {
    ...request,
    quoted_price: money(request.quoted_price),
    created_at: request.created_at.toISOString(),
    updated_at: request.updated_at.toISOString(),
  };
}
