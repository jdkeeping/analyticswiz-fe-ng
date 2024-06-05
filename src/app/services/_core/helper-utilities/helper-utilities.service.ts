import { ConstantsService } from 'src/app/services/_core/constants/constants.service';
import { NotificationsService } from 'src/app/services/_core/notifications/notifications.service';
// import { PinCheck } from '@ionic-native/pin-check/ngx'; -- Not supported in Ionic 6
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { State } from 'src/app/models/_core/state';
import moment from 'moment';
import { SelectOption } from 'src/app/models/_core/select-option';
import { TextReplacement } from 'src/app/models/_core/text-replacement';
import { ErrorHandlerService } from '../error-handler/error-handler.service';

/**
 * ID: bh-helper-utilities-service
 * Name: BH Helper Utilities Service
 * Description: Library of commonly used methods for a variety of purposes.
 * Version: 4
 *
 * ==============================
 * Change Log
 * ==============================
 * 2021-07-02 - MW - v1: Initial dev
 * 2021-07-13 - MW - v2: Removed console.log
 * 2021-10-08 - MW - v3: Improved last name calc
 * 2022-05-21 - MW - v4: Added first - space - last name handling
 */

@Injectable({
  providedIn: 'root'
})
export class HelperUtilitiesService {
  env = environment;
  quillReplacements: TextReplacement[] = [
    {
      term: '<iframe ',
      replaceWith: '<ifr '
    },
    {
      term: '</iframe> ',
      replaceWith: '</ifr>'
    },
    {
      term: '<a ',
      replaceWith: '<xa '
    },
    {
      term: '</a>',
      replaceWith: '</xa>'
    }
  ];

  quillRemovals = [
    '<p><br></p>',
    '<h2><br></h2>',
    '<h3><br></h3>'
  ];

  constructor(
    private platform: Platform,
    private http: HttpClient,
    // private pinCheck: PinCheck,
    private notificationsService: NotificationsService,
    private constants: ConstantsService,
    private errorHandler: ErrorHandlerService
  ) { }

  /*** Check if current device is NOT a web browser
  * @return Returns a TRUE if current device is NOT a browser
  */

  isNotBrowser(): boolean {
    if ((this.platform.is('capacitor') || this.platform.is('cordova'))) {
      return true;
    } else {
      return false;
    }
  }

  getHealthCheck() {
    const url = environment.apiUrl + '/healthcheck';
    return this.http.get(url).pipe(
      map((data: any) => data),
      catchError(err => {
        // user notifications
        this.errorHandler.handleError(err, 'helper-utilities-service.getHealthCheck(): ' + url);
        return of(err);
      })
    );
  }

  // async isPinReady(): Promise<boolean> {
  //   return await new Promise(async val => {
  //     if (this.isNotBrowser()) {
  //       await this.pinCheck.isPinSetup()
  //         .then(
  //           (data) => {
  //             console.log('pin is setup.', val);
  //             resolve(true);
  //           },
  //           (err) => {
  //             console.log('pin not setup.', val);
  //             resolve(false);
  //           }
  //         );
  //     } else {
  //       // web browser; assume true
  //       // console.log('web browser detected during pin check');
  //       resolve(true);
  //     }
  //   });

  // }

  convertBooleanAsYesNoText(boolValue) {
    if (boolValue) {
      return 'Yes';
    } else {
      return 'No';
    }
  }

  cleanPhoneNumber(phoneNumber) {
    if (phoneNumber) {
      return phoneNumber.replace('(', '').replace(')', '').replace('-', '').replace(' ', '').trim();
    } else {
      return '';
    }
  }

  cleanSSN(ssn) {
    if (ssn) {
      const re = /\-/gi;
      return ssn.replace(re, '').trim();
    } else {
      return '';
    }
  }

  formatSsn(value) {
    if (value && value.length === 9) {
      return value.substr(0, 3) + '-' + value.substr(3, 2) + '-' + value.substr(5, 4);
    } else {
      return '';
    }
  }

  formatPhone(value) {
    if (value && value.length === 10) {
      return '(' + value.substr(0, 3) + ') ' + value.substr(3, 3) + '-' + value.substr(6, 4);
    }
    return value;
  }

  getStateName(value) {
    const states: State[] = this.constants.states.filter((val) => val.stateCode === value);
    if (states && states.length > 0) {
      return states[0].stateName;
    } else if (!value || value === '') {
      return '';
    } else {
      return '(Unknown State Code)';
    }
  }

  formatDate(value, parseFormat) {
    if (parseFormat) {
      return this.checkForInvalidDate(value, moment(value, parseFormat).format('M/D/YYYY'));
    }
    if (value && value.length === 8 && value.indexOf('-') === -1) {
      // yyyyMMdd format
      return this.checkForInvalidDate(value, moment(value, 'YYYYMMDD').format('M/D/YYYY'));
    } else if (value && value.length === 10 && value.indexOf('-') === 4) {
      // yyyy-MM-dd format
      return this.checkForInvalidDate(value, moment(value, 'YYYY-MM-DD').format('M/D/YYYY'));
    } else if (value && value.length === 12 && value.indexOf('-') === -1) {
      // yyyyMMddHHmm format
      return this.checkForInvalidDate(value, moment(value, 'YYYYMMDDHHmm').format('M/D/YYYY H:mm'));
    } else if (value && value.length === 14 && value.indexOf('-') === -1) {
      // yyyyMMddHHmmss format
      return this.checkForInvalidDate(value, moment(value, 'YYYYMMDDHHmmss').format('M/D/YYYY H:mm:ss'));
    } else if (value && value.length > 24 && value.indexOf('T') > -1) {
      return this.checkForInvalidDate(value, moment(value).format('M/D/YYYY H:mm:ss'));
    } else {
      // Unexpected format, return value as is
      return value;
    }

  }

  convertUtcToLocal(timestamp, parseFormat) {
    // const timezoneOffsetInMinutes = new Date().getTimezoneOffset();
    const utcMoment = moment(timestamp, parseFormat);
    const offsetTimestampMoment = utcMoment.local();
    return offsetTimestampMoment;
  }

  convertLocalToUtc(timestamp, parseFormat) {
    // const timezoneOffsetInMinutes = new Date().getTimezoneOffset();
    const localMoment = moment(timestamp, parseFormat);
    const serverTimestampMoment = localMoment.utc();
    return serverTimestampMoment;
  }

  checkForInvalidDate(value, parsedDate) {
    return (parsedDate !== 'Invalid date') ? parsedDate : value;
  }

  convertNullToEmptyString(value) {
    // console.log('Converting value ', value);
    if (typeof value === 'undefined' || value === null) {
      return '';
    } else {
      return value;
    }
  }

  encodeEmail(email) {
    return encodeURI(email).replace('#', '%23').replace('&', '%26').replace('?', '%3F');
  }

  getFirstName(fullName) {
    return (fullName && fullName.indexOf(',') > -1) ? fullName.split(',')[1].trim() :
      (fullName && fullName.indexOf(' ') > -1) ? fullName.split(' ')[0].trim() : fullName;
  }

  getLastName(fullName) {
    return (fullName && fullName.indexOf(',') > -1) ? fullName.split(',')[0].trim() :
      (fullName && fullName.indexOf(' ') > -1) ? fullName.split(' ')[1].trim() : fullName;
  }

  setAddressBarUrl(url) {
    window.history.pushState(null, this.env.appDescription + ' - Baystate Health', url);
  }

  getTimeOptions(): SelectOption[] {
    const timeOptions: SelectOption[] = [];
    for (let h = 0; h < 24; h++) {
      const hourTime = h.toString().length === 1 ? '0' + h.toString() : h.toString();
      for (let m = 0; m < 60; m += 5) {
        const minuteTime = m.toString().length === 1 ? '0' + m.toString() : m.toString();
        const timeValue = `${hourTime}:${minuteTime}`;
        const momentTime = moment(timeValue, 'H:mm')
        const label = momentTime.format('h:mm a');
        timeOptions.push({ label, value: timeValue });
      }
    }
    return timeOptions;
  }

  cleanQuillEditorHtml(quillHtml: string): string {
    let text = quillHtml;

    if (quillHtml) {
      for (const r of this.quillRemovals) {
        const regex = new RegExp(r, 'g');
        text = text.replace(regex, '');
      }

      for (const r of this.quillReplacements) {
        const regex = new RegExp(r.term, 'g');
        text = text.replace(regex, r.replaceWith);
      }
    }
    return text ? text.trim() : '';
  }

  presentQuillEditorHtml(text: string): string {
    if (text) {
      for (const r of this.quillReplacements) {
        const regex = new RegExp(r.replaceWith, 'g');
        const replacedText = text.replace(regex, r.term);
        // console.log(`presentQuillEditorHtml(${r.replaceWith} => ${r.term}): old: `, text);
        // console.log(`presentQuillEditorHtml: new: `, replacedText);
        text = replacedText;
      }
    }
    return text ? text.trim() : '';
  }

  capitalizeString(stringToCapitalize: string): string {
    // Define acronym exceptions
    const acronyms = [
      'cis'
    ];
    // Split heading by space
    const words = stringToCapitalize.split(' ');
    let capitalizedString = '';
    // Loop through words
    for (let w of words) {
      let capitalizedWord = '';
      const acronymMatch = acronyms.find(a => a.trim().toLowerCase() === w.trim().toLowerCase());
      if (acronymMatch === undefined) {
        // Save word for ref
        const oldWord = w;
        // Capitalize the first letter
        const firstLetter = w.substring(0, 1).toUpperCase();
        const trailingLetters = w.substring(1, (w.length));
        // Rebuild word
        capitalizedWord = (w && w.length > 0) ? firstLetter + trailingLetters : '';
      } else {
        // Acronym match found, set to all uppercase
        capitalizedWord = w.toUpperCase();
      }
      capitalizedString += capitalizedWord + ' ';
    }
    return capitalizedString;
  }

  sortArrayByTextProperty(propertyName, a, b): number {
    if (a[propertyName] && b[propertyName]) {
      const aProperty = a[propertyName].toLowerCase();
      const bProperty = b[propertyName].toLowerCase();
      if (aProperty < bProperty) {
        return -1;
      }
      if (aProperty > bProperty) {
        return 1;
      }
      return 0;
    } else {
      return -1;
    }
  }

}
