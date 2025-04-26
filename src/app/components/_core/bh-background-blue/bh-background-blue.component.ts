import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'bh-background-blue',
    templateUrl: './bh-background-blue.component.html',
    styleUrls: ['./bh-background-blue.component.scss'],
    imports: [
        CommonModule
    ]
})
export class BhBackgroundBlueComponent  implements OnInit {
  @Input() alignCenter = false;

  constructor() { }

  ngOnInit() {}

}
