/**
 * RaiJouKaKu - Categories Catalog
 * Maps directly to the 7 required store categories in the project requirements:
 * 1. Electronics
 * 2. Shoes
 * 3. Cleaning Supplies
 * 4. Sports Equipment
 * 5. Grocery
 * 6. Clothing
 * 7. Books
 */

export const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Next-gen smart gadgets, audiovisual devices, and workspace productivity gear.',
    itemCount: 5,
    image: '/images/products/electronics/Sony WH-1000XM5 Headphones.jpg',
    icon: 'Laptop',
    featured: true
  },
  {
    id: 'shoes',
    name: 'Shoes',
    slug: 'shoes',
    description: 'High-performance running sneakers, formal leather oxfords, and versatile trail footwear.',
    itemCount: 5,
    image: '/images/products/shoes/Color Canvas Sneakers.avif',
    icon: 'Footprints',
    featured: true
  },
  {
    id: 'cleaning-supplies',
    name: 'Cleaning Supplies',
    slug: 'cleaning-supplies',
    description: 'Eco-conscious household cleaning concentrates, microfiber sets, and sanitizing solutions.',
    itemCount: 5,
    image: '/images/products/cleaning/Chaise longue.avif',
    icon: 'Sparkles',
    featured: true
  },
  {
    id: 'sports-equipment',
    name: 'Sports Equipment',
    slug: 'sports-equipment',
    description: 'Professional training weights, yoga gear, hydration packs, and active accessories.',
    itemCount: 5,
    image: '/images/products/sports/Molten BG5000 Basketball.jpg',
    icon: 'Trophy',
    featured: true
  },
  {
    id: 'grocery',
    name: 'Grocery',
    slug: 'grocery',
    description: 'Artisan roast coffee beans, organic olive oils, gourmet pantry staples, and healthy snacks.',
    itemCount: 5,
    image: '/images/products/grocery/Certified Organic Green Yuzu Kosho Paste.webp',
    icon: 'Apple',
    featured: true
  },
  {
    id: 'clothing',
    name: 'Clothing',
    slug: 'clothing',
    description: 'Timeless apparel, premium heavyweight cotton tees, breathable outerwear, and daily essentials.',
    itemCount: 5,
    image: '/images/products/clothing/Heavy Weight Sweat Cocoon.avif',
    icon: 'Shirt',
    featured: true
  },
  {
    id: 'books',
    name: 'Books',
    slug: 'books',
    description: 'Bestselling software engineering classics, personal development, business mastery, and design books.',
    itemCount: 5,
    image: '/images/products/books/The Art of Washoku.jpg',
    icon: 'BookOpen',
    featured: true
  }
];

export default categories;

