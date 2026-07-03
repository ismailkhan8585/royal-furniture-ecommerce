export const FALLBACK_IMAGE = '/placeholder.svg';

export const MEDIA = {
  officeWorkspace:
    'https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?w=1200',
  executiveChair:
    'https://images.pexels.com/photos/5644330/pexels-photo-5644330.jpeg?w=1200',
  officeChairs:
    'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?w=1200',
  conferenceRoom:
    'https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?w=1200',
  receptionDesk:
    'https://images.pexels.com/photos/1595387/pexels-photo-1595387.jpeg?w=1200',
  filingStorage:
    'https://images.pexels.com/photos/6580603/pexels-photo-6580603.jpeg?w=1200',
  livingRoom:
    'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?w=1200',
  sofa:
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?w=1200',
  coffeeTable:
    'https://images.pexels.com/photos/695698/pexels-photo-695698.jpeg?w=1200',
  sideTable:
    'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?w=1200',
  bedroom:
    'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?w=1200',
  wardrobe:
    'https://images.pexels.com/photos/2360673/pexels-photo-2360673.jpeg?w=1200',
  vanity:
    'https://images.pexels.com/photos/35547043/pexels-photo-35547043.jpeg?w=1200',
  dining:
    'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?w=1200',
  studyDesk:
    'https://images.pexels.com/photos/1766477/pexels-photo-1766477.jpeg?w=1200',
  bookshelf:
    'https://images.pexels.com/photos/35128186/pexels-photo-35128186.jpeg?w=1200',
  outdoor:
    'https://images.pexels.com/photos/2029714/pexels-photo-2029714.jpeg?w=1200',
} as const;

export const CATEGORY_IMAGES: Record<string, string> = {
  OFFICE: MEDIA.officeWorkspace,
  LIVING_ROOM: MEDIA.livingRoom,
  BEDROOM: MEDIA.bedroom,
  DINING: MEDIA.dining,
  STUDY_KIDS: MEDIA.studyDesk,
  OUTDOOR: MEDIA.outdoor,
  CUSTOM: MEDIA.receptionDesk,
};

export const PRODUCT_IMAGES_BY_SLUG: Record<string, string> = {
  'executive-office-chair': MEDIA.executiveChair,
  'ergonomic-mesh-chair': MEDIA.officeChairs,
  'gaming-chair-pro': MEDIA.officeChairs,
  'office-desk-executive': MEDIA.officeWorkspace,
  'conference-table-12': MEDIA.conferenceRoom,
  'visitor-chair-set': MEDIA.officeChairs,
  'filing-cabinet-4': MEDIA.filingStorage,
  'reception-desk-modern': MEDIA.receptionDesk,
  'office-sofa-3seater': MEDIA.sofa,
  'computer-desk-compact': MEDIA.studyDesk,
  'sofa-set-7seater': MEDIA.sofa,
  'l-shape-sofa': MEDIA.livingRoom,
  'recliner-sofa-electric': MEDIA.sofa,
  'coffee-table-modern': MEDIA.coffeeTable,
  'tv-unit-floating': MEDIA.livingRoom,
  'center-table-wood': MEDIA.coffeeTable,
  'side-table-marble': MEDIA.sideTable,
  'bean-bag-lounge': MEDIA.livingRoom,
  'bed-king-sheesham': MEDIA.bedroom,
  'wardrobe-3door-sliding': MEDIA.wardrobe,
  'dressing-table-vanity': MEDIA.vanity,
  'nightstand-drawer': MEDIA.bedroom,
  'mattress-orthopedic': MEDIA.bedroom,
  'double-bed-simple': MEDIA.bedroom,
  'dining-set-6seater': MEDIA.dining,
  'dining-table-8-glass': MEDIA.dining,
  'crockery-cabinet': MEDIA.dining,
  'bar-stool-leather': MEDIA.dining,
  'dining-chair-velvet': MEDIA.dining,
  'extendable-dining-table': MEDIA.dining,
  'study-table-student': MEDIA.studyDesk,
  'bookshelf-5tier': MEDIA.bookshelf,
  'kids-study-set': MEDIA.studyDesk,
  'bunk-bed-kids': MEDIA.bedroom,
  'garden-swing-3seater': MEDIA.outdoor,
  'outdoor-set-4': MEDIA.outdoor,
  'patio-umbrella': MEDIA.outdoor,
  'folding-chairs-4': MEDIA.outdoor,
};

export const GALLERY_IMAGES = [
  {
    image_url: MEDIA.livingRoom,
    category: 'LIVING_ROOM',
    caption: 'Modern living room setup',
    sort_order: 1,
  },
  {
    image_url: MEDIA.bedroom,
    category: 'BEDROOM',
    caption: 'Master bedroom design',
    sort_order: 2,
  },
  {
    image_url: MEDIA.dining,
    category: 'DINING',
    caption: 'Dining area showcase',
    sort_order: 3,
  },
  {
    image_url: MEDIA.executiveChair,
    category: 'OFFICE',
    caption: 'Executive office chair setup',
    sort_order: 4,
  },
  {
    image_url: MEDIA.conferenceRoom,
    category: 'OFFICE',
    caption: 'Boardroom installation',
    sort_order: 5,
  },
  {
    image_url: MEDIA.sofa,
    category: 'LIVING_ROOM',
    caption: 'Sofa set delivery',
    sort_order: 6,
  },
  {
    image_url: MEDIA.wardrobe,
    category: 'BEDROOM',
    caption: 'Custom wardrobe installation',
    sort_order: 7,
  },
  {
    image_url: MEDIA.outdoor,
    category: 'OUTDOOR',
    caption: 'Garden furniture setup',
    sort_order: 8,
  },
  {
    image_url: MEDIA.studyDesk,
    category: 'STUDY_KIDS',
    caption: 'Home office corner',
    sort_order: 9,
  },
  {
    image_url: MEDIA.officeWorkspace,
    category: 'OFFICE',
    caption: 'Corporate workspace project',
    sort_order: 10,
  },
] as const;
