import { ThemeOption } from './../../../models/_core/theme-option';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { UserState } from './../../../models/_core/user-state';
import { HelperUtilitiesService } from 'src/app/services/_core/helper-utilities/helper-utilities.service';
import { AlertController, ModalController } from '@ionic/angular';
import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationsService } from '../notifications/notifications.service';
import { StorageService } from '../storage/storage.service';
import moment from 'moment';
import { AuthState } from 'src/app/models/_core/auth-state';
import { SSOTokenResponse } from 'src/app/models/_core/sso-token-response';
import { UserDeviceService } from '../user-device/user-device.service';
import { Browser } from '@capacitor/browser';
import { AwsSettings } from 'src/app/models/_core/aws-settings';
import { AnalyticsService } from '../analytics/analytics.service';
import { User } from 'src/app/models/user';
import { AuthLegacyService } from '../auth-legacy/auth-legacy.service';
import { AuthSsoService } from '../auth-sso/auth-sso.service';

/**
 * ID: bh-auth-service
 * Name: BH Auth Service
 * Description: Service used for managing authentication and user state
 * Version: 5
 *
 * ==============================
 * Change Log
 * ==============================
 * 2021-07-02 - MW - v1: Initial dev
 * 2021-07-13 - MW - v2: Implemented userState
 * 2021-07-27 - MW - v3: Improved open modal + alert handling; improved UX
 * 2022-05-23 - MW - v4: Updated depreciated value/error handling
 * 2022-05-27 - MW - v5: Implemented user state and theme subjects
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  env = environment;
  authUser: BehaviorSubject<User> = new BehaviorSubject(null);
  userState: UserState = {};
  userStateSubject: BehaviorSubject<UserState> = new BehaviorSubject({});
  themeSubject: BehaviorSubject<ThemeOption> = new BehaviorSubject('M');
  menuOpen: BehaviorSubject<boolean> = new BehaviorSubject(false);
  apiUrl: any;
  timeoutWarningMs = 60000;
  timeoutLogoutMs = 120000;
  inactivitySubject = new BehaviorSubject<number>(0);
  inactivityTimer = null;
  targetUrl = '';
  awsCognitoClientId = this.env.awsCognitoClientId;

  constructor(
    private http: HttpClient,
    private notifications: NotificationsService,
    private storageService: StorageService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private helpers: HelperUtilitiesService,
    private navService: NavigationService,
    private deviceService: UserDeviceService,
    private analytics: AnalyticsService,
    private authLegacy: AuthLegacyService,
    private authSso: AuthSsoService
  ) {
    this.getUserStateFromStorage();
  }

  async loadAwsSettings(): Promise<any> {
    try {
      const settings = await firstValueFrom(this.getAwsSettings());
      console.log('loadAwsSettings', settings);
      Promise.resolve(settings);
    } catch (err) {
      console.error('loadAwsSettings: error: ', err);
      throw err;
    }
  }

  /**
   * Gets Auth User object
   * Recommend subscribing to authUser directly
   */
  getAuthUser(): User {
    const authUser = this.authUser.getValue();
    return authUser ? authUser : {};
  }

  /***
   * Updates Auth User object with provided object
   * @param authUser User object to replace existing value
   */
  setAuthUser(authUser: User) {
    this.authUser.next(authUser);
  }

  /**
   * Gets User State object
   * Recommend subscribing to userStateSubject directly
   */
  getUserState(): UserState {
    return this.userStateSubject.getValue();
  }

  /***
   * Updates User State subject object
   * @param userState User State to update with
   */
  setUserState(userState: UserState) {
    this.userStateSubject.next(userState);
  }

  /**
   * Toggles the menu open and closed
   */
  toggleMenu() {
    const isMenuOpen = this.menuOpen.getValue();
    this.menuOpen.next(!isMenuOpen);
  }

  /**
   * Gets active theme
   * Recommend subscribing to themeSubject directly
   */
  getTheme(): ThemeOption {
    return this.themeSubject.getValue();
  }

  /***
   * Updates theme subject object
   * @param theme ThemeOption to update with
   */
  setTheme(theme: ThemeOption) {
    this.themeSubject.next(theme);
  }


  /***
   * Gets the user's state from storage
   */
  async getUserStateFromStorage() {
    this.userState = await this.storageService.getData('userState');
  }

  /***
   * Save the user's state to local storage
   */
  async saveUserStateToStorage() {
    if (!this.env.storeToken && this.userState.authUser.token) {
      this.userState.authUser.token = null;
    }
    this.userStateSubject.next(this.userState);
    this.storageService.saveData('userState', this.userState);
  }

  /**
   * Starts inactivity timer.
   * Should be called after successfully logging in
   */
  public startInactivityTimer() {
    if (this.env.requireTimeout) {
      this.timeoutLogoutMs = this.env.timeoutThreshold;
      this.timeoutWarningMs = this.timeoutLogoutMs - 30000;
      this.inactivityTimer = setInterval(() => {
        let time = this.inactivitySubject.getValue();
        time += 1000;
        // console.log('Inactivity: ', time)
        this.inactivitySubject.next(time);
        this.checkForTimeout();
      }, 1000);
    }
  }

  /**
   * Check for session timeout, display appropriate alert if timing out.
   */
  public async checkForTimeout() {
    const time = this.inactivitySubject.getValue();
    if (time === this.timeoutWarningMs) {
      const alert = await this.alertCtrl.create({
        header: 'Still there?',
        message: 'You will be signed out soon due to inactivity.',
        cssClass: 'wide-alert warning',
        backdropDismiss: false,
        buttons: [
          {
            text: 'Stay signed in',
            cssClass: 'primary',
            handler: (val) => {
              this.bumpInactivityTimer();
            }
          },
          {
            text: 'Sign out',
            handler: async (val) => {
              await this.dismissAllModalsAndAlerts();
              this.logout(false, true);
            }
          }
        ]
      });
      await alert.present();
    } else if (time === this.timeoutLogoutMs) {
      await this.dismissAllModalsAndAlerts();
      this.logout(true, true);
    }
  }

  /**
   * Dismisses all open alerts and modals
   */
  async dismissAllModalsAndAlerts(): Promise<boolean> {
    // Dismiss alerts
    for (let i = 0; i < 25; i++) {
      const alert = await this.alertCtrl.getTop();
      if (alert) {
        await alert.dismiss();
      } else {
        break;
      }
    }

    // Dismiss modals
    for (let i = 0; i < 25; i++) {
      const modal = await this.modalCtrl.getTop();
      if (modal) {
        await modal.dismiss();
      } else {
        break;
      }
    }

    return Promise.resolve(true);

  }

  /**
   * Bumps activity timer, preventing auto-timeout
   */
  public bumpInactivityTimer() {
    this.inactivitySubject.next(0);
  }

  validateUser(): Observable<any> {
    if (this.env.ssoEnabled) {
      return this.authSso.validateUser();
    } else {
      return this.authLegacy.validateUser();
    }
  }

  getAwsSettings(): Observable<AwsSettings> {
    const url = `${this.env.apiUrl}/settings`;
    return this.http.get(url).pipe(
      map((data: any) => {
        console.log('getAwsSettings', data);
        return data;
      }),
      // catchError(error => of(error))
    );
  }

  async authorizeRedirect() {
    // const settings = await firstValueFrom(this.getAwsSettings());
    // console.log('*** authorizeRedirect: settings: ', settings);
    const redirectRoot = this.getUriFromLocation();
    const redirectUri = redirectRoot + '/redirect';
    const url = `${this.env.awsCognitoUrl}/oauth2/authorize?` +
      `response_type=code&client_id=${this.awsCognitoClientId}&scope=openid%20profile&` +
      `redirect_uri=${redirectUri}`;

    // this.notifications.showAlert('URL', redirectRoot);
    console.log('*** authorizeRedirect: ', url);
    console.log('authorizeRedirect', url);
    location.href = url;
  }

  async openAuthBrowser(url): Promise<void> {
    await Browser.addListener('browserPageLoaded', () => {
      // Do something when browser page is loaded
      console.log('browser page finished loading', Browser);
    });
    // await Browser.addListener('urlChangeEvent', () => {

    // });
    await Browser.open({
      windowName: 'auth',
      url,
      presentationStyle: 'popover'
    });
    return Promise.resolve();
  }

  getSSOToken(authCode: string): Observable<SSOTokenResponse> {
    const redirectRoot = this.getUriFromLocation();
    const redirectUri = redirectRoot + '/redirect';
    const url = `${this.env.awsCognitoUrl}/oauth2/token?client_id=${this.awsCognitoClientId}`;
    const body = {
      grant_type: 'authorization_code',
      code: authCode,
      redirect_uri: redirectUri
    };
    const encodedBody = this.convertToFormData(body);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'BH-DONT-ASSIGN-HEADERS': 'true'
    });
    return this.http.post(url, encodedBody, { headers }).pipe(
      map((data: any) => {
        return data;
      }),
      // catchError(error => of(error))
    );
  }

  refreshSSOToken(refreshToken: string): Observable<SSOTokenResponse> {
    const url = `${this.env.awsCognitoUrl}/oauth2/token?client_id=${this.awsCognitoClientId}`;
    const body = {
      refresh_token: refreshToken,
      grant_type: 'refresh_token'
    };
    const encodedBody = this.convertToFormData(body);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'BH-DONT-ASSIGN-HEADERS': 'true',
      'BH-TOKEN-REFRESH': 'true'
    });
    return this.http.post(url, encodedBody, { headers }).pipe(
      map((data: SSOTokenResponse) => {
        // Update user token
        const authUser = this.getAuthUser();
        authUser.token = data.access_token;
        this.setAuthUser(authUser);

        // Update stored token
        const userState = this.getUserState();
        userState.authUser = authUser;
        this.setUserState(userState);

        // console.log('refreshed token: ', authUser, userState, data);
        return data;
      }),
      // catchError(error => of(error))
    );
  }

  private convertToFormData(data: any): string {
    const formData = new URLSearchParams();

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.set(key, data[key]);
      }
    }

    return formData.toString();
  }

  /***
   * Logs user into application
   * @param userName User Name
   * @param password  Password
   * @returns User Login Payload
   */
  login(userId, password): Observable<any> {
    const url = `${this.env.apiUrl}/login`;
    const body = {
      userId,
      password,
    };
    return this.http.post(url, body, { observe: 'response'}).pipe(
      map((data: any) => {
        this.handleLoginResponse(data.body);
        return data.body;
      }),
    );
  }

  /***
   * Process user response data, determining login status
   * @param data Login Response Data
   */
  async handleLoginResponse(data: any) {
    if (data) {
      this.startInactivityTimer();
      const authUser: User = data;
      const userId = (authUser.id || authUser.userId);
      authUser.userId = userId.toLowerCase();
      authUser.firstName = this.helpers.getFirstName(data.fullName);
      authUser.role = this.setRole(authUser);

      this.setAuthUser(authUser);
      this.userState.sessionAppVersion = this.env.appVersion + '-' + this.env.env;
      this.userState.userId = authUser.userId;
      this.userState.environment = this.env;
      this.userState.lastLoggedIn = moment().format('M/D/YYYY HH:mm');
      this.userState.authState = AuthState.LOGGED_IN;
      if (this.env.storeToken) {
        this.userState.authUser = authUser;
      }
      this.saveUserStateToStorage();
    }
    return;
  }

  async initSession(ssoTokenRes: SSOTokenResponse): Promise<void> {
    try {
      let authUser = this.getAuthUser();
      authUser.token = ssoTokenRes.access_token;
      this.setAuthUser(authUser);
      const res = await firstValueFrom(this.validateUser());
      if (res && res.id) {
        // Update user object
        authUser = res;
        authUser.userId = authUser.id;
        authUser.userName = authUser.userName;
        authUser.firstName = this.helpers.getFirstName(res.fullName);
        authUser.role = this.setRole(authUser);
        // Update analytics user
        this.analytics.analyticsData.userid = authUser.userName.toLowerCase();
        // Reapply the access token
        authUser.token = ssoTokenRes.access_token;
        // Set user
        this.setAuthUser(authUser);
        // Load navigation
        // this.navService.loadNavigation();
        // Prepare App State
        this.userState.sessionAppVersion = this.env.appVersion + '-' + this.env.env;
        this.userState.userId = authUser.userId;
        this.userState.userName = authUser.userName;
        this.userState.environment = this.env;
        this.userState.lastLoggedIn = moment().format('M/D/YYYY HH:mm');
        this.userState.authState = AuthState.LOGGED_IN;
        this.userState.authUser = authUser;
        this.saveUserStateToStorage();
        // Save refresh token
        await this.storageService.saveData('refreshToken', ssoTokenRes.refresh_token, true);
        const rtok = this.storageService.getData('refreshToken', true);
        // console.log('initSession: rtok: ', rtok);
      }
      return Promise.resolve();
    } catch (err) {
      throw err;
    }
  }

  setRole(authUser: User): 'USER' | 'ADMIN' | 'SYS_ADMIN' {
    if (authUser.roles) {
      if (authUser.roles.includes('SYS_ADMIN')) {
        return 'SYS_ADMIN';
      } else if (authUser.roles.includes('ADMIN')) {
        return 'ADMIN';
      } else {
        return 'USER';
      }
    } else if (authUser.role) {
      return authUser.role;
    } else {
      return 'USER';
    }
  }

  decodeJwt(token: string): any {
    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

      return JSON.parse(jsonPayload);
    } else {
      return null;
    }
  }

  isTokenExpired(token: string): boolean {
    const decodedToken = this.decodeJwt(token);
    // console.log('authService: isTokenExpired: ', decodedToken);

    if (decodedToken && decodedToken.exp) {
      const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
      const currentTime = new Date().getTime();
      // const expireMoment = moment(expirationTime);
      // console.log('authService: expireMoment: ', expireMoment.format('M/D/YYYY h:mm a'));

      return expirationTime <= currentTime;
    }

    // If the 'exp' claim is not present, consider the token as not expired
    return false;
  }

  getUriFromLocation(): string {
    // Get the current location
    const currentLocation = window.location;

    // Extract protocol, domain, and port
    const protocol = currentLocation.protocol;
    const domain = currentLocation.hostname;
    const port = currentLocation.port;
    const portSuffix = (port && port !== '80') ? ':' + port : '';

    console.log("Protocol:", protocol);
    console.log("Domain:", domain);
    console.log("Port:", port);

    if (protocol === 'capacitor:' || this.deviceService.isNotBrowser()) {
      // Return web url for universal links
      return this.env.webUrl;
    } else {
      // Return localhost
      return protocol + '//' + domain + portSuffix;
    }

    // return protocol + '//' + domain + portSuffix;

  }

  /***
   * Logs user out
   * @param isExpired Determines if session expired
   * @param redirectToLogin Designates redirection to login page
   */
  logout(isExpired = false, redirectToLogin = true) {
    this.authUser.next(null);
    this.inactivitySubject.next(0);
    clearInterval(this.inactivityTimer);
    this.inactivityTimer = null;
    this.navService.navPages = [];
    this.alertCtrl.getTop().then(alert => {
      if (alert) {
        alert.dismiss();
      }
    });
    if (isExpired) {
      this.userState.authState = AuthState.EXPIRED;
      this.notifications.showAlert('Session expired', 'You were signed out due to inactivity.', 'danger');
    } else {
      this.userState.authState = AuthState.LOGGED_OUT;
    }

    this.storageService.removeData('userState');

    if (redirectToLogin) {
      this.navService.navigateBack('login');
    }
  }
}
