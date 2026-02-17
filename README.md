# IntelliBet

A media sentiment analysis tool for sports betting. Aggregates and analyzes sentiment from news and social media around NBA games to surface betting insights.

## Tech Stack

- **Framework:** Next.js 14, TypeScript, Tailwind CSS
- **AI/ML:** TensorFlow.js, sentiment analysis libraries
- **Auth:** NextAuth.js
- **Payments:** Stripe
- **Data Viz:** ApexCharts
- **Database:** Prisma ORM

## Features

- Real-time sentiment tracking for NBA games
- TensorFlow.js-powered sentiment classification
- Interactive charts and visualizations
- Stripe-integrated subscription model
- Secure authentication with NextAuth

## Getting Started

```bash
npm install
cp .env.example .env  # Add API keys for Stripe, NextAuth, etc.
npx prisma migrate dev
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## License

MIT
