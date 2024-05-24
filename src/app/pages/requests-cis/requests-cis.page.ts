import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { BhHeaderComponent } from 'src/app/components/_core/bh-header/bh-header.component';
import { BhBodyComponent } from 'src/app/components/_core/bh-body/bh-body.component';
import { BhFooterComponent } from 'src/app/components/_core/bh-footer/bh-footer.component';

@Component({
  selector: 'app-requests-cis',
  templateUrl: './requests-cis.page.html',
  styleUrls: ['./requests-cis.page.scss'],
  standalone: true,
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
export class RequestsCisPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
