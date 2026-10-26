# NutriUC - Architecture & System Design

> [!NOTE]
> **Project Status: Work in Progress (WIP)**  
> This documentation reflects the current and evolving architecture of NutriUC. Both the frontend and backend systems are actively under development.

---

## 1. System Overview

**NutriUC** is a health, nutrition, and recipe management web platform. This repository hosts the **Frontend Web Application**, built with Angular 22 (SSR + Client Hydration), communicating with a FastAPI asynchronous backend.

The architecture decouples the responsive user interface from heavy computational tasks (such as image resizing, optimization, and conversion to WebP) by utilizing background worker queues and real-time Server-Sent Events (SSE) to update the client asynchronously.

---

## 2. End-to-End Architecture

Below is the global architecture flow connecting the client frontend, the FastAPI runtime, the background queue/worker subsystem, and persistent storage:

---

## 4. Frontend Architecture (Focus)

The frontend is built on **Angular 22** with Server-Side Rendering (SSR) via Express and Client Hydration, designed around modern standalone components and fine-grained reactivity using Angular Signals.

### 4.1 Layered Architecture

```
src/
├── app/
│   ├── config/              # Injection tokens and runtime configs (API_URL)
│   ├── constants/           # Static theme, UI, and domain constants
│   ├── guards/              # Route protection and authorization checks (authGuard)
│   ├── layouts/             # Structural shell layouts (PublicLayout, DashboardUser)
│   ├── pages/               # Feature route pages (Public & Dashboard)
│   ├── services/            # API integration & business logic (Auth, User, Recipe, Tip, Category)
│   ├── shared/              # Reusable components, Zod schemas, utilities
│   ├── store/               # Lightweight signal-based application state (Theme store)
│   ├── types/               # Generated OpenAPI schema types, HTTP types, auth models
│   ├── app.config.ts        # Client application providers (HTTP, routing, hydration)
│   ├── app.config.server.ts # Server-side application configuration
│   ├── app.routes.ts        # Client routing configuration
│   └── app.ts               # Root component
├── environments/            # Environment configurations (API endpoints, dev/prod flags)
└── server.ts                # Express SSR server bootstrap
```

### 4.2 Key Architectural Patterns

#### 1. Reactivity with Angular Signals
The frontend leverages native Angular signals (`signal`, `computed`, `effect`) rather than heavy global state libraries.
- **Auth State**: `AuthService` exposes `currentUser = signal<UserSummaryMe | null>(null)` and derived computed signals (`isAuthenticated`).
- **Theme State**: `themeStore` dynamically tracks and updates dark/light preferences, updating DOM classes reactively.
- **Data Conversion**: Helper functions like `toDefaultSignal` bridge asynchronous RxJS observables into predictable signals with default fallback states.

#### 2. Strongly Typed API Communication
- API types are generated directly from the backend's OpenAPI specification (`openapi-typescript`), guaranteeing complete type safety across endpoints.
- Custom normalization wrapper (`normalizeApi`) encapsulates HTTP responses and standardizes success/error structures (`ApiError<T>`), avoiding unhandled client-side runtime errors.
- Authentication relies on secure HTTP-only cookies (`withCredentials: true`), preserving security tokens without exposing JWTs to JavaScript storage (`localStorage` / `sessionStorage`).

#### 3. Cursor-Based (Keyset) Pagination
Endpoints displaying high-volume datasets (such as `/recipes` and `/tips`) employ keyset pagination (`cursor`, `dir`, `limit`). The frontend services seamlessly manage directional pagination forward and backward without offset performance degradation.

#### 4. Media Cropping & Client Pre-processing
Avatar and recipe image uploads integrate modern web-component cropping (`@cropper/element-*`). The user crops and previews the image on the client before submitting, matching the backend worker's expected dimensions and WebP transformation requirements.

#### 5. Real-Time Server-Sent Events (SSE) Integration
The client establishes a resilient connection to `/events/events`. When asynchronous background workers finish optimizing user avatars or recipe images, the frontend receives immediate updates and refreshes the reactive image keys in the UI without requiring full page reloads.

#### 6. Route-Level Separation & Guards
- **Public Space**: Fast, SSR-rendered pages (`/`, `/recetas`, `/recetas/:id`) accessible to search engines and unauthenticated visitors.
- **Protected User Dashboard**: Guarded by `authGuard` ensuring authenticated sessions before resolving child routes (`/dashboard/user/*`). Nested routes provide profile management, personal creations, recipe editing, and health tips.

---

## 5. Technology Stack Summary

| Domain | Technology / Tool | Version / Details |
|---|---|---|
| **Framework** | Angular | `^22.1.0` (Signals, Standalone, Hydration) |
| **SSR Engine** | Angular SSR + Express | Express `^5.1.0`, `@angular/ssr` |
| **Package Manager** | Bun | `1.4.0` |
| **Styling** | Tailwind CSS | `^4.1.12` with `@tailwindcss/postcss` |
| **Icons** | Lucide Angular | `^1.48.0` |
| **Schema Validation**| Zod | `^4.6.5` |
| **Media Handling** | Cropper.js Web Elements | `@cropper/element-*` `^2.3.1` |
| **API Typings** | OpenAPI TypeScript | `^7.13.0` |
| **Testing** | Vitest + JSDOM | `^4.0.8` |
| **Backend API** | FastAPI / Python | Keyset search, async worker queue, SSE |
| **Database** | PostgreSQL | Version 18 with asyncpg pool |

---

## 6. Current Roadmap (WIP)

As the project is currently in progress, future architecture iterations will focus on:
- [ ] Completing end-to-end SSE event handling in the user dashboard.
- [ ] Expanding recipe creation forms with dynamic nutritional calculation helpers.
