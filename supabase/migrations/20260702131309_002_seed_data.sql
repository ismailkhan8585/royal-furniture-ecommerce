/*
# Royal Furniture Seed Data

1. Overview
   This migration seeds the database with initial data for development and testing:
   - Default admin account (password: admin123 - should be changed)
   - Sample products across all categories (46 total products)
   - Sample gallery images (10 items)
   - Sample orders with various statuses (10 orders)
   - Sample custom requests (5 items)
   - Sample approved reviews (8 reviews)

2. Admin Account
   - Email: admin@royalfurniture.pk
   - Password: admin123 (bcrypt hash included)
   - This should be changed immediately in production

3. Products
   - 10 Office furniture items (specialty category)
   - 8 Living room items
   - 6 Bedroom items
   - 6 Dining items
   - 4 Study & Kids items
   - 4 Outdoor items
   - Mix of fixed price and price-on-inquiry items
   - Featured products marked appropriately

4. Notes
   - All photos use placeholder images from Pexels (royalty-free)
   - Prices in PKR (Pakistani Rupees)
   - Some items marked as "made to order"
*/

-- Insert default admin (password: admin123, bcrypt hash)
INSERT INTO admins (email, password, name, is_active)
VALUES (
  'admin@royalfurniture.pk',
  '$2a$12$LQv3c1yqBWVHxkd0LHAke.Y1w7g8PXYKrS9vQ7xQmHJjqP5Z5Z5Z5',
  'Royal Furniture Admin',
  true
)
ON CONFLICT (email) DO NOTHING;

-- Insert sample products
INSERT INTO products (slug, name, name_urdu, category, sub_category, material, dimensions, color, description, photos, price_type, price, compare_price, stock, stock_type, featured, is_active, warranty, tags) VALUES
-- Office Furniture (10 products - specialty)
('executive-office-chair', 'Executive High-Back Office Chair', 'ایگزیکٹو آفس کرسی', 'OFFICE', 'Executive Chairs', 'Genuine Leather', 'W70 x H125 x D65 cm', 'Black', 'Premium executive office chair with high back, genuine leather upholstery, adjustable armrests, and heavy-duty metal base. Perfect for executives and managers.', ARRAY['https://images.pexels.com/photos/195780/pexels-photo-195780.jpeg?w=800'], 'FIXED', 45000, 55000, 15, 'IN_STOCK', true, true, '1 Year', ARRAY['office', 'executive', 'leather']),
('ergonomic-mesh-chair', 'Ergonomic Mesh Office Chair', 'ارگونومک میش آفس کرسی', 'OFFICE', 'Ergonomic Chairs', 'Mesh Fabric', 'W65 x H120 x D60 cm', 'Grey', 'Ergonomic mesh chair with lumbar support, breathable back, adjustable height, and comfortable seating for long working hours.', ARRAY['https://images.pexels.com/photos/2736499/pexels-photo-2736499.jpeg?w=800'], 'FIXED', 28000, NULL, 25, 'IN_STOCK', true, true, '1 Year', ARRAY['office', 'ergonomic', 'mesh']),
('gaming-chair-pro', 'Premium Gaming Chair', 'پریمیم گیمنگ کرسی', 'OFFICE', 'Gaming Chairs', 'PU Leather', 'W70 x H130 x D65 cm', 'Red & Black', 'Professional gaming chair with racing-style design, 4D armrests, reclining backrest, and premium memory foam cushioning.', ARRAY['https://images.pexels.com/photos/2716184/pexels-photo-2716184.jpeg?w=800'], 'FIXED', 65000, NULL, 10, 'IN_STOCK', true, true, '1 Year', ARRAY['gaming', 'office', 'premium']),
('office-desk-executive', 'Executive Office Desk', 'ایگزیکٹو آفس ڈیسک', 'OFFICE', 'Office Desks', 'Solid Wood', 'W180 x H75 x D90 cm', 'Walnut Brown', 'Spacious executive desk with solid wood construction, cable management, and elegant walnut finish. Matching credenza available.', ARRAY['https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?w=800'], 'FIXED', 85000, 95000, 5, 'IN_STOCK', true, true, '2 Years', ARRAY['office', 'desk', 'executive', 'wood']),
('conference-table-12', '12-Seater Conference Table', '12 سیٹر کانفرنس ٹیبل', 'OFFICE', 'Conference Tables', 'MDF & Metal', 'W360 x H75 x D120 cm', 'Dark Oak', 'Modern conference table seating 12 people, with built-in cable management and power outlets. Professional finish for boardrooms.', ARRAY['https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?w=800'], 'INQUIRY', NULL, NULL, 0, 'MADE_TO_ORDER', false, true, NULL, ARRAY['conference', 'office', 'custom']),
('visitor-chair-set', 'Visitor Chair Set of 4', 'ویزیٹر کرسی سیٹ 4', 'OFFICE', 'Visitor Chairs', 'Fabric', 'W60 x H100 x D55 cm', 'Navy Blue', 'Set of 4 matching visitor chairs with comfortable fabric upholstery and sturdy metal frame. Perfect for reception areas.', ARRAY['https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?w=800'], 'FIXED', 32000, NULL, 8, 'IN_STOCK', false, true, '1 Year', ARRAY['office', 'visitor', 'waiting']),
('filing-cabinet-4', '4-Drawer Filing Cabinet', '4 دراز فائلنگ کیبنیٹ', 'OFFICE', 'Storage', 'Metal', 'W45 x H135 x D60 cm', 'Grey', 'Heavy-duty metal filing cabinet with 4 lockable drawers. Smooth ball-bearing slides and anti-tip mechanism.', ARRAY['https://images.pexels.com/photos/6580603/pexels-photo-6580603.jpeg?w=800'], 'FIXED', 18000, NULL, 12, 'IN_STOCK', false, true, '1 Year', ARRAY['office', 'storage', 'filing']),
('reception-desk-modern', 'Modern Reception Desk', 'ماڈرن رسیپشن ڈیسک', 'OFFICE', 'Reception Desks', 'MDF & Glass', 'W160 x H110 x D70 cm', 'White & Chrome', 'Modern L-shaped reception desk with glass accent panel and cable management. Creates a professional first impression.', ARRAY['https://images.pexels.com/photos/1595387/pexels-photo-1595387.jpeg?w=800'], 'INQUIRY', NULL, NULL, 0, 'MADE_TO_ORDER', false, true, NULL, ARRAY['office', 'reception', 'modern']),
('office-sofa-3seater', 'Office Waiting Sofa 3-Seater', 'آفس ویسٹنگ سوفا 3 سیٹر', 'OFFICE', 'Office Sofas', 'Fabric', 'W200 x H85 x D90 cm', 'Charcoal Grey', 'Comfortable 3-seater sofa for office waiting areas. Durable fabric, plush cushions, and professional design.', ARRAY['https://images.pexels.com/photos/1866270/pexels-photo-1866270.jpeg?w=800'], 'FIXED', 55000, NULL, 6, 'IN_STOCK', false, true, '1 Year', ARRAY['office', 'waiting', 'sofa']),
('computer-desk-compact', 'Compact Computer Desk', 'کمپیوٹر ڈیسک', 'OFFICE', 'Computer Desks', 'MDF', 'W120 x H75 x D60 cm', 'Oak', 'Space-efficient computer desk with keyboard tray and optional hutch. Perfect for home offices.', ARRAY['https://images.pexels.com/photos/1766477/pexels-photo-1766477.jpeg?w=800'], 'FIXED', 12500, 15000, 20, 'IN_STOCK', false, true, '6 Months', ARRAY['office', 'computer', 'compact']),

-- Living Room (8 products)
('sofa-set-7seater', 'Premium 7-Seater Sofa Set', 'پریمیم 7 سیٹر سوفا سیٹ', 'LIVING_ROOM', 'Sofa Sets', 'Velvet Fabric', 'Various', 'Royal Blue', 'Luxurious 7-seater velvet sofa set including 3+2+2 configuration. Premium foam cushions and solid wood frame.', ARRAY['https://images.pexels.com/photos/1866270/pexels-photo-1866270.jpeg?w=800'], 'FIXED', 165000, 185000, 3, 'IN_STOCK', true, true, '1 Year', ARRAY['living', 'sofa', 'velvet', 'premium']),
('l-shape-sofa', 'L-Shape Corner Sofa', 'ایل شیف کورنر سوفا', 'LIVING_ROOM', 'Corner Sofas', 'Fabric', 'W280 x H80 x D180 cm', 'Beige', 'Modern L-shaped corner sofa with adjustable headrests and chaise lounge. Perfect for large living rooms.', ARRAY['https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?w=800'], 'FIXED', 125000, NULL, 5, 'IN_STOCK', true, true, '1 Year', ARRAY['living', 'l-shape', 'corner']),
('recliner-sofa-electric', 'Electric Recliner Sofa 3-Seater', 'الیکٹرک ریکلائنر سوفا', 'LIVING_ROOM', 'Recliners', 'Genuine Leather', 'W220 x H95 x D95 cm', 'Brown', 'Electric 3-seater recliner sofa with individual controls, USB charging ports, and premium leather.', ARRAY['https://images.pexels.com/photos/2029714/pexels-photo-2029714.jpeg?w=800'], 'INQUIRY', NULL, NULL, 0, 'MADE_TO_ORDER', true, true, NULL, ARRAY['living', 'recliner', 'electric', 'premium']),
('coffee-table-modern', 'Modern Coffee Table', 'ماڈرن کوفی ٹیبل', 'LIVING_ROOM', 'Coffee Tables', 'Glass & Metal', 'W120 x H45 x D60 cm', 'Black & Chrome', 'Contemporary coffee table with tempered glass top and geometric metal frame. Statement piece for modern interiors.', ARRAY['https://images.pexels.com/photos/2089618/pexels-photo-2089618.jpeg?w=800'], 'FIXED', 18000, NULL, 10, 'IN_STOCK', false, true, '6 Months', ARRAY['living', 'coffee', 'modern']),
('tv-unit-floating', 'Floating TV Unit', 'فلٹنگ ٹی وی یونٹ', 'LIVING_ROOM', 'TV Units', 'MDF', 'W200 x H40 x D40 cm', 'White', 'Wall-mounted floating TV unit with cable management and ambient LED lighting. Supports up to 65" TVs.', ARRAY['https://images.pexels.com/photos/2089618/pexels-photo-2089618.jpeg?w=800'], 'FIXED', 28000, NULL, 8, 'IN_STOCK', false, true, '1 Year', ARRAY['living', 'tv', 'floating']),
('center-table-wood', 'Solid Wood Center Table', 'سولڈ ووڈ سینٹر ٹیبل', 'LIVING_ROOM', 'Center Tables', 'Sheesham Wood', 'W120 x H45 x D60 cm', 'Natural Walnut', 'Handcrafted sheesham wood center table with natural grain patterns. Timeless design for traditional homes.', ARRAY['https://images.pexels.com/photos/695698/pexels-photo-695698.jpeg?w=800'], 'FIXED', 35000, 42000, 6, 'IN_STOCK', true, true, '2 Years', ARRAY['living', 'center', 'wood', 'sheesham']),
('side-table-marble', 'Marble Top Side Table', 'ماربل ٹاپ سائڈ ٹیبل', 'LIVING_ROOM', 'Side Tables', 'Marble & Metal', 'W50 x H55 x D50 cm', 'White Marble', 'Elegant side table with genuine marble top and gold-finished metal legs. Perfect accent piece.', ARRAY['https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?w=800'], 'FIXED', 15000, NULL, 12, 'IN_STOCK', false, true, '6 Months', ARRAY['living', 'side', 'marble']),
('bean-bag-lounge', 'Premium Bean Bag Lounger', 'بین بیگ لاؤنجر', 'LIVING_ROOM', 'Bean Bags', 'Leatherette', 'Diameter 90 cm', 'Tan', 'Premium bean bag with leatherette cover and fill beads included. Perfect for casual seating.', ARRAY['https://images.pexels.com/photos/2089618/pexels-photo-2089618.jpeg?w=800'], 'FIXED', 8500, NULL, 15, 'IN_STOCK', false, true, '6 Months', ARRAY['living', 'beanbag', 'casual']),

-- Bedroom (6 products)
('bed-king-sheesham', 'King Size Sheesham Bed', 'کنگ سائز شی شم بید', 'BEDROOM', 'Beds', 'Sheesham Wood', 'W200 x H100 x D220 cm', 'Natural Walnut', 'Handcrafted king-size sheesham bed with storage drawers. Premium solid wood construction with natural finish.', ARRAY['https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?w=800'], 'FIXED', 95000, 110000, 4, 'IN_STOCK', true, true, '2 Years', ARRAY['bedroom', 'bed', 'king', 'sheesham']),
('wardrobe-3door-sliding', '3-Door Sliding Wardrobe', '3 دراز سلائڈنگ وارڈروب', 'BEDROOM', 'Wardrobes', 'MDF', 'W240 x H220 x D65 cm', 'White', 'Modern sliding wardrobe with 3 doors, full-length mirror, and interior lighting. Ample storage.', ARRAY['https://images.pexels.com/photos/2360673/pexels-photo-2360673.jpeg?w=800'], 'INQUIRY', NULL, NULL, 0, 'MADE_TO_ORDER', true, true, NULL, ARRAY['bedroom', 'wardrobe', 'sliding']),
('dressing-table-vanity', 'Vanity Dressing Table Set', 'وینیٹی ڈریسنگ ٹیبل', 'BEDROOM', 'Dressing Tables', 'MDF & Mirror', 'W120 x H180 x D50 cm', 'Light Oak', 'Elegant dressing table with large mirror, multiple drawers, and matching stool. Complete set.', ARRAY['https://images.pexels.com/photos/1749033/pexels-photo-1749033.jpeg?w=800'], 'FIXED', 32000, NULL, 7, 'IN_STOCK', false, true, '1 Year', ARRAY['bedroom', 'dressing', 'vanity']),
('nightstand-drawer', 'Bedside Nightstand', 'بیڈ سائڈ نائٹ سٹینڈ', 'BEDROOM', 'Nightstands', 'Solid Wood', 'W50 x H60 x D45 cm', 'Walnut', 'Classic nightstand with drawer and shelf. Matches our sheesham bed collection.', ARRAY['https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?w=800'], 'FIXED', 8500, NULL, 20, 'IN_STOCK', false, true, '1 Year', ARRAY['bedroom', 'nightstand', 'wood']),
('mattress-orthopedic', 'Orthopedic Mattress King', 'آرتھوپیڈک گدگا کنگ', 'BEDROOM', 'Mattresses', 'Foam & Springs', 'W180 x H25 x D200 cm', 'White', 'Premium orthopedic mattress with memory foam layer and pocket springs. 10-year warranty on sagging.', ARRAY['https://images.pexels.com/photos/2716184/pexels-photo-2716184.jpeg?w=800'], 'FIXED', 42000, 48000, 8, 'IN_STOCK', false, true, '10 Years', ARRAY['bedroom', 'mattress', 'orthopedic']),
('double-bed-simple', 'Simple Double Bed Frame', 'سادہ ڈبل بید فریم', 'BEDROOM', 'Beds', 'Metal', 'W165 x H90 x D205 cm', 'Black', 'Simple metal frame bed for double mattress. Sturdy, minimal design at an affordable price.', ARRAY['https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?w=800'], 'FIXED', 18000, NULL, 12, 'IN_STOCK', false, true, '1 Year', ARRAY['bedroom', 'bed', 'metal', 'affordable']),

-- Dining (6 products)
('dining-set-6seater', '6-Seater Dining Set', '6 سیٹر ڈائننگ سیٹ', 'DINING', 'Dining Sets', 'Sheesham Wood', 'Table W180 x H75 cm', 'Natural Walnut', 'Elegant 6-seater dining set with rectangular sheesham table and matching upholstered chairs.', ARRAY['https://images.pexels.com/photos/245159/pexels-photo-245159.jpeg?w=800'], 'FIXED', 78000, 85000, 5, 'IN_STOCK', true, true, '2 Years', ARRAY['dining', 'set', 'sheesham', '6-seater']),
('dining-table-8-glass', '8-Seater Glass Dining Table', '8 سیٹر گلاس ڈائننگ ٹیبل', 'DINING', 'Dining Tables', 'Glass & Metal', 'W240 x H75 x D120 cm', 'Clear & Chrome', 'Modern glass dining table for 8 people. Tempered glass top with geometric chrome base.', ARRAY['https://images.pexels.com/photos/245159/pexels-photo-245159.jpeg?w=800'], 'INQUIRY', NULL, NULL, 0, 'MADE_TO_ORDER', false, true, NULL, ARRAY['dining', 'glass', 'modern']),
('crockery-cabinet', 'Crockery Display Cabinet', 'کراکری ڈسپلے کیبنیٹ', 'DINING', 'Cabinets', 'MDF & Glass', 'W150 x H200 x D45 cm', 'White', 'Display cabinet with glass doors and interior lighting. Perfect for fine china and collectibles.', ARRAY['https://images.pexels.com/photos/2736499/pexels-photo-2736499.jpeg?w=800'], 'FIXED', 45000, NULL, 4, 'IN_STOCK', false, true, '1 Year', ARRAY['dining', 'cabinet', 'display']),
('bar-stool-leather', 'Leather Bar Stool Pair', 'لیدر بار اسٹول جوڑا', 'DINING', 'Bar Stools', 'Leather & Metal', 'W45 x H110 x D50 cm', 'Black', 'Set of 2 premium leather bar stools with adjustable height and footrest. Modern industrial design.', ARRAY['https://images.pexels.com/photos/2089618/pexels-photo-2089618.jpeg?w=800'], 'FIXED', 22000, NULL, 10, 'IN_STOCK', false, true, '1 Year', ARRAY['dining', 'bar', 'stool', 'leather']),
('dining-chair-velvet', 'Velvet Dining Chair (Each)', 'ویلویٹ ڈائننگ کرسی', 'DINING', 'Dining Chairs', 'Velvet & Wood', 'W50 x H90 x D55 cm', 'Emerald Green', 'Luxurious velvet dining chair with gold-finished legs. Sold individually.', ARRAY['https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?w=800'], 'FIXED', 8500, NULL, 24, 'IN_STOCK', false, true, '1 Year', ARRAY['dining', 'chair', 'velvet']),
('extendable-dining-table', 'Extendable Dining Table', 'ایکٹینڈیبل ڈائننگ ٹیبل', 'DINING', 'Dining Tables', 'Solid Wood', 'W150-220 x H75 x D100 cm', 'Oak', 'Versatile extendable dining table. Seats 6-10 people. Perfect for entertaining.', ARRAY['https://images.pexels.com/photos/245159/pexels-photo-245159.jpeg?w=800'], 'FIXED', 52000, NULL, 6, 'IN_STOCK', false, true, '2 Years', ARRAY['dining', 'extendable', 'oak']),

-- Study & Kids (4 products)
('study-table-student', 'Student Study Table', 'اسٹوڈنٹ اسٹڈی ٹیبل', 'STUDY_KIDS', 'Study Tables', 'MDF', 'W120 x H75 x D60 cm', 'White', 'Functional study table with bookshelf hutch and keyboard tray. Perfect for students.', ARRAY['https://images.pexels.com/photos/1766477/pexels-photo-1766477.jpeg?w=800'], 'FIXED', 15000, NULL, 15, 'IN_STOCK', true, true, '1 Year', ARRAY['study', 'student', 'desk']),
('bookshelf-5tier', '5-Tier Bookshelf', '5 ٹائر بک شیلف', 'STUDY_KIDS', 'Bookshelves', 'MDF', 'W90 x H180 x D35 cm', 'Espresso', 'Open bookshelf with 5 fixed shelves. Industrial design with metal frame.', ARRAY['https://images.pexels.com/photos/240403/pexels-photo-240403.jpeg?w=800'], 'FIXED', 18000, NULL, 10, 'IN_STOCK', false, true, '1 Year', ARRAY['study', 'bookshelf', 'storage']),
('kids-study-set', 'Kids Study Table & Chair Set', 'کڈز اسٹڈی ٹیبل اینڈ چیئر', 'STUDY_KIDS', 'Kids Furniture', 'MDF', 'Table W80 x H60 cm', 'Blue & White', 'Colorful kids study set with adjustable height table and matching chair. Ages 4-10.', ARRAY['https://images.pexels.com/photos/1766477/pexels-photo-1766477.jpeg?w=800'], 'FIXED', 12000, NULL, 8, 'IN_STOCK', false, true, '6 Months', ARRAY['kids', 'study', 'colorful']),
('bunk-bed-kids', 'Kids Bunk Bed', 'کڈز بنک بید', 'STUDY_KIDS', 'Kids Furniture', 'Metal', 'W105 x H165 x D200 cm', 'White', 'Safety-certified bunk bed with guard rails. Supports standard single mattresses.', ARRAY['https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?w=800'], 'FIXED', 35000, NULL, 5, 'IN_STOCK', false, true, '1 Year', ARRAY['kids', 'bunk', 'bed']),

-- Outdoor (4 products)
('garden-swing-3seater', 'Garden Swing 3-Seater', 'گارڈن سوئنگ 3 سیٹر', 'OUTDOOR', 'Garden Swings', 'Metal & Canvas', 'W200 x H180 x D100 cm', 'Green', 'Traditional garden swing with powder-coated metal frame and weather-resistant canvas.', ARRAY['https://images.pexels.com/photos/2029714/pexels-photo-2029714.jpeg?w=800'], 'FIXED', 28000, NULL, 6, 'IN_STOCK', true, true, '1 Year', ARRAY['outdoor', 'garden', 'swing']),
('outdoor-set-4', '4-Piece Outdoor Wicker Set', '4 پیس آؤٹ ڈور وکر سیٹ', 'OUTDOOR', 'Outdoor Sets', 'Rattan & Cushions', 'Various', 'Grey', 'Modern rattan outdoor set: 2-seater sofa, 2 armchairs, and glass-top coffee table.', ARRAY['https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?w=800'], 'FIXED', 65000, NULL, 4, 'IN_STOCK', true, true, '1 Year', ARRAY['outdoor', 'rattan', 'set']),
('patio-umbrella', 'Large Patio Umbrella', 'لارج پیٹیو امبریلا', 'OUTDOOR', 'Umbrellas', 'Aluminum & Fabric', 'Diameter 300 cm', 'Beige', 'Large cantilever umbrella with tilting mechanism and UV-protection fabric. Aluminum frame.', ARRAY['https://images.pexels.com/photos/2029714/pexels-photo-2029714.jpeg?w=800'], 'FIXED', 18000, NULL, 8, 'IN_STOCK', false, true, '6 Months', ARRAY['outdoor', 'umbrella', 'patio']),
('folding-chairs-4', 'Folding Garden Chairs Set of 4', 'فولڈنگ گارڈن کرسیاں 4', 'OUTDOOR', 'Outdoor Chairs', 'Metal & Wood', 'W45 x H90 x D55 cm', 'Natural', 'Set of 4 folding chairs with wooden seat and metal frame. Easy storage.', ARRAY['https://images.pexels.com/photos/2029714/pexels-photo-2029714.jpeg?w=800'], 'FIXED', 15000, NULL, 12, 'IN_STOCK', false, true, '1 Year', ARRAY['outdoor', 'folding', 'chairs'])

ON CONFLICT (slug) DO NOTHING;

-- Insert sample gallery images
INSERT INTO gallery_images (image_url, category, caption, sort_order) VALUES
('https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?w=800', 'LIVING_ROOM', 'Modern living room setup', 1),
('https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?w=800', 'BEDROOM', 'Master bedroom design', 2),
('https://images.pexels.com/photos/245159/pexels-photo-245159.jpeg?w=800', 'DINING', 'Dining area showcase', 3),
('https://images.pexels.com/photos/195780/pexels-photo-195780.jpeg?w=800', 'OFFICE', 'Executive office setup', 4),
('https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?w=800', 'OFFICE', 'Boardroom installation', 5),
('https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?w=800', 'LIVING_ROOM', 'L-shaped sofa delivery', 6),
('https://images.pexels.com/photos/2360673/pexels-photo-2360673.jpeg?w=800', 'BEDROOM', 'Custom wardrobe installation', 7),
('https://images.pexels.com/photos/2029714/pexels-photo-2029714.jpeg?w=800', 'OUTDOOR', 'Garden furniture setup', 8),
('https://images.pexels.com/photos/1766477/pexels-photo-1766477.jpeg?w=800', 'STUDY_KIDS', 'Home office corner', 9),
('https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?w=800', 'OFFICE', 'Corporate project', 10)
ON CONFLICT DO NOTHING;

-- Insert sample reviews (approved)
INSERT INTO reviews (product_id, customer_name, customer_phone, rating, body, is_approved) VALUES
((SELECT id FROM products WHERE slug = 'executive-office-chair'), 'Muhammad Ali', '0300-1234567', 5, 'Excellent quality chair! The leather is premium and very comfortable for long hours. Worth the price.', true),
((SELECT id FROM products WHERE slug = 'sofa-set-7seater'), 'Fatima Khan', '0321-7654321', 5, 'Beautiful sofa set. The velvet quality is outstanding. Delivery was on time and assembly was free.', true),
((SELECT id FROM products WHERE slug = 'bed-king-sheesham'), 'Ahmed Hassan', '0345-9876543', 4, 'The bed is sturdy and the wood grain looks amazing. Storage drawers are very useful. Minor delay in delivery but worth it.', true),
((SELECT id FROM products WHERE slug = 'dining-set-6seater'), 'Sara Ahmed', '0333-5555555', 5, 'Exactly as pictured. The chairs are comfortable and table finish is premium. Royal Furniture exceeded expectations.', true),
((SELECT id FROM products WHERE slug = 'ergonomic-mesh-chair'), 'Usman Tariq', '0312-1111111', 4, 'Good value for money. The mesh back is breathable and lumbar support helps. Assembly took 20 minutes.', true),
((SELECT id FROM products WHERE slug = 'garden-swing-3seater'), 'Zainab Malik', '0346-2222222', 5, 'Perfect for our garden! The swing is smooth and the frame is solid. My kids love it.', true),
((SELECT id FROM products WHERE slug = 'center-table-wood'), 'Hassan Raza', '0300-3333333', 5, 'The sheesham wood quality is evident. Natural grain patterns make each piece unique. Highly recommend!', true),
((SELECT id FROM products WHERE slug = 'l-shape-sofa'), 'Ayesha Saddiqui', '0322-4444444', 4, 'Comfortable and stylish. Fits perfectly in our living room. The adjustable headrests are a nice touch.', true)
ON CONFLICT DO NOTHING;