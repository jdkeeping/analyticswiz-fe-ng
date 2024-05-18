import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'bh-card-outline',
  templateUrl: './bh-card-outline.component.html',
  styleUrls: ['./bh-card-outline.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class BhCardOutlineComponent  implements OnInit {
  @Input() heading: string;
  @Input() body: string;
  @Input() metricValue: string | number;

  constructor() { }

  ngOnInit() {}

}
