import { AuthService } from '../auth/auth.service';
import { AlertController, ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { NotificationsService } from '../notifications/notifications.service';
import { VerlockerData } from 'src/app/models/_core/verlocker-data';
import { ErrorHandlerService } from '../error-handler/error-handler.service';

/**
 * ID: bh-verlocker-service
 * Name: BH Verlocker Service
 * Description: Service used for managing verlocker service.
 * Version: 3
 *
 * ==============================
 * Change Log
 * ==============================
 * 2021-07-02 - MW - v1: Initial dev
 * 2021-07-13 - MW - v2: Expanded size of verlocker modal
 * 2021-07-27 - MW - v3: Added BH-DONT-BUMP-INACTIVITY-TIMER req header
 */
@Injectable({
  providedIn: 'root'
})
export class VerlockerService {
  verlockerData: VerlockerData = {};
  verlockerDataSubject: BehaviorSubject<VerlockerData> = new BehaviorSubject(this.verlockerData);
  checkVersionSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  // Set to true when checking version, set to false when done
  versionCheckingSubject: BehaviorSubject<boolean> = new BehaviorSubject(true);
  displayingVerlocker = false;

  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private modalController: ModalController,
    private authService: AuthService,
    private notifications: NotificationsService,
    private errorHandler: ErrorHandlerService
  ) {

  }

  /**
   * Compare app installed version against recommended or required version
   */
  checkVersion(): Observable<any> {
    const body = {
      app: environment.appName,
      version: environment.appVersion
    };
    const headers = {};
    headers['BH-DONT-BUMP-INACTIVITY-TIMER'] = 'true';
    const url = environment.verlockerUrl + '/versionCheck';
    return this.http.post(url, body, { headers }).pipe(
      map(async (data: any) => {
        if (data.x_status === 'E') {
          this.errorHandler.handleError(
            data,
            'An unexpected error has occurred.'
          );
        } else {
          this.verlockerDataSubject.next(data);
          this.setCheckVersion(false);
          if (data.verstatus === 'REQUIRED' || data.verstatus === 'EXPIRED') {
            this.displayingVerlocker = true;
            this.presentRequested();
            // const modal = await this.modalController.create({
            //   component: VerlockerPage,
            //   componentProps: { verlockerData: data },
            //   cssClass: 'wide-modal',
            //   backdropDismiss: false
            // });
            // modal.onDidDismiss().then(() => {
            //   this.displayingVerlocker = false;
            // });
            // return await modal.present();
          } else {
            this.displayingVerlocker = false;
            this.versionCheckingSubject.next(false);
          }
          return body || {};
        }
        return data.result;
      }),
    );
  }

  getLatestVersion(): Observable<any> {
    const body = {
      app: environment.appName,
      version: environment.appVersion
    };
    const url = environment.verlockerUrl + '/versionCheck';
    return this.http.post(url, body);

  }


  /**
   * Set or update Check Version variable
   * @param checkVersion Set to true to check app version
   */
  setCheckVersion(checkVersion) {
    this.checkVersionSubject.next(checkVersion);
  }

  /**
   * Get Check Version variable
   */
  getCheckVersion(): boolean {
    return this.checkVersionSubject.getValue();
  }


  /**
   * Shows a sample modal with dummy data for UX review
   */
  async testModal() {
    const verData: VerlockerData = {
      app: 'TEST',
      android_install_link: 'https://baystatehealth.org',
      ios_install_link: 'https://baystatehealth.org',
      latest_version: '1.0.0',
      status: 'S',
      update_description: 'This is a test update description.',
      verstatus: 'REQUESTED'
    };

    // const modal = await this.modalController.create({
    //   component: VerlockerPage,
    //   componentProps: verData,
    //   backdropDismiss: false
    // });

    // return await modal.present();
  }

  /**
   * Shows update prompt
   */
  async presentRequested() {
    // console.log('verlocker: presentRequested called');
    let resolveFunction: (confirm: boolean) => void;
    const promise = new Promise<boolean>(resolve => {
      resolveFunction = resolve;
    });

    const alert = await this.alertController.create({
      header: 'Update available',
      message: 'Update this app to get access to the newest features, fixes, and best experience! ',
      buttons: [
        {
          text: 'Update later',
          handler: () => {
            // console.log('Cancel clicked');
            resolveFunction(false);
          }
        },
        {
          text: 'Update now',
          cssClass: 'primary',
          handler: () => {
            // console.log('Update clicked');
            resolveFunction(true);
          }
        }
      ]
    });
    await alert.present();
    return promise;
    // console.log('#####  verlocker > presentRequested: alert.present() called #####');
  }
}
