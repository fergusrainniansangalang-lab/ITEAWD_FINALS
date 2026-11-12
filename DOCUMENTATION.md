# ITEAWD-Finals Examination Documentation
**Project Title**: RaiJouKaKu (ライジョウカク) Authentic Japanese E-Commerce Platform  
**Course Code**: ITEAWD (Web Application Development)  
**Lead Developer / Student**: Fergus Rainnian Sangalang  
**Repository**: [https://github.com/fergusrainniansangalang-lab/ITEAWD_FINALS](https://github.com/fergusrainniansangalang-lab/ITEAWD_FINALS)  
**Submission Package**: `ITEAWD-Finals.zip` (without `node_modules` and `.git`)  

---

## 1. Overview of the Store & Concept

### 1.1 Store Identity: RaiJouKaKu (ライジョウカク)
**RaiJouKaKu** is an authentic Japanese lifestyle & retail digital store built specifically for the **ITEAWD Finals Examination**. Rooted in traditional craftsmanship and modern Tokyo street culture, the platform delivers direct access to genuine Japanese artisan goods, culinary staples, street apparel, cutting-edge electronics, and lifestyle goods.

- **Brand Motto**: *"Authentic Japanese Quality & Lifestyle"*
- **Design Philosophy**: Sakura aesthetic with soft petal blushes (`#F48FB1`, `#EC407A`, `#FCE4EC`), clean Japanese typography (`ライジョウカク`), balanced navigation, and responsive ergonomics.
- **Currency**: Philippine Peso (`₱`), with free domestic express shipping on orders over **₱999**.
- **Secret Administrator Console**: Five clicks on the Sakura flower icon on the Login card triggers the master administrator security prompt (`JAPANISLIFE`).

---

## 2. Seven Required Product Categories (35 Authentic Products)

In strict accordance with the final examination guidelines requiring 7 categories with 5 products per category:

| # | Category | Japanese Name | Products Included |
|---|---|---|---|
| **1** | **Clothing** | 衣類 (Irui) | • Tengoku Tokyo Artisan Haori Kimono Cardigan<br>• Kojima Japanese Selvedge Raw Denim Jacket<br>• Kyoto Silk Yukata Robe Set with Obi Belt<br>• Harajuku Graphic Heavyweight Sakura Hoodie<br>• Traditional Jinbei Summer Loungewear Set |
| **2** | **Grocery / Foods** | 食品 (Shokuhin) | • Sapporo Premium Japanese Draft & Craft Soju Pack<br>• Uji Ceremonial Grade Matcha Powder (Kyoto 100g)<br>• Maruhiro Tonkotsu Ramen Master Home Kit (5 Servings)<br>• Premium Wasabi Paste & Artisan Tamari Soy Sauce Set<br>• Hokkaido Milk White Chocolate Langue de Chat (18 Pcs) |
| **3** | **Electronics** | 電子機器 (Denshi Kiki) | • Sony WH-1000XM5 Tokyo Special Midnight Edition<br>• HHKB Happy Hacking Keyboard Professional Hybrid Type-S<br>• Audio-Technica AT-LP60XBT-USB Turntable<br>• Zojirushi Neuro Fuzzy Induction Rice Cooker (5.5-Cup)<br>• Fujifilm Instax Mini Evo Hybrid Instant Camera |
| **4** | **Shoes** | 靴 (Kutsu) | • Asics Gel-Kayano 14 Japanese Edition Running Shoes<br>• Mizuno Wave Rider 27 Tokyo Marathon Edition<br>• Traditional Hinoki Wood Geta Clogs<br>• Onitsuka Tiger Mexico 66 Deluxe Nippon Made<br>• Tabi Split-Toe Canvas Ninja High-Tops |
| **5** | **Cleaning Supplies / Home** | 清掃用品 (Seisou Youhin) | • Muji Ultrasonic Aroma Diffuser & Hinoki Wood Essential Oil<br>• Authentic Shuro Palm Fiber Traditional Japanese Broom<br>• Binchotan White Charcoal Natural Air Purifier Sticks<br>• Imabari Ultra-Soft Japanese Bath Towel Set<br>• Wabi-Sabi Ceramic Incense Burner & Sandalwood Sticks |
| **6** | **Sports Equipment** | スポーツ用品 (Supōtsu Youhin) | • Molten BG5000 Official FIBA Basketball (Japan Leather)<br>• Mizuno Pro Maple Wood Baseball Bat (Tokyo Edition)<br>• Shureido Kendo Shinai Bamboo Practice Sword<br>• Manduka PRO Yoga Mat Japanese Cherry Blossom Edition<br>• Japanese Cast Iron Kettlebell 16kg (Nanbu Tekki Finish) |
| **7** | **Books** | 書籍 (Shoseki) | • The Book of Five Rings (Go Rin No Sho) by Miyamoto Musashi<br>• Japanese Woodworking Tools: Their Tradition & Spirit<br>• Wabi-Sabi for Artists, Designers, Poets & Philosophers<br>• Tokyo Urban Sketching & Architectural Architecture Guide<br>• Genki: An Integrated Course in Elementary Japanese Set |

---

## 3. Platform Sitemap & Route Hierarchy

Engineered using the **Sangalang Quiz Route Standard**:

```
RaiJouKaKu Digital Storefront
├── Home (/)
│   ├── Sakura Top Banner & Navigation Header
│   ├── Centered Search Bar with Cart Quick-Badge
│   ├── Japanese Hero Showcase Carousel (< . . . > Controls)
│   ├── 7 Category Quick-Jump Icons Bar
│   ├── Featured Products Grid (Centered 3-Card Row matching reference)
│   └── Free Shipping & Authentic Sourcing Banners
│
├── Products Catalog (/ecommerce/products or /products)
│   ├── Department Filter Checklist (All 7 Categories)
│   ├── Typed Numeric Pricing Range (Min ₱ and Max ₱ inputs with auto-sync)
│   ├── Dynamic Slider with ₱0 - ₱15,000 Range
│   ├── Quick Price Filter Preset Chips (All, Under ₱1k, ₱1k-₱3k, ₱3k-₱5k, Over ₱5k)
│   ├── Live Keyword Search Engine
│   └── Multi-Criteria Sorting (Featured, Lowest Price, Highest Price, Top Rated)
│
├── Product Details (/ecommerce/product-details/:id or /product-details/:id)
│   ├── Dual High-Resolution Image Preview Gallery
│   ├── Dynamic Stock Status, SKU, and Rating Metrics
│   ├── Interactive Quantity Stepper (+ / -)
│   ├── Instant "Add to Cart" and "Buy Now" Checkout Triggers
│   ├── Key Specifications & Verified Customer Reviews
│   └── Related Japanese Category Recommendations
│
├── Cart (/ecommerce/cart or /cart)
│   ├── Interactive Line Items Table with Thumbnails
│   ├── Inline Stepper with Automatic Subtotal Recalculation
│   ├── Free Shipping Progress Indicator (Threshold: ₱999)
│   ├── Coupon Code Engine (FINALS20, SAKURA10)
│   └── Instant Order Summary with Tax and Shipping Breakdown
│
├── Checkout (/ecommerce/checkout or /checkout)
│   ├── 3-Step Guided Stepper:
│   │   ├── Step 1: Japanese / Domestic Shipping Address Form
│   │   ├── Step 2: Payment Gateway Selection (Credit Card, GCash / E-Wallet, Cash on Delivery)
│   │   └── Step 3: Order Review & Itemized Confirmation Summary
│   └── Sticky Real-Time Price Breakdown
│
├── Order Confirmation (/ecommerce/order-confirmation or /order-confirmation)
│   ├── Unique Order Identifier Generator (e.g., RJK-783921)
│   ├── Estimated Delivery Date Calculation (4 business days from order)
│   ├── 4-Stage Fulfillment Tracker (Placed → Processing → Shipped → Delivered)
│   ├── Itemized Receipt with Applied Discounts and Shipping
│   └── Built-In Browser Print Action
│
├── Customer Service (/pages/contact or /contact)
│   ├── Step-by-Step Problem / Dispute Filing Instructions (4 Guided Steps)
│   ├── Direct Message Support Form with Ticket ID Generator
│   └── Immediate Resolution Guarantee Notice
│
├── About Us (/pages/about or /about)
│   ├── Authentic Japanese Heritage & Sourcing Network (Tokyo, Kyoto, Okayama, Hokkaido)
│   ├── Four Guiding Principles (Shokunin, Monozukuri, Omotenashi, Mottainai)
│   └── Direct Link to Customer Support
│
├── Customer Portal (/authentication/login or /login)
│   ├── Customer Sign In / Register Tabs with Validation
│   ├── Quick Demo Account Autofill
│   └── 🌸 Secret Admin Gateway:
│       └── 5-Click Sakura Icon Trigger → Passcode: JAPANISLIFE → Admin Dashboard
│
└── Master Admin Dashboard (Secret Admin Console)
    ├── Overview KPI Metrics (Gross Revenue, Active Orders, Low Stock Alerts)
    ├── Inventory Management Table (35 Products stock status toggling)
    ├── Shipments & Logistics Tracking
    ├── Customer Support Ticket Resolution Queue
    └── Store System Configuration
```

---

## 4. Implemented Modules Summary

| Requirement | Module Name | Primary Path | Description & Features |
|---|---|---|---|
| **a** | **Login & Admin** | `/authentication/login` | Secure customer login card with tabbed registration, demo account autofill, and secret 5-click Sakura flower admin trigger unlocking the master administrative console (`JAPANISLIFE`). |
| **b** | **Home** | `/` | Responsive hero carousel with Japanese slide assets, navigation bar with pink sakura styling, centered search bar, 7 category icons, and centered 3 featured product cards matching the visual design. |
| **c** | **Product Listing** | `/ecommerce/products` | 35 authentic Japanese products with dual-mode pricing filter (typed number inputs for Min/Max + synchronized range slider), quick price preset chips, category checkboxes, keyword search, and sorting. |
| **d** | **Product Details** | `/ecommerce/product-details/:id` | Dynamic URL routing by product ID, photo gallery, item specifications, customer reviews, quantity stepper, "Add to Cart", and "Buy Now". |
| **e** | **Cart** | `/ecommerce/cart` | Full shopping table with thumbnail previews, item deletion, quantity increment/decrement, real-time subtotal, ₱999 free shipping meter, and coupon code support. |
| **f** | **Checkout** | `/ecommerce/checkout` | 3-step checkout stepper: shipping details validation, payment method selector (Card, GCash, COD), and itemized order review. |
| **g** | **Order Confirmation** | `/ecommerce/order-confirmation` | Generated `RJK-XXXXXX` order ID, calculated delivery ETA, 4-step progress tracker, full invoice table, and print functionality. |
| **h** | **Customer Service & About Us** | `/pages/contact` & `/pages/about` | Dedicated, separate pages: Customer Service has a 4-step problem resolution guide and direct message ticketing form; About Us features Japanese artisan sourcing and cultural pillars. |

---

## 5. Team Task Distribution Matrix

| Team Member / Role | Modules Handled | Specific Technical Responsibilities |
|---|---|---|
| **Fergus Rainnian Sangalang**<br>*(Lead Architect & Full-Stack Developer)* | Architecture, Routing, Admin Console, System Integration | Project scaffolding, Vite configuration, Sangalang Quiz route hierarchy (`paths.js`, `router.jsx`, `sitemap.js`), secret 5-click admin dashboard (`JAPANISLIFE`), build optimization, and GitHub deployment. |
| **Frontend Engineer** | Catalog & Storefront (Home, Products, Details) | Implementing `Home.jsx` carousel and centered featured cards, `ProductListing.jsx` with typed numeric price filter + slider, `ProductDetails.jsx` gallery, and 35-item Japanese catalog. |
| **UI/UX & Accessibility Specialist** | Layout, Header, Breakpoints & Theme | Crafting the RaiJouKaKu Sakura aesthetic, balanced 3-column header, centered pill search bar, responsive design for 430px, 867px, 1280px, and 1670px viewports with Material UI. |
| **Business Logic & State Engineer** | Cart, Checkout, Order Engine | Implementing `CartContext.jsx`, real-time subtotal calculations, ₱999 free shipping threshold, 3-step checkout stepper, order generator, and persistent `localStorage` management. |
| **QA & Content Strategist** | About Us, Customer Support, Documentation | Authoring dedicated `AboutUs.jsx` and `AboutContact.jsx`, validation testing, zero-error production build verification, and final PDF documentation. |

---

## 6. Responsive Viewport Standards

The application is engineered using Material UI responsive grid breakpoints, strictly verified at:
- **430px (Mobile)**: Drawer navigation, single-column product display, touch-friendly increment steppers, full-width checkout action buttons.
- **867px (Tablet)**: 2-column catalog grid, collapsible filter drawer, flexible header with search bar row.
- **1280px (Desktop / Laptop)**: 3-column product grid, sticky sidebar filters, full horizontal navigation bar with Sakura logo.
- **1670px (Ultrawide)**: 4-column balanced product grid with maximum container width boundaries preventing content distortion.

---

## 7. Submission Checklist & PDF Export Instructions

### 7.1 Submission Files
1. **GitHub Repository**: [https://github.com/fergusrainniansangalang-lab/ITEAWD_FINALS](https://github.com/fergusrainniansangalang-lab/ITEAWD_FINALS)
2. **Project Archive**: `ITEAWD-Finals.zip` (clean archive containing all source files, excluding `node_modules` and `.git`).
3. **Project Documentation**: Export this document (`DOCUMENTATION.md`) to PDF format as `ITEAWD-Finals-Documentation.pdf`.

### 7.2 How to Export this Documentation to PDF
1. **In VS Code / IDE**:
   - Install the *Markdown PDF* or *Markdown Preview Enhanced* extension.
   - Right-click anywhere in this file (`DOCUMENTATION.md`) and select **Markdown PDF: Export (pdf)**.
2. **In Chrome / Edge Browser**:
   - Open this file in any markdown viewer or via GitHub.
   - Press `Ctrl + P` (Print).
   - Set Destination to **Save as PDF**, paper size to **A4**, and click **Save**.
