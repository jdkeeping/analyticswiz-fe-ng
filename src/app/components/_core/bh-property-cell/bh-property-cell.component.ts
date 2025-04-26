import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PipesModule } from 'src/app/pipes/pipes.module';

@Component({
    selector: 'bh-property-cell',
    templateUrl: './bh-property-cell.component.html',
    styleUrls: ['./bh-property-cell.component.scss'],
    imports: [
        CommonModule,
        PipesModule
    ]
})
export class BhPropertyCellComponent  implements OnInit {
  @Input() label: string;

  constructor() { }

  ngOnInit() {}

}
