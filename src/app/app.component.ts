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
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
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
  prefersDark: boolean = false;
  theme: ThemeOption = 'light';
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
  paletteToggle = false;

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
    // Save dark mode preference
    const prefersDark = localStorage.getItem('prefersDark');
    console.log('listenForThemePreferences: prefersDark from storage', prefersDark, typeof prefersDark);
    this.prefersDark = (prefersDark) ? prefersDark === 'true' :
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    console.log('listenForThemePreferences: prefersDark from global', this.prefersDark);
    this.setTheme();
  }

  subscribeToMenu() {
    this.subs.push(
      this.authService.menuOpen.subscribe(async val => {
        const menus = await this.menuCtrl.getMenus();
        // console.log('Opening menu: ', val, menus);
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
    // let currentTheme: ThemeOption;
    switch (this.env.theme) {
      case 'light':
        this.initializeDarkPalette(false);
        break;

      case 'dark':
        this.initializeDarkPalette(true);
        break;

      case 'user':
        console.log('setTheme: user', this.prefersDark);
        this.initializeDarkPalette(this.prefersDark);
        break;
    }
    // this.authService.setTheme(currentTheme);
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

  // Check/uncheck the toggle and update the palette based on isDark
  initializeDarkPalette(isDark) {
    this.paletteToggle = isDark;
    this.toggleDarkPalette(isDark);
  }

  // Listen for the toggle check/uncheck to toggle the dark palette
  toggleChange(ev) {
    this.toggleDarkPalette(ev.detail.checked);
  }

  // Add or remove the "ion-palette-dark" class on the html element
  toggleDarkPalette(shouldAdd) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);

    // Save dark mode preference
    localStorage.setItem('prefersDark', shouldAdd);

    if (shouldAdd) {
      // Add color-scheme meta for dark mode
      const metaTag = document.createElement('meta');
      metaTag.name = 'color-scheme';
      metaTag.content = 'light dark';
      document.getElementsByTagName('head')[0].appendChild(metaTag);
    } else {
      // Remove color-scheme for light mode
      const metaTags = document.getElementsByTagName('meta');
      for (var i = 0; i < metaTags.length; i++) {
        if (metaTags[i].getAttribute('name') === 'color-scheme') {
          metaTags[i].parentNode.removeChild(metaTags[i]);
          break;
        }
      }
    }
  }

}
