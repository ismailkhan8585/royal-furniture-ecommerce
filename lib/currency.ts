import { CURRENCY_SYMBOL } from './constants';

/**
 * Format a number as PKR currency
 * @param amount - The amount to format (number or string)
 * @param options - Formatting options
 * @returns Formatted currency string
 */
export function formatPrice(
  amount: number | string | null | undefined,
  options: {
    showSymbol?: boolean;
    compact?: boolean;
  } = {}
): string {
  if (amount === null || amount === undefined) return '';

  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (isNaN(numAmount)) return '';

  const { showSymbol = true, compact = false } = options;

  if (compact && numAmount >= 100000) {
    const lakhs = numAmount / 100000;
    return showSymbol
      ? `${CURRENCY_SYMBOL} ${lakhs.toFixed(1)}L`
      : `${lakhs.toFixed(1)}L`;
  }

  const formatted = new Intl.NumberFormat('en-PK', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numAmount);

  return showSymbol ? `${CURRENCY_SYMBOL} ${formatted}` : formatted;
}

/**
 * Format a price range
 */
export function formatPriceRange(
  min: number,
  max: number,
  options: { showSymbol?: boolean } = {}
): string {
  const { showSymbol = true } = options;

  if (min === max) {
    return formatPrice(min, { showSymbol });
  }

  if (showSymbol) {
    return `${CURRENCY_SYMBOL} ${formatPrice(min, { showSymbol: false })} - ${formatPrice(max, { showSymbol: false })}`;
  }

  return `${formatPrice(min, { showSymbol: false })} - ${formatPrice(max, { showSymbol: false })}`;
}

/**
 * Parse a price string to number
 */
export function parsePrice(priceString: string): number {
  const cleaned = priceString.replace(/[^\d.-]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Calculate delivery fee based on city and order total
 */
export function calculateDeliveryFee(
  city: string,
  orderTotal: number,
  deliveryFees: Record<string, number>,
  freeThreshold: number
): number {
  if (orderTotal >= freeThreshold) {
    return 0;
  }
  return deliveryFees[city] ?? 1500;
}

/**
 * Calculate order totals
 */
export function calculateOrderTotals(
  items: Array<{ quantity: number; unitPrice: number | string }>,
  deliveryFee: number
): {
  subtotal: number;
  delivery: number;
  total: number;
} {
  const subtotal = items.reduce((sum, item) => {
    const price =
      typeof item.unitPrice === 'string'
        ? parseFloat(item.unitPrice)
        : item.unitPrice;
    return sum + item.quantity * price;
  }, 0);

  return {
    subtotal,
    delivery: deliveryFee,
    total: subtotal + deliveryFee,
  };
}
