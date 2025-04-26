import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { BhHeaderComponent } from 'src/app/components/_core/bh-header/bh-header.component';
import { BhFooterComponent } from 'src/app/components/_core/bh-footer/bh-footer.component';
import { BhBodyComponent } from 'src/app/components/_core/bh-body/bh-body.component';

@Component({
    selector: 'app-requests-lis',
    templateUrl: './requests-lis.page.html',
    styleUrls: ['./requests-lis.page.scss'],
    imports: [
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        CommonModule,
        FormsModule,
        BhHeaderComponent,
        BhBodyComponent,
        BhFooterComponent
    ]
})
export class RequestsLisPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
