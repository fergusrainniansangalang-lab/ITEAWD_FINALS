/**
 * ApexMart - Categories Catalog
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
    itemCount: 8,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    icon: 'Laptop',
    featured: true
  },
  {
    id: 'shoes',
    name: 'Shoes',
    slug: 'shoes',
    description: 'High-performance running sneakers, formal leather oxfords, and versatile trail footwear.',
    itemCount: 8,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    icon: 'Footprints',
    featured: true
  },
  {
    id: 'cleaning-supplies',
    name: 'Cleaning Supplies',
    slug: 'cleaning-supplies',
    description: 'Eco-conscious household cleaning concentrates, microfiber sets, and sanitizing solutions.',
    itemCount: 7,
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80',
    icon: 'Sparkles',
    featured: true
  },
  {
    id: 'sports-equipment',
    name: 'Sports Equipment',
    slug: 'sports-equipment',
    description: 'Professional training weights, yoga gear, hydration packs, and active accessories.',
    itemCount: 7,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
    icon: 'Trophy',
    featured: true
  },
  {
    id: 'grocery',
    name: 'Grocery',
    slug: 'grocery',
    description: 'Artisan roast coffee beans, organic olive oils, gourmet pantry staples, and healthy snacks.',
    itemCount: 7,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    icon: 'Apple',
    featured: true
  },
  {
    id: 'clothing',
    name: 'Clothing',
    slug: 'clothing',
    description: 'Timeless apparel, premium heavyweight cotton tees, breathable outerwear, and daily essentials.',
    itemCount: 8,
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80',
    icon: 'Shirt',
    featured: true
  },
  {
    id: 'books',
    name: 'Books',
    slug: 'books',
    description: 'Bestselling software engineering classics, personal development, business mastery, and design books.',
    itemCount: 7,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    icon: 'BookOpen',
    featured: true
  }
];

export default categories;

