import { environment } from 'src/environments/environment';
import { UserDevice, BrowserInfo } from '../../../models/_core/user-device';
import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { Device } from '@capacitor/device';

/**
 * ID: bh-user-device-service
 * Name: BH User Device Service
 * Description: Service used for capturing user device properties
 * Version: 3
 *
 * ==============================
 * Change Log
 * ==============================
 * 2021-07-02 - MW - v1: Initial dev
 * 2022-05-25 - MW - v2: Implemented expanded properties and metrics
 * 2022-05-26 - MW - v3: Integrated with Theme preference
 */
@Injectable({
  providedIn: 'root'
})
export class UserDeviceService {
  deviceSubject: BehaviorSubject<UserDevice> = new BehaviorSubject<UserDevice>({});
  env = environment;

  constructor(
    public platform: Platform,
  ) {
    this.loadDeviceProperties();
  }

  async loadDeviceProperties() {
    const device = this.deviceSubject.getValue();
    const browserInfo: BrowserInfo = this.getBrowserInfo();
    const deviceInfo = await Device.getInfo();
    const deviceId = await Device.getId();
    const language = await Device.getLanguageCode();

    device.id = deviceId.identifier;
    device.os = deviceInfo.platform;
    device.osVersion = deviceInfo.osVersion;
    // Captures device's physical screen height and width (regardless of app window)
    device.screenHeight = screen.height;
    device.screenWidth = screen.width;
    // Captures viewport's (app window) height and width
    device.viewportHeight = window.innerHeight;
    device.viewportWidth = window.innerWidth;
    device.isNarrowViewport = this.isMobileWidth();
    // Define orientation of device
    device.orientation = this.getOrientation();
    device.isLandscape = this.platform.isLandscape();
    device.isPortrat = this.platform.isPortrait();
    device.isMobileDevice = this.isNotBrowser();
    device.browser = browserInfo.browser;
    device.version = browserInfo.version;
    device.cookiesEnabled = browserInfo.cookiesEnabled;
    device.language = language.value;
    device.prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    device.isNativeApp = this.platform.is('capacitor') || this.platform.is('cordova');
    // console.log('device.prefersDark', device.prefersDark);
    this.deviceSubject.next(device);
    this.listenForThemePreference();
  }

  listenForThemePreference() {
    const device = this.deviceSubject.getValue();
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (mediaQuery) => {
        // console.log('listening for theme pref', mediaQuery);
        const device = this.deviceSubject.getValue();
        device.prefersDark = mediaQuery.matches;
        this.deviceSubject.next(device);
      });
  }


  /**
   * Gets User Device object
   * Recommend subscribing to user device directly
   */
   getUserDevice(): UserDevice {
    return this.deviceSubject.getValue();
  }

  /***
   * Updates User Device object with provided object
   * @param device User Device object to replace existing value
   */
  setUserDevice(device: UserDevice) {
    this.deviceSubject.next(device);
  }

  getOrientation() {
    if (this.platform.isLandscape()) {
      return 'LANDSCAPE';
    } else if (this.platform.isPortrait()) {
      return 'PORTRAIT';
    } else {
      return 'UNKNOWN';
    }
  }

  getPrefersDark() {
    const device = this.deviceSubject.getValue();
    device.prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.deviceSubject.next(device);
    // console.log('prefersDark: ', device.prefersDark);
    return device.prefersDark;
  }

  isMobileWidth() {
    // console.log('screen width', screen.width);
    return window.innerWidth < 768;
  }

  getBrowserInfo(): BrowserInfo {
    // browser
    const unknown = '-';
    const nVer = navigator.appVersion;
    const nAgt = navigator.userAgent;
    let browser = navigator.appName;
    const browserInfo: BrowserInfo = {};
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

    browserInfo.browser = browser;
    browserInfo.version = version;
    browserInfo.majorVersion = majorVersion;
    browserInfo.cookiesEnabled = cookieEnabled;
    return browserInfo;
  }

  /*** Check if current device is NOT a web browser
   * @return Returns a TRUE if current device is NOT a browser
   */
  isNotBrowser(): boolean {
    if ((this.platform.is('android') || this.platform.is('ios')) && (this.platform.is('cordova') || this.platform.is('capacitor'))) {
      return true;
    } else {
      return false;
    }
  }


}
