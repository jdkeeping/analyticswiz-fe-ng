import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { BhHeaderComponent } from 'src/app/components/_core/bh-header/bh-header.component';
import { BhCardOutlineComponent } from 'src/app/components/_core/bh-card-outline/bh-card-outline.component';
import { CommonModule } from '@angular/common';
import { BhBodyComponent } from 'src/app/components/_core/bh-body/bh-body.component';
import { BhFooterComponent } from 'src/app/components/_core/bh-footer/bh-footer.component';

@Component({
  selector: 'app-cases',
  templateUrl: 'cases.page.html',
  styleUrls: ['cases.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    BhHeaderComponent,
    BhCardOutlineComponent,
    BhBodyComponent,
    BhFooterComponent
  ],
})
export class CasesPage {
  metrics: any[] = [
    {
      heading: 'New Cases',
      body: 'Cases that have been recently imported into intSight.',
      metricValue: 3
    },
    {
      heading: 'Open Cases',
      body: 'Cases that are in progress of being resolved.',
      metricValue: 78
    },
    {
      heading: 'Closed Cases',
      body: 'Total number of cases closed.',
      metricValue: 1000
    }
  ];
  constructor() { }
}
