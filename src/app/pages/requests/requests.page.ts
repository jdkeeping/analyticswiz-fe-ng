import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { BhHeaderComponent } from 'src/app/components/_core/bh-header/bh-header.component';

@Component({
  selector: 'app-requests',
  templateUrl: 'requests.page.html',
  styleUrls: ['requests.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, BhHeaderComponent]
})
export class RequestsPage {

  constructor() {}

}
