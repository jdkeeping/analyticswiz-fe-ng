import { IonIcon, IonButton, IonSegment, IonSegmentButton, IonRouterLink } from '@ionic/angular/standalone';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BhGroupBoxComponent } from '../_core/bh-group-box/bh-group-box.component';
import { BhPropertyCellComponent } from '../_core/bh-property-cell/bh-property-cell.component';
import { BhPropertyRowComponent } from '../_core/bh-property-row/bh-property-row.component';
import { BhInputComponent } from '../_core/bh-input/bh-input.component';
import { RouterModule } from '@angular/router';
import { AnalyticsClickDirective } from 'src/app/directives/analytics-click/analytics-click.directive';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
    selector: 'bh-editor-case',
    templateUrl: './bh-editor-case.component.html',
    styleUrls: ['./bh-editor-case.component.scss'],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        IonButton,
        IonSegment,
        IonSegmentButton,
        IonIcon,
        IonRouterLink,
        BhGroupBoxComponent,
        BhPropertyRowComponent,
        BhPropertyCellComponent,
        BhInputComponent,
        AnalyticsClickDirective
    ]
})
export class BhEditorCaseComponent  implements OnInit {
  activeSegment: 'case' | 'error-report' | 'patient' | 'hl7' = 'case';
  form1: FormGroup = this.formBuilder.group({
    status: [null],
  });
  errorMessage = '';
  submitAttempted = false;
  validationMessages = {
    status: [{ type: 'required', message: 'Select status' }],
  };

  constructor(
    private formBuilder: FormBuilder,
    private navService: NavigationService
  ) { }

  ngOnInit() {}

  back() {
    this.navService.navigateBack('/tabs/cases');
  }

}
