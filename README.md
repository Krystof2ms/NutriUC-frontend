# NutriUC Frontend

[![Project Status: Work in Progress](https://img.shields.io/badge/status-work--in--progress-amber.svg)](#)
[![Angular](https://img.shields.io/badge/Angular-22-dd0031.svg?logo=angular)](https://angular.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8.svg?logo=tailwindcss)](https://tailwindcss.com/)
[![Package Manager](https://img.shields.io/badge/package_manager-bun-fbf0df.svg?logo=bun)](https://bun.sh/)
[![Testing](https://img.shields.io/badge/tested_with-vitest-6e9f18.svg?logo=vitest)](https://vitest.dev/)

NutriUC is a web application for discovering and managing recipes and nutrition tips. This repository contains the Angular frontend, including its Express SSR host, client-side routes, API clients, and authenticated dashboard.

> [!NOTE]
> **Work in progress:** routes, API contracts, and features can change during development.

## Features

- Angular 22 standalone components, Signals, lazy-loaded routes, and client hydration.
- Angular SSR hosted by Express. `/` and `/login` are prerendered; other routes use client rendering.
- Recipe discovery with search, category filters, and cursor-based pagination.
- Authenticated user dashboard for profile, recipes, and tips.
- Cookie-based authentication requests and a route guard for dashboard routes.
- Client-side image cropping with Cropper.js web components.
- WebSocket event handling for dashboard user and recipe events.
- API types generated from the backend OpenAPI schema and Zod validation for application data/events.
- Tailwind CSS v4, Lucide icons, and `ngx-sonner` notifications.

## Architecture

The frontend uses REST for application data and a WebSocket for dashboard events. See [the architecture documentation](docs/architecture.md) for the frontend diagram, routing, rendering, and integration details.

## Technology

| Area | Technology |
|---|---|
| Framework | Angular `^22.1.0` |
| SSR | `@angular/ssr` `^22.2.0`, Express `^5.1.0` |
| Runtime and package manager | Bun `1.4.0` |
| Styling | Tailwind CSS `^4.1.12`, `@tailwindcss/postcss` |
| Icons and notifications | `@lucide/angular` `^1.48.0`, `ngx-sonner` `^3.1.0` |
| Reactive/event transport | RxJS `~7.8.0`, `rxjs/webSocket` |
| Image cropping | Cropper.js element packages `^2.3.1` |
| Validation and API types | Zod `^4.6.5`, `openapi-typescript` `^7.13.0` |
| Unit testing | Vitest `^4.0.8`, JSDOM `^28.0.0` |

See `package.json` for the complete dependency list and scripts.

## Project layout

```text
frontend/
├── docs/                         # Architecture documentation
├── public/                       # Static assets
├── src/
│   ├── app/
│   │   ├── config/               # API_URL injection token
│   │   ├── guards/               # Authentication route guard
│   │   ├── layouts/              # Public, dashboard, user, and recipe layouts
│   │   ├── pages/                # Public and dashboard route components
│   │   ├── providers/            # Route-scoped WebSocket event listeners
│   │   ├── services/             # API, auth, event, and toast services
│   │   ├── shared/               # Components, schemas, event parsing, utilities
│   │   ├── store/                # Signal-based theme state
│   │   ├── types/                # API-generated and application types
│   │   ├── app.config*.ts        # Browser and server providers
│   │   ├── app.routes*.ts        # Browser routes and SSR render modes
│   │   └── app.ts                # Root component
│   ├── environments/             # Development and production API URLs
│   ├── main.server.ts            # Angular server entry point
│   ├── main.ts                   # Browser entry point
│   ├── server.ts                 # Express SSR host
│   └── styles.css                # Global styles and Tailwind entry point
├── angular.json
├── package.json
└── tsconfig.json
```

## Getting started

### Prerequisites

- Bun `1.4.0` (declared package manager), or Node.js `>=22` with a compatible package manager.
- NutriUC backend API. Development defaults to `http://localhost:3000/api/v1`.

### Install dependencies

```bash
bun install
```

### Configure the API

Set `apiUrl` in `src/environments/environment.ts` for local development. Production replaces it with `src/environments/environment.prod.ts`, which currently uses the same-origin path `/api/v1`.

### Run the development server

```bash
bun run start
```

The Angular development server is available at `http://localhost:4200/`.

## Scripts

| Command | Description |
|---|---|
| `bun run start` | Start the Angular development server |
| `bun run build` | Build the application (production by default) |
| `bun run watch` | Build and watch using the development configuration |
| `bun run serve:ssr` | Run the built Express SSR server (`dist/frontend/server/server.mjs`) |
| `bun run test` | Run unit tests with Angular's unit-test builder and Vitest |
| `bun run generate:api` | Generate API types from `http://localhost:3000/openapi.json` |

## Documentation

- [Frontend architecture and Mermaid diagram](docs/architecture.md)
- [Angular documentation](https://angular.dev/)
