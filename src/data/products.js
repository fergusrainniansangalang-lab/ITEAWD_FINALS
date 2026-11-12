/**
 * products.js
 * ============================================================
 * Comprehensive Japanese-Themed Product Catalog
 * 5 authentic Japanese products for each of the 7 required categories:
 * 1. Clothing (5)
 * 2. Grocery / Foods (5)
 * 3. Electronics (5)
 * 4. Shoes (5)
 * 5. Cleaning Supplies / Home Goods (5)
 * 6. Sports Equipment / Sports & Outdoors (5)
 * 7. Books (5)
 * Total: 35 items
 * ============================================================
 */

export const products = [
  // ─────────────────────────────────────────────────────────────
  // 1. CLOTHING (衣類) - 5 Japanese Apparel Products
  // ─────────────────────────────────────────────────────────────
  {
    id: 'prod-cloth-1',
    name: 'Tengoku Tokyo Artisan Haori Kimono Cardigan',
    category: 'clothing',
    categoryName: 'Clothing',
    price: 1850.00,
    originalPrice: 2200.00,
    rating: 4.9,
    reviewsCount: 342,
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'Authentic Japanese streetwear Haori jacket featuring intricate "天国東京" embroidered backpiece, relaxed draped fit, and premium silky breathable canvas fabric.',
    features: ['100% Traditional Cotton Blend', 'Embroidered Japanese Kanji Back Graphic', 'Open Front Kimono Draping', 'Unisex Harajuku Streetwear Silhouette'],
    inStock: true,
    sku: 'RJK-CL-001',
    isFeatured: true,
    badge: 'Trending in Tokyo'
  },
  {
    id: 'prod-cloth-2',
    name: 'Kojima Japanese Selvedge Raw Denim Jacket',
    category: 'clothing',
    categoryName: 'Clothing',
    price: 3450.00,
    originalPrice: 4100.00,
    rating: 4.8,
    reviewsCount: 189,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'Woven on vintage Toyoda shuttle looms in Kurashiki, Okayama. 14oz indigo selvedge denim that ages uniquely with every wear.',
    features: ['14oz Okayama Selvedge Denim', 'Hand-hammered Brass Hardware', 'Red Line Selvedge ID Detail', 'Custom Natural Indigo Dye'],
    inStock: true,
    sku: 'RJK-CL-002',
    isFeatured: false,
    badge: 'Artisan Crafted'
  },
  {
    id: 'prod-cloth-3',
    name: 'Kyoto Hand-Dyed Indigo Linen Yukata & Kaku-Obi Set',
    category: 'clothing',
    categoryName: 'Clothing',
    price: 2890.00,
    originalPrice: 3200.00,
    rating: 4.9,
    reviewsCount: 97,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'Traditional summer Yukata set complete with jacquard woven Kaku-Obi sash and matching drawstring Kinchaku pouch. Crafted for festival elegance.',
    features: ['100% Breathable Summer Linen', 'Complete Set: Yukata + Obi + Pouch', 'Traditional Kyoto Dye Technique', 'Easy Self-Tie Instructions Included'],
    inStock: true,
    sku: 'RJK-CL-003',
    isFeatured: false,
    badge: 'Festival Essential'
  },
  {
    id: 'prod-cloth-4',
    name: 'Ukiyo-e Wave Heavyweight Japanese Cotton Tee',
    category: 'clothing',
    categoryName: 'Clothing',
    price: 890.00,
    originalPrice: 1100.00,
    rating: 4.7,
    reviewsCount: 421,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=700&q=80'
    ],
    description: '280 GSM heavyweight spun Japanese combed cotton featuring Hokusai-inspired wave print with subtle gold metallic accents.',
    features: ['280 GSM Pre-Shrunk Heavy Cotton', 'Silkscreen Archival Japanese Graphic', 'Drop-Shoulder Boxy Cut', 'Reinforced Collar Seam'],
    inStock: true,
    sku: 'RJK-CL-004',
    isFeatured: false,
    badge: 'Popular'
  },
  {
    id: 'prod-cloth-5',
    name: 'Kurume Quilted Hanten Winter Loungewear Coat',
    category: 'clothing',
    categoryName: 'Clothing',
    price: 2490.00,
    originalPrice: 2950.00,
    rating: 4.9,
    reviewsCount: 156,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'Cozy traditional Japanese winter jacket padded with natural cotton floss. Keeps you wonderfully warm at home or outdoors.',
    features: ['Natural Cotton Floss Insulation', 'Hand-stitched Sashiko Pattern', 'Front Tie Closure', 'Lightweight Thermal Retention'],
    inStock: true,
    sku: 'RJK-CL-005',
    isFeatured: false,
    badge: 'Winter Special'
  },

  // ─────────────────────────────────────────────────────────────
  // 2. GROCERY / FOODS (食品) - 5 Japanese Culinary Products
  // ─────────────────────────────────────────────────────────────
  {
    id: 'prod-groc-1',
    name: 'Sapporo Premium Japanese Draft & Craft Soju Pack',
    category: 'grocery',
    categoryName: 'Grocery',
    price: 680.00,
    originalPrice: 820.00,
    rating: 4.9,
    reviewsCount: 652,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'Legendary Sapporo Premium Beer brewed with select malt and aromatic hops, paired with a miniature bottle of artisan distilled Japanese rice soju.',
    features: ['Brewed in Hokkaido, Japan', 'Crisp, Clean Finish & Rich Foam', 'Ideal with Ramen & Yakitori', 'Includes Chilled Glass Gift Set'],
    inStock: true,
    sku: 'RJK-FD-101',
    isFeatured: true,
    badge: 'Best Seller'
  },
  {
    id: 'prod-groc-2',
    name: 'Uji Ceremonial Grade First-Harvest Organic Matcha',
    category: 'grocery',
    categoryName: 'Grocery',
    price: 1150.00,
    originalPrice: 1400.00,
    rating: 5.0,
    reviewsCount: 284,
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'Stone-ground ceremonial green tea powder cultivated in the mist-veiled hills of Uji, Kyoto. Smooth, vibrant green, and rich in natural L-theanine.',
    features: ['100% Ceremonial Grade Tencha Leaves', 'Stone Ground in Kyoto', 'Zero Bitterness, Sweet Umami Note', 'Air-tight UV Shield Tin (40g)'],
    inStock: true,
    sku: 'RJK-FD-102',
    isFeatured: false,
    badge: 'Top Rated'
  },
  {
    id: 'prod-groc-3',
    name: 'Ichiran Hakata Tonkotsu Ramen Master Home Kit',
    category: 'grocery',
    categoryName: 'Grocery',
    price: 890.00,
    originalPrice: 1050.00,
    rating: 4.8,
    reviewsCount: 512,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'Experience the world-renowned Fukuoka Hakata tonkotsu broth at home. Includes firm straight noodles and Ichiran proprietary red seasoning powder.',
    features: ['5 Full Servings per Box', 'Authentic Fukuoka Tonkotsu Base', 'Original Secret Red Pepper Seasoning', 'Ready in 3 Minutes'],
    inStock: true,
    sku: 'RJK-FD-103',
    isFeatured: false,
    badge: 'Must Try'
  },
  {
    id: 'prod-groc-4',
    name: 'Tokyo Tokyo Banana & Pocky Japanese Snack Crate',
    category: 'grocery',
    categoryName: 'Grocery',
    price: 1250.00,
    originalPrice: 1500.00,
    rating: 4.9,
    reviewsCount: 378,
    image: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'Curated gift box with 15 limited edition Japanese treats: Tokyo Banana sponge cakes, Sakura Matcha KitKats, Strawberry Pocky, and salty Senbei crackers.',
    features: ['15 Assorted Authentic Japanese Snacks', 'Limited Seasonal Sakura Editions', 'Direct Import from Tokyo Confectioneries', 'Custom Decorative Gift Box'],
    inStock: true,
    sku: 'RJK-FD-104',
    isFeatured: false,
    badge: 'Gift Choice'
  },
  {
    id: 'prod-groc-5',
    name: 'Kagoshima A5 Wagyu Dashi & Furikake Rice Seasoning',
    category: 'grocery',
    categoryName: 'Grocery',
    price: 740.00,
    originalPrice: 890.00,
    rating: 4.7,
    reviewsCount: 165,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'Gourmet crispy rice topping infused with real freeze-dried Kagoshima A5 Wagyu beef bits, toasted sesame, and kombu seaweed umami crunch.',
    features: ['Real A5 Japanese Wagyu Beef Flakes', 'Kombu Kelp & Bonito Umami Profile', 'No Artificial Preservatives', 'Elevates Rice, Noodles & Salads'],
    inStock: true,
    sku: 'RJK-FD-105',
    isFeatured: false,
    badge: 'Gourmet'
  },

  // ─────────────────────────────────────────────────────────────
  // 3. ELECTRONICS (電子機器) - 5 Japanese Tech Innovations
  // ─────────────────────────────────────────────────────────────
  {
    id: 'prod-elec-1',
    name: 'Sony WH-1000XM5 Hi-Res Noise-Cancelling Headphones',
    category: 'electronics',
    categoryName: 'Electronics',
    price: 18990.00,
    originalPrice: 20990.00,
    rating: 4.9,
    reviewsCount: 890,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'Engineered in Tokyo with dual processors and 8 microphones for industry-leading noise cancellation, LDAC Hi-Res Wireless, and 30-hour battery life.',
    features: ['Integrated Processor V1 + QN1', 'Auto NC Optimizer & 8 Microphones', 'Ultra-comfortable Lightweight Design', 'Speak-to-Chat & Multipoint Connection'],
    inStock: true,
    sku: 'RJK-EL-201',
    isFeatured: false,
    badge: 'Award Winner'
  },
  {
    id: 'prod-elec-2',
    name: 'Nintendo Switch OLED Model Mario Red Edition',
    category: 'electronics',
    categoryName: 'Electronics',
    price: 16490.00,
    originalPrice: 17990.00,
    rating: 5.0,
    reviewsCount: 1120,
    image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'Kyoto-crafted handheld gaming console with a vibrant 7-inch OLED screen, wide adjustable stand, enhanced audio, and 64GB internal storage.',
    features: ['7-inch Vibrant OLED Screen', 'Wide Adjustable Stand for Tabletop Mode', 'Wired LAN Port in Dock', 'Enhanced Onboard Audio'],
    inStock: true,
    sku: 'RJK-EL-202',
    isFeatured: false,
    badge: 'Hot Seller'
  },
  {
    id: 'prod-elec-3',
    name: 'Zojirushi Neuro Fuzzy Micom Smart Rice Cooker 1.0L',
    category: 'electronics',
    categoryName: 'Electronics',
    price: 11990.00,
    originalPrice: 13500.00,
    rating: 4.9,
    reviewsCount: 420,
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'Made in Japan. Features advanced Neuro Fuzzy logic technology that micro-adjusts temperature and heating time for flawless Japanese rice every batch.',
    features: ['Made in Japan with Neuro Fuzzy Tech', 'Multiple Settings: White, Sushi, Porridge', 'Spherical Inner Cooking Pan & Heating', 'Keep Warm & Reheat Functions'],
    inStock: true,
    sku: 'RJK-EL-203',
    isFeatured: false,
    badge: 'Chef Choice'
  },
  {
    id: 'prod-elec-4',
    name: 'Audio-Technica AT-LP120XUSB Direct-Drive Turntable',
    category: 'electronics',
    categoryName: 'Electronics',
    price: 17800.00,
    originalPrice: 19500.00,
    rating: 4.8,
    reviewsCount: 231,
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'Tokyo precision audio engineering. Direct-drive DC servo motor with selectable phono pre-amplifier and USB output to digitize vinyl records.',
    features: ['Direct-drive High-torque DC Motor', 'AT-VM95E Dual Magnet Cartridge', 'Built-in Switchable Phono Pre-amp', 'USB Output for Direct PC Recording'],
    inStock: true,
    sku: 'RJK-EL-204',
    isFeatured: false,
    badge: 'Audiophile'
  },
  {
    id: 'prod-elec-5',
    name: 'Panasonic Nanoe Moisture Infusion Hair Dryer EH-NA65',
    category: 'electronics',
    categoryName: 'Electronics',
    price: 6490.00,
    originalPrice: 7200.00,
    rating: 4.8,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'Patented Japanese Nanoe moisture technology pulls water molecules from the air, infusing 1,000x more moisture into hair while drying.',
    features: ['Nanoe Moisture Particle Generator', 'Quick-dry Nozzle for Fast Uniform Airflow', '3 Speed & 3 Temperature Modes', 'Cold-shot Button to Lock Hairstyle'],
    inStock: true,
    sku: 'RJK-EL-205',
    isFeatured: false,
    badge: 'Beauty Tech'
  },

  // ─────────────────────────────────────────────────────────────
  // 4. SHOES (履物) - 5 Japanese Footwear Products
  // ─────────────────────────────────────────────────────────────
  {
    id: 'prod-shoe-1',
    name: 'Asics Gel-Kayano 14 Japanese Edition Running Shoes',
    category: 'shoes',
    categoryName: 'Shoes',
    price: 8990.00,
    originalPrice: 10490.00,
    rating: 4.9,
    reviewsCount: 468,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'Iconic retro-futuristic runner conceived in Kobe, Japan. Features segmented GEL technology cushioning and metallic silver Japanese accents.',
    features: ['Original 2008 Running Silhouette', 'GEL Technology Cushioning System', 'TRUSSTIC Support System', 'Breathable Metallic Mesh Upper'],
    inStock: true,
    sku: 'RJK-SH-301',
    isFeatured: true,
    badge: 'Iconic Style'
  },
  {
    id: 'prod-shoe-2',
    name: 'Onitsuka Tiger Mexico 66 Heritage Leather Sneakers',
    category: 'shoes',
    categoryName: 'Shoes',
    price: 6490.00,
    originalPrice: 7200.00,
    rating: 4.9,
    reviewsCount: 520,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'The pinnacle of Japanese athletic heritage. First debuted for the 1968 Olympic trials in Mexico with soft white leather and classic red/blue stripes.',
    features: ['Premium Japanese Cowhide Leather', 'Signature Heel Cross Reinforcement', 'OrthoLite Insole Cushioning', 'Ultra-low Profile Rubber Sole'],
    inStock: true,
    sku: 'RJK-SH-302',
    isFeatured: false,
    badge: 'Classic'
  },
  {
    id: 'prod-shoe-3',
    name: 'Mizuno Wave Rider 27 Japanese Performance Runner',
    category: 'shoes',
    categoryName: 'Shoes',
    price: 7890.00,
    originalPrice: 8900.00,
    rating: 4.8,
    reviewsCount: 198,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'Osaka-developed marathon shoe featuring Mizuno Enerzy foam and the bio-based Wave Plate for smooth transition and unmatched energy return.',
    features: ['Mizuno Enerzy Foam Midsole', 'Castor Bean Wave Plate Stabilization', 'Seamless Jaquard Mesh Upper', 'X10 Durable Carbon Rubber Outsole'],
    inStock: true,
    sku: 'RJK-SH-303',
    isFeatured: false,
    badge: 'Pro Runner'
  },
  {
    id: 'prod-shoe-4',
    name: 'Traditional Paulownia Kiri Wood Geta Sandals',
    category: 'shoes',
    categoryName: 'Shoes',
    price: 1850.00,
    originalPrice: 2200.00,
    rating: 4.7,
    reviewsCount: 85,
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'Hand-carved from lightweight Japanese Kiri (paulownia) wood with soft velvet Hanao thong straps. Produces the melodious "karankoron" sound.',
    features: ['Natural Lightweight Paulownia Wood', 'Cushioned Velvet Hanao Thong', 'Rubber Base Grips on Teeth', 'Pairs with Yukata and Kimono'],
    inStock: true,
    sku: 'RJK-SH-304',
    isFeatured: false,
    badge: 'Traditional'
  },
  {
    id: 'prod-shoe-5',
    name: 'Tabi Split-Toe Japanese Streetwear Ninja Sneakers',
    category: 'shoes',
    categoryName: 'Shoes',
    price: 3690.00,
    originalPrice: 4200.00,
    rating: 4.8,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'Modernized Jika-Tabi split-toe design with flexible vulcanized rubber sole and heavy canvas upper for tactile balance and distinct Harajuku flair.',
    features: ['Biomechanical Split-Toe Construction', 'Heavy Duty Black Canvas Upper', 'Slip-Resistant Vulcanized Sole', 'Hidden Kohaze Brass Fasteners'],
    inStock: true,
    sku: 'RJK-SH-305',
    isFeatured: false,
    badge: 'Avant-Garde'
  },

  // ─────────────────────────────────────────────────────────────
  // 5. CLEANING SUPPLIES / HOME GOODS (生活・清掃) - 5 Products
  // ─────────────────────────────────────────────────────────────
  {
    id: 'prod-clean-1',
    name: 'KAO Attack Bio-EX Antibacterial Japanese Laundry Detergent',
    category: 'cleaning',
    categoryName: 'Cleaning Supplies',
    price: 480.00,
    originalPrice: 580.00,
    rating: 4.9,
    reviewsCount: 780,
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'Japan #1 laundry brand. Powerful enzyme micro-capsules dissolve in cold water, eliminating stubborn odor-causing bacteria even in indoor drying.',
    features: ['99.9% Antibacterial Shield Formula', 'Odor-Eliminating Indoor Drying Tech', 'Cold-Water Fast Dissolving Beads', 'Crisp Sakura Fresh Scent'],
    inStock: true,
    sku: 'RJK-CL-401',
    isFeatured: false,
    badge: 'Japan #1'
  },
  {
    id: 'prod-clean-2',
    name: 'Kishu Binchotan White Charcoal Natural Air Purifier Set',
    category: 'cleaning',
    categoryName: 'Cleaning Supplies',
    price: 890.00,
    originalPrice: 1100.00,
    rating: 4.8,
    reviewsCount: 215,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'Genuine Kishu Wakayama oak Binchotan charcoal. Naturally purifies room air, balances humidity, and neutralizes odors without chemicals.',
    features: ['100% Authentic Kishu Oak Charcoal', 'Lasts up to 2 Years with Sun Recharges', 'Absorbs Formaldehyde & Odors', 'Handcrafted Natural Wooden Stand'],
    inStock: true,
    sku: 'RJK-CL-402',
    isFeatured: false,
    badge: 'Eco Friendly'
  },
  {
    id: 'prod-clean-3',
    name: 'Kiso Hinoki Cypress Natural Botanical Room & Linen Mist',
    category: 'cleaning',
    categoryName: 'Cleaning Supplies',
    price: 650.00,
    originalPrice: 780.00,
    rating: 4.9,
    reviewsCount: 164,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'Distilled from aromatic mountain cypress wood in Nagano, Japan. Brings the calming onsen forest atmosphere while sanitizing surfaces.',
    features: ['100% Pure Wild Hinoki Oil Extract', 'Natural Antibacterial & Antifungal', 'Zero Synthetic Fragrances or Alcohol', 'Safe for Children & Pets'],
    inStock: true,
    sku: 'RJK-CL-403',
    isFeatured: false,
    badge: 'Aromatherapy'
  },
  {
    id: 'prod-clean-4',
    name: 'Lion Charmy Magica Fast-Rinse Citrus Dish Detergent',
    category: 'cleaning',
    categoryName: 'Cleaning Supplies',
    price: 320.00,
    originalPrice: 390.00,
    rating: 4.7,
    reviewsCount: 390,
    image: 'https://images.unsplash.com/photo-1585751119414-ef2636f8aede?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1585751119414-ef2636f8aede?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'Nano-cleansing enzyme formula instantly decomposes oily grease into water-soluble nano particles, requiring only a fraction of water to rinse.',
    features: ['Nano-Cleansing Instant Oil Breakdown', 'Gentle on Sensitive Hands', 'Crisp Yuzu Citrus Infusion', 'Concentrated Refillable Bottle (600ml)'],
    inStock: true,
    sku: 'RJK-CL-404',
    isFeatured: false,
    badge: 'Value Pack'
  },
  {
    id: 'prod-clean-5',
    name: 'Traditional Japanese Shuro Palm Hearth Broom & Dustpan',
    category: 'cleaning',
    categoryName: 'Cleaning Supplies',
    price: 1450.00,
    originalPrice: 1700.00,
    rating: 4.9,
    reviewsCount: 110,
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'Wakayama palm bark fiber broom hand-tied with copper wire. Natural oils in palm fibers gently polish wooden floors as you sweep dust away.',
    features: ['Natural Shuro Palm Tree Fibers', 'Polishes Wood Without Scratching', 'Includes Harimi Persimmon Dustpan', 'Handmade Artisan Lifetime Tool'],
    inStock: true,
    sku: 'RJK-CL-405',
    isFeatured: false,
    badge: 'Handcrafted'
  },

  // ─────────────────────────────────────────────────────────────
  // 6. SPORTS EQUIPMENT (スポーツ用品) - 5 Japanese Sports Gear
  // ─────────────────────────────────────────────────────────────
  {
    id: 'prod-sport-1',
    name: 'Molten BG5000 FIBA Official Japanese Match Basketball',
    category: 'sports',
    categoryName: 'Sports Equipment',
    price: 5490.00,
    originalPrice: 6200.00,
    rating: 5.0,
    reviewsCount: 390,
    image: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'Hiroshima engineered top-grain natural leather game ball. Features signature 12-panel design with enhanced sweat-absorbing pebble texture.',
    features: ['FIBA Approved Game Ball', 'Genuine Premium Japanese Leather', 'Dual-Cushion Foam Backing', 'Optimal Tactile Moisture Control'],
    inStock: true,
    sku: 'RJK-SP-501',
    isFeatured: false,
    badge: 'FIBA Approved'
  },
  {
    id: 'prod-sport-2',
    name: 'Authentic Keishin Handcrafted Kendo Shinai Bamboo Sword',
    category: 'sports',
    categoryName: 'Sports Equipment',
    price: 2450.00,
    originalPrice: 2900.00,
    rating: 4.9,
    reviewsCount: 145,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'Selected Kyoto Madake 4-stave bamboo with deluxe cowhide leather fittings and Tsuba hand guard. Balanced for tournament and dojo training.',
    features: ['4-Stave Seasoned Madake Bamboo', 'Tournament Standard Size 39 (Men/Women)', 'Hand-stitched White Cowhide Fittings', 'Includes Tsuba & Rubber Dome Ring'],
    inStock: true,
    sku: 'RJK-SP-502',
    isFeatured: false,
    badge: 'Martial Arts'
  },
  {
    id: 'prod-sport-3',
    name: 'Butterfly Viscaria Arylate-Carbon Table Tennis Racket',
    category: 'sports',
    categoryName: 'Sports Equipment',
    price: 8490.00,
    originalPrice: 9600.00,
    rating: 4.9,
    reviewsCount: 278,
    image: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'Manufactured in Saitama, Japan. The world championship standard blade combining carbon speed with ALC softness for explosive spin and touch.',
    features: ['5-Ply Wood + 2-Ply Arylate Carbon', 'Dignics 05 Professional Rubber', 'FL Concave Ergonomic Handle', 'Official ITTF Match Stamp'],
    inStock: true,
    sku: 'RJK-SP-503',
    isFeatured: false,
    badge: 'Championship'
  },
  {
    id: 'prod-sport-4',
    name: 'Mizuno Fortius Tour-V Japanese Badminton Racket Set',
    category: 'sports',
    categoryName: 'Sports Equipment',
    price: 4990.00,
    originalPrice: 5800.00,
    rating: 4.8,
    reviewsCount: 182,
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'High-modulus carbon frame with Torayca M40J Japanese graphite. Delivers pinpoint smash accuracy and agile defense responses.',
    features: ['Torayca M40J Japanese Carbon Fiber', 'Even Balance 4U Weight (83g)', 'Aero Groove Frame Drag Reduction', 'Includes Thermal Carry Bag & Shuttles'],
    inStock: true,
    sku: 'RJK-SP-504',
    isFeatured: false,
    badge: 'High Speed'
  },
  {
    id: 'prod-sport-5',
    name: 'Nambu Tekki Japanese Cast Iron Kettlebell 16kg',
    category: 'sports',
    categoryName: 'Sports Equipment',
    price: 3890.00,
    originalPrice: 4500.00,
    rating: 4.9,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1586401100295-7a8096fd231a?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1586401100295-7a8096fd231a?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'Cast in Iwate Prefecture using 900-year-old Nambu iron methods. Ergonomic wide handle with unglazed matte grip for kettlebell swings and snatches.',
    features: ['Traditional Iwate Cast Iron Pour', 'Machined Flat Base for Stability', 'Smooth Non-abrasive Handle Grip', 'Rust-resistant Natural Urushi Coating'],
    inStock: true,
    sku: 'RJK-SP-505',
    isFeatured: false,
    badge: 'Heavy Duty'
  },

  // ─────────────────────────────────────────────────────────────
  // 7. BOOKS (書籍) - 5 Japanese Culture & Literature Books
  // ─────────────────────────────────────────────────────────────
  {
    id: 'prod-book-1',
    name: 'The Art of Washoku: Master Secrets of Japanese Home Cooking',
    category: 'books',
    categoryName: 'Books',
    price: 1290.00,
    originalPrice: 1550.00,
    rating: 4.9,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'Hardcover culinary guide to seasonal Japanese cooking, Dashi preparation, sashimi slicing knives, and UNESCO Intangible Cultural Heritage recipes.',
    features: ['Hardcover 320 Full-Color Pages', '120 Step-by-Step Authentic Recipes', 'Guide to Seasonal Ingredients & Umami', 'Foreword by Michelin 3-Star Master Chef'],
    inStock: true,
    sku: 'RJK-BK-601',
    isFeatured: false,
    badge: 'Culinary Masterpiece'
  },
  {
    id: 'prod-book-2',
    name: 'Genki: An Integrated Course in Elementary Japanese (3rd Edition)',
    category: 'books',
    categoryName: 'Books',
    price: 1890.00,
    originalPrice: 2200.00,
    rating: 5.0,
    reviewsCount: 940,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'The premier worldwide standard for learning Japanese. Complete textbook and workbook covering Hiragana, Katakana, Kanji, grammar, and audio dialogues.',
    features: ['Complete 3rd Edition with Digital Audio App', '23 Comprehensive Cultural Dialogue Units', '317 Essential Kanji with Stroke Orders', 'Includes Full Exercise Answer Key'],
    inStock: true,
    sku: 'RJK-BK-602',
    isFeatured: false,
    badge: 'Bestseller'
  },
  {
    id: 'prod-book-3',
    name: 'Masterpieces of Japanese Ukiyo-e Woodblock Prints (Folio Edition)',
    category: 'books',
    categoryName: 'Books',
    price: 2650.00,
    originalPrice: 3100.00,
    rating: 4.9,
    reviewsCount: 167,
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'Deluxe slipcased art folio compiling 200 rare woodblock prints by Hokusai, Hiroshige, and Utamaro with historical essays and color commentary.',
    features: ['Large Format Coffee Table Hardcover', 'Gold Foil Stamped Cloth Slipcase', 'High-definition 1200 DPI Restorations', 'Biographies of Edo-Period Print Masters'],
    inStock: true,
    sku: 'RJK-BK-603',
    isFeatured: false,
    badge: 'Collector Edition'
  },
  {
    id: 'prod-book-4',
    name: 'The Book of Tea by Kakuzo Okakura (Japanese Philosophy Edition)',
    category: 'books',
    categoryName: 'Books',
    price: 750.00,
    originalPrice: 900.00,
    rating: 4.8,
    reviewsCount: 228,
    image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'Timeless masterpiece exploring the aesthetic principles of Zen, Taoism, and the Japanese tea ceremony (Chado) as an art of everyday living.',
    features: ['Handcrafted Washi Paper Style Dustjacket', 'Unabridged Classic English & Japanese Text', 'Illustrations of Historical Tea Rooms', 'Compact Pocket Meditative Format'],
    inStock: true,
    sku: 'RJK-BK-604',
    isFeatured: false,
    badge: 'Classic Philosophy'
  },
  {
    id: 'prod-book-5',
    name: 'Tokyo Alleyways: Neon & Wood Architecture of Hidden Yokocho',
    category: 'books',
    categoryName: 'Books',
    price: 1590.00,
    originalPrice: 1850.00,
    rating: 4.9,
    reviewsCount: 185,
    image: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'Photographic voyage into the labyrinthine drinking alleys and Izakaya micro-bars of Shinjuku Golden Gai, Omoide Yokocho, and Yanaka.',
    features: ['240 High-Gloss Archival Color Plates', 'Bilingual English/Japanese Maps', 'Architecture Elevation Diagrams', 'Interviews with Master Bar Keepers'],
    inStock: true,
    sku: 'RJK-BK-605',
    isFeatured: false,
    badge: 'Architecture'
  }
];

export default products;
