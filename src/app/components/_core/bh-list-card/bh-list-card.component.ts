import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonIcon } from "@ionic/angular/standalone";
import { AnalyticsClickDirective } from 'src/app/directives/analytics-click/analytics-click.directive';
import { PipesModule } from 'src/app/pipes/pipes.module';

@Component({
    selector: 'bh-list-card',
    templateUrl: './bh-list-card.component.html',
    styleUrls: ['./bh-list-card.component.scss'],
    imports: [
        CommonModule,
        RouterModule,
        IonIcon,
        AnalyticsClickDirective,
        PipesModule
    ]
})
export class BhListCardComponent implements OnInit, AfterViewInit {
  @Input() ionIcon;
  @Input() ionIconSrc;
  @Input() heading;
  @Input() detail;
  @Input() href = 'javascript:void(0)';
  @Input() eventName;
  @Input() eventDetail;
  @Input() value;
  isClickable = false;
  @Output() clickEvent = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    if (this.clickEvent.observed) {
      this.isClickable = true;
    }
  }

  onClick() {
    this.clickEvent.emit(this.value);
  }

}
