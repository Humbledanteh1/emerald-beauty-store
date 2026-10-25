# Emerald Beauty Store

A premium, responsive beauty and skincare storefront built with Next.js, React, TypeScript and Tailwind CSS. The visual direction combines a clean marketplace shopping experience with a calm botanical aesthetic and the Emerald animated gradient.

## Features

- Responsive storefront and mobile navigation
- Product cards, category filters and live product search
- Shopping bag with quantity controls and subtotal calculation
- Favorites / wishlist interactions
- Email newsletter form UI
- USD pricing and complimentary-shipping threshold messaging
- Animated responsive Emerald canvas background with reduced-motion support
- Accessible button labels, dialog semantics and loading-friendly product imagery

## Run locally

Requirements: Node.js 18.17+.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm start
```

## Current implementation notes

This repository contains the storefront foundation and client-side shopping interactions. The checkout button is intentionally a placeholder until a payment provider and server-side order workflow are configured. Newsletter signup currently provides front-end confirmation only.

### Production integrations to add

1. **Database and inventory:** Supabase/PostgreSQL for products, stock, customers and orders.
2. **Authentication:** Supabase Auth for customer accounts and protected admin routes.
3. **Payments:** Stripe for USD checkout; create checkout sessions server-side and verify webhooks before marking orders paid.
4. **Operations:** Order history/tracking, shipping rates, tax configuration, admin product management and transactional email.
5. **Security:** Server-side validation, rate limiting, secure environment variables, authorization checks and webhook signature verification.

Never commit API keys or secrets. Add environment variables through your deployment provider.

## Deployment

Import this repository into Vercel, keep the default Next.js build settings, and deploy. Configure provider secrets in the Vercel project environment before enabling payments or customer data features.
