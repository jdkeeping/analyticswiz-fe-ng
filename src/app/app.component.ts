import { ChangeDetectorRef, Component, HostListener, NgZone, OnInit } from '@angular/core';
import {
  IonApp, IonRouterOutlet, Platform, MenuController, IonHeader, IonMenu, IonToggle, IonNote, ModalController,
  IonSpinner, IonLabel, IonIcon, IonList, IonItem, IonContent, IonTitle, IonButton, IonButtons, IonToolbar,
  IonListHeader, IonItemDivider
} from '@ionic/angular/standalone';
import { ThemeOption } from './models/_core/theme-option';
import { environment } from 'src/environments/environment';
import { Subscription, firstValueFrom } from 'rxjs';
import { User } from './models/user';
import { UserDeviceService } from './services/_core/user-device/user-device.service';
import { Router } from '@angular/router';
import { AuthService } from './services/_core/auth/auth.service';
import { NotificationsService } from './services/_core/notifications/notifications.service';
import { VerlockerService } from './services/_core/verlocker/verlocker.service';
import { AnalyticsService } from './services/_core/analytics/analytics.service';
import { Keyboard } from '@capacitor/keyboard';
import { StatusBar } from '@capacitor/status-bar';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { CommonModule } from '@angular/common';
import { BhHeaderComponent } from './components/_core/bh-header/bh-header.component';
import { BhUserIconComponent } from './components/_core/bh-user-icon/bh-user-icon.component';
import { PipesModule } from './pipes/pipes.module';
import { AnalyticsClickDirective } from './directives/analytics-click/analytics-click.directive';
import { NavigationService } from './services/navigation/navigation.service';
import { LanguageModalPage } from './pages/_core/language-modal/language-modal.page';
import { TranslatorService } from './services/_core/translator/translator.service';
import { Language } from './models/translation-dict';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    CommonModule,
    IonApp,
    IonRouterOutlet,
    IonHeader,
    IonContent,
    IonTitle,
    IonSpinner,
    IonLabel,
    IonIcon,
    IonList,
    IonItem,
    IonMenu,
    IonButtons,
    IonToolbar,
    IonButton,
    IonListHeader,
    IonItemDivider,
    IonToggle,
    IonNote,
    BhHeaderComponent,
    BhUserIconComponent,
    PipesModule,
    AnalyticsClickDirective,
    LanguageModalPage
  ],
})
export class AppComponent implements OnInit {
  env = environment;
  prefersDark = false;
  theme: ThemeOption = 'M';
  subs: Subscription[] = [];
  updateInterval = null;
  displayingVerlocker = false;
  loadingSub: Subscription = null;
  isLoading = false;
  loadingMessage = '';
  isMenuOpen = false;
  presentationMode = false;
  authUser: User;
  preferredLanguage: Language;
  langReady = true;

  constructor(
    private deviceService: UserDeviceService,
    private platform: Platform,
    private notifications: NotificationsService,
    private analytics: AnalyticsService,
    private verlockerService: VerlockerService,
    private authService: AuthService,
    private menuCtrl: MenuController,
    private zone: NgZone,
    private router: Router,
    private navService: NavigationService,
    private modalCtrl: ModalController,
    private translator: TranslatorService,
    private cdr: ChangeDetectorRef
  ) {
    this.initializeApp();
    this.subscribeToLoader();
    this.checkVersion();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.deviceService.loadDeviceProperties();
  }

  async ngOnInit() {
    this.listenForThemePreference();
    this.subscribeToMenu();
    this.subscribeToUserDevice();
    this.subscribeToUserState();
    this.initTranslator();
  }

  refreshView() {
    this.cdr.detectChanges();
    this.langReady = false;
    setTimeout(() => {
      this.langReady = true;
      this.cdr.detectChanges();
    }, 0);

  }

  listenForThemePreference() {
    this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.setTheme();
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (mediaQuery) => {
        const device = this.deviceService.deviceSubject.getValue();
        device.prefersDark = mediaQuery.matches;
        this.prefersDark = device.prefersDark;
        this.deviceService.deviceSubject.next(device);
        this.setTheme();
      });
  }

  subscribeToMenu() {
    this.subs.push(
      this.authService.menuOpen.subscribe(async val => {
        const menus = await this.menuCtrl.getMenus();
        console.log('Opening menu: ', val, menus);
        this.isMenuOpen = val;
        if (this.isMenuOpen) {
          this.menuCtrl.open('user-menu');
        } else {
          this.menuCtrl.close();
          this.isMenuOpen = false;
        }
      })
    );
  }

  subscribeToUserState() {
    this.subs.push(
      this.authService.userStateSubject.subscribe(us => {
        // console.log('UserState updated', us);
        if (us && us.theme) {
          this.theme = us.theme;
          this.setTheme();
        }
      }),
      this.authService.authUser.subscribe(au => {
        this.authUser = au;
      }),
      this.translator.preferredLanguageChanged.subscribe(l => {
        this.preferredLanguage = this.translator.supportedLanguages.find(sl => sl.code === l);
      })
    );
  }

  subscribeToUserDevice() {
    this.subs.push(
      this.deviceService.deviceSubject.subscribe(d => {
        // console.log('UserDevice updated', d);
        this.prefersDark = d.prefersDark;
        this.setTheme();
      })
    );
  }

  async initTranslator() {
    const device = await this.deviceService.loadDeviceProperties();
    const savedLangCode = localStorage.getItem('preferredLanguage');
    const rawLangCode = savedLangCode || device.language;
    const langCode = this.translator.mapApiLanguageCode(rawLangCode);
    this.translator.init(langCode);
    this.refreshView();
  }

  subscribeToLanguageChanges() {
    this.subs.push(
      this.translator.preferredLanguageChanged.subscribe(s => this.refreshView())
    );
  }

  dismissMenu() {
    this.authService.toggleMenu();
  }

  setTheme() {
    let currentTheme: ThemeOption;
    // Check if theme is user-defined
    if (this.env.theme === 'user') {
      // Check if user is not matching OS
      if (this.theme !== undefined && this.theme !== 'M') {
        console.log('found theme', this.theme);
        switch (this.theme) {
          case 'D':
            // Set to dark
            document.body.classList.add('dark');
            currentTheme = 'D';
            break;

          default:
            // Set to light
            document.body.classList.remove('dark');
            currentTheme = 'L';
            break;
        }
      } else if (this.prefersDark) {
        // console.log('Setting dark theme');
        document.body.classList.add('dark');
        currentTheme = 'D';
      } else {
        // console.log('Setting light theme');
        document.body.classList.remove('dark');
        currentTheme = 'L';
      }
    } else {
      // Theme is defined by environment
      if (this.env.theme === 'dark') {
        document.body.classList.add('dark');
        currentTheme = 'D';
      } else {
        document.body.classList.remove('dark');
        currentTheme = 'L';
      }
    }
    // console.log('Setting theme', this.env.theme, this.theme, this.prefersDark);
    this.authService.setTheme(currentTheme);
  }

  async initializeApp() {
    // await this.storage.create();
    this.platform.ready().then(() => {
      this.analytics.initAnalytics();
      this.initNativeFeatures();
    });
  }

  async initNativeFeatures() {
    if (this.platform.is('capacitor')) {
      Keyboard.setAccessoryBarVisible({ isVisible: true });
      await StatusBar.hide();
      await this.initUniversalLinks();
    }
  }

  async initUniversalLinks() {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      this.zone.run(() => {
        // console.log('initUniversalLinks', event);
        const splitPoint = this.env.webUrl;
        const route = event.url.split(splitPoint).pop();
        if (route) {
          this.router.navigateByUrl(route);
        }
      });
    });
  }

  subscribeToLoader() {
    this.loadingSub = this.notifications.isLoadingBehaviorSubject.subscribe(val => {
      this.isLoading = val.isLoading;
      this.loadingMessage = val.message;
    });
  }

  checkVersion() {
    if (!this.updateInterval) {
      const checkVersion = firstValueFrom(this.verlockerService.checkVersion());
      this.updateInterval = setInterval(() => {
        if (!this.verlockerService.displayingVerlocker) {
          firstValueFrom(this.verlockerService.checkVersion());
        }
      }, 120000);
    }
  }

  closeMenu() {
    this.menuCtrl.close();
  }

  signIn() {
    this.navService.navigateRoot('/login');
    this.menuCtrl.close();
  }

  signOut() {
    this.authService.logout();
    this.navService.navigateRoot('/login');
    this.menuCtrl.close();
  }

  openMyAccount() {
    this.navService.navigateRoot('/my-account');
    this.menuCtrl.close();
  }

  openFeedback() {

  }

  openHelp() {

  }

  async setLanguage() {
    const modal = await this.modalCtrl.create({
      component: LanguageModalPage,
    });

    modal.onDidDismiss().then(d => {
      this.refreshView();
    });
    modal.present();
    this.menuCtrl.close();
  }

}
