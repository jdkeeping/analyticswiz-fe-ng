import { CasesViewPage } from './../cases-view/cases-view.page';
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
          import('../cases-list/cases-list.page').then((m) => m.CasesListPage),
      },
      {
        path: 'cases/:caseId',
        loadComponent: () =>
          import('../cases-view/cases-view.page').then((m) => m.CasesViewPage),
      },
      {
        path: 'requests-lis',
        loadComponent: () =>
          import('../requests-lis/requests-lis.page').then((m) => m.RequestsLisPage),
      },
      {
        path: 'requests-cis',
        loadComponent: () =>
          import('../requests-cis/requests-cis.page').then((m) => m.RequestsCisPage),
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
