import { Pipe, PipeTransform } from '@angular/core';
import { HelperUtilitiesService } from '../services/_core/helper-utilities/helper-utilities.service';

/**
 * ID: bh-format-ssn-pipe
 * Name: Format SSN Pipe
 * Type: Pipe
 * Description: Formats social security number string using helper utilities' formatSsn
 * Implementation:
 *    1.) Import pipes.module.ts (PipesModule) into page or component's module.ts
 *    2.) In HTML template, display desired variable with pipe reference:  {{ ssn | formatSsn }}
 * Version: 1
 *
 * ==============================
 * Change Log
 * ==============================
 * 2021-07-13 - MW - v1: Initial dev
 */
@Pipe({
    name: 'formatSsn',
    standalone: false
})
export class FormatSsnPipe implements PipeTransform {
  constructor (
    public helpers: HelperUtilitiesService
  ) {}

  transform(value: any, args?: any): any {
    return this.helpers.formatSsn(value);
    // if(value && value.length === 9) {
    //   return value.substr(0, 3) + '-' + value.substr(3, 2) + '-' + value.substr(5, 4);
    // } else {
    //   return '';
    // }
  }

}
