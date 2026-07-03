# Royal Furniture

A modern furniture e-commerce website with product collections, custom order requests, cart and checkout flows, gallery pages, order tracking, and a protected admin dashboard.

## Features

- Responsive storefront for furniture categories and product details
- Cart, wishlist, checkout, and order confirmation flow
- Custom furniture request form with image uploads
- Gallery, search, contact, FAQ, and policy pages
- Admin dashboard for products, orders, requests, gallery, reviews, and settings
- PostgreSQL database with Prisma ORM and NextAuth admin login

## Tech Stack

- Next.js 13 App Router
- React 18 + TypeScript
- Tailwind CSS + shadcn/ui
- Prisma + PostgreSQL
- NextAuth.js
- Cloudinary for image uploads

## Installation

```bash
npm install
```

Copy the environment file and update the values:

```bash
cp .env.example .env.local
```

Prepare the database:

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

## Environment Variables

Required variables are listed in `.env.example`.

```env
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_WHATSAPP_NUMBER=
```

## Run Locally

```bash
npm run dev
```

Open `http://localhost:3000`.

Admin login is available at `http://localhost:3000/admin/login`.

## Build

```bash
npm run build
```

## Deploy on Vercel

Deploy the project to Vercel, add the same environment variables from `.env.example`, connect a PostgreSQL database, and run Prisma migrations before production use.
