import { IonIcon, IonButton, IonSegment, IonSegmentButton } from '@ionic/angular/standalone';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BhGroupBoxComponent } from '../_core/bh-group-box/bh-group-box.component';
import { BhPropertyCellComponent } from '../_core/bh-property-cell/bh-property-cell.component';
import { BhPropertyRowComponent } from '../_core/bh-property-row/bh-property-row.component';
import { BhInputComponent } from '../_core/bh-input/bh-input.component';

@Component({
  selector: 'bh-editor-case',
  templateUrl: './bh-editor-case.component.html',
  styleUrls: ['./bh-editor-case.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonButton,
    IonSegment,
    IonSegmentButton,
    IonIcon,
    BhGroupBoxComponent,
    BhPropertyRowComponent,
    BhPropertyCellComponent,
    BhInputComponent
  ]
})
export class BhEditorCaseComponent  implements OnInit {
  activeView: 'request' | 'related-editor' | 'related-cases' = 'request';
  activeSegment: 'request' | 'cases' = 'request';
  form1: FormGroup = this.formBuilder.group({
    status: [null],
  });
  errorMessage = '';
  submitAttempted = false;
  validationMessages = {
    status: [{ type: 'required', message: 'Select status' }],
  };

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {}

}
