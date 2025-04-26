import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, PopoverController } from '@ionic/angular/standalone';
import { Language } from 'src/app/models/translation-dict';
import { TranslatorService } from 'src/app/services/_core/translator/translator.service';

@Component({
    selector: 'app-language-popover',
    templateUrl: './language-popover.page.html',
    styleUrls: ['./language-popover.page.scss'],
    imports: [
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        IonList,
        IonItem,
        CommonModule,
        FormsModule
    ]
})
export class LanguagePopoverPage implements OnInit {
  languages: Language[];
  preferredLanguage;

  constructor(
    private translator: TranslatorService,
    private popCtrl: PopoverController
  ) { }

  ngOnInit() {
    this.preferredLanguage = this.translator.getPreferredLanguage();
    this.languages = this.translator.supportedLanguages.filter(l => l.enabled);
  }

  setLanguage(language) {
    this.preferredLanguage = language;
    this.translator.setPreferredLanguage(language.code);
    this.popCtrl.dismiss();
  }

}
