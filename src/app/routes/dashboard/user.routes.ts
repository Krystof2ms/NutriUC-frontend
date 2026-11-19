import { Routes } from '@angular/router';
import { RecipeEventListener, UserEventListener } from '@app/providers/event-listener';
import { RecipeLayout } from '@app/layouts/recipe/recipe';
import { UserLayout } from '@app/layouts/user/user';

export const UserRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('@app/pages/dashboard/user/root/root-user').then((c) => c.RootUser),
  },
  {
    path: 'perfil',
    providers: [UserEventListener],
    component: UserLayout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@app/pages/dashboard/user/profile/profile').then((c) => c.Profile),
      },
      {
        path: 'edit',
        loadComponent: () =>
          import('@app/pages/dashboard/user/profile-edit/profile-edit').then((c) => c.ProfileEdit),
      },
    ],
  },
  {
    path: 'creaciones',
    loadComponent: () =>
      import('@app/pages/dashboard/user/my-creations/my-creations').then((c) => c.MyCreations),
  },
  {
    path: 'mis-recetas',
    providers: [RecipeEventListener],
    component: RecipeLayout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@app/pages/dashboard/user/my-recipes/my-recipes').then((c) => c.MyRecipes),
      },
      {
        path: 'new',
        loadComponent: () =>
          import('@app/pages/dashboard/user/my-recipe-create/my-recipe-create').then(
            (c) => c.MyRecipeCreate,
          ),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('@app/pages/dashboard/user/my-recipe/my-recipe').then((c) => c.MyRecipe),
      },
      {
        path: ':id/edit',
        loadComponent: () =>
          import('@app/pages/dashboard/user/my-recipe-edit/my-recipe-edit').then(
            (c) => c.MyRecipeEdit,
          ),
      },
    ],
  },
  {
    path: 'mis-tips',
    loadComponent: () => import('@app/pages/dashboard/user/my-tips/my-tips').then((c) => c.MyTips),
  },
  {
    path: 'mis-tips/nuevo',
    loadComponent: () =>
      import('@app/pages/dashboard/user/my-tip-create/my-tip-create').then((c) => c.MyTipCreate),
  },
  {
    path: 'mis-tips/:id/edit',
    loadComponent: () =>
      import('@app/pages/dashboard/user/my-tip-edit/my-tip-edit').then((c) => c.MyTipEdit),
  },
];
