import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IonContent } from "@ionic/angular/standalone";

@Component({
  selector: 'bh-property-row',
  templateUrl: './bh-property-row.component.html',
  styleUrls: ['./bh-property-row.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  standalone: true,
  imports: [
    CommonModule,
    IonContent
  ]
})
export class BhPropertyRowComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
