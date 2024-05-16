import { NotificationsService } from '../notifications/notifications.service';
import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { Platform, AlertController } from '@ionic/angular';
import { Subscription, BehaviorSubject } from 'rxjs';

/**
 * ID: bh-network-service
 * Name: BH Network Service
 * Description: Service used for monitoring network state (online, offline, wifi, cellular)
 * Version: 1
 *
 * ==============================
 * Change Log
 * ==============================
 * 2021-07-02 - MW - v1: Initial dev
 */
@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  isOnline: BehaviorSubject<boolean> = new BehaviorSubject(true);
  connectSub: Subscription = null;
  disconnectSub: Subscription = null;
  private alert: any = null;

  constructor(
    public network: Network,
    public platform: Platform,
    public alertController: AlertController,
    public notificationsService: NotificationsService
  ) {
    this.disconnectSub = this.network.onDisconnect().subscribe(() => {
      // console.log('network was disconnected :-(');
      this.isOnline.next(false);
    });

    this.connectSub = this.network.onConnect().subscribe(() => {
      // console.log('network connected!');
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      this.isOnline.next(true);
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          // console.log('we got a wifi connection, woohoo!');
        }
      }, 3000);
    });

  }
  public getNetworkType(): string {
    return this.network.type;
  }

  public getNetworkStatus(): boolean {
    return this.isOnline.getValue();
  }

  public async presentNetworkOfflineAlert() {
    if (!this.alert) {
      this.alert = await this.alertController.create({
        header: 'Your device disconnected from the network.',
        message: 'Attempting to reconnect...',
        backdropDismiss: false,
      });
      await this.alert.present();
    }
  }

  public async dismissNetworkOfflineAlert() {
    if (this.alert) {
      await this.alert.dismiss();
      this.alert = null;
      this.notificationsService.showToast('Your device reconnected to the network.');
    }
  }
}
