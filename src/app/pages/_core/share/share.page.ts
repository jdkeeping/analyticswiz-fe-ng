import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, Platform } from '@ionic/angular/standalone';
import { BhBodyComponent } from 'src/app/components/_core/bh-body/bh-body.component';
import { BhFooterComponent } from 'src/app/components/_core/bh-footer/bh-footer.component';
import { BhGroupBoxComponent } from 'src/app/components/_core/bh-group-box/bh-group-box.component';
import { BhHeaderComponent } from 'src/app/components/_core/bh-header/bh-header.component';
import { BhListCardComponent } from 'src/app/components/_core/bh-list-card/bh-list-card.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-share',
  templateUrl: './share.page.html',
  styleUrls: ['./share.page.scss'],
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
    BhGroupBoxComponent
  ]
})
export class SharePage implements OnInit {
  environment = environment;
  appNameEncoded = (environment.appDescription).replace(' ', '%20');
  messageSubject = ('Check out the new ' + this.appNameEncoded).replace(' ', '%20') + ' app';
  messageBody =  ('Hi, %0D%0A%0D%0AI shared the Baystate Health ' +
                  this.appNameEncoded + ' app with you. ' + this.appNameEncoded +
                  ' allows you to share your experiences in medical decision making to educate yourself and your peers. ' +
                  '%0D%0A%0D%0AClink here to download ' + this.appNameEncoded + ': %0D%0A' + environment.appstoreUrl).replace(' ', '%20');

  constructor(
    private platform: Platform
  ) { }

  ngOnInit() {
  }

  share(method) {
    switch (method) {
      case 'email':
        location.href = 'mailto:%20?subject=' + this.messageSubject + '&body=' + this.messageBody + '';
        break;

      case 'text':
        if (this.platform.is('ios')) {
          location.href = 'sms:%20&body=' + this.messageSubject + '%20-%20' + this.messageBody + '';
        } else {
          location.href = 'sms:%20?body=' + this.messageSubject + '%20-%20' + this.messageBody + '';
        }
        break;
    }
  }


}
