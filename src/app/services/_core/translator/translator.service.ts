import { Injectable } from '@angular/core';
import { TranslateClient, TranslateTextCommand } from '@aws-sdk/client-translate';
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { BehaviorSubject } from 'rxjs';
import { Language, LanguageCode } from 'src/app/models/translation-dict';

// Dictionary assets
import * as frenchDict from 'src/assets/translations/french.json';
import * as germanDict from 'src/assets/translations/german.json';
import * as portugueseDict from 'src/assets/translations/portuguese.json';
import * as russianDict from 'src/assets/translations/russian.json';
import * as spanishDict from 'src/assets/translations/spanish.json';
import * as tagalogDict from 'src/assets/translations/tagalog.json';
import * as ukranianDict from 'src/assets/translations/ukranian.json';
import * as vietnameseDict from 'src/assets/translations/vietnamese.json';

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {
  preferredLanguageChanged: BehaviorSubject<LanguageCode> = new BehaviorSubject('en');

  // Set supported languages
  supportedLanguages: Language[] = [
    {
      name: 'English',
      native: 'English',
      code: 'en',
      enabled: true
    },
    {
      name: 'Spanish',
      native: 'Español',
      code: 'es',
      enabled: true,
    },
    {
      name: 'French',
      native: 'Français',
      code: 'fr',
      enabled: false,
    },
    {
      name: 'German',
      native: 'Deutsch',
      code: 'de',
      enabled: false,
    },
    {
      name: 'Portuguese',
      native: 'Português',
      code: 'pt',
      enabled: false,
    },
    {
      name: 'Russian',
      native: 'Русский',
      code: 'ru',
      enabled: false,
    },
    {
      name: 'Taglog',
      native: 'Taglog',
      code: 'tl',
      enabled: false,
    },
    {
      name: 'Ukranian',
      native: 'українська',
      code: 'uk',
      enabled: false,
    },
    {
      name: 'Vietnamese',
      native: 'Tiếng Việt',
      code: 'vi',
      enabled: false,
    }
  ];

  private preferredLanguage: LanguageCode = 'en';

  cipr = 'us-east-1';
  cipid = '7764ec90-c58d-4d4d-af56-cce0d5f4820b';
  client = new TranslateClient({
    region: this.cipr,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: this.cipr }),
      identityPoolId: this.cipr + ":" + this.cipid
    })
  })


  constructor() { }

  init(preferredLanguage: LanguageCode = this.preferredLanguage) {
    // Set Default Language
    this.setPreferredLanguage(preferredLanguage);
  }

  /**
   * For return variable, set to AWS API language code; uses en-US, es-US dialect format
   * @param language
   * @returns
   */
  mapApiLanguageCode(language: string): LanguageCode {
    switch (language) {
      case 'es':
      case 'es-US':
        return 'es';

      default:
        return 'en';
    }
  }

  addTranslation(englishText: string, langCode: LanguageCode, translatedText: string) {
    // Get universal language code
    const lc = this.parseLanguageCode(langCode);
    // Get dictionary
    const dictionary = this.loadDictionary(lc);
    // Check if translation already exists in the dictionary
    const exists = dictionary !== undefined && dictionary[englishText] !== undefined;
    // If it doesn't exist, add it
    if (exists) {
      dictionary[englishText] = translatedText;
      // console.log('translator: addTranslation: added: ', this.dictionary);
    } else {
      // console.log('translator: addTranslation: already-exists: ', englishText);
    }
  }

  translate(englishText: string, langCode: LanguageCode = this.preferredLanguage) {
    // console.log(' ');
    // console.log('**** translator: translating: \'' + englishText + '\'', langCode);

    // Get universal language code
    const lc = this.parseLanguageCode(langCode);

    // Get dictionary
    const dictionary = this.loadDictionary(lc);

    // Check if language code exists
    const exists = dictionary && dictionary[englishText];

    // Check if english (doesn't have a dictionary; use provided text)
    const isEnglish = this.isLangCodeEnglish(lc);

    // Write missing language to console
    if (!exists && !isEnglish) {
      console.warn('translator: missing ' + lc.toUpperCase() + ' translation for \'' + englishText + '\'');
    }
    // console.log('translator: translate: exists: ', exists);
    // console.log('translator: translate: isEnglish: ', isEnglish);
    // console.log('translator: translate: lc: ', lc);
    // console.log('translator: translate: langDict exists', dictionary);
    if (dictionary) {
      console.log('translator: translate: langDict text exists', dictionary[englishText]);
    }

    // Return matching translation if exists and not in english
    return (exists && !isEnglish) ? dictionary[englishText] : englishText;
  }

  loadDictionary(langCode: string) {
    let dictionary = null;

    switch (langCode) {
      case 'fr':
        dictionary = frenchDict;
        break;

      case 'de':
        dictionary = germanDict;
        break;

      case 'pt':
        dictionary = portugueseDict;
        break;

      case 'ru':
        dictionary = russianDict;
        break;

      case 'uk':
        dictionary = ukranianDict;
        break;

      case 'tl':
        dictionary = tagalogDict;
        break;

      case 'vi':
        dictionary = vietnameseDict;
        break;

      case 'es':
        dictionary = spanishDict;
        break;

      default:
        dictionary = null;
    }

    // console.log('getDictionary: ', dictionary, langCode);
    return dictionary;
  }

  setPreferredLanguage(langCode: LanguageCode) {
    this.preferredLanguage = langCode;
    localStorage.setItem('preferredLanguage', langCode);
    setTimeout(() => {
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

  echoDictionary(langCode) {
    // Get universal language code
    const lc = this.parseLanguageCode(langCode);
    // Get dictionary
    const dictionary = this.loadDictionary(lc);
    // Echo dictionary
    console.log('translator: echo dictionary: ', dictionary);
  }

  async translateWithAws(text, lang): Promise<any> {
    var command = new TranslateTextCommand({
      Text: text,
      SourceLanguageCode: "en",
      TargetLanguageCode: lang
    })
    return this.client.send(command);
  }

}
