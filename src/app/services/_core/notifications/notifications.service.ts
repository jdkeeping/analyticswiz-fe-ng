import { LoadingConfig } from './../../../models/_core/loading-config';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { AlertOptions } from '@ionic/core';
import { ApiError } from 'src/app/models/_core/api-error';

/**
 * ID: bh-notifications-service
 * Name: BH Notifications Service
 * Description: Service used for managing notifications, alert messaging, and errors.
 * Version: 4
 *
 * ==============================
 * Change Log
 * ==============================
 * 2021-07-02 - MW - v1: Initial dev
 * 2021-07-13 - MW - v2: Implemented dev warning and alert colors
 * 2021-10-11 - MW - v3: Suppressed 401 pop-up alerts
 * 2022-06-08 - MW - v4: Added messaging to global loading spinner
 */
@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  env = environment;
  isLoading = false;
  loadingConfig: LoadingConfig = { isLoading: false, message: '' };
  isLoadingBehaviorSubject: BehaviorSubject<LoadingConfig> = new BehaviorSubject(this.loadingConfig);
  loadingElem: HTMLIonLoadingElement = null;
  errorList: ApiError[] = [];
  dismissLoadingTimeout = null;
  isErrorShowing = false;
  suppressErrors = false;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
  ) {
  }

  /***
   * Display loading spinner
   */
  async startLoading(message: string = '') {
    if (!this.isLoading) {
      this.isLoading = true;
      this.loadingConfig.isLoading = true;
      this.loadingConfig.message = message;
      this.isLoadingBehaviorSubject.next(this.loadingConfig);
    }

  }

  /***
   * Update loading spinner messaging
   */
  setLoadingMessage(message: string) {
    this.loadingConfig.message = message;
    this.isLoadingBehaviorSubject.next(this.loadingConfig);
  }

  /***
   * Hide loading spinner
   */
  stopLoading() {
    if (this.isLoading) {
      if (this.dismissLoadingTimeout) {
        clearTimeout(this.dismissLoadingTimeout);
      }
      this.dismissLoadingTimeout = setTimeout(async () => {
        this.isLoading = false;
        this.loadingConfig.isLoading = false;
        this.loadingConfig.message = '';
        this.isLoadingBehaviorSubject.next(this.loadingConfig);
      }, 500);
    }
  }

  /**
   * Displays alert message
   *
   * @param header Header text of the alert message
   * @param message subHeader or body text of the alert message
   * @param dismissAfter Milliseconds to dismiss this alert after
   */
  async showAlert(header: string, message?: string, alertType?: 'information' | 'warning' | 'danger' | 'success', dismissAfter?: number) {
    const options: AlertOptions = {
      header,
      message,
      cssClass: 'wide-alert ' + alertType,
      buttons: [
        {
          text: 'Okay',
          cssClass: 'primary'
        }
      ]
    };

    const alert = await this.alertController.create(options);

    await alert.present();
    if (dismissAfter) {
      setTimeout(() => {
        alert.dismiss();
      }, dismissAfter);
    }
  }

  /**
   * Displays toast message at the top of screen
   *
   * @param msg Message to display in toast
   * @param dismissAfter Milliseconds to dismiss the toast
   */
  async showToast(msg: string, dismissAfter: number = 3000) {
    const toast = await this.toastController.create({
      message: msg,
      duration: dismissAfter,
      position: 'top',
      buttons: [
        {
          text: 'Okay',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });

    return await toast.present();
  }

  showDevWarning() {
    this.showAlert(this.env.appDescription + ' DEV Version',
      'You\'re using the non-production DEVELOPMENT version of ' + this.env.appDescription + '.' +
      'This version is used for testing and development of new features and bug fixes. ' +
      'Please use the PRODUCTION version for actual work (if available).', 'warning');
  }
}
