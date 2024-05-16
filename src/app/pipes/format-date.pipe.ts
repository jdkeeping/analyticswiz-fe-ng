import { Pipe, PipeTransform } from '@angular/core';
import { HelperUtilitiesService } from '../services/_core/helper-utilities/helper-utilities.service';

/**
 * ID: bh-format-date-pipe
 * Name: Format Date Pipe
 * Type: Pipe
 * Description: Formats date string using helper utilities' formatDate
 * Implementation:
 *    1.) Import pipes.module.ts (PipesModule) into page or component's module.ts
 *    2.) In HTML template, display desired variable with pipe reference:  {{ eventDateIso | formatDate: 'YYYY-MM-DD HH:mm:ss' }}
 * Version: 1
 *
 * ==============================
 * Change Log
 * ==============================
 * 2021-07-13 - MW - v1: Initial dev
 */
@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {
  constructor(
    public helpers: HelperUtilitiesService
) { }

  transform(value: any, parseFormat: string = null): any {
    return this.helpers.formatDate(value, parseFormat);
  }

}
