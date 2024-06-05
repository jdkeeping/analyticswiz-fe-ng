import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon, ModalController } from '@ionic/angular/standalone';
import { BhFeedbackFormComponent } from 'src/app/components/_core/bh-feedback-form/bh-feedback-form.component';
import { PipesModule } from 'src/app/pipes/pipes.module';

@Component({
  selector: 'app-feedback-modal',
  templateUrl: './feedback-modal.page.html',
  styleUrls: ['./feedback-modal.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    CommonModule,
    FormsModule,
    BhFeedbackFormComponent,
    PipesModule
  ]
})
export class FeedbackModalPage implements OnInit {
  @Input() feature;

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
