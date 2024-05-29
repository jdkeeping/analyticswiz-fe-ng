import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'bh-group-box',
  templateUrl: './bh-group-box.component.html',
  styleUrls: ['./bh-group-box.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class BhGroupBoxComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
