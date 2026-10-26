import { Routes } from '@angular/router';
import { authGuard } from './guards/auth/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/public/public-layout').then((m) => m.PublicLayout),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/root/root').then((c) => c.Root),
      },
      {
        path: 'recetas',
        loadComponent: () => import('./pages/recetas/recetas').then((c) => c.Recetas),
      },
      {
        path: 'recetas/:id',
        loadComponent: () => import('./pages/receta-id/receta-id').then((c) => c.RecetaId),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((c) => c.Login),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      {
        path: 'user',
        loadComponent: () =>
          import('./layouts/dashboard-user/dashboard-user').then((c) => c.DashboardUser),
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/dashboard/user/root/root-user').then((c) => c.RootUser),
          },
          {
            path: 'perfil',
            loadComponent: () =>
              import('./pages/dashboard/user/profile/profile').then((c) => c.Profile),
          },
          {
            path: 'perfil/edit',
            loadComponent: () =>
              import('./pages/dashboard/user/profile-edit/profile-edit').then((c) => c.ProfileEdit),
          },
          {
            path: 'creaciones',
            loadComponent: () =>
              import('./pages/dashboard/user/my-creations/my-creations').then((c) => c.MyCreations),
          },
          {
            path: 'mis-recetas',
            loadComponent: () =>
              import('./pages/dashboard/user/my-recipes/my-recipes').then((c) => c.MyRecipes),
          },
          {
            path: 'mis-recetas/:id',
            loadComponent: () =>
              import('./pages/dashboard/user/my-recipe/my-recipe').then((c) => c.MyRecipe),
          },
          {
            path: 'mis-recetas/:id/edit',
            loadComponent: () =>
              import('./pages/dashboard/user/my-recipe-edit/my-recipe-edit').then(
                (c) => c.MyRecipeEdit,
              ),
          },
          {
            path: 'mis-tips',
            loadComponent: () =>
              import('./pages/dashboard/user/my-tips/my-tips').then((c) => c.MyTips),
          },
        ],
      },
    ],
  },
];
