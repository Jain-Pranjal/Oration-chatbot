# 🤖 Oration - AI Career Counselor ChatBot

<div align="center">

![Oration Logo](/public/README.png)

**An intelligent AI-powered career counseling platform that provides personalized guidance, resume reviews, and career advice through interactive conversations.**

[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Live Demo](https://oration-chatbot.vercel.app) • [Contributing](CONTRIBUTING.md) • [Usage Video](https://www.loom.com/share/f13ccddb92a647cfbc7c383c2b5520b3?sid=ebf901dd-b33f-4334-a88f-41ecc81dbdc6)

</div>

---

## ✨ Features

- AI-powered career counseling with personalized advice
- Session management for organizing chats
- Dynamic avatars per session via DiceBear
- Persistent message history with auto-scrolling
- Secure authentication with Better Auth and email verification
- User profiles and protected routes
- Responsive, mobile-first design
- Modern UI using shadcn/ui and Framer Motion animations
- Professional landing page with hero, stats, pricing, and footer
- Type-safe API with tRPC and Drizzle ORM integration
- Real-time updates and robust error handling

---

## 🚀 Tech Stack

### Frontend

- **Framework**: [Next.js 15](https://nextjs.org/) - React framework with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) - Modern component library
- **Animations**: [Framer Motion](https://www.framer-motion.com/) - Animation library
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful icon library

### Backend & Database

- **API**: [tRPC](https://trpc.io/) - Type-safe API layer
- **Database**: [PostgreSQL](https://www.postgresql.org/) - Relational database
- **ORM**: [Drizzle](https://orm.drizzle.team/) - Type-safe ORM
- **Authentication**: [Better Auth](https://better-auth.com/) - Authentication library

### AI & External Services

- **AI Model**: [Google Generative AI](https://ai.google.dev/) - Gemini AI integration
- **Email**: [Resend](https://resend.com/) - Email service
- **Avatars**: [DiceBear](https://www.dicebear.com/) - Avatar generation
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics) - Usage analytics

### Development Tools

- **Package Manager**: [pnpm](https://pnpm.io/) - Fast package manager
- **Linting**: [ESLint](https://eslint.org/) - Code linting
- **Formatting**: [Prettier](https://prettier.io/) - Code formatting
- **Git Hooks**: [Husky](https://typicode.github.io/husky/) - Git hooks
- **Testing**: [Lint-staged](https://github.com/okonet/lint-staged) - Pre-commit hooks

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.0 or higher
- **pnpm**: Package manager
- **PostgreSQL**: Database server
- **Git**: Version control system

```bash
# Check versions
node --version  # Should be 18.0+
pnpm --version  # Should be installed
git --version   # Should be installed
```

---

## 🛠️ Getting Start

### 1. Clone the Repository

```bash
git clone https://github.com/Jain-Pranjal/Oration-chatbot.git
cd oration-chatbot
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Setup

Set up environment variables by copying the **.env.example** file to **.env.local** and filling in the necessary details.

```bash
# Database
cp .env.example .env.local
```

### 4. Database Setup

```bash
# Push database schema
pnpm db:push

# Optional: Open database studio
pnpm db:studio
```

### 5. Development Server

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

---

## 📁 Project Structure

```
oration-chatbot/
├── app/                    # Next.js App Router (auth, main, api, etc.)
├── components/             # UI components (global, ui)
├── db/                     # Database (index.ts, schema.ts)
├── lib/                    # Utilities (ai, auth, utils, etc.)
├── modules/                # Feature modules (auth, chat, landing)
├── trpc/                   # tRPC setup (client, routers, server)
├── public/                 # Static assets (images, favicon)
├── .env.example            # Environment template
├── drizzle.config.ts       # DB config
├── next.config.ts          # Next.js config
├── package.json            # Dependencies
├── tailwind.config.ts      # Tailwind config
├── tsconfig.json           # TypeScript config
└── README.md               # Documentation
```

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

If you have any questions or need help:

- **Issues**: [GitHub Issues](https://github.com/Jain-Pranjal/Oration-chatbot/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Jain-Pranjal/Oration-chatbot/discussions)
- **Email**: pranjalworkon@gmail.com

---

<div align="center">

**Made with ❤️ by [Pranjal Jain](https://github.com/Jain-Pranjal)**

⭐ Star this repository if you find it helpful!

</div>
