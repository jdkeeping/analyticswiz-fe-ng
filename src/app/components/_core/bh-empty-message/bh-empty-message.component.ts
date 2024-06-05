import { IonIcon, IonButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PipesModule } from 'src/app/pipes/pipes.module';

@Component({
  selector: 'bh-empty-message',
  templateUrl: './bh-empty-message.component.html',
  styleUrls: ['./bh-empty-message.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonButton,
    IonIcon,
    PipesModule
  ]
})
export class BhEmptyMessageComponent  implements OnInit {
  @Input() showIcon = true;
  @Input() ionIcon: string;
  @Input() message: string;
  @Input() showButton = false;
  @Input() buttonLabel = 'Do something';
  @Input() buttonFill: 'solid' | 'outline' = 'solid';
  @Output() clickEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  onClick() {
    this.clickEvent.emit();
  }

}
