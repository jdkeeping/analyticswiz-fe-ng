import { CasesViewPage } from './../cases-view/cases-view.page';
import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { LoginRouteGuardService } from 'src/app/services/_core/login-route-guard/login-route-guard.service';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        canActivate: [LoginRouteGuardService],
        loadComponent: () =>
          import('../home/home.page').then((m) => m.HomePage),
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
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];
