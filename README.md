# Spendwise

Spendwise is a web application designed to help users track their expenses and income in real time. It provides a clear, centralized view of personal finances, making it easier to monitor cash flow, understand spending habits, and make better financial decisions. The application also includes statistics and insights to give users a better overview of their financial activity.

🌐 **Live demo:** https://spendwise-samhalera.vercel.app

📦 **Source code:** [GitHub](https://github.com/SamHalera/spendwise)

## Context

I built Spendwise to better manage my own personal finances. Notes and banking apps quickly fell short — I wanted a single place to track both expenses and income in real time, organize every transaction clearly, and keep a consistent overview of where my money was going. The statistics page came later, when I realized I had no simple way to understand my spending habits and overall cash flow at a glance.

## Tech Stack

- **[Next.js 14](https://nextjs.org)** — App Router, Server Actions
- **[NextAuth v4](https://next-auth.js.org)** — Google OAuth authentication
- **[Prisma](https://www.prisma.io)** — ORM with PostgreSQL
- **[Tailwind CSS](https://tailwindcss.com)** + **[shadcn/ui](https://ui.shadcn.com)** — Styling and UI components
- **[Recharts](https://recharts.org)** — Charts and statistics
- **[Zustand](https://zustand-demo.pmnd.rs)** — Client state management
- **[Zod](https://zod.dev)** + **[React Hook Form](https://react-hook-form.com)** — Form validation

## Features

- **Wallets** — Create and manage wallets defining a global disposal amount
- **Expenses and incomes tracking** — Create and manage expenses and incomes via a dashboard UI. Transactions have a date and a status ("past", "upcoming"). Fixed transactions are automatically created each month
- **Statistics** — Visual KPIs: monthly activity chart based on global transactions, breakdown by type (Income/Expense) and payment method (Bank transfer, cheque, bank card, cash)
- **Authentication** — Sign in with Google via NextAuth

## Routes

| Route | Description |
|---|---|
| `/dashboard` | Logged user homepage with global view on wallets |
| `/dashboard/wallets/[id]` | Wallet page with transactions data |
| `/dashboard/stats` | KPIs and charts for each selected wallet |

## Prerequisites

- [Node.js](https://nodejs.org) >= 20
- [Docker](https://www.docker.com) (recommended) or [PostgreSQL](https://www.postgresql.org) >= 15 installed locally
- A [Google OAuth application](https://console.cloud.google.com) for authentication

## Installation

**1. Clone the repository**

```bash
git clone https://github.com/SamHalera/spendwise.git
cd spendwise
```

**2. Install dependencies**

```bash
yarn install
```

**3. Configure environment variables**

```bash
cp .env.exemple .env
```

Fill in the required variables:

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `DB_NAME` / `DB_USER` / `DB_PASSWORD` | Used by Docker Compose |
| `NEXTAUTH_SECRET` | Random secret for NextAuth (generate with `openssl rand -base64 32`) |
| `GOOGLE_CLIENT_ID` / `GOOGLE_SECRET` | Google OAuth credentials |
| `NEXT_PUBLIC_CURRENCY` | Currency label displayed in the UI |

**4. Start the database**

```bash
docker compose up -d
```

**5. Push the database schema**

```bash
npx prisma db push
```

**6. Start the development server**

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

