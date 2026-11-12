# ITEAWD-Finals Examination Documentation
**Project Title**: ApexMart E-Commerce Web Application  
**Course Code**: ITEAWD (Web Application Development)  
**Submission Format**: ITEAWD-Finals  

---

## 1. Overview of the Store and its Product Categories

### 1.1 Store Identity & Concept
**ApexMart** is a modern, customer-centric multi-category e-commerce web platform created to address the scenario requirements of a start-up online store. The store's philosophy centers on delivering verified, high-quality products with transparent pricing, zero-latency cart recalculation, and a streamlined checkout flow.

### 1.2 The Seven Product Verticals
The store hosts seven comprehensive product categories:
1. **Electronics**: High-end consumer tech, noise-cancelling headphones, high-refresh studio monitors, and tactile mechanical keyboards.
2. **Shoes**: High-performance running footwear, carbon-plated race shoes, formal Italian leather oxfords, and all-weather trail boots.
3. **Cleaning Supplies**: Botanical non-toxic cleaning starter sets, amber glass refill sprayers, and microfiber spin mops.
4. **Sports Equipment**: Compact adjustable dumbbells, dual-textured alignment yoga mats, and home fitness gear.
5. **Grocery**: Specialty single-origin whole bean coffee, organic cold-pressed olive oils, and gourmet pantry goods.
6. **Clothing**: Extra-fine Australian merino wool sweaters, heavyweight cotton essentials, and Japanese raw selvedge denim.
7. **Books**: Classic and contemporary software craftsmanship titles, distributed systems architectures, and design reference texts.

---

## 2. Platform Sitemap

Modeled after the **Sangalang Quiz Route and Sitemap Hierarchy**:

```
Storefront
├── Home (/)
│   ├── Featured Categories Showcase
│   ├── Handpicked Best Sellers
│   └── Launch Promotion Banner (FINALS20)
│
├── Products (/ecommerce/products or /products)
│   ├── Department Filter Tabs (All 7 Categories)
│   ├── Dynamic Price Range Slider
│   ├── Real-Time Search Query Filter
│   └── Multi-Sort Selector (Price, Rating, Featured)
│
├── Product Details (/ecommerce/product-details/:id or /product-details/:id)
│   ├── Interactive Image Gallery & Zoom
│   ├── In-Stock / Pricing / Discount Indicators
│   ├── Quantity Stepper (+ / -)
│   ├── Add-to-Cart Action
│   ├── Key Specifications & Customer Reviews Tabs
│   └── Related Category Items
│
├── Cart (/ecommerce/cart or /cart)
│   ├── Line Items Table with Thumbnail & Stepper
│   ├── Real-Time Subtotal, Tax (8%), and Free Shipping Indicator ($75 threshold)
│   ├── Promo Code Discount Engine (FINALS20 / APEX10)
│   └── Empty State with Catalog Redirection
│
├── Checkout (/ecommerce/checkout or /checkout)
│   ├── Step 1: Shipping Destination Address
│   ├── Step 2: Delivery Speed Options (Standard / Express)
│   ├── Step 3: Payment Method (Credit Card, GCash/Wallet, COD)
│   └── Sticky Real-Time Order Summary
│
├── Order Confirmation (/ecommerce/order-confirmation or /order-confirmation)
│   ├── Unique Generated Order Identifier (e.g., APX-783921)
│   ├── 4-Stage Fulfillment Progress Stepper
│   ├── Itemized Purchase Receipt & Shipping Address Snapshot
│   └── Printable Receipt Action
│
├── About & Contact Us (/pages/about-contact or /about-contact)
│   ├── Company Vision & Project Scenario Background
│   ├── Task Distribution Matrix
│   ├── Interactive Contact Form with Validation
│   └── Headquarters, Hours, and Phone Details
│
└── Account Portal (/authentication/login or /login)
    ├── Email & Password Authentication Form
    ├── One-Click Demo Credentials Auto-Fill
    └── Protected Profile State with Sign-Out Action
```

---

## 3. Implemented Modules

| Requirement | Module Name | Implementation Summary |
|---|---|---|
| **a** | **Login** | Secure authentication container, email/password validation, demo auto-fill for testing, and session management via `AuthContext`. |
| **b** | **Home** | Hero section with call-to-actions, category card grid covering all 7 categories, featured carousel, and promotional banners. |
| **c** | **Product Listing** | Full catalog page featuring category filter buttons, price range slider, keyword search, sort dropdown, and responsive grid. |
| **d** | **Product Details** | Dynamic route matching with ID params, multi-image gallery preview, quantity controls, specifications/reviews tabs, and related products. |
| **e** | **Cart** | Persistent shopping cart with `localStorage`, item row steppers, coupon discount code integration, and free shipping progress tracker. |
| **f** | **Checkout** | 3-step checkout form covering shipping address, delivery speeds, payment selection (Card, GCash/Wallet, COD), and order compilation. |
| **g** | **Order Confirmation** | Confirmation hero with invoice number, tracking progress bar, itemized receipt with tax/discounts, and print trigger. |
| **h** | **About / Contact Us** | Store background, student team documentation, contact inquiry form with submission toast, FAQ, and customer service details. |

---

## 4. Task Distribution of Each Team Member

| Role / Team Member | Assigned Modules | Specific Responsibilities |
|---|---|---|
| **Team Leader / Lead Architect** | Architecture, Routing, System Integration | Project scaffolding, Vite configuration, Sangalang Quiz route hierarchy (`paths.js`, `router.jsx`, `sitemap.js`), and final compilation. |
| **Frontend Developer 1** | Storefront & Catalog (Home, Products, Details) | Implementing `Home.jsx`, `ProductListing.jsx`, `ProductDetails.jsx`, reusable `ProductCard`, `ProductGrid`, and `ProductFilter`. |
| **Frontend Developer 2** | Cart, Checkout, and Order Confirmation | Implementing `CartContext`, `Cart.jsx`, `CartItem`, `CartSummary`, `Checkout.jsx`, and `OrderConfirmation.jsx` with promo validation. |
| **UI/UX & CSS Specialist** | Responsive Styling & Layout Guidelines | Crafting `main.css` and `components.css` conforming strictly to standard CSS (no SCSS) and breakpoints (430px, 867px, 1280px, 1670px). |
| **QA, Auth & Documentation Lead** | Authentication, About/Contact, Project Docs | Implementing `Login.jsx`, `AboutContact.jsx`, `AuthContext`, demo credential autofill, README, and final PDF documentation. |

---

## 5. Responsive Design Standards
In compliance with project specifications, the layout has been tested across 4 critical viewports:
- **430px**: Optimized for mobile screens with a collapsible hamburger menu drawer, single-column product display, and full-width touch buttons.
- **867px**: Tablet layout utilizing a 2-column product grid and collapsible filter controls.
- **1280px**: Desktop layout with sticky sidebar filtration, 3-column catalog grid, and expanded navigation links.
- **1670px**: Ultrawide viewport scaling with enhanced container bounds up to 1600px and 4-column product displays.

