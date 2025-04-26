import { Pipe, PipeTransform } from '@angular/core';

/**
 * ID: bh-format-number-pipe
 * Name: Format Number Pipe
 * Type: Pipe
 * Description: Formats numbers in a stylistic way
 * Implementation:
 *    1.) Import pipes.module.ts (PipesModule) into page or component's module.ts
 *    2.) In HTML template, display desired variable with pipe reference:  {{ num | formatNumber }}
 * Version: 1
 *
 * ==============================
 * Change Log
 * ==============================
 * 2024-05-20 - MW - v1: Initial dev
 */
@Pipe({
    name: 'formatNumber',
    standalone: false
})
export class FormatNumberPipe implements PipeTransform {
  constructor (
  ) {}

  transform(value: number, args?: any): any {
    const isNaN = Number(value).toString() === 'NaN';

    // If not a number, return value
    if (isNaN) {
      return value;
    }

    // Example: 1.1m
    if (value >= 1100000) {
      return (value / 100000).toFixed(1) + 'm';
    }

    // Example: 1m
    if (value >= 1000000) {
      return Math.round(value / 1000000) + 'm';
    }

    // Example: 1.1k
    if (value >= 1100) {
      return (value / 1000).toFixed(1) + 'k';
    }

    // Example: 1k
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    // Return original value
    return value;
  }
}
