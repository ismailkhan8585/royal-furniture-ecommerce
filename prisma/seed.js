const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();
    if (!key || process.env[key] !== undefined) continue;

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  }
}

loadEnvFile(path.join(__dirname, '..', '.env'));
loadEnvFile(path.join(__dirname, '..', '.env.local'));

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const media = {
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
};

const productImagesBySlug = {
  'executive-office-chair': media.executiveChair,
  'ergonomic-mesh-chair': media.officeChairs,
  'gaming-chair-pro': media.officeChairs,
  'office-desk-executive': media.officeWorkspace,
  'conference-table-12': media.conferenceRoom,
  'visitor-chair-set': media.officeChairs,
  'filing-cabinet-4': media.filingStorage,
  'reception-desk-modern': media.receptionDesk,
  'office-sofa-3seater': media.sofa,
  'computer-desk-compact': media.studyDesk,
  'sofa-set-7seater': media.sofa,
  'l-shape-sofa': media.livingRoom,
  'recliner-sofa-electric': media.sofa,
  'coffee-table-modern': media.coffeeTable,
  'tv-unit-floating': media.livingRoom,
  'center-table-wood': media.coffeeTable,
  'side-table-marble': media.sideTable,
  'bean-bag-lounge': media.livingRoom,
  'bed-king-sheesham': media.bedroom,
  'wardrobe-3door-sliding': media.wardrobe,
  'dressing-table-vanity': media.vanity,
  'nightstand-drawer': media.bedroom,
  'mattress-orthopedic': media.bedroom,
  'double-bed-simple': media.bedroom,
  'dining-set-6seater': media.dining,
  'dining-table-8-glass': media.dining,
  'crockery-cabinet': media.dining,
  'bar-stool-leather': media.dining,
  'dining-chair-velvet': media.dining,
  'extendable-dining-table': media.dining,
  'study-table-student': media.studyDesk,
  'bookshelf-5tier': media.bookshelf,
  'kids-study-set': media.studyDesk,
  'bunk-bed-kids': media.bedroom,
  'garden-swing-3seater': media.outdoor,
  'outdoor-set-4': media.outdoor,
  'patio-umbrella': media.outdoor,
  'folding-chairs-4': media.outdoor,
};

const galleryImages = [
  [1, media.livingRoom, 'Modern living room setup', 'LIVING_ROOM'],
  [2, media.bedroom, 'Master bedroom design', 'BEDROOM'],
  [3, media.dining, 'Dining area showcase', 'DINING'],
  [4, media.executiveChair, 'Executive office chair setup', 'OFFICE'],
  [5, media.conferenceRoom, 'Boardroom installation', 'OFFICE'],
  [6, media.sofa, 'Sofa set delivery', 'LIVING_ROOM'],
  [7, media.wardrobe, 'Custom wardrobe installation', 'BEDROOM'],
  [8, media.outdoor, 'Garden furniture setup', 'OUTDOOR'],
  [9, media.studyDesk, 'Home office corner', 'STUDY_KIDS'],
  [10, media.officeWorkspace, 'Corporate workspace project', 'OFFICE'],
];

async function seedAdmin() {
  const email = process.env.ADMIN_SEED_EMAIL || 'admin@royalfurniture.pk';
  const password = process.env.ADMIN_SEED_PASSWORD || 'admin123';
  const name = process.env.ADMIN_SEED_NAME || 'Royal Furniture Admin';

  if (!process.env.ADMIN_SEED_PASSWORD) {
    console.log(
      'ADMIN_SEED_PASSWORD is not set; using the legacy development password "admin123".'
    );
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.admin.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      name,
      is_active: true,
      login_attempts: 0,
      locked_until: null,
    },
    create: {
      email,
      password: hashedPassword,
      name,
      is_active: true,
    },
  });

  console.log(`Seeded admin user: ${email}`);
}

async function seedSiteSettings() {
  const existing = await prisma.siteSettings.findFirst({
    select: { id: true },
  });

  if (existing) return;

  await prisma.siteSettings.create({
    data: {
      phone: process.env.NEXT_PUBLIC_PHONE_NUMBER || '+923001234567',
      whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '923001234567',
      jazzcash_number: process.env.NEXT_PUBLIC_JAZZCASH_NUMBER || null,
      easypaisa_number: process.env.NEXT_PUBLIC_EASYPAISA_NUMBER || null,
      bank_iban: process.env.NEXT_PUBLIC_BANK_IBAN || null,
      email: process.env.NEXT_PUBLIC_EMAIL || 'info@royalfurniture.pk',
      address: process.env.NEXT_PUBLIC_ADDRESS || 'Lahore, Pakistan',
      facebook_url: process.env.NEXT_PUBLIC_FACEBOOK_URL || null,
      instagram_url: process.env.NEXT_PUBLIC_INSTAGRAM_URL || null,
      tiktok_url: process.env.NEXT_PUBLIC_TIKTOK_URL || null,
    },
  });

  console.log('Seeded default site settings.');
}

async function seedLegacyCatalog() {
  const productCount = await prisma.product.count();

  if (productCount > 0) {
    console.log('Products already exist; skipping legacy catalog seed.');
    return;
  }

  const seedPath = path.join(__dirname, 'seed.sql');
  const sql = fs.readFileSync(seedPath, 'utf8');
  const statements = sql
    .split(/;\s*(?:\r?\n|$)/)
    .map((statement) => statement.trim())
    .filter(Boolean);

  for (const statement of statements) {
    await prisma.$executeRawUnsafe(statement);
  }

  console.log('Seeded legacy products, gallery images, and reviews.');
}

async function seedMediaCorrections() {
  for (const [slug, image] of Object.entries(productImagesBySlug)) {
    await prisma.product.updateMany({
      where: { slug },
      data: { photos: [image] },
    });
  }

  for (const [sortOrder, imageUrl, caption, category] of galleryImages) {
    await prisma.galleryImage.updateMany({
      where: { sort_order: sortOrder },
      data: {
        image_url: imageUrl,
        caption,
        category,
      },
    });
  }

  console.log('Updated product and gallery media to match content.');
}

async function main() {
  await seedAdmin();
  await seedSiteSettings();
  await seedLegacyCatalog();
  await seedMediaCorrections();
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
