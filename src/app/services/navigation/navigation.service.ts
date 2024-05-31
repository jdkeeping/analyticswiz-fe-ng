import { UserDevice } from '../../models/_core/user-device';
import { UserDeviceService } from './../_core/user-device/user-device.service';
import { Platform, NavController } from '@ionic/angular';
import { AuthService } from './../_core/auth/auth.service';
import { NavPage } from './../../models/_core/nav-page';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, firstValueFrom } from 'rxjs';
import { User } from 'src/app/models/user';
import { NotificationsService } from '../_core/notifications/notifications.service';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../_core/error-handler/error-handler.service';

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
    roles: ['USER', 'ADMIN', 'SYS_ADMIN']
  };

  navPages: NavPage[] = [];
  showNotifications = false;
  subscriptions: Subscription[] = [];
  accessiblePages = 0;
  navigationLoaded: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform,
    private navCtrl: NavController,
    private deviceService: UserDeviceService,
    private notifications: NotificationsService,
    private errorHandler: ErrorHandlerService
  ) {
   }

  checkPrivileges(authUser: User) {
    this.navPages.forEach(page => {
      if (page.roles && page.roles.length > 0) {
        if (authUser) {
          // User logged in, check roles
          const matches = page.roles.filter(r => (r && authUser && authUser.role && r.toLowerCase() === authUser.role.toLowerCase()));
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
  }


  navigateHome(): Promise<boolean> {
    return this.navigateBack('/tabs/home');
  }

  navigateForward(pathUrl, navOptions = undefined): Promise<boolean> {
    const userDevice = this.deviceService.getUserDevice();
    return this.navCtrl.navigateForward(pathUrl, navOptions);
    // if (userDevice.isNarrowViewport) {
    //   return this.navCtrl.navigateForward(pathUrl, navOptions);
    // } else {
    //   return this.navCtrl.navigateRoot(pathUrl, navOptions);
    // }
  }

  navigateBack(pathUrl, navOptions = undefined): Promise<boolean> {
    const userDevice = this.deviceService.getUserDevice();
    return this.navCtrl.navigateBack(pathUrl, navOptions);
    // if (userDevice.isNarrowViewport) {
    //   return this.navCtrl.navigateBack(pathUrl, navOptions);
    // } else {
    //   return this.navCtrl.navigateRoot(pathUrl, navOptions);
    // }
  }

  navigateRoot(pathUrl, navOptions = undefined): Promise<boolean> {
    return this.navCtrl.navigateRoot(pathUrl, navOptions);
  }

}
