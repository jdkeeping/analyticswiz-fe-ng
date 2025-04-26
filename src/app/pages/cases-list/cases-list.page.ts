import { TableMockData } from '../../models/_mock/table-mock-data';
import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFooter, IonMenu, IonMenuToggle, IonButton, MenuController } from '@ionic/angular/standalone';
import { BhHeaderComponent } from 'src/app/components/_core/bh-header/bh-header.component';
import { BhCardOutlineComponent } from 'src/app/components/_core/bh-card-outline/bh-card-outline.component';
import { CommonModule } from '@angular/common';
import { BhBodyComponent } from 'src/app/components/_core/bh-body/bh-body.component';
import { BhFooterComponent } from 'src/app/components/_core/bh-footer/bh-footer.component';
import { BhGridComponent } from 'src/app/components/_core/bh-grid/bh-grid.component';
import { GridColumnDefinition } from 'src/app/models/_core/grid-column-definition';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BhInputComponent } from 'src/app/components/_core/bh-input/bh-input.component';
import { BhEditorCaseComponent } from 'src/app/components/bh-editor-case/bh-editor-case.component';
import { BhFeedbackFormComponent } from 'src/app/components/_core/bh-feedback-form/bh-feedback-form.component';
import { BhSearchBarComponent } from 'src/app/components/_core/bh-search-bar/bh-search-bar.component';
import { BhEmptyMessageComponent } from 'src/app/components/_core/bh-empty-message/bh-empty-message.component';
import { VerlockerService } from 'src/app/services/_core/verlocker/verlocker.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
    selector: 'app-cases-list',
    templateUrl: 'cases-list.page.html',
    styleUrls: ['cases-list.page.scss'],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonMenu,
        IonMenuToggle,
        IonButton,
        IonContent,
        IonFooter,
        BhHeaderComponent,
        BhCardOutlineComponent,
        BhBodyComponent,
        BhFooterComponent,
        BhGridComponent,
        BhInputComponent,
        BhEditorCaseComponent,
        BhFeedbackFormComponent,
        BhSearchBarComponent,
        BhEmptyMessageComponent
    ]
})
export class CasesListPage implements OnInit {
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
  form1: FormGroup = this.formBuilder.group({
    status: [null],
    filterSelect: [null],
    filterText: [null]
  });
  submitAttempted = false;
  validationMessages = {
    userId: [{ type: 'required', message: 'Type your Baystate User ID.' }],
    password: [{ type: 'required', message: 'Type your Baystate password.' }],
  };

  constructor(
    private tableMockData: TableMockData,
    private formBuilder: FormBuilder,
    private navService: NavigationService,
    private verlocker: VerlockerService
  ) { }

  ngOnInit() {
    this.setMockData();
  }

  setMockData() {
    this.columnDefs = this.tableMockData.columnDefinitions;
    this.data = this.tableMockData.data;
  }

  selectCase(selection) {
    this.navService.navigateForward('/tabs/cases/1');
  }

  setView() {

  }

  logToConsole(input) {
    console.log(input);
  }

  update() {
    this.verlocker.presentRequested(true);
  }
}
