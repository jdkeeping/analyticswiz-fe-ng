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
  {
    path: 'requests-lis',
    loadComponent: () => import('./pages/requests-lis/requests-lis.page').then( m => m.RequestsLisPage)
  },
  {
    path: 'requests-cis',
    loadComponent: () => import('./pages/requests-cis/requests-cis.page').then( m => m.RequestsCisPage)
  },
  {
    path: 'help',
    loadComponent: () => import('./pages/_core/help/help.page').then( m => m.HelpPage)
  },
];
