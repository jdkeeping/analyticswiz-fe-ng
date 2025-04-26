import { IonSpinner } from '@ionic/angular/standalone';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonIcon, IonButton, IonProgressBar } from '@ionic/angular/standalone';
import { TranslatorService } from 'src/app/services/_core/translator/translator.service';
import { Language } from 'src/app/models/translation-dict';
import { BhGroupBoxComponent } from 'src/app/components/_core/bh-group-box/bh-group-box.component';
import { NotificationsService } from 'src/app/services/_core/notifications/notifications.service';

@Component({
    selector: 'app-language-translator',
    templateUrl: './language-translator.page.html',
    styleUrls: ['./language-translator.page.scss'],
    imports: [
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        IonList,
        IonItem,
        IonIcon,
        IonButton,
        IonProgressBar,
        IonSpinner,
        CommonModule,
        FormsModule,
        BhGroupBoxComponent
    ]
})
export class LanguageTranslatorPage implements OnInit {
  initLanguages: Language[] = [];
  languages: Language[] = [];
  englishText: string;
  linesToTranslate: string[] = [];
  translationCount = 0;
  processedCount = 0;
  progress = 0.0;
  activeView: 'loading' | 'form' | 'error' = 'loading';
  isTranslating = false;
  math = Math;
  showAllLanguages = false;

  constructor(
    private translator: TranslatorService,
    private notifications: NotificationsService
  ) { }

  ngOnInit() {
    this.initLanguages = Object.assign([], this.translator.supportedLanguages);
    this.loadLanguages();
    const server = window.location.hostname;
    const port = window.location.port;

    // Translator can only be run on local environment
    if (server === 'localhost' && port === '8100') {
      this.activeView = 'form';
    } else {
      this.activeView = 'error';
    }
  }

  loadLanguages() {
    this.languages = this.initLanguages.filter(l => l.code !== 'en' && l.enabled);
    for (const l of this.languages) {
      l.selected = true;
      l.translatedLines = [];
    }
  }

  selectLanguage(language: Language) {
    console.log('selectLanguage', language);
    language.selected = !language.selected;
  }

  resetTranslations() {
    for (const l of this.languages) {
      l.translatedLines = [];
      l.isCopied = false;
    }

  }

  async translate() {
    this.resetTranslations();
    this.linesToTranslate = this.englishText.split('\n');
    this.translationCount = (this.linesToTranslate.length * this.languages.filter(l => l.selected).length);
    this.processedCount = 0;
    this.isTranslating = true;
    for (const l of this.languages) {
      if (l.selected) {
        for (const t of this.linesToTranslate) {
          if (t) {
            try {
              const translation = await this.translator.translateWithAws(t, l.code);
              console.log('translateWithAws: data', translation);
              l.translatedLines.push(translation.TranslatedText);
            } catch (err) {
              console.error(err);
            }
            this.processedCount += 1;
            this.progress = (this.processedCount / this.translationCount);
          }
        }
      }
    }
    this.isTranslating = false;
  }

  setAllSelection(isSelected) {
    for (const l of this.languages) {
      l.selected = isSelected;
    }
  }

  enableAll() {
    this.showAllLanguages = true;
    for (const l of this.initLanguages) {
      l.enabled = true;
    }
    this.loadLanguages();
  }

  copyTranslation(l: Language) {
    let text = '';
    let i = 0;
    for (const tl of l.translatedLines) {
      text += `  "${this.linesToTranslate[i]}": "${tl}",\n`;
      i +=1;
    }
    l.isCopied = true;
    navigator.clipboard.writeText(text);
    this.notifications.showToast(l.name + ' translation copied to clipboard.');
    console.log('copyTranslation', text);
  }

}
