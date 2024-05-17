import { AnalyticsService } from './../../services/_core/analytics/analytics.service';
import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[bhAnalyticsClick]',
  standalone: true
})
export class AnalyticsClickDirective {
  @Input() eventName!: string;
  @Input() eventDetail!: string;

  constructor(
    private analytics: AnalyticsService
  ) { }

  @HostListener('click', ['$event'])
  onClick(ev: Event) {
    this.analytics.clickEvent(this.eventName, this.eventDetail);
  }
}
