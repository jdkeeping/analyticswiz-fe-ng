import { Pipe, PipeTransform } from '@angular/core';
import { HelperUtilitiesService } from '../services/_core/helper-utilities/helper-utilities.service';


@Pipe({
    name: 'capitalize',
    standalone: false
})
export class CapitalizePipe implements PipeTransform {
  constructor(
    public helpers: HelperUtilitiesService
) { }

  transform(value: any): any {
    return this.helpers.capitalizeString(value);
  }

}
