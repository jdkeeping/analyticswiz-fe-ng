import { IonCheckbox } from '@ionic/angular/standalone';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { BhInputComponent } from 'src/app/components/_core/bh-input/bh-input.component';

@Component({
  selector: 'app-language-modal',
  templateUrl: './language-modal.page.html',
  styleUrls: ['./language-modal.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonCheckbox,
    IonLabel,
    BhInputComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LanguageModalPage implements OnInit {
  form1: FormGroup = this.formBuilder.group({
    language: [null],
  });
  showErrorMessage = false;
  submitAttempted = false;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

}
