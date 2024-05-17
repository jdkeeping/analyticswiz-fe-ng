import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { BhHeaderComponent } from 'src/app/components/_core/bh-header/bh-header.component';

@Component({
  selector: 'app-cases',
  templateUrl: 'cases.page.html',
  styleUrls: ['cases.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, BhHeaderComponent],
})
export class CasesPage {
  constructor() {}
}
