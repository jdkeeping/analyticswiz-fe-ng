import { TableMockData } from './../../models/_mock/table-mock-data';
import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { BhHeaderComponent } from 'src/app/components/_core/bh-header/bh-header.component';
import { BhCardOutlineComponent } from 'src/app/components/_core/bh-card-outline/bh-card-outline.component';
import { CommonModule } from '@angular/common';
import { BhBodyComponent } from 'src/app/components/_core/bh-body/bh-body.component';
import { BhFooterComponent } from 'src/app/components/_core/bh-footer/bh-footer.component';
import { BhGridComponent } from 'src/app/components/_core/bh-grid/bh-grid.component';
import { GridColumnDefinition } from 'src/app/models/_core/grid-column-definition';

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
    BhHeaderComponent,
    BhCardOutlineComponent,
    BhBodyComponent,
    BhFooterComponent,
    BhGridComponent
  ],
})
export class CasesPage implements OnInit {
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

  columnDefs: GridColumnDefinition[] = [];
  data: any = [];

  constructor(
    private tableMockData: TableMockData
  ) { }

  ngOnInit() {
    this.setMockData();
  }

  setMockData() {
    this.columnDefs = this.tableMockData.columnDefinitions;
    this.data = this.tableMockData.data;
  }

  selectCase(selection) {
    if (Array.isArray(selection)) {

    }
  }

  setView() {

  }
}
