// Royal Furniture Business Constants

export const BUSINESS_NAME = 'Royal Furniture';
export const BUSINESS_TAGLINE = 'Comfort Meets Class';
export const BUSINESS_DOMAIN = 'royalfurniture.pk';
export const BUSINESS_LOCATION = 'Pakistan';
export const CURRENCY = 'PKR';
export const CURRENCY_SYMBOL = 'Rs.';

// Contact Information (placeholders - to be updated with real numbers)
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '923001234567';
export const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER || '+923001234567';
export const EMAIL = process.env.NEXT_PUBLIC_EMAIL || 'info@royalfurniture.pk';
export const ADDRESS = process.env.NEXT_PUBLIC_ADDRESS || 'Lahore, Pakistan';

// WhatsApp URLs
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}`;
export const WHATSAPP_URL_WITH_TEXT = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
export const CALL_URL = `tel:${PHONE_NUMBER}`;

// Payment Information (placeholders - to be configured in admin settings)
export const JAZZCASH_NUMBER = process.env.NEXT_PUBLIC_JAZZCASH_NUMBER || '';
export const EASYPAISA_NUMBER = process.env.NEXT_PUBLIC_EASYPAISA_NUMBER || '';
export const BANK_IBAN = process.env.NEXT_PUBLIC_BANK_IBAN || '';

// Delivery Settings
export const FREE_DELIVERY_THRESHOLD = 50000; // PKR
export const STANDARD_DELIVERY_FEE = 1500; // PKR base

// City-based delivery fees
export const DELIVERY_FEES: Record<string, number> = {
  Lahore: 0,
  Karachi: 2000,
  Islamabad: 1500,
  Rawalpindi: 1500,
  Faisalabad: 1000,
  Multan: 1000,
  Peshawar: 2500,
  Quetta: 3000,
  Sialkot: 800,
  Gujranwala: 800,
  Hyderabad: 2500,
  Bahawalpur: 1200,
};

// Order Settings
export const ORDER_PREFIX = 'ORD';
export const CUSTOM_ORDER_PREFIX = 'CUS';

// Admin Settings
export const ADMIN_LOGIN_PATH = '/admin/login';
export const ADMIN_DASHBOARD_PATH = '/admin/dashboard';
export const MAX_LOGIN_ATTEMPTS = 5;
export const LOCKOUT_DURATION_MINUTES = 15;

// Pagination
export const PRODUCTS_PER_PAGE = 24;
export const ORDERS_PER_PAGE = 20;

// Product Categories
export const CATEGORIES = {
  OFFICE: 'OFFICE',
  LIVING_ROOM: 'LIVING_ROOM',
  BEDROOM: 'BEDROOM',
  DINING: 'DINING',
  STUDY_KIDS: 'STUDY_KIDS',
  OUTDOOR: 'OUTDOOR',
  CUSTOM: 'CUSTOM',
} as const;

export const CATEGORY_LABELS: Record<string, string> = {
  OFFICE: 'Office Furniture',
  LIVING_ROOM: 'Living Room',
  BEDROOM: 'Bedroom',
  DINING: 'Dining',
  STUDY_KIDS: 'Study & Kids',
  OUTDOOR: 'Outdoor',
  CUSTOM: 'Custom Orders',
};

export const CATEGORY_SLUGS: Record<string, string> = {
  OFFICE: 'office-furniture',
  LIVING_ROOM: 'living-room',
  BEDROOM: 'bedroom',
  DINING: 'dining',
  STUDY_KIDS: 'study-kids',
  OUTDOOR: 'outdoor',
  CUSTOM: 'custom-orders',
};

export const SLUG_TO_CATEGORY: Record<string, string> = {
  'office-furniture': 'OFFICE',
  'living-room': 'LIVING_ROOM',
  bedroom: 'BEDROOM',
  dining: 'DINING',
  'study-kids': 'STUDY_KIDS',
  outdoor: 'OUTDOOR',
  'custom-orders': 'CUSTOM',
};

// Price Types
export const PRICE_TYPES = {
  FIXED: 'FIXED',
  INQUIRY: 'INQUIRY',
} as const;

// Stock Types
export const STOCK_TYPES = {
  IN_STOCK: 'IN_STOCK',
  MADE_TO_ORDER: 'MADE_TO_ORDER',
  OUT_OF_STOCK: 'OUT_OF_STOCK',
} as const;

// Order Statuses
export const ORDER_STATUSES = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  PROCESSING: 'PROCESSING',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
  RETURNED: 'RETURNED',
} as const;

export const ORDER_STATUS_LABELS: Record<string, string> = {
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  PROCESSING: 'Processing',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
  RETURNED: 'Returned',
};

// Payment Methods
export const PAYMENT_METHODS = {
  COD: 'COD',
  JAZZCASH: 'JAZZCASH',
  EASYPAISA: 'EASYPAISA',
  BANK_TRANSFER: 'BANK_TRANSFER',
} as const;

export const PAYMENT_METHOD_LABELS: Record<string, string> = {
  COD: 'Cash on Delivery',
  JAZZCASH: 'JazzCash',
  EASYPAISA: 'EasyPaisa',
  BANK_TRANSFER: 'Bank Transfer',
};

// Payment Statuses
export const PAYMENT_STATUSES = {
  UNPAID: 'UNPAID',
  PAID: 'PAID',
  PARTIAL: 'PARTIAL',
  REFUNDED: 'REFUNDED',
} as const;

// Custom Request Statuses
export const CUSTOM_REQUEST_STATUSES = {
  PENDING: 'PENDING',
  QUOTED: 'QUOTED',
  APPROVED: 'APPROVED',
  IN_PRODUCTION: 'IN_PRODUCTION',
  READY: 'READY',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
} as const;

export const CUSTOM_REQUEST_STATUS_LABELS: Record<string, string> = {
  PENDING: 'Pending Review',
  QUOTED: 'Quote Sent',
  APPROVED: 'Approved',
  IN_PRODUCTION: 'In Production',
  READY: 'Ready for Delivery',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
};

// Materials
export const MATERIALS = [
  'Solid Wood',
  'Sheesham Wood',
  'MDF',
  'Particle Board',
  'Metal',
  'Iron',
  'Steel',
  'Leather',
  'Faux Leather',
  'Fabric',
  'Velvet',
  'Mesh',
  'Plastic',
  'Glass',
  'Marble',
  'Rattan',
] as const;

// Pakistani Cities
export const PAKISTANI_CITIES = [
  'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Bahawalpur',
  'Sargodha',
  'Sukkur',
  'Abbottabad',
  'Gujrat',
  'Jhang',
  'Sheikhupura',
  'Rahim Yar Khan',
  'Okara',
  'Wah Cantonment',
  'Dera Ghazi Khan',
  'Mirpur Khas',
  'Bahawalnagar',
  'Kasur',
] as const;

// Room Types for Custom Orders
export const ROOM_TYPES = [
  'Office',
  'Living Room',
  'Bedroom',
  'Dining Room',
  'Study',
  'Kids Room',
  'Outdoor',
  'Commercial Space',
  'Other',
] as const;

// Budget Ranges for Custom Orders
export const BUDGET_RANGES = [
  'Under Rs. 50,000',
  'Rs. 50,000 - Rs. 100,000',
  'Rs. 100,000 - Rs. 200,000',
  'Rs. 200,000 - Rs. 500,000',
  'Above Rs. 500,000',
  'Flexible',
] as const;

// Working Hours
export const WORKING_HOURS = {
  weekdays: '9:00 AM - 8:00 PM',
  saturday: '10:00 AM - 6:00 PM',
  sunday: 'Closed',
};

// Social Media URLs (placeholders)
export const SOCIAL_URLS = {
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || '',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '',
  tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL || '',
};

// Trust Badges
export const TRUST_BADGES = [
  { icon: 'tree', title: '100% Solid Wood', subtitle: '& Premium Materials' },
  { icon: 'truck', title: 'Nationwide Delivery', subtitle: 'Across Pakistan' },
  { icon: 'shield', title: '1 Year Warranty', subtitle: 'On Select Items' },
  { icon: 'message-circle', title: 'WhatsApp Support', subtitle: 'For Best Price' },
  { icon: 'credit-card', title: 'Easy Payments', subtitle: 'JazzCash & EasyPaisa' },
  { icon: 'wrench', title: 'Free Assembly', subtitle: '& Installation' },
] as const;

// SEO Keywords
export const SEO_KEYWORDS = [
  'office furniture Pakistan',
  'buy sofa set Pakistan',
  'bedroom furniture Lahore',
  'custom furniture Pakistan',
  'office chairs Pakistan price',
  'furniture store Pakistan',
  'solid wood furniture',
  'sheesham furniture',
  'executive office chairs',
  'dining table sets',
];