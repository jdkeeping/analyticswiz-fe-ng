import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'cases',
        loadComponent: () =>
          import('../cases/cases.page').then((m) => m.CasesPage),
      },
      {
        path: 'requests',
        loadComponent: () =>
          import('../requests/requests.page').then((m) => m.RequestsPage),
      },
      {
        path: 'auditing',
        loadComponent: () =>
          import('../auditing/auditing.page').then((m) => m.AuditingPage),
      },
      {
        path: '',
        redirectTo: '/tabs/cases',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/cases',
    pathMatch: 'full',
  },
];
