import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, ModalController } from '@ionic/angular/standalone';
import { BhHeaderComponent } from 'src/app/components/_core/bh-header/bh-header.component';
import { BhBodyComponent } from 'src/app/components/_core/bh-body/bh-body.component';
import { BhFooterComponent } from 'src/app/components/_core/bh-footer/bh-footer.component';
import { BhListCardComponent } from 'src/app/components/_core/bh-list-card/bh-list-card.component';
import { BhGroupBoxComponent } from 'src/app/components/_core/bh-group-box/bh-group-box.component';
import { ConstantsService } from 'src/app/services/_core/constants/constants.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { environment } from 'src/environments/environment';
import { PipesModule } from 'src/app/pipes/pipes.module';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    BhHeaderComponent,
    BhBodyComponent,
    BhFooterComponent,
    BhListCardComponent,
    BhGroupBoxComponent,
    PipesModule
  ]
})
export class HelpPage implements OnInit {
  appNameEncoded = ('Baystate Health ' + environment.appDescription).replace(' ', '%20');

  constructor(
    private constants: ConstantsService,
    private navService: NavigationService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  open(action) {
    switch (action) {
      case 'call':
        location.href='tel:' + this.constants.serviceDeskPhone;
        break;

      case 'ticket':
        window.open('https://baystatehealth.service-now.com/b_sp?id=sc_cat_item&sys_id=906528a10a0a0bf000a85bc20dfb6541');
        break;

      case 'email':
        location.href = 'mailto:servicedesk@baystatehealth.org?subject=' + this.appNameEncoded + ' Help';
        break;

      case 'check-for-updates':
        this.navService.navigateRoot('check-for-updates');
        break;

      case 'about':
        this.openAbout();
        break;

    }
  }

  async openAbout() {
    // const modal = await this.modalCtrl.create({
    //   component: AboutPage,
    //   cssClass: 'wide-modal'
    // });

    // await modal.present();
  }

}
