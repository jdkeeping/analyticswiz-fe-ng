import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'login',
    pathMatch: 'full',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
];
