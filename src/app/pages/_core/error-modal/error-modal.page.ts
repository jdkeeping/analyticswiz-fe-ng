import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ApiError } from 'src/app/models/_core/api-error';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { IonContent, IonButton, IonIcon } from "@ionic/angular/standalone";

@Component({
    selector: 'app-error-modal',
    templateUrl: './error-modal.page.html',
    styleUrls: ['./error-modal.page.scss'],
    imports: [IonContent,
        CommonModule,
        FormsModule,
        PipesModule,
        IonButton,
        IonIcon
    ]
})
export class ErrorModalPage implements OnInit {
  @Input() apiError: ApiError = {};
  @Input() errorDetailMsg = '';
  @Input() header = 'Something went wrong';
  @Input() message = 'Because of a technical issue on our end, we couldn\'t complete the desire action. Please try again.';
  showDetails = false;
  errorString = "";

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    console.log('error-modal.ngOnChanges: error', this.apiError);
    if (this.errorString) {
      this.errorString = JSON.stringify(this.apiError);
      this.errorString = this.errorString.replace(/',/g, '\',<br>');
      this.errorString = this.errorString.replace(/{/g, '{<br>');
      this.errorString = this.errorString.replace(/}/g, '}<br>');
    }
    console.log('error-modal.ngOnChanges: errorString', this.errorString);
  }

  presentDetail() {
    this.showDetails = true;
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
