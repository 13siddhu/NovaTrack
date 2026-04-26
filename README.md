# 🚀 NovaTrack: Smart Job Application Tracker

NovaTrack is a production-ready, full-stack job search management platform designed to help professionals organize their career journey. Track applications, visualize your progress with interactive analytics, and never miss a follow-up with automated reminders.

![Dashboard Mockup](https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426&ixlib=rb-4.0.3)

## ✨ Features

- **📊 Intelligent Dashboard**: Visualize your application funnel (Applied, Interview, Offer, Rejection) with dynamic charts.
- **📝 Application Management**: Complete CRUD functionality for tracking company details, roles, salaries, and links.
- **🔔 Smart Reminders**: Automated daily cron jobs that notify you when it's time to follow up with recruiters.
- **🔐 Secure Auth**: JWT-based authentication with password hashing and protected API routes.
- **🌓 Dark Mode**: Sleek, modern SaaS-style UI with full dark mode support.
- **📱 Responsive Design**: Fully optimized for desktop, tablet, and mobile viewing.

## 🛠 Tech Stack

### Frontend
- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **State Management**: [React Query (TanStack)](https://tanstack.com/query/latest)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend
- **Framework**: [NestJS](https://nestjs.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: [PostgreSQL (Neon)](https://neon.tech/)
- **Deployment**: [Vercel Serverless](https://vercel.com/)
- **Documentation**: [Swagger / OpenAPI](https://swagger.io/)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- A PostgreSQL instance (Local or Neon)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/novatrack.git
   cd novatrack
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` folder:
   ```env
   DATABASE_URL="your_postgresql_url"
   DIRECT_URL="your_direct_postgresql_url"
   JWT_SECRET="your_secret_key"
   CRON_SECRET="your_vercel_cron_secret"
   ```
   Initialize the database:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```
   Start the backend:
   ```bash
   npm run start:dev
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```
   Create a `.env.local` file in the `frontend` folder:
   ```env
   NEXT_PUBLIC_API_URL="http://localhost:3001"
   ```
   Start the frontend:
   ```bash
   npm run dev
   ```

## 🌍 Deployment

### Database
This project is optimized for **Neon.tech**. Simply create a project and use the provided pooled and direct connection strings.

### Vercel (Frontend & Backend)
1. **Backend**: 
   - Deploy the `backend` folder as a separate project.
   - Configure the environment variables (`DATABASE_URL`, `DIRECT_URL`, `JWT_SECRET`, `CRON_SECRET`).
   - Vercel will automatically detect `vercel.json` and set up the serverless functions and cron jobs.
2. **Frontend**:
   - Deploy the `frontend` folder.
   - Set `NEXT_PUBLIC_API_URL` to your backend's Vercel URL.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Built with ❤️ by Siddhartha
