import { NavController } from '@ionic/angular';
import { UserDeviceService } from './../_core/user-device/user-device.service';
import { NavPage } from './../../models/_core/nav-page';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

/**
 * ID: bh-navigation
 * Name: BH Navigation Service
 * Description: Service used for managing navigation, main menus, and account options
 * Version: 1
 *
 * ==============================
 * Change Log
 * ==============================
 * 2022-15-25 - MW - v1: Initial development
 */
@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  env = environment;

  // Define your pages for this app here
  homeNavPage: NavPage = {
    name: 'Home',
    navPath: '/tabs/home',
    tabPath: 'home',
    tabId: 'home',
    ionIcon: 'home',
    roles: ['USER', 'ADMIN', 'SYS_ADMIN'],
    isAccessible: true,
    isActive: false
  };

  navPages: NavPage[] = [
    {
      name: 'Interface Cases',
      navPath: '/tabs/cases',
      tabPath: 'cases',
      tabId: 'cases',
      ionIcon: 'folder',
      roles: ['USER', 'ADMIN', 'SYS_ADMIN'],
      isAccessible: true,
      isActive: true
    },
    {
      name: 'LIS Requests',
      navPath: '/tabs/requests-lis',
      tabPath: 'requests-lis',
      tabId: 'requests-lis',
      ionIcon: 'flask',
      roles: ['USER', 'ADMIN', 'SYS_ADMIN'],
      isAccessible: true,
      isActive: true
    },
    {
      name: 'CIS Requests',
      navPath: '/tabs/requests-cis',
      tabPath: 'requests-cis',
      tabId: 'requests-cis',
      ionIcon: 'heart',
      roles: ['USER', 'ADMIN', 'SYS_ADMIN'],
      isAccessible: true,
      isActive: true
    },
    {
      name: 'Manage',
      navPath: '/tabs/manage',
      tabPath: 'manage',
      tabId: 'manage',
      ionIcon: 'cog',
      roles: ['USER', 'ADMIN', 'SYS_ADMIN'],
      isAccessible: true,
      isActive: true
    }

  ];

  navPagesSubject: BehaviorSubject<NavPage[]> = new BehaviorSubject([]);
  showNotifications = false;
  subscriptions: Subscription[] = [];
  accessiblePages = 0;
  navigationLoaded: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private navCtrl: NavController,
    private deviceService: UserDeviceService,
  ) {
    if (this.homeNavPage.isActive) {
      this.navPages.unshift(this.homeNavPage);
    }
    this.navPagesSubject.next(this.navPages);
   }

  checkPrivileges(authUser: User) {
    this.navPages.forEach(page => {
      if (page.roles && page.roles.length > 0) {
        if (authUser) {
          // User logged in, check roles
          const matches = page.roles.filter(r =>
            (r && authUser && authUser.role && r.toLowerCase() === authUser.role.toLowerCase())
          );
          page.isAccessible = (matches.length > 0);
        } else {
          // User not logged in
          page.isAccessible = false;
        }
      } else {
        // Page unprotected
        page.isAccessible = true;
      }
    });

    this.accessiblePages = this.navPages.filter(p => p.isAccessible).length;
    this.navPagesSubject.next(this.navPages);
  }

  navigateHome(): Promise<boolean> {
    const homePage = this.navPages.length > 0 ? this.navPages[0] : null;
    return this.navigateBack(homePage.tabPath);
  }

  navigateForward(pathUrl, navOptions = undefined): Promise<boolean> {
    const userDevice = this.deviceService.getUserDevice();
    return this.navCtrl.navigateForward(pathUrl, navOptions);
  }

  navigateBack(pathUrl, navOptions = undefined): Promise<boolean> {
    const userDevice = this.deviceService.getUserDevice();
    return this.navCtrl.navigateBack(pathUrl, navOptions);
  }

  navigateRoot(pathUrl, navOptions = undefined): Promise<boolean> {
    return this.navCtrl.navigateRoot(pathUrl, navOptions);
  }

}
