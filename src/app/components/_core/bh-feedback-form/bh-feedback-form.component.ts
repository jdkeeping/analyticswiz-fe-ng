import { IonIcon, IonButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BhInputComponent } from '../bh-input/bh-input.component';
import { AnalyticsService } from 'src/app/services/_core/analytics/analytics.service';
import { BhConfirmationComponent } from '../bh-confirmation/bh-confirmation.component';
import { AnalyticsClickDirective } from 'src/app/directives/analytics-click/analytics-click.directive';
import { PipesModule } from 'src/app/pipes/pipes.module';

@Component({
  selector: 'bh-feedback-form',
  templateUrl: './bh-feedback-form.component.html',
  styleUrls: ['./bh-feedback-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonIcon,
    IonButton,
    BhInputComponent,
    BhConfirmationComponent,
    AnalyticsClickDirective,
    PipesModule
  ]
})
export class BhFeedbackFormComponent implements OnInit {
  @Input() feature = 'this feature';
  @Input() showConfButton = false;
  @Input() confButtonLabel = 'Dismiss';
  @Input() confButtonFill: 'solid' | 'outline' = 'solid';
  @Output() dismissEvent = new EventEmitter();
  activeView: 'form' | 'confirmation' = 'form';
  starRating = 0;
  hoverRating = -1;
  feedbackText = '';
  textPlaceholder = '';

  constructor(
    private analytics: AnalyticsService
  ) { }

  ngOnInit() { }

  setStarRating(starRating: number) {
    this.starRating = starRating;
    this.textPlaceholder = starRating > 3 ?
      'Tell us what you liked about this experience. (Optional)' :
      'Tell us what you didn\'t like about this experience. (Optional)';
  }

  setHover(starRating: number) {
    this.hoverRating = starRating;
  }

  releaseHover() {
    this.hoverRating = -1;
  }

  submitFeedback() {
    if (this.feedbackText) {
      this.analytics.customEvent('feedback-text', this.feature, this.starRating + '|' + this.feedbackText);
    }
    this.activeView = 'confirmation';
  }

  dismiss() {
    this.dismissEvent.emit();
  }

}
