import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { BhHeaderComponent } from 'src/app/components/_core/bh-header/bh-header.component';

@Component({
  selector: 'app-auditing',
  templateUrl: 'auditing.page.html',
  styleUrls: ['auditing.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, BhHeaderComponent],
})
export class AuditingPage {
  constructor() {}
}
