import { Pipe, PipeTransform } from '@angular/core';
import { LanguageCode } from '../models/translation-dict';
import { TranslatorService } from '../services/_core/translator/translator.service';

/**
 * ID: bh-translate-pipe
 * Name: Translate pipe
 * Type: Pipe
 * Description: Translates text to a desired language
 * Implementation:
 *    1.) Import pipes.module.ts (PipesModule) into page or component's module.ts
 *    2.) In HTML template, display desired variable with pipe reference:  {{ translate | langCode: 'es' }}
 * Version: 1
 *
 * ==============================
 * Change Log
 * ==============================
 * 2023-11-21 - MW - v1: Initial dev
 */
@Pipe({
    name: 'translate',
    standalone: false
})
export class TranslatePipe implements PipeTransform {
  constructor(
    private translator: TranslatorService
) { }

  transform(englishText: string): any {
    return this.translator.translate(englishText);
  }

}
