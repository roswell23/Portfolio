# 👑 Roswell Cruz — Developer Portfolio

A modern, high-performance developer portfolio built with the **PERN stack** (PostgreSQL, Express, React, Node.js), Prisma ORM, and Vite. Features a refined dark glassmorphic design system with signature golden amber accents (`#f59e0b`), interactive showcases, responsive case studies, and a secure backend contact form API.

---

## 📁 Project Architecture & Folder Structure

```text
portfolio/
├── client/
│   ├── public/
│   │   ├── images/
│   │   │   ├── profile/
│   │   │   │   └── roswell-cruz.png        # Official portrait photo
│   │   │   └── projects/
│   │   │       ├── portfolio-preview.png   # Full portfolio UI preview
│   │   │       ├── todoflow-thumb.jpg      # TodoFlow case study thumbnail
│   │   │       ├── kapeniross-thumb.jpg    # Kapeniross Coffee thumbnail
│   │   │       └── genesis-thumb.jpg       # Genesis Prototype thumbnail
│   │   └── portfolio-preview.html          # Standalone preview mockup
│   ├── src/
│   │   ├── assets/                         # Static assets and graphics
│   │   ├── components/                     # Modular React UI components
│   │   │   ├── About.jsx                   # Profile card and bio
│   │   │   ├── Contact.jsx                 # Interactive contact form
│   │   │   ├── Footer.jsx                  # Brand footer and copyright
│   │   │   ├── Hero.jsx                    # Hero section with typewriter effect
│   │   │   ├── Navbar.jsx                  # Sticky responsive navigation
│   │   │   ├── ProjectCard.jsx             # Project showcase card
│   │   │   ├── Projects.jsx                # Featured case studies & gallery
│   │   │   ├── SkillCard.jsx               # Skill badge component
│   │   │   └── Skills.jsx                  # Categorized skills matrix
│   │   ├── hooks/
│   │   │   └── useTheme.js                 # Theme state and localStorage hook
│   │   ├── services/
│   │   │   └── api.js                      # Centralized REST API client
│   │   ├── utils/
│   │   │   └── constants.js                # App constants, links & asset paths
│   │   ├── App.jsx                         # Root application component
│   │   ├── index.css                       # Vanilla CSS design tokens & styling
│   │   └── main.jsx                        # React entry point
│   ├── .env.example                        # Client environment template
│   ├── .gitignore                          # Client git ignore rules
│   ├── index.html                          # HTML5 template with SEO & Open Graph
│   ├── package.json                        # Frontend dependencies & scripts
│   ├── package-lock.json                   # Deterministic dependency lock
│   └── vite.config.js                      # Vite bundler & reverse proxy config
├── server/
│   ├── prisma/
│   │   ├── migrations/                     # Prisma migration history
│   │   └── schema.prisma                   # PostgreSQL Prisma schema
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                       # Prisma client & pg Pool configuration
│   │   ├── controllers/
│   │   │   ├── messageController.js        # Contact message handler & email dispatcher
│   │   │   └── projectController.js        # Projects query controller
│   │   ├── middleware/
│   │   │   ├── errorHandler.js             # 404 & global exception middleware
│   │   │   ├── rateLimiter.js              # DDoS and submission rate limiters
│   │   │   └── validators.js               # Request payload validation
│   │   ├── routes/
│   │   │   ├── messages.js                 # POST /api/messages route
│   │   │   └── projects.js                 # GET /api/projects route
│   │   ├── services/
│   │   │   └── emailService.js             # Brevo HTTPS REST API notification service
│   │   ├── utils/
│   │   │   └── apiResponse.js              # Standardized API response formatters
│   │   ├── app.js                          # Express application setup & middleware
│   │   └── server.js                       # HTTP server entry point & shutdown handler
│   ├── .env.example                        # Server environment template
│   ├── .gitignore                          # Server git ignore rules
│   ├── migrate.js                          # Database initialization & seeding runner
│   ├── package.json                        # Backend dependencies & scripts
│   ├── package-lock.json                   # Deterministic dependency lock
│   └── schema.sql                          # Raw SQL DDL and seed records
├── .gitignore                              # Root repository ignore rules
└── README.md                               # Project documentation
```

---

## 🚀 Quick Start Guide

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **PostgreSQL**: Neon Cloud PostgreSQL or local PostgreSQL instance

---

### 1. Server Setup

Navigate into the `server` directory:

```bash
cd server
npm install
```

Configure your environment variables by copying `.env.example`:

```bash
cp .env.example .env
```

Edit `server/.env` with your credentials:

```ini
PORT=5000
CLIENT_URL=http://localhost:5173
DATABASE_URL="postgresql://username:password@hostname:5432/databasename?sslmode=require"
BREVO_API_KEY="xkeysib-..."
BREVO_SENDER="roswellcruz.dev@gmail.com"
NOTIFY_TO="roswellcruz.dev@gmail.com"
```

Initialize the database schema and seed default projects:

```bash
npm run db:init
```

Generate the Prisma Client:

```bash
npm run prisma:generate
```

Start the backend development server:

```bash
npm run dev
```

The API will be available at `http://localhost:5000`.

---

### 2. Client Setup

In a new terminal window, navigate into the `client` directory:

```bash
cd client
npm install
```

Configure environment variables:

```bash
cp .env.example .env
```

Start the Vite development server:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser. Vite proxies all `/api/*` requests to `http://localhost:5000` automatically during development.

To build the client for production:

```bash
npm run build
```

---

## 🔒 Security Best Practices Implemented

- **Secret Isolation**: Root `.gitignore` strictly excludes `.env` and `.env.*` files while permitting `.env.example` templates.
- **Helmet Headers**: Comprehensive HTTP security headers (CSP, HSTS, X-Frame-Options).
- **Dual Rate Limiting**: Global API rate limiting (200 req/15 min) and targeted contact form rate limiting (5 submissions/15 min per IP) to prevent spam.
- **Input Sanitization & Validation**: Server-side length checks, regex verification, and HTML character escaping.
- **Zero Blocked Ports**: Outbound email alerts use Brevo's HTTPS REST API over port 443, ensuring 100% compatibility with hosting providers like Render and Railway without SMTP port blocks.
- **Fail-Safe Fallbacks**: If the PostgreSQL backend is offline, the client frontend gracefully renders cached project data without crashing or showing blank layouts.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
