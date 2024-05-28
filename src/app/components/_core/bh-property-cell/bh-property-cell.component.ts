import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'bh-property-cell',
  templateUrl: './bh-property-cell.component.html',
  styleUrls: ['./bh-property-cell.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class BhPropertyCellComponent  implements OnInit {
  @Input() label: string;

  constructor() { }

  ngOnInit() {}

}
