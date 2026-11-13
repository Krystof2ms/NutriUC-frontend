import { Routes } from '@angular/router';
import { authGuard } from './guards/auth/auth-guard';
import { RecipeEventListener, UserEventListener } from './providers/event-listener';
import { RecipeLayout } from './layouts/recipe/recipe';
import { UserLayout } from './layouts/user/user';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/public/public-layout').then((m) => m.PublicLayout),
    children: [
      {
        path: '',
        data: {
          title: 'Web Saludable UC | Alimentación saludable',
          description:
            'Alimentación saludable para estudiantes universitarios: recetas, consejos y recursos prácticos.',
          robots: 'index, follow',
        },
        loadComponent: () => import('./pages/root/root').then((c) => c.Root),
      },
      {
        path: 'recetas',
        data: {
          title: 'Recetas saludables | Web Saludable UC',
          description:
            'Descubre recetas saludables, prácticas y accesibles para estudiantes universitarios.',
          robots: 'index, follow',
        },
        loadComponent: () => import('./pages/recetas/recetas').then((c) => c.Recetas),
      },
      {
        path: 'recetas/:id',
        data: {
          title: 'Receta saludable | Web Saludable UC',
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
          title: 'Tips saludables | Web Saludable UC',
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
      title: 'Iniciar sesión | Web Saludable UC',
      description: 'Inicia sesión en Web Saludable UC.',
      robots: 'noindex, nofollow',
    },
    loadComponent: () => import('./pages/login/login').then((c) => c.Login),
  },
  {
    path: 'dashboard',
    data: {
      title: 'Mi espacio | Web Saludable UC',
      description: 'Administra tus recetas y consejos saludables.',
      robots: 'noindex, nofollow',
    },
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
            providers: [UserEventListener],
            component: UserLayout,
            children: [
              {
                path: '',
                loadComponent: () =>
                  import('./pages/dashboard/user/profile/profile').then((c) => c.Profile),
              },
              {
                path: 'edit',
                loadComponent: () =>
                  import('./pages/dashboard/user/profile-edit/profile-edit').then(
                    (c) => c.ProfileEdit,
                  ),
              },
            ],
          },
          {
            path: 'creaciones',
            loadComponent: () =>
              import('./pages/dashboard/user/my-creations/my-creations').then((c) => c.MyCreations),
          },
          {
            path: 'mis-recetas',
            providers: [RecipeEventListener],
            component: RecipeLayout,
            children: [
              {
                path: '',
                loadComponent: () =>
                  import('./pages/dashboard/user/my-recipes/my-recipes').then((c) => c.MyRecipes),
              },
              {
                path: 'new',
                loadComponent: () =>
                  import('./pages/dashboard/user/my-recipe-create/my-recipe-create').then(
                    (c) => c.MyRecipeCreate,
                  ),
              },
              {
                path: ':id',
                loadComponent: () =>
                  import('./pages/dashboard/user/my-recipe/my-recipe').then((c) => c.MyRecipe),
              },
              {
                path: ':id/edit',
                loadComponent: () =>
                  import('./pages/dashboard/user/my-recipe-edit/my-recipe-edit').then(
                    (c) => c.MyRecipeEdit,
                  ),
              },
            ],
          },
          {
            path: 'mis-tips',
            loadComponent: () =>
              import('./pages/dashboard/user/my-tips/my-tips').then((c) => c.MyTips),
          },
          {
            path: 'mis-tips/nuevo',
            loadComponent: () =>
              import('./pages/dashboard/user/my-tip-create/my-tip-create').then(
                (c) => c.MyTipCreate,
              ),
          },
          {
            path: 'mis-tips/:id/edit',
            loadComponent: () =>
              import('./pages/dashboard/user/my-tip-edit/my-tip-edit').then((c) => c.MyTipEdit),
          },
        ],
      },
    ],
  },
];
