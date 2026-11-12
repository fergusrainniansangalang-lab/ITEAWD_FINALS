# ITEAWD-Finals: ApexMart Web Application

**ApexMart** is a modern, high-performance e-commerce web application engineered for the **ITEAWD Finals Examination**. It provides a unified digital storefront for a start-up retail company spanning seven distinct departments.

---

## 📋 Project Information
- **Course**: Web Application Development (ITEAWD)
- **Examination**: Finals Examination
- **Project Name**: `ITEAWD-Finals` (ApexMart)
- **Architecture Pattern**: Modeled after the **Sangalang Quiz / Seatwork Route & Sitemap Standard**
- **Styling Policy**: Pure CSS / External Stylesheet (SCSS strictly omitted per guidelines)

---

## 🏪 Store Concept & Categorization
ApexMart features curated inventory across the 7 required verticals:
1. **Electronics**: Premium ANC wireless headphones, 4K ultra-wide curved monitors, mechanical keyboards.
2. **Shoes**: Carbon-plated racing sneakers, handcrafted Italian leather oxfords, all-terrain waterproof hiking boots.
3. **Cleaning Supplies**: Eco-friendly botanical starter sets with amber sprayers, 360 spin mops with foot wringers.
4. **Sports Equipment**: Adjustable quick-dial dumbbells (5-52.5 lbs), high-density alignment yoga mats.
5. **Grocery**: Single-origin Ethiopian specialty coffee beans, cold-pressed Greek extra virgin olive oil.
6. **Clothing**: Extra-fine Australian merino wool knit sweaters, 14oz Japanese raw selvedge denim jackets.
7. **Books**: Software engineering essentials (*Designing Data-Intensive Applications*, *Clean Code*).

---

## 🗂️ Folder Structure
```
ITEAWD-Finals/
├── index.html                       # HTML Entry point with typography links
├── package.json                     # Project manifest and scripts
├── vite.config.js                   # Vite configuration with aliases (@, components, routes, etc.)
├── src/
│   ├── main.jsx                     # DOM mount point
│   ├── App.jsx                      # Provider composition (Auth, Cart) and Router mount
│   ├── assets/
│   │   └── styles/
│   │       ├── main.css             # Tokens, resets, responsive queries (430px, 867px, 1280px, 1670px)
│   │       └── components.css       # Buttons, badges, forms, headers, footers
│   ├── components/                  # Reusable Components (Guideline iii)
│   │   ├── common/
│   │   │   ├── Navbar.jsx           # Responsive header, search bar, cart badge, user menu, mobile drawer
│   │   │   ├── Footer.jsx           # Multi-column footer with interactive Sitemap modal
│   │   │   ├── Breadcrumb.jsx       # Dynamic path breadcrumb
│   │   │   ├── RatingStars.jsx      # Reusable star rating with count
│   │   │   ├── Badge.jsx            # Category & status pill badge
│   │   │   ├── Button.jsx           # Multi-variant button
│   │   │   └── Modal.jsx            # Accessible dialog modal
│   │   ├── product/
│   │   │   ├── ProductCard.jsx      # Product card with price compare, badges, and quick add
│   │   │   ├── ProductGrid.jsx      # Multi-breakpoint product grid
│   │   │   └── ProductFilter.jsx    # Category filter, price slider, sort order
│   │   ├── cart/
│   │   │   ├── CartItem.jsx         # Stepper quantity & line item calculation
│   │   │   └── CartSummary.jsx      # Subtotal, shipping threshold, promo code, tax
│   │   ├── sitemap/
│   │   │   └── SitemapViewer.jsx    # Live visualization of Sangalang sitemap & paths
│   │   └── loading/
│   │       └── PageLoader.jsx       # Suspense fallback spinner
│   ├── context/
│   │   ├── AuthContext.jsx          # User authentication and demo user state
│   │   └── CartContext.jsx          # Shopping cart state with localStorage persistence
│   ├── data/
│   │   ├── categories.js            # 7 store categories
│   │   └── products.js              # Complete mock catalog
│   ├── layouts/
│   │   ├── MainLayout.jsx           # Navbar + Outlet + Footer
│   │   ├── EcommerceLayout.jsx      # E-Commerce customer layout
│   │   └── AuthLayout.jsx           # Clean authentication layout
│   ├── pages/
│   │   ├── Home.jsx                 # Hero, 7 category cards, featured items, promo banner
│   │   ├── ProductListing.jsx       # Catalog with search, filter sidebar, responsive grid
│   │   ├── ProductDetails.jsx       # Multi-image gallery, specs tab, reviews tab, related items
│   │   ├── Cart.jsx                 # Shopping cart table, promo coupon, empty state
│   │   ├── Checkout.jsx             # Address form, shipping speed, multi-payment methods
│   │   ├── OrderConfirmation.jsx    # Generated Invoice ID, tracking stepper, itemized receipt
│   │   ├── AboutContact.jsx         # Brand vision, team task distribution, contact form, FAQ
│   │   ├── Login.jsx                # Login form with one-click demo credentials
│   │   └── NotFound.jsx             # 404 handler
│   └── routes/
│       ├── paths.js                 # Sangalang Quiz paths and rootPaths
│       ├── sitemap.js               # Sangalang Quiz sitemap tree
│       └── router.jsx               # BrowserRouter with Suspense and nested routes
```

---

## 🚦 Sangalang Quiz Route & Path Mapping

| Page Module | Sangalang / Standard Route Path | Direct Alias | Component |
|---|---|---|---|
| **Home** | `/` or `/ecommerce/home` | `/` | `Home.jsx` |
| **Product Listing** | `/ecommerce/products` | `/products` | `ProductListing.jsx` |
| **Product Details** | `/ecommerce/product-details/:id` | `/product-details/:id` | `ProductDetails.jsx` |
| **Cart** | `/ecommerce/cart` | `/cart` | `Cart.jsx` |
| **Checkout** | `/ecommerce/checkout` | `/checkout` | `Checkout.jsx` |
| **Order Confirmation** | `/ecommerce/order-confirmation` | `/order-confirmation` | `OrderConfirmation.jsx` |
| **About / Contact Us** | `/pages/about-contact` | `/about-contact`, `/about`, `/contact` | `AboutContact.jsx` |
| **Login** | `/authentication/login` | `/login` | `Login.jsx` |

---

## 📱 Responsive Breakpoint Testing Guide
Tested and responsive according to the examination requirements:
- **430px (Mobile Portrait)**: Stacked single-column layouts, touch-friendly stepper buttons, and sliding drawer navigation.
- **867px (Tablet / Mobile Landscape)**: 2-column product grid, collapsible filter sidebar, adaptive summary box.
- **1280px (Desktop / Laptop)**: 3-4 column grid, sticky filter sidebar, multi-column navigation and footer.
- **1670px (Large Screen / Ultra-Wide)**: High-resolution container scaling up to 1600px width with 4-5 column product grid.

---

## 🔑 Promo Code & Demo Credentials
- **Demo Login**:
  - Email: `alex.morgan@example.com`
  - Password: `password123`
  - *Or click the "Auto-Fill" button on the Login page.*
- **Discount Coupons**:
  - `FINALS20`: 20% Discount across the entire order.
  - `APEX10`: 10% Discount across the entire order.
- **Free Shipping**:
  - Automatically triggered for orders over **$75.00**.

---

## 🛠️ Development & Production Commands
```bash
# Start development server
npm run dev

# Build for production (compiled with zero errors)
npm run build

# Preview production build locally
npm run preview
```

