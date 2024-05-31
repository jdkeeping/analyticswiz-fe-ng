import { Platform } from '@ionic/angular';
import { Device } from '@capacitor/device';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, firstValueFrom, Subscription, filter } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NavigationEnd, Router } from '@angular/router';
/**
 * ID: bh-analytics-service
 * Name: BH Analytics Service
 * Description: Captures analytics and device information.
 * Version: 3
 *
 * ==============================
 * Change Log
 * ==============================
 * 2021-07-02 - MW - v1: Initial dev
 * 2021-10-07 - MW - v2: Fixed analytics calls
 * 2022-04-22 - MW - v3: Upgraded to Ionic 6
 */

export interface AnalyticsData {
  appName?: string;
  appVersion?: string;
  appEnvironment?: string;
  userid?: string;
  eventType?: string;
  eventName?: string;
  eventDetail?: string;
  devicePlatform?: string;
  deviceId?: string;
  deviceOs?: string;
  deviceOsVersion?: string;
  deviceOrientation?: string;
  sessionToken?: string;
  data?: string;
  userName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  analyticsData: AnalyticsData = {};
  browser: any;
  browserVersion: any;
  routerSub: Subscription;
  // authUser: User = {};

  constructor(
    private http: HttpClient,
    private platform: Platform,
    private router: Router
  ) {
    const ms = Date.parse(new Date().toISOString());
    this.analyticsData.sessionToken = ms.toString();
    this.getbrowserinfo();
  }
  // ******ANALYTICS Calls******* */
  async screenView(screen: any, eventDetail: any = '') {
    firstValueFrom(this.saveAnalytics('page-view', screen, eventDetail));
  }
  async searchEvent(searchStr: any) {
    firstValueFrom(this.saveAnalytics('click', 'search', searchStr));
  }
  async clickEvent(eventname: any, eventDetail: any) {
    firstValueFrom(this.saveAnalytics('click', eventname, eventDetail));
  }
  async loginEvent(userName: any) {
    this.analyticsData.userName = userName;
    firstValueFrom(this.saveAnalytics('click', 'login', userName));
  }
  async customEvent(eventType: any, eventname: any, eventDetail: any) {
    firstValueFrom(this.saveAnalytics(eventType, eventname, eventDetail));
  }
  async errorEvent(eventname: any, eventDetail: any) {
    firstValueFrom(this.saveAnalytics('error', eventname, eventDetail));
  }

  // ******ANALYTICS******* */
  async initAnalytics() {
    this.analyticsData.appName = environment.appName;
    this.analyticsData.appVersion = environment.appVersion;
    this.analyticsData.appEnvironment = environment.env;
    const platformInfo = this.platform.platforms();
    let fullplatform = '';
    platformInfo.forEach((value) => {
      // console.log(value);
      fullplatform += value + ' ';
    });
    if (fullplatform.includes('cordova') || this.platform.is('capacitor')) {
      const deviceInfo = await Device.getInfo();
      this.analyticsData.devicePlatform =
        deviceInfo.manufacturer + ' ' + deviceInfo.model;
      this.analyticsData.deviceId = '';
      this.analyticsData.deviceOs = deviceInfo.platform;
      this.analyticsData.deviceOsVersion = deviceInfo.osVersion;
    } else {
      // Get browser info
      this.analyticsData.devicePlatform = fullplatform;
      this.analyticsData.deviceOs = this.browser;
      this.analyticsData.deviceOsVersion = this.browserVersion;
    }
    this.trackPageViews();
  }

  trackPageViews() {
    this.routerSub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
    .subscribe((event: NavigationEnd) => {
      const page = window.location.pathname;
      const params = window.location.search;
      this.customEvent('page-view', page, params);
    })
  }

  saveAnalytics(
    eventType: any,
    eventName: any,
    eventDetail: any
  ): Observable<any> {
    if (!this.analyticsData.appName) {
      this.initAnalytics();
    }
    if (this.platform.isLandscape()) {
      this.analyticsData.deviceOrientation = 'LANDSCAPE';
    } else if (this.platform.isPortrait()) {
      this.analyticsData.deviceOrientation = 'PORTRAIT';
    }

    // Copy master analytics object
    const analyticsData: AnalyticsData = Object.assign({}, this.analyticsData);

    // Define event properties
    analyticsData.eventType = eventType;
    analyticsData.eventDetail = (eventDetail && eventDetail.length > 200) ? eventDetail.substring(0, 200) : eventDetail;
    analyticsData.eventName = eventName;

    // Call analytics
    const url = `${environment.verlockerUrl}/analytics`;
    const body = analyticsData;
    return this.http.post(url, body).pipe(
      tap((res: any) => {
        // Check for error messages
        return res;
      })
    );
  }

  // ******Browser Info******* */
  public getbrowserinfo() {
    const unknown = '-';
    // screen
    let screenSize = '';
    let width;
    let height;
    if (screen.width) {
      width = screen.width ? screen.width : '';
      height = screen.height ? screen.height : '';
      screenSize += '' + width + ' x ' + height;
    }
    // browser
    const nVer = navigator.appVersion;
    const nAgt = navigator.userAgent;
    let browser = navigator.appName;
    let version = '' + parseFloat(navigator.appVersion);
    let majorVersion = parseInt(navigator.appVersion, 10);
    let nameOffset;
    let verOffset;
    let ix;
    // Opera
    if ((verOffset = nAgt.indexOf('Opera')) !== -1) {
      browser = 'Opera';
      version = nAgt.substring(verOffset + 6);
      if ((verOffset = nAgt.indexOf('Version')) !== -1) {
        version = nAgt.substring(verOffset + 8);
      }
    }
    // Opera Next
    if ((verOffset = nAgt.indexOf('OPR')) !== -1) {
      browser = 'Opera';
      version = nAgt.substring(verOffset + 4);
    } else if ((verOffset = nAgt.indexOf('Edge')) !== -1) {
      browser = 'Microsoft Edge';
      version = nAgt.substring(verOffset + 5);
    } else if ((verOffset = nAgt.indexOf('MSIE')) !== -1) {
      browser = 'Microsoft Internet Explorer';
      version = nAgt.substring(verOffset + 5);
    } else if ((verOffset = nAgt.indexOf('Chrome')) !== -1) {
      browser = 'Chrome';
      version = nAgt.substring(verOffset + 7);
    } else if ((verOffset = nAgt.indexOf('Safari')) !== -1) {
      browser = 'Safari';
      version = nAgt.substring(verOffset + 7);
      if ((verOffset = nAgt.indexOf('Version')) !== -1) {
        version = nAgt.substring(verOffset + 8);
      }
    } else if ((verOffset = nAgt.indexOf('Firefox')) !== -1) {
      browser = 'Firefox';
      version = nAgt.substring(verOffset + 8);
    } else if (nAgt.indexOf('Trident/') !== -1) {
      browser = 'Microsoft Internet Explorer';
      version = nAgt.substring(nAgt.indexOf('rv:') + 3);
    } else if (
      (nameOffset = nAgt.lastIndexOf(' ') + 1) <
      (verOffset = nAgt.lastIndexOf('/'))
    ) {
      browser = nAgt.substring(nameOffset, verOffset);
      version = nAgt.substring(verOffset + 1);
      if (browser.toLowerCase() === browser.toUpperCase()) {
        browser = navigator.appName;
      }
    }
    // trim the version string
    if ((ix = version.indexOf(';')) !== -1) { version = version.substring(0, ix); }
    if ((ix = version.indexOf(' ')) !== -1) { version = version.substring(0, ix); }
    if ((ix = version.indexOf(')')) !== -1) { version = version.substring(0, ix); }

    majorVersion = parseInt('' + version, 10);
    if (isNaN(majorVersion)) {
      version = '' + parseFloat(navigator.appVersion);
      majorVersion = parseInt(navigator.appVersion, 10);
    }
    // mobile version
    const mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);
    // cookie
    let cookieEnabled = navigator.cookieEnabled ? true : false;

    if (typeof navigator.cookieEnabled === 'undefined' && !cookieEnabled) {
      document.cookie = 'testcookie';
      cookieEnabled =
        document.cookie.indexOf('testcookie') !== -1 ? true : false;
    }
    // system
    let os = unknown;
    const clientStrings = [
      { s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/ },
      { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
      { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
      { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
      { s: 'Windows Vista', r: /Windows NT 6.0/ },
      { s: 'Windows Server 2003', r: /Windows NT 5.2/ },
      { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ },
      { s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ },
      { s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ },
      { s: 'Windows 98', r: /(Windows 98|Win98)/ },
      { s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ },
      { s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
      { s: 'Windows CE', r: /Windows CE/ },
      { s: 'Windows 3.11', r: /Win16/ },
      { s: 'Android', r: /Android/ },
      { s: 'Open BSD', r: /OpenBSD/ },
      { s: 'Sun OS', r: /SunOS/ },
      { s: 'Linux', r: /(Linux|X11)/ },
      { s: 'iOS', r: /(iPhone|iPad|iPod)/ },
      { s: 'Mac OS X', r: /Mac OS X/ },
      { s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
      { s: 'QNX', r: /QNX/ },
      { s: 'UNIX', r: /UNIX/ },
      { s: 'BeOS', r: /BeOS/ },
      { s: 'OS/2', r: /OS\/2/ },
      {
        s: 'Search Bot',
        r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
      }
    ];
    for (const id in clientStrings) {
      if (clientStrings[id]) {
        const cs = clientStrings[id];
        if (cs.r.test(nAgt)) {
          os = cs.s;
          break;
        }
      }
    }

    let osVersion = '';

    if (/Windows/.test(os)) {
      osVersion = /Windows (.*)/.exec(os)[1];
      os = 'Windows';
    }

    switch (os) {
      case 'Mac OS X':
        // console.log('nAgent', nAgt, os);
        // osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
        osVersion = /Mac OS X ([\.\_\d]+)/.exec(nAgt)[1];
        break;

      case 'Android':
        osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
        break;

      case 'iOS':
        const regExResult = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
        osVersion = regExResult[1] + '.' + regExResult[2];
        break;
    }
    const browserInfo = {
      screen: screenSize,
      browser,
      browserVersion: version,
      browserMajorVersion: majorVersion,
      mobile,
      os,
      osVersion
    };
    // console.log(browserInfo);
    this.browser = browser;
    this.browserVersion = version;
  }
  public verlockerInstall() {
    this.saveAnalytics('download', 'VerLocker', environment.appName).subscribe(data => {
    });
  }
}
