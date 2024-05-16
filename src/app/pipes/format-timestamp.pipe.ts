import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { HelperUtilitiesService } from '../services/_core/helper-utilities/helper-utilities.service';


/**
 * ID: bh-format-timestamp-pipe
 * Name: Format Timestamp Pipe
 * Type: Pipe
 * Description: Formats timestamp string
 * Implementation:
 *    1.) Import pipes.module.ts (PipesModule) into page or component's module.ts
 *    2.) In HTML template, display desired variable with pipe reference:  {{ eventDateIso | formatDate: 'YYYY-MM-DDTHH:mm:ss.zzz' }}
 * Version: 1
 *
 * ==============================
 * Change Log
 * ==============================
 * 2021-07-13 - MW - v1: Initial dev
 */
@Pipe({
  name: 'formatTimestamp'
})
export class FormatTimestampPipe implements PipeTransform {
  constructor(
    private helpers: HelperUtilitiesService
) { }

  transform(value: any, displayFormat: string = 'M/D/YYYY h:mm a', parseFormat: string | undefined = undefined): any {
    // const tsMoment = moment(value, parseFormat);
    // console.log('formatTimestamp: timeZoneOffset', timeZoneOffset, tsMoment.format('MM/DD/YYYY HH:mm'), tsMoment.format(`MM/DD/YYYY HH:mm [${offsetString}]`));
    const tsMoment = this.helpers.convertUtcToLocal(value, parseFormat);
    return tsMoment.format().toLowerCase() !== 'invalid date' ? tsMoment.format(displayFormat) : '';
  }

}
