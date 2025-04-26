import { Pipe, PipeTransform } from '@angular/core';
import { HelperUtilitiesService } from '../services/_core/helper-utilities/helper-utilities.service';

/**
 * ID: bh-format-state-pipe
 * Name: Format State Pipe
 * Type: Pipe
 * Description: Displays state's full name using abbreviation (e.g. MA = Massachussetts)
 * Implementation:
 *    1.) Import pipes.module.ts (PipesModule) into page or component's module.ts
 *    2.) In HTML template, display desired variable with pipe reference:  {{ stateCode | formatState }}
 * Version: 1
 *
 * ==============================
 * Change Log
 * ==============================
 * 2021-07-13 - MW - v1: Initial dev
 */
@Pipe({
    name: 'formatRole',
    standalone: false
})
export class FormatRolePipe implements PipeTransform {
  constructor() { }

  transform(value: any, args?: any): any {
    // console.log('FormatRolePipe', value);

    switch (value) {
      case 'USER':
        return 'Standard user';

      case 'ADMIN':
        return 'Administrator';

      case 'SYS_ADMIN':
        return 'System Administrator';
    }
  }

}
