<div align="center">

# 🐾 PetLife

### Your Pet's Health, Organized.

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

**A modern, full-stack pet health management platform designed to help pet owners track vaccinations, medications, vet visits, and daily care — all in one beautiful, intuitive interface.**

[View Demo](#demo) · [Features](#-features) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started)

</div>

---

## ✨ Features

### 🏥 Comprehensive Health Records
- **Vaccination Tracking** — Never miss a booster shot with complete vaccination history and upcoming reminders
- **Medication Logs** — Track medications, dosages, and schedules with flexible metadata storage
- **Vet Visit History** — Record appointments, notes, and veterinary recommendations
- **Weight Monitoring** — Visualize weight trends over time with interactive Recharts-powered graphs

### 🐕 Multi-Pet Management
- **Smart Pet Cards** — At-a-glance health scores calculated from vaccination completeness
- **Multi-Species Support** — Dogs, cats, rabbits, birds, reptiles, and more with species-specific data
- **Pet Profiles** — Complete profiles including breed, gender, neutered status, microchip ID, allergies, and photos

### 🧙‍♂️ Intuitive Pet Wizard
- **Multi-Step Onboarding** — Framer Motion-powered animated wizard for seamless pet registration
- **Breed Autocomplete** — Smart breed selection with searchable combobox
- **Photo Upload** — Drag-and-drop image dropzone with real-time preview

### ⚡ Quick Actions Dashboard
- **Log Medication** — One-click medication entry
- **Add Weight** — Quick weight recording with timestamp
- **Health Record Entry** — Streamlined forms with validation

### 🔔 Smart Reminders *(Coming Soon)*
- Automated vaccination reminders
- Medication schedule alerts
- Grooming and vet appointment notifications

### 🔐 Secure Authentication
- **NextAuth.js v5** — Latest authentication patterns with App Router support
- **OAuth Providers** — Google Sign-In integration
- **Credentials Auth** — Email/password with bcrypt hashing
- **Protected Routes** — Middleware-based route protection

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router & Server Components |
| **React 19** | Latest React with concurrent features |
| **TypeScript 5** | Type-safe development |
| **Tailwind CSS 4** | Utility-first styling with latest features |
| **Radix UI** | Accessible, unstyled UI primitives |
| **Framer Motion** | Smooth animations and page transitions |
| **Recharts** | Interactive data visualization for weight tracking |
| **Lucide React** | Beautiful, consistent iconography |

### Backend
| Technology | Purpose |
|------------|---------|
| **Next.js API Routes** | Serverless API endpoints |
| **Server Actions** | Type-safe server mutations |
| **Prisma ORM** | Type-safe database client |
| **PostgreSQL** | Relational database |

### Authentication & Validation
| Technology | Purpose |
|------------|---------|
| **NextAuth.js v5** | Authentication with OAuth & Credentials |
| **Zod v4** | Runtime schema validation |
| **React Hook Form** | Performant form handling |
| **bcryptjs** | Secure password hashing |

---

## 📁 Project Structure

```
pet-life/
├── prisma/
│   └── schema.prisma          # Database schema with Pet, HealthRecord, Reminder models
├── public/                    # Static assets
├── src/
│   ├── actions/              # Server Actions for mutations
│   │   ├── health-record.ts  # Health record CRUD operations
│   │   └── pet.ts            # Pet management actions
│   ├── app/
│   │   ├── (auth)/           # Authentication routes (login, signup)
│   │   ├── api/              # API routes
│   │   ├── dashboard/        # Protected dashboard pages
│   │   │   └── pets/         # Individual pet profile pages
│   │   ├── layout.tsx        # Root layout with providers
│   │   └── page.tsx          # Landing page
│   ├── components/
│   │   ├── dashboard/        # Dashboard-specific components
│   │   ├── modals/           # Modal dialogs (Add Pet, Health Record, etc.)
│   │   └── ui/               # Reusable UI components (shadcn/ui style)
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility libraries (Prisma client, utils)
│   ├── schemas/              # Zod validation schemas
│   └── types/                # TypeScript type definitions
├── components.json           # shadcn/ui configuration
├── next.config.ts            # Next.js configuration
└── tailwind.config.ts        # Tailwind CSS configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **PostgreSQL** database (local or cloud-hosted)
- **Yarn** package manager (or npm/pnpm)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pet-life.git
   cd pet-life
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Configure your `.env` file:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/petlife"

   # NextAuth
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"

   # OAuth Providers (optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. **Initialize the database**
   ```bash
   yarn prisma generate
   yarn prisma db push
   ```

5. **Start the development server**
   ```bash
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 📊 Database Schema

The application uses a well-structured relational schema:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│      User       │     │       Pet       │     │  HealthRecord   │
├─────────────────┤     ├─────────────────┤     ├─────────────────┤
│ id              │────<│ userId          │     │ id              │
│ email           │     │ id              │────<│ petId           │
│ name            │     │ name            │     │ type            │
│ password        │     │ species         │     │ title           │
│ emailVerified   │     │ breed           │     │ date            │
│ image           │     │ gender          │     │ notes           │
│ createdAt       │     │ birthDate       │     │ metadata (JSON) │
│ updatedAt       │     │ weight          │     │ createdAt       │
└─────────────────┘     │ photoUrl        │     └─────────────────┘
                        │ allergies[]     │
                        │ microchipId     │     ┌─────────────────┐
                        │ metadata (JSON) │     │    Reminder     │
                        └─────────────────┘────<├─────────────────┤
                                                │ id              │
                                                │ petId           │
                                                │ title           │
                                                │ dueDate         │
                                                │ isCompleted     │
                                                └─────────────────┘
```

**Enums:**
- `Species`: DOG, CAT, RABBIT, BIRD, REPTILE, OTHER
- `Gender`: MALE, FEMALE, UNKNOWN
- `HealthRecordType`: VACCINATION, MEDICATION, VISIT, OTHER

---

## 🎯 Roadmap

- [x] Core pet management (CRUD)
- [x] Health records with vaccination, medication, visits
- [x] Weight tracking with charts
- [x] Multi-step pet wizard with animations
- [x] OAuth authentication (Google)
- [x] Smart pet cards with health scores
- [ ] Push notification reminders
- [ ] Document/file attachments for health records
- [ ] Vet directory integration
- [ ] Pet activity timeline
- [ ] Multi-user household support
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ for pet lovers everywhere**

[⬆ Back to Top](#-petlife)

</div>
