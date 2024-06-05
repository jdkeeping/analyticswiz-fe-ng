import { Routes } from '@angular/router';
import { LoginRouteGuardService } from './services/_core/login-route-guard/login-route-guard.service';

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
    path: 'help',
    loadComponent: () => import('./pages/_core/help/help.page').then( m => m.HelpPage)
  },
  {
    path: 'share',
    loadComponent: () => import('./pages/_core/share/share.page').then( m => m.SharePage)
  },
  {
    path: 'check-for-updates',
    loadComponent: () => import('./pages/_core/check-for-updates/check-for-updates.page').then( m => m.CheckForUpdatesPage)
  },
  {
    path: 'help-forgot-pwd',
    loadComponent: () => import('./pages/_core/help-forgot-pwd/help-forgot-pwd.page').then( m => m.HelpForgotPwdPage)
  },
  {
    path: 'feedback-modal',
    loadComponent: () => import('./pages/_core/feedback-modal/feedback-modal.page').then( m => m.FeedbackModalPage)
  },
  {
    path: 'cases-view',
    loadComponent: () => import('./pages/cases-view/cases-view.page').then( m => m.CasesViewPage)
  },
  {
    path: 'my-account',
    canActivate: [LoginRouteGuardService],
    loadComponent: () => import('./pages/_core/my-account/my-account.page').then( m => m.MyAccountPage)
  },
  {
    path: 'language-modal',
    loadComponent: () => import('./pages/_core/language-modal/language-modal.page').then( m => m.LanguageModalPage)
  },
  {
    path: 'language-popover',
    loadComponent: () => import('./pages/_core/language-popover/language-popover.page').then( m => m.LanguagePopoverPage)
  },
];
