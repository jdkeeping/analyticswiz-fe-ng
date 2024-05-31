import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { VerlockerRecord } from 'src/app/models/_core/verlocker-record';
import { ErrorHandlerService } from '../error-handler/error-handler.service';
import { HelperUtilitiesService } from '../helper-utilities/helper-utilities.service';

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
  verlockerRecord: VerlockerRecord = {};
  verlockerRecordSubject: BehaviorSubject<VerlockerRecord> = new BehaviorSubject(this.verlockerRecord);
  checkVersionSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  // Set to true when checking version, set to false when done
  versionCheckingSubject: BehaviorSubject<boolean> = new BehaviorSubject(true);
  displayingVerlocker = false;
  suppressUpdatePrompt = false;

  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private errorHandler: ErrorHandlerService,
    private helpers: HelperUtilitiesService
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
      map(async (data: VerlockerRecord) => {
        if (data.x_status === 'E') {
          this.errorHandler.handleError(
            data,
            'An unexpected error has occurred.'
          );
        } else {
          this.verlockerRecordSubject.next(data);
          this.setCheckVersion(false);

          const versionExists = (data.latest_version !== '');

          if (versionExists) {
            const isCurrentNewer = this.checkCurrentVersionNewer(data.latest_version);
            // Handle version status
            switch (data.verstatus) {
              case 'REQUIRED':
              case 'EXPIRED':
                this.displayingVerlocker = true;
                this.versionCheckingSubject.next(true);
                this.presentRequested(true);
                break;

              case 'REQUESTED':
                this.displayingVerlocker = true;
                this.presentRequested(false);
                this.versionCheckingSubject.next(true);
                break;

              default:
                this.displayingVerlocker = false;
                this.versionCheckingSubject.next(false);
            }
          }
          return body || {};
        }
        return data;
      }),
    );
  }

  checkCurrentVersionNewer(latestVersion): boolean {
    const currVersionNumbers = environment.appVersion.split('.');
    const latestVersionNumbers = latestVersion.split('.');
    let isCurrentNewer = false;

    if (currVersionNumbers.length > 0 && this.getLatestVersion.length > 0) {
      let index = 0;
      for (const n of currVersionNumbers) {
        if (n > latestVersionNumbers[index]) {
          isCurrentNewer = true;
          break;
        }
        index +=1;
      }
    }

    if (isCurrentNewer) {
      console.warn('You are using a version later than what\'s tracked in the database. Add ' + environment.appVersion + ' to verlocker.');
    }

    return isCurrentNewer;
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
   * Shows update prompt
   */
  async presentRequested(isRequired) {
    // Check if update prompt is suppressed, if not then prompt
    if (!this.suppressUpdatePrompt) {
      const isBrowser = this.helpers.isNotBrowser();
      // Set alert options
      const alertOptions = {
        header: 'Update ' + (isRequired ? 'required' : 'available'),
        message: (isBrowser) ? '' :
          'Update now to get access to the latest features and best experience! ',
        backdropDismiss: false,
        buttons: []
      }

      // If not a browser (is app), add update now button
      if (!isBrowser) {
        alertOptions.buttons.unshift(
          {
            text: 'Update now',
            cssClass: 'primary',
            handler: () => {
              // Update
            }
          }
        );
      }

      // If not required, add Later option button
      if (!isRequired) {
        alertOptions.buttons.unshift(
          {
            text: 'Later',
            cssClass: '',
            handler: () => {
              // Do nothing
              this.suppressUpdatePrompt = true;
            }
          }
        );
      }

      const alert = await this.alertController.create(alertOptions);
      await alert.present();
    }
  }
}
