# Spendwise

Spendwise is a web application designed to help users track their expenses and income in real time. It provides a clear, centralized view of personal finances, making it easier to monitor cash flow, understand spending habits, and make better financial decisions. The application also includes statistics and insights to give users a better overview of their financial activity.

🌐 **Live demo:** https://jobify-samhalera.vercel.app

📦 **Source code:** [GitHub](https://github.com/SamHalera/jobify-app)

## Context

I built Spendwise to better manage my own personal finances. Notes and banking apps quickly fell short — I wanted a single place to track both expenses and income in real time, organize every transaction clearly, and keep a consistent overview of where my money was going. The statistics page came later, when I realized I had no simple way to understand my spending habits and overall cash flow at a glance.

## Features

- **Wallets** - Create and manage Wallets defining a Global disposal amount
- **Expenses and incomes tracking** — Create and manage Expenses and Income via a Dashboard UI. Expenses and Incomes have a date of transactions and a status "passed", "upcoming". Define Fixed transactions automatically created each month
- **Statistics** — Visual KPIs: monthly activity chart based on global transactions, type of transaction (Income/Expense - Bank transfert, cheque, Bank Card, Cash)

## Routes

| Route | Description |
|---|---|
| `/dashboard` | Logged user homepage with global view on Wallets |
| `/dashboard/wallets/[id]` | Wallet page with transactions data|
| `/stats/` | KPIs and charts Transactions stats for each selected wallet|

## Prerequisites

- [Node.js](https://nodejs.org) >= 20
- [PostgreSQL](https://www.postgresql.org) >= 15 running locally
- Docker container (see ./docker-compose.yaml). You need to have Docker installed, or alternatively, PostgreSQL installed directly on your machine.**

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
cp .env.example .env
```

**4. Set up the database**

Create the `spendwise` database in PostgreSQL, then push the schema:

```bash
npx prisma db push
```

**5. Start the development server**

```bash
npm run dev
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


