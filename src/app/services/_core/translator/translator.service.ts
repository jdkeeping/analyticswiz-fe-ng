import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LanguageCode, TranslationDict } from 'src/app/models/translation-dict';
import * as esDict from 'src/assets/translations/es.json'

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {
  preferredLanguageChanged: BehaviorSubject<LanguageCode> = new BehaviorSubject('en-US');
  private dictionary: TranslationDict = { es: null };
  private preferredLanguage: LanguageCode = 'en-US';

  constructor() { }

  init(preferredLanguage: LanguageCode = this.preferredLanguage) {
    // Load Languages with static translations
    this.loadDictionaries();

    // Set Default Language
    this.setPreferredLanguage(preferredLanguage);
  }

  loadDictionaries() {
    // Spanish
    this.dictionary.es = esDict;
  }

  mapApiLanguageCode(language: string): LanguageCode {
    switch (language) {
      case 'es':
      case 'es-US':
        return 'es-US';

      default:
        return 'en-US';
    }
  }

  addTranslation(englishText: string, langCode: LanguageCode, translatedText: string) {
    // Get universal language code
    const lc = this.parseLanguageCode(langCode);
    // Check if translation already exists in the dictionary
    const exists = this.dictionary[lc] !== undefined && this.dictionary[lc][englishText] !== undefined;
    // If it doesn't exist, add it
    if (exists) {
      this.dictionary[lc][englishText] = translatedText;
      // console.log('translator: addTranslation: added: ', this.dictionary);
    } else {
      // console.log('translator: addTranslation: already-exists: ', englishText);
    }
  }

  translate(englishText: string, langCode: LanguageCode = this.preferredLanguage) {
    // console.log(' ');
    // console.log('**** translator: translating: \'' + englishText + '\'');

    // Get universal language code
    const lc = this.parseLanguageCode(langCode);

    // Check if language code exists
    const exists = this.dictionary[lc] !== undefined && this.dictionary[lc][englishText] !== undefined;

    // Check if english (doesn't have a dictionary; use provided text)
    const isEnglish = this.isLangCodeEnglish(lc);

    // Write missing language to console
    if (!exists && !isEnglish) {
      console.warn('translator: missing ' + lc.toUpperCase() + ' translation for \'' + englishText + '\'');
    }
    // console.log('translator: translate: exists: ', exists);
    // console.log('translator: translate: isEnglish: ', isEnglish);
    // console.log('translator: translate: lc: ', lc);
    // console.log('translator: translate: langDict exists', this.dictionary[lc]);
    // if ( this.dictionary[lc]) {
    //   console.log('translator: translate: langDict text exists', this.dictionary[lc][englishText]);
    // }

    // Return matching translation if exists and not in english
    return (exists && !isEnglish) ? this.dictionary[lc][englishText] : englishText;
  }

  setPreferredLanguage(langCode: LanguageCode) {
    this.preferredLanguage = langCode;
    localStorage.setItem('preferredLanguage', langCode);
    setTimeout(()=> {
      this.preferredLanguageChanged.next(langCode);
    }, 200);
    console.log('setPreferredLanguage: setting/saving: ', langCode, this.preferredLanguage);
  }

  getPreferredLanguage() {
    return this.preferredLanguage;
  }

  parseLanguageCode(langCode: LanguageCode) {
    if (langCode.indexOf('-') > -1) {
      return langCode.split('-')[0].toLowerCase();
    } else {
      return langCode.toLowerCase();
    }
  }

  isLangCodeEnglish(langCode: LanguageCode | string) {
    return langCode.toLowerCase() === 'en-us' || langCode.toLowerCase() === 'en';
  }

  echoDictionary() {
    console.log('translator: echo dictionary: ', this.dictionary);
  }
}
