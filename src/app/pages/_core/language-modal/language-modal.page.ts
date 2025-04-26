import { IonCheckbox, IonFooter, IonButton, IonButtons } from '@ionic/angular/standalone';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, ModalController } from '@ionic/angular/standalone';
import { BhInputComponent } from 'src/app/components/_core/bh-input/bh-input.component';
import { Language } from 'src/app/models/translation-dict';
import { TranslatorService } from 'src/app/services/_core/translator/translator.service';
import { BhGroupBoxComponent } from 'src/app/components/_core/bh-group-box/bh-group-box.component';
import { PipesModule } from 'src/app/pipes/pipes.module';

@Component({
    selector: 'app-language-modal',
    templateUrl: './language-modal.page.html',
    styleUrls: ['./language-modal.page.scss'],
    imports: [
        IonContent,
        IonHeader,
        IonFooter,
        IonButton,
        IonTitle,
        IonToolbar,
        IonButtons,
        IonList,
        IonItem,
        IonCheckbox,
        IonLabel,
        BhInputComponent,
        BhGroupBoxComponent,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PipesModule
    ]
})
export class LanguageModalPage implements OnInit {
  form1: FormGroup = this.formBuilder.group({
    language: [null],
  });
  showErrorMessage = false;
  submitAttempted = false;
  languages: Language[];
  preferredLanguage

  constructor(
    private formBuilder: FormBuilder,
    private translator: TranslatorService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.preferredLanguage = this.translator.getPreferredLanguage();
    this.languages = this.translator.supportedLanguages.filter(l => l.enabled);
    this.form1.controls['language'].setValue(this.preferredLanguage);
  }

  setLanguage() {
    const language = this.form1.controls['language'].value;
    this.translator.setPreferredLanguage(language);
    this.modalCtrl.dismiss();
  }

}
