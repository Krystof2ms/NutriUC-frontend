import { Routes } from '@angular/router';
import { authGuard } from './guards/auth/auth-guard';
import { dashboardIndexGuard } from './guards/dashboard/dashboard-index-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/public/public-layout').then((m) => m.PublicLayout),
    children: [
      {
        path: '',
        data: {
          title: 'Nutri UC | Alimentación saludable',
          description:
            'Alimentación saludable para estudiantes universitarios: recetas, consejos y recursos prácticos.',
          robots: 'index, follow',
        },
        loadComponent: () => import('./pages/root/root').then((c) => c.Root),
      },
      {
        path: 'recetas',
        data: {
          title: 'Recetas saludables | Nutri UC',
          description:
            'Descubre recetas saludables, prácticas y accesibles para estudiantes universitarios.',
          robots: 'index, follow',
        },
        loadComponent: () => import('./pages/recetas/recetas').then((c) => c.Recetas),
      },
      {
        path: 'recetas/:id',
        data: {
          title: 'Receta saludable | Nutri UC',
          description: 'Conoce los ingredientes y la preparación de esta receta saludable.',
          robots: 'index, follow',
          type: 'article',
        },
        loadComponent: () => import('./pages/receta-id/receta-id').then((c) => c.RecetaId),
      },
      // NUEVA RUTA: Pública Tips
      {
        path: 'tips',
        data: {
          title: 'Tips saludables | Nutri UC',
          description:
            'Consejos prácticos para una alimentación saludable en la vida universitaria.',
          robots: 'index, follow',
        },
        loadComponent: () => import('./pages/tips/tips').then((c) => c.Tips),
      },
    ],
  },
  {
    path: 'login',
    data: {
      title: 'Iniciar sesión | Nutri UC',
      description: 'Inicia sesión en Nutri UC.',
      robots: 'noindex, nofollow',
    },
    loadComponent: () => import('./pages/login/login').then((c) => c.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then((c) => c.Register),
  },
  {
    path: 'unauthorized',
    data: {
      title: 'Acceso | Nutri UC',
      description: 'Inicia sesión o crea una cuenta para acceder a tu espacio en Nutri UC.',
      robots: 'noindex, nofollow',
    },
    loadComponent: () =>
      import('./shared/pages/unauthorized/unauthorized').then((c) => c.Unauthorized),
  },
  {
    path: 'dashboard',
    data: {
      title: 'Mi espacio | Nutri UC',
      description: 'Administra tus recetas y consejos saludables.',
      robots: 'noindex, nofollow',
    },
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        canActivate: [dashboardIndexGuard],
        loadComponent: () =>
          import('./shared/pages/loading/loading').then((c) => c.Loading),
      },
      {
        path: 'user',
        loadComponent: () =>
          import('./layouts/dashboard-user/dashboard-user').then((c) => c.DashboardUser),
        loadChildren: () => import('./routes/dashboard/user.routes').then((r) => r.UserRoutes),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('./shared/pages/not-found/not-found').then((c) => c.NotFound),
  },
];
