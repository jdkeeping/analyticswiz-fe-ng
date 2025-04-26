import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'bh-body',
    templateUrl: './bh-body.component.html',
    styleUrls: ['./bh-body.component.scss'],
    imports: [
        CommonModule
    ]
})
export class BhBodyComponent  implements OnInit {
  @Input() padding = false;

  constructor() { }

  ngOnInit() {}

}
