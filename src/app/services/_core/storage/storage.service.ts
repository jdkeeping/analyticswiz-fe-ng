import { NotificationsService } from '../notifications/notifications.service';
import { HelperUtilitiesService } from '../helper-utilities/helper-utilities.service';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ErrorHandlerService } from '../error-handler/error-handler.service';
// import { reject } from 'q';

/**
 * ID: bh-storage-service
 * Name: BH Storage Service
 * Description: Service used for managing local storage on the device
 * Version: 3
 *
 * ==============================
 * Change Log
 * ==============================
 * 2021-07-02 - MW - v1: Initial dev
 * 2022-04-26 - MW - v2: Upgraded to Ionic 6/storage-angular
 * 2022-05-26 - MW - v3: Fixed issue with initializing storage
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(
    public storage: Storage,
    public platform: Platform,
    public helpers: HelperUtilitiesService,
    public notificationsService: NotificationsService,
    private errorHandler: ErrorHandlerService
  ) {
    this.storage.create();
  }

  // ******** Native Unsecure Storage **********

  /***
   * Gets data from native unsecured storage
   * @param key Key reference name
   * @param isSecure Applies encryption
   */
  async getData(key, isSecure = false): Promise<any> {
    // console.log('Getting data', key);
    return new Promise(async resolve => {
      await this.storage.get(key).then(
        data => {
          // console.log('storage > getData', data);
          if (data) {
            resolve(isSecure ?
              this.isJsonString(data.property) ?
                this.decryptString(JSON.parse(data.property)) :
                this.decryptString((data.property))
              : data.property);
          } else {
            resolve({});
          }
        },
        (err) => {
          this.errorHandler.handleError(err, 'storage-service.getData() => nativeStorage.getItem() ', key);
          if (err.code === 2) {
            resolve(null);
          }
          Promise.reject(err);
        }
      );
    });
  }

  /***
   * Saves data to native unsecured storage
   * @param key Key reference name
   * @param value Value of the key
   * @param isSecure Applies encryption
   */
  async saveData(key, value, isSecure = false): Promise<any> {
    return new Promise(async resolve => {
      const valueToStore = isSecure ?
        await this.encryptString(this.isJsonObject(value) ?
          (JSON.stringify(value)) : value) : value;
      await this.storage
        .set(key, { property: valueToStore })
        .then(
          () => {
            // console.log('Stored item!', key, value);
            resolve(true);
          },
          err => {
            this.errorHandler.handleError(err, 'storage-service.saveData()', key);
            Promise.reject(err);
          }
        );
    });
  }

  /***
   * Removes key value pair from native unsecured storage
   * @param key Key reference name
   */
  async removeData(key): Promise<boolean> {
    return new Promise(async resolve => {
      await this.storage
        .remove(key)
        .then(
          () => {
            resolve(true);
            // console.log('Removed item!');
          },
          (err) => {
            this.errorHandler.handleError(err, 'storage-service.removeData()', key);
            Promise.reject(err);
          }
        );
    });
  }

  async generateKey(): Promise<CryptoKey> {
    return await crypto.subtle.generateKey(
      {
        name: 'AES-GCM',
        length: 256
      },
      true,
      ['encrypt', 'decrypt']
    );
  }

  async encryptString(text: string): Promise<any> {
    // console.log('encryptString: text: ', text);
    try {
      // Get existing key
      let ckey = await this.getData('ckey', false);
      // console.log('encryptString: recalled ckey: ', ckey);
      // Check for key
      if (!ckey || !ckey.algorithm) {
        // Generate key
        ckey = await this.generateKey();
        // console.log('encryptString: generated ckey: ', ckey);
        // Save key
        this.saveData('ckey', ckey, false);
      }
      // Prepare encoder
      const encoder = new TextEncoder();
      const data: Uint8Array = encoder.encode(text);
      // Return cipher text
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, ckey, data);
      return Promise.resolve({ ciphertext, iv });
    } catch (err) {
      console.error('encryptString: error: ', err);
    }
  }

  async decryptString(encryptedData: any) {
    // console.log('decyptString: encrypted data', encryptedData);
    try {
      let ckey = await this.getData('ckey', false);
      if (ckey) {
        const { ciphertext, iv } = encryptedData;
        const decryptedData = await crypto.subtle.decrypt(
          {
            name: 'AES-GCM',
            iv
          },
          ckey,
          ciphertext
        );
        const decoder = new TextDecoder();
        return decoder.decode(decryptedData);
      } else {
        return '';
      }
    } catch (err) {
      console.error('decryptString: error: ', err);
      return '';
    }
  }

  isJsonString(str) {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }

  isJsonObject(obj) {
    return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
  }

}
