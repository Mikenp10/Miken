# MLPVisuals

A luxury photography and videography platform built with Next.js, Supabase, Supabase Storage, and Stripe.

## Features

- Premium public website: home, portfolio, services, booking, and contact pages.
- Email/password and Google authentication through Supabase Auth.
- Client dashboard for booking history, payment state, private galleries, favorites, selections, and approved downloads.
- Admin dashboard for bookings, approvals, declines, reschedules, gallery creation, favorite review, payment visibility, and user/content management foundations.
- Stripe Checkout deposit flow and webhook payment tracking.
- Supabase PostgreSQL schema with RLS policies for profiles, bookings, payments, galleries, gallery assets, favorites, and download events.
- Architecture ready for subscriptions, print ordering, referrals, AI photo selection, and multi-photographer support.

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Apply `supabase/schema.sql` in your Supabase SQL editor, create a Storage bucket for gallery assets, and configure Stripe webhook forwarding to `/api/stripe/webhook`.
