import { IonIcon, IonButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'bh-confirmation',
  templateUrl: './bh-confirmation.component.html',
  styleUrls: ['./bh-confirmation.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonIcon,
    IonButton
  ]
})
export class BhConfirmationComponent  implements OnInit {
  @Input() ionIcon = 'checkmark-circle-outline';
  @Input() ionIconColor = 'success';
  @Input() heading = '';
  @Input() message = '';
  @Input() showButton = false;
  @Input() buttonLabel = 'Continue';
  @Input() buttonIcon;
  @Input() buttonFill: 'solid' | 'outline' = 'solid';
  @Output() clickEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  onClick() {
    this.clickEvent.emit();
  }

}
