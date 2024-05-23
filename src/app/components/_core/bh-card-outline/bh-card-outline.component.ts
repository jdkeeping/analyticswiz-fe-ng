import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'src/app/pipes/pipes.module';

@Component({
  selector: 'bh-card-outline',
  templateUrl: './bh-card-outline.component.html',
  styleUrls: ['./bh-card-outline.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PipesModule
  ]
})
export class BhCardOutlineComponent  implements OnInit, AfterViewInit {
  @Input() heading: string;
  @Input() body: string;
  @Input() metricValue: number;
  @Output() clickEvent = new EventEmitter();
  isClickable = false;

  constructor() { }

  ngOnInit() {}

  ngAfterViewInit() {
    if (this.clickEvent.observed) {
      this.isClickable = true;
    }
  }

  onClick() {
    this.clickEvent.emit();
  }


}
