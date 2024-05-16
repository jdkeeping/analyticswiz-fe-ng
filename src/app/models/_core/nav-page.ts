/**
 * ID: bh-nav-page
 * Name: BH Nav Page
 * Description: Navigation Page used for defining pages for menus and more.
 * Version: 1
 *
 * ==============================
 * Change Log
 * ==============================
 * 2022-05-25 - MW - v1: Initial dev
 */
export interface NavPage {
  name?: string;
  navPath?: string;
  tabPath?: string;
  tabId?: string;
  ionIcon?: string;
  roles?: string[];
  isAccessible?: boolean;
}

// export type TabId =
// 'home' |
// 'clinical-apps' |
// 'business-apps' |
// 'patient-apps' |
// 'events';
