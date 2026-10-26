# NutriUC - Frontend

[![Project Status: Work in Progress](https://img.shields.io/badge/status-work--in--progress-amber.svg)](#)
[![Angular](https://img.shields.io/badge/Angular-22-dd0031.svg?logo=angular)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8.svg?logo=tailwindcss)](#)
[![Package Manager](https://img.shields.io/badge/package_manager-bun-fbf0df.svg?logo=bun)](#)
[![Testing](https://img.shields.io/badge/tested_with-vitest-6e9f18.svg?logo=vitest)](#)

Frontend web application for **NutriUC**, a health and nutrition platform for sharing recipes and wellness tips. Built with **Angular 22** featuring Server-Side Rendering (SSR), Client Hydration, standalone components, and modern reactive signals.

> [!NOTE]
> **Project Status: Work in Progress (WIP)**  
> This project is under active development. Features and API contracts may evolve.

---

## 🌟 Key Features

- **Modern Angular 22 & SSR**: Built using standalone components, Angular Signals for state reactivity, and hydration enabled via Express SSR.
- **Recipe Discovery**: Browse and explore recipes with cursor-based (keyset) pagination, category filtering, and responsive search.
- **User Dashboard**: Protected area (`/dashboard/user`) for managing personal recipes, health tips, and profile information.
- **Client-Side Image Cropping**: Smooth in-browser cropping for user avatars and recipe banners using modern Web Components (`@cropper/element-*`).
- **Secure Cookie-Based Auth**: Full JWT authentication lifecycle (login, session validation, logout) using HTTP-only cookies and Angular route guards (`authGuard`).
- **Real-Time Integration (SSE)**: Architecture prepared to receive asynchronous task completion events (e.g., avatar and recipe WebP processing) via Server-Sent Events.
- **Tailwind CSS v4 & Lucide Icons**: Modern styling, custom animations, and a reactive theme switcher (Light / Dark mode).
- **End-to-End Type Safety**: Strongly-typed API schema directly generated from backend OpenAPI definitions (`openapi-typescript`).

---

## 🏗️ System Architecture

This repository contains the **Frontend** web client. It interfaces with an asynchronous **FastAPI** backend backed by PostgreSQL 18, local asset storage, background image workers (`asyncio.Queue` + Pillow), and an SSE notification manager.

```
+-----------------------------------------------------------+
|               Client Frontend (Angular 22)                |
|  - Standalone Components & Layouts (Public & Dashboard)   |
|  - Signal-based Stores & Normalized API Services          |
|  - Server-Side Rendering (Express) + Client Hydration     |
+-----------------------------+-----------------------------+
                              |
       +----------------------+----------------------+
       | HTTP Requests (Cookies: JWT)                | SSE Event Stream
       v                                             v
+-----------------------------+       +-----------------------------+
|    FastAPI REST Endpoints   |       |   SSE Dispatcher (/events)  |
+--------------+--------------+       +--------------+--------------+
               |                                     ^
               v                                     |
+-----------------------------+       +--------------+--------------+
|   PostgreSQL 18 (asyncpg)   |       | Async Image Workers (Pillow)|
+-----------------------------+       +-----------------------------+
```

> 📖 For full architectural diagrams, component flow, and backend details, check out the [Architecture Documentation](docs/architecture.md).

---

## 🛠️ Tech Stack

- **Framework**: [Angular 22](https://angular.dev/) (Standalone, SSR, Signals)
- **Runtime & Package Manager**: [Bun](https://bun.sh/) (`1.4.0`)
- **SSR Server**: Express 5 with `@angular/ssr` and `@angular/platform-server`
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/postcss`
- **Icons**: [Lucide Angular](https://lucide.dev/)
- **Validation**: [Zod](https://zod.dev/)
- **Image Cropper**: `@cropper/element-*`
- **Typings**: `openapi-typescript`
- **Unit Testing**: [Vitest](https://vitest.dev/) with JSDOM

---

## 📁 Project Structure

```
frontend/
├── docs/                     # Project documentation (Architecture, API guides)
│   └── architecture.md       # Detailed system & frontend architecture (WIP)
├── public/                   # Static assets (images, icons, robots.txt)
├── src/
│   ├── app/
│   │   ├── config/           # App tokens & configuration (API_URL)
│   │   ├── constants/        # Theme and layout constants
│   │   ├── guards/           # Route guards (authGuard)
│   │   ├── layouts/          # Layout shells (PublicLayout, DashboardUser)
│   │   ├── pages/            # Route pages (Root, Recetas, RecetaId, Login, Dashboard)
│   │   ├── services/         # API services (Auth, User, Recipe, Tip, Category)
│   │   ├── shared/           # Reusable components, schemas (Zod), and utilities
│   │   ├── store/            # Signal-based stores (Theme store)
│   │   ├── types/            # TypeScript definitions & generated API schemas
│   │   ├── app.config.ts     # Client app configuration & providers
│   │   ├── app.routes.ts     # Application route definitions
│   │   └── app.ts            # Root application component
│   ├── environments/         # Environment variables (dev, prod)
│   ├── main.server.ts        # Server entry point
│   ├── main.ts               # Browser client entry point
│   ├── server.ts             # Express SSR server setup
│   └── styles.css            # Global Tailwind CSS entry point
├── angular.json              # Angular CLI project configuration
├── package.json              # Dependencies and project scripts
└── tsconfig.json             # TypeScript configuration
```

---

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (version `^1.4.0` recommended) or [Node.js](https://nodejs.org/) (`>= 22.0.0`)
- Running instance of the NutriUC backend API (default: `http://localhost:3000`)

### Installation

Clone the repository and install dependencies using Bun:

```bash
bun install
```

*(Alternatively, you can use `npm install`)*

### Environment Setup

Inspect or configure the API URL in `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api', // Adjust to match your backend port/path
};
```

---

## 💻 Available Scripts

| Command | Description |
|---|---|
| `bun run start` (or `ng serve`) | Starts the development server at `http://localhost:4200/` with hot-reloading |
| `bun run build` (or `ng build`) | Compiles the production build into the `dist/` directory |
| `bun run watch` | Builds and watches for file changes in development mode |
| `bun run serve:ssr` | Runs the compiled Express Server-Side Rendering (SSR) bundle |
| `bun run test` (or `ng test`) | Runs unit tests using Vitest |
| `bun run generate:api` | Regenerates TypeScript API definitions from the backend OpenAPI schema |

---

## 🧪 Testing

Unit tests are executed with [Vitest](https://vitest.dev/):

```bash
bun run test
```

To run tests with code coverage or in watch mode, configure the corresponding Vitest flags via Angular CLI.

---

## 📄 Documentation

- [Detailed Architecture & Flowcharts](docs/architecture.md)
- [Angular Official Documentation](https://angular.dev/)
