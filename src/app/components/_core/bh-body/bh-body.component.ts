import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bh-body',
  templateUrl: './bh-body.component.html',
  styleUrls: ['./bh-body.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class BhBodyComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
