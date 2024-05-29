import { firstValueFrom } from 'rxjs';
import { IonSpinner, IonButton } from '@ionic/angular/standalone';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, Platform } from '@ionic/angular/standalone';
import { BhBodyComponent } from 'src/app/components/_core/bh-body/bh-body.component';
import { BhFooterComponent } from 'src/app/components/_core/bh-footer/bh-footer.component';
import { BhGroupBoxComponent } from 'src/app/components/_core/bh-group-box/bh-group-box.component';
import { BhHeaderComponent } from 'src/app/components/_core/bh-header/bh-header.component';
import { BhListCardComponent } from 'src/app/components/_core/bh-list-card/bh-list-card.component';
import { environment } from 'src/environments/environment';
import { VerlockerService } from 'src/app/services/_core/verlocker/verlocker.service';
import { VerlockerData } from 'src/app/models/_core/verlocker-data';
import { HelperUtilitiesService } from 'src/app/services/_core/helper-utilities/helper-utilities.service';
import { AnalyticsService } from 'src/app/services/_core/analytics/analytics.service';
import { Browser } from '@capacitor/browser';
import { AnalyticsClickDirective } from 'src/app/directives/analytics-click/analytics-click.directive';

@Component({
  selector: 'app-check-for-updates',
  templateUrl: './check-for-updates.page.html',
  styleUrls: ['./check-for-updates.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonIcon,
    IonSpinner,
    IonButton,
    CommonModule,
    FormsModule,
    BhHeaderComponent,
    BhBodyComponent,
    BhFooterComponent,
    BhListCardComponent,
    BhGroupBoxComponent,
    AnalyticsClickDirective
  ]
})
export class CheckForUpdatesPage implements OnInit {
  env = environment;
  isLoading = true;
  statusIcon = 'checkmark-outline';
  statusColor = 'success';
  statusText = 'Checking app version...';
  versionData: VerlockerData;
  devPlatform: 'mobile' | 'web';

  constructor(
    private verlocker: VerlockerService,
    private helpers: HelperUtilitiesService,
    private analytics: AnalyticsService,
    private platform: Platform
  ) { }

  ngOnInit() {
    this.checkVersion();
    this.devPlatform = this.helpers.isNotBrowser() ? 'mobile' : 'web';
  }

  async checkVersion() {
    this.versionData = await firstValueFrom(this.verlocker.getLatestVersion());
    switch (this.versionData.verstatus) {
      case 'REQUESTED':
        this.statusIcon = 'alert-circle-outline';
        this.statusColor = 'danger';
        this.statusText = 'A newer version is available. Please ' +
          ((this.devPlatform === 'mobile') ? 'update' : 'refresh this page')
        + ' now.';
        break;

      case 'REQUIRED':
      case 'EXPIRED':
        this.statusIcon = 'alert-circle-outline';
        this.statusColor = 'danger';
        this.statusText = 'The latest version is required. Please ' +
          ((this.devPlatform === 'mobile') ? 'update' : 'refresh this page')
        + ' now.';
        break;

      default:
        this.statusIcon = 'checkmark-circle-outline';
        this.statusColor = 'success';
        this.statusText = 'You are using the latest version of ' + this.env.appDescription;
    }
    this.isLoading = false;
  }

  update() {
    if (this.helpers.isNotBrowser()) {
      if (this.platform.is('android')) {
        this.updateAndroid();
      } else if (this.platform.is('ios')) {
        this.updateiOS();
      } else {
        this.webUpdate();
      }
    } else {
      this.webUpdate();
    }
  }

  updateAndroid() {
    this.analytics.clickEvent('check-for-updates: android-manual-install', '');
    this.analytics.verlockerInstall();
    window.open(this.versionData.android_install_link, '_system');
  }

  async updateiOS() {
    const url = decodeURIComponent(this.versionData.ios_install_link + '');
    if (this.platform.is('cordova') || this.platform.is('capacitor')) {
      this.analytics.clickEvent('Verlocker: User attempted update', 'iOS App');
      const browser = await Browser.open({ url });
      // this.inAppBrowser.create(url, '_system');
    } else {
      // running on iOS Safari browser
      this.analytics.clickEvent('Verlocker: User attempted update', 'iOS Web Browser');
      window.open(url, '_self');
    }
  }

  webUpdate() {
    // console.log('Upgrade App-Not a valid platform');
    this.analytics.clickEvent('check-for-updates: web-refresh', '');
    const url = window.location.protocol + '//' + window.location.host + '/';
    window.location.href = url;
  }


}
