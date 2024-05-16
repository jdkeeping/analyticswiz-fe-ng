import { AnalyticsService } from 'src/app/services/_core/analytics/analytics.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationsService } from '../notifications/notifications.service';
import { ActivatedRoute } from '@angular/router';
import { ApiError } from 'src/app/models/_core/api-error';
import { ModalController, NavController } from '@ionic/angular';
import { ErrorModalPage } from 'src/app/pages/_core/error-modal/error-modal.page';
import { NavigationService } from '../../navigation/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  errorList: ApiError[] = [];
  suppressErrors = false;
  isErrorShowing = false;

  constructor(
    private notifications: NotificationsService,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private analytics: AnalyticsService,
    private navCtrl: NavController
  ) { }

    /**
   * Handles errors and user notifications.  Sends error contents to console, parses error for toast, displays error toast.
   *
   * @param err  Send error of any format for parsing (httpErrorResponse, string, etc.)
   * @param userFriendlyText (optional) Define user-friendly error text.
   * Leave out or empty to display error object's message; Send 'skip_toast' to suppress error toast.
   */
    async handleError(err: any | string, action: string, parameters: any = null, userFriendlyText: string = '') {
      let header = '';
      let msg = '';
      let showError = true;

      // Console log error/response obj and remove outstanding loading modal
      console.error(err);
      this.notifications.stopLoading();

      const headerPrefix = 'Ouch... You bumped into an ';
      let msgPrefix = 'An error occurred while attempting the last action. Details: \n\n';

      // Parse error message
      if (typeof err === 'string') {
        header = headerPrefix + 'error';
        msg = msgPrefix + err + `. (Action: ${action})`;
      } else if (err.error) {
        header = headerPrefix + `Error ${err.status}`;
        msg = msgPrefix + err.error.message + `. (Action: ${action})`;
      } else if (err.message) {
        header = headerPrefix + `Error ${err.status}: ` + action;
        msg = msgPrefix + err.message +  + `. (Action: ${action})`;
      } else {
        header = headerPrefix + `Error ${err.status}: ` + action;
        msg = 'An unexpected error occurred.'  + `. (Action: ${action})`;
      }

      // Log Error
      let errDetail: ApiError;
      console.log('error.handler.errDetail', err);
      if (typeof err === 'string') {
        errDetail = {
          errorName: 'NonDescriptError',
          action,
          error: null,
          requestId: null,
          statusCode: -1,
          message: msg,
          path: this.route.snapshot.url.toString(),
          timestamp: new Date().toISOString()
        };
        this.errorList.push(errDetail);
      } else if (err && err.error) {
        errDetail = {
          errorName: err.error.errorName,
          action,
          error: err.error,
          requestId: err.error.requestId,
          statusCode: err.error.statusCode,
          message: err.message,
          path: err.error.path,
          timestamp: new Date().toISOString()
        }
        this.errorList.push(errDetail);
        console.log('Processing error', errDetail, this.errorList);
      } else {
        this.errorList.push(err);
      }

      // Swap out error user-friendly text
      if (userFriendlyText && userFriendlyText.trim().length > 0) {
        msg = userFriendlyText.trim();
      }

      // Check for error exceptions
      if (msg) {
        switch (msg.trim().toLowerCase()) {
          case 'no_alert':
          case 'cordova_not_available':
          case 'plugin_not_installed':
          case 'key [_ss_un] not found.':
            showError = false;
        }

        // Check for error suppression
        if (this.suppressErrors) {
          showError = false;
        }
      }

      // Show error modal
      if (showError && !this.isErrorShowing && !this.isErrorCode(401, err) && !this.isErrorCode(404, err)) {
        this.isErrorShowing = true;
        console.log('show error modal: ', errDetail);
        this.showErrorPrompt(errDetail);
        const errMsg = err ?
          // Error Object
          err.error && err.error.message ? err.error.statusCode + ': ' +  err.error.message : err.message
          : '';
        this.analytics.errorEvent(action, errMsg);
      }

      // Check for 404 error
      if (this.isErrorCode(404, err)) {
        const url = location.href;
        console.log('checking 404 error', url);
        this.navCtrl.navigateRoot('/error/404?p=' + url);
      }
    }

    isErrorCode(errorCode, error): boolean {
      if (error instanceof HttpErrorResponse) {
        if (error.status === errorCode) {
          return true;
        }
      }
      return false;
    }

    async showErrorPrompt(errDetail: ApiError | HttpErrorResponse | string = undefined) {
      const modal = await this.modalCtrl.create({
        component: ErrorModalPage,
        cssClass: 'error-modal',
        backdropDismiss: false,
        componentProps: {
          apiError: errDetail
        }
      });
      await modal.present();
    }

}
