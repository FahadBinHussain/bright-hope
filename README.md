# Bright Hope Charity Platform

A professional, high-class charity platform built with modern web technologies to facilitate donations, volunteer management, and impact reporting.

## 🔹 Tech Stack

- **Frontend**: Next.js 14 (App Router) with TypeScript
- **Styling**: Tailwind CSS + ShadCN UI for a sleek, modern design
- **Animations**: Framer Motion for smooth transitions and interactions
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with Google OAuth and email/password
- **Payments**: ShurjoPay payment gateway for secure donation processing
- **Caching**: Redis (Upstash) for performance and analytics
- **Deployment**: Vercel (Frontend) + Fly.io (Backend if needed)
- **Security**: Cloudflare for protection and performance

## 🔹 Core Features

- **Dynamic Donation System** – Secure payments, transaction history, and donor impact reports
- **AI-Powered Insights** – OpenAI GPT-4-generated charity impact reports for donors
- **SEO-Optimized Blog & Storytelling** – Share real impact stories and charity updates
- **Volunteer & Event Management** – Organize and track volunteers with an interactive dashboard
- **Real-time Analytics** – Live donation stats and community engagement data
- **Modern UI/UX** – High-end, responsive design with smooth animations and accessibility

## 🔹 Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- ShurjoPay merchant account
- Upstash Redis account
- Google OAuth credentials (for authentication)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bright-hope.git
   cd bright-hope
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in your database, ShurjoPay, NextAuth, and other credentials

4. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🔹 Project Structure

- `src/app` - Next.js App Router pages and API routes
- `src/components` - Reusable UI components
- `src/lib` - Utility functions and shared code
- `prisma` - Database schema and migrations
- `public` - Static assets

## 🔹 Deployment

The application is configured for easy deployment to Vercel:

```bash
npm run build
```

## 🔹 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🔹 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔹 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.com/)
- [Prisma](https://www.prisma.io/)
- [NextAuth.js](https://next-auth.js.org/)
- [ShurjoPay](https://shurjopay.com.bd/)
- [Upstash Redis](https://upstash.com/)
