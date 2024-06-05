import { IonIcon } from '@ionic/angular/standalone';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from 'src/app/pipes/pipes.module';

@Component({
  selector: 'bh-message-banner',
  templateUrl: './bh-message-banner.component.html',
  styleUrls: ['./bh-message-banner.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonIcon,
    PipesModule
  ]
})
export class BhMessageBannerComponent  implements OnInit {
  @Input() type: 'information' | 'warning' | 'danger' | 'success' = 'information';
  @Input() ionIcon: string;
  @Input() heading: string;
  @Input() message: string;

  constructor() { }

  ngOnInit() {}

}
