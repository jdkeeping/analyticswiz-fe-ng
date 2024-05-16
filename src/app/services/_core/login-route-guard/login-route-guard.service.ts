import { UserState } from './../../../models/_core/user-state';
import { HelperUtilitiesService } from 'src/app/services/_core/helper-utilities/helper-utilities.service';
import { AuthState } from 'src/app/models/_core/auth-state';
import { VerlockerService } from '../verlocker/verlocker.service';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { StorageService } from '../storage/storage.service';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/_core/auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { AnalyticsService } from '../analytics/analytics.service';
import { first } from 'rxjs/operators';
import * as moment from 'moment';
import { NavigationService } from '../../navigation/navigation.service';
import { firstValueFrom } from 'rxjs';
import { NotificationsService } from '../notifications/notifications.service';
import { ErrorHandlerService } from '../error-handler/error-handler.service';

/**
 * ID: bh-login-route-guard-service
 * Name: BH Login Route Guard Service
 * Description: Service used to protect user-restricted pages and routes
 * Version: 2
 *
 * ==============================
 * Change Log
 * ==============================
 * 2021-07-02 - MW - v1: Initial dev
 * 2021-07-13 - MW - v2: Implemented userState
 */
@Injectable({
  providedIn: 'root'
})
export class LoginRouteGuardService implements CanActivate {
  env = environment;
  private authState: AuthState;
  private authUser: User;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private analytics: AnalyticsService,
    private navService: NavigationService,
    private verlocker: VerlockerService,
    private notifications: NotificationsService,
    private helpers: HelperUtilitiesService,
    private errorHandler: ErrorHandlerService
  ) {
  }

  /***
   * Checks if user is logged in and if not, reroutes to login
   * @param route Activated Route Snapshot
   */
  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean | UrlTree> {
    this.authUser = this.authService.getAuthUser();
    const validSession = await this.validateSession();
    const hasAccess = await this.validateAccess(route);
    const allowNavigate = (this.authUser && this.authUser.userId !== null && validSession && hasAccess);
    if (!allowNavigate) {
      this.saveTargetUrl();
      // console.log('loginRouteGuard: navigating to login', this.authService.targetUrl);
      return this.navService.navigateRoot('/login');
    }
    return allowNavigate;
  }

  async validateSession(): Promise<boolean> {
    let isValidSession = false;
    // Check app version
    this.verlocker.setCheckVersion(true);
    // Check token and existing user
    if (!this.authUser || !this.authUser.userId) {
      // Check if token storing is allowed
      if (this.env.storeToken) {
        try {
          const userState: UserState = await this.storageService.getData('userState');
          const userData = userState.authUser;
          // console.log('validateSession: userState, userData', userState, userData);
          // Check for outdated session
          if (
            userState.authState === AuthState.LOGGED_IN &&
            userState.sessionAppVersion &&
            userState.sessionAppVersion === this.env.appVersion + '-' + this.env.env
          ) {
            // Check for userData and token
            if (
              userData &&
              userData.token
            ) {
              this.authUser.token = userData.token;
              this.authService.setAuthUser(this.authUser);
              this.authService.userState = userState;
              this.authService.userState.sessionRefreshed = moment().format('M/D/YYYY HH:mm');
              try {
                // Check if user is still active in user table
                // const userRes = await firstValueFrom(this.usersService.getById(userData.userId));
                // Check if user is still AD valid. if not go to login
                const userRes = userData;
                if (userRes) {
                  this.authUser = userRes;
                  try {
                    const res = await firstValueFrom(this.authService.validateUser());
                    const validUser = res && res.userName ? this.authUser : null;
                    if (!validUser || !validUser.userId) {
                      this.analytics.customEvent('auto-login', 'Invalid login', '');
                      // console.log('loginRouteGuard: user invalid');
                      return Promise.resolve(false);
                    } else {
                      this.analytics.analyticsData.userid = validUser.userName.toLowerCase();
                      // Setting authenticated to false because user used stored token
                      this.authUser.authenticated = false;
                      this.authService.setAuthUser(this.authUser);
                      this.analytics.customEvent('auto-login', 'Valid login', validUser.userName);
                      isValidSession = true;
                    }
                  } catch (err) {
                    console.error('loginRouteGuard: Validate User Error', err);
                  }
                } else {
                  console.error('loginRouteGuard: No user record found');
                }
              } catch (err) {
                console.error('loginRouteGuard: User Service Error', err);
              }
            } else {
              // Check if has user/token, if not go to login
              console.error('loginRouteGuard: No token, go to login');
            }
          } else {
            console.error('loginRouteGuard: Outdated session, go to login');
          }
        } catch (err) {
          // Check if has user/token, if not go to login
          console.error('loginRouteGuard: userData error', err);
        }
      } else {
        console.error('loginRouteGuard: No stored tokens allowed, login');
        // return Promise.resolve(true);
        // return Promise.resolve(false);
      }
    } else {
      // if (!this.profile || this.profile.profileStatus !== 'Loaded') {
      //   this.authUser.authenticated = false;
      // }
      // Do nothing; all set
      // console.log('loginRouteGuard: OK to go to page');
      isValidSession = true;
    }
    return Promise.resolve(isValidSession);
  }

  async validateAccess(route: ActivatedRouteSnapshot): Promise<boolean> {
    const authUser = this.authService.getAuthUser();
    const roles = route.data['roles'];
    let hasAccess = false;
    if (roles && roles.length > 0) {
      roles.forEach(role => {
        if (authUser.role === role) {
          hasAccess = true;
        }
      });
    } else {
      hasAccess = true;
    }
    return Promise.resolve(hasAccess);
  }

  async saveTargetUrl() {
    try {
      const path = window.location.pathname;
      console.log('saveTargetUrl', path);
      if (path.indexOf('redirect') === -1) {
        const targetUrl = window.location.pathname +
          (window.location.search ? window.location.search : '');
        this.authService.targetUrl = targetUrl;
        await this.storageService.saveData('targetUrl', targetUrl, false);
        console.log('target url saved', targetUrl);
      }
    } catch (err) {
      this.errorHandler.handleError(err, 'saveTargetUrl');
    }
  }
}
