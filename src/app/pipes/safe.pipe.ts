import { Pipe, PipeTransform } from '@angular/core';
import {
  DomSanitizer,
  SafeHtml,
  SafeStyle,
  SafeScript,
  SafeUrl,
  SafeResourceUrl
} from '@angular/platform-browser';

/**
 * ID: bh-format-safe-pipe
 * Name: Format Safe Pipe
 * Type: Pipe
 * Description: Bypasses Angular security when displaying code variable as HTML template interpolation
 * Implementation:
 *    1.) Import pipes.module.ts (PipesModule) into page or component's module.ts
 *    2.) In HTML template, display desired variable with pipe reference:  {{ htmlCode | safe: 'html' }}
 * Version: 1
 *
 * ==============================
 * Change Log
 * ==============================
 * 2021-07-13 - MW - v1: Initial dev
 */
@Pipe({
    name: 'safe',
    standalone: false
})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  public transform(
    value: any,
    type: string
  ): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (type) {
      case 'html':
        return this.sanitizer.bypassSecurityTrustHtml(value);
      case 'style':
        return this.sanitizer.bypassSecurityTrustStyle(value);
      case 'script':
        return this.sanitizer.bypassSecurityTrustScript(value);
      case 'url':
        return this.sanitizer.bypassSecurityTrustUrl(value);
      case 'resource-url':
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);
      default:
        throw new Error(`Invalid safe type specified: ${type}`);
    }
  }
}
