import { Pipe, PipeTransform } from '@angular/core';
import { HelperUtilitiesService } from '../services/_core/helper-utilities/helper-utilities.service';

/**
 * ID: bh-format-phone-pipe
 * Name: Format Phone Pipe
 * Type: Pipe
 * Description: Formats phone number string using helper utilities' formatPhone
 * Implementation:
 *    1.) Import pipes.module.ts (PipesModule) into page or component's module.ts
 *    2.) In HTML template, display desired variable with pipe reference:  {{ phoneNumber | formatPhone }}
 * Version: 1
 *
 * ==============================
 * Change Log
 * ==============================
 * 2021-07-13 - MW - v1: Initial dev
 */
@Pipe({
    name: 'formatPhone',
    standalone: false
})
export class FormatPhonePipe implements PipeTransform {
  constructor(public helpers: HelperUtilitiesService) { }

  transform(value: string, args?: any): any {
    return this.helpers.formatPhone(value);
    // if (value && value.length === 10) {
    //   return '(' + value.substr(0,3) + ') ' + value.substr(3, 3) + '-' + value.substr(6,4);
    // }
    // return value;
  }

}
