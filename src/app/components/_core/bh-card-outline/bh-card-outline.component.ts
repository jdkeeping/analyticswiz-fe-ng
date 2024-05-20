import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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
export class BhCardOutlineComponent  implements OnInit {
  @Input() heading: string;
  @Input() body: string;
  @Input() metricValue: number;

  constructor() { }

  ngOnInit() {}

}
