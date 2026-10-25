# Production launch checklist

- [ ] Create a Supabase project and apply `supabase/schema.sql`.
- [ ] Seed real products, accurate USD prices, inventory counts, and licensed product imagery.
- [ ] Configure `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `APP_URL`, and Supabase variables in the deployment environment.
- [ ] Implement and verify a Stripe webhook before treating an order as paid. The checkout session redirect alone is not proof of payment.
- [ ] Persist orders only after validating the Stripe webhook signature; make webhook handling idempotent.
- [ ] Implement customer authentication, account pages, order history, and protected admin APIs.
- [ ] Add inventory reservation/decrement logic and refund/cancellation handling.
- [ ] Confirm shipping zones, tax rules, returns policy, privacy policy, and terms for the markets you serve.
- [ ] Add transactional email, monitoring, rate limiting, backups, and abuse protection.
- [ ] Test mobile layouts, keyboard navigation, payment success/cancel flows, and production build.
- [ ] Replace demo product copy/images with approved, accurate product data.
