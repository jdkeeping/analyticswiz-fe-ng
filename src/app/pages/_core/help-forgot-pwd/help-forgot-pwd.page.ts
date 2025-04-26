import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { BhBodyComponent } from 'src/app/components/_core/bh-body/bh-body.component';
import { BhFooterComponent } from 'src/app/components/_core/bh-footer/bh-footer.component';
import { BhGroupBoxComponent } from 'src/app/components/_core/bh-group-box/bh-group-box.component';
import { BhHeaderComponent } from 'src/app/components/_core/bh-header/bh-header.component';
import { BhListCardComponent } from 'src/app/components/_core/bh-list-card/bh-list-card.component';
import { PipesModule } from 'src/app/pipes/pipes.module';

@Component({
    selector: 'app-help-forgot-pwd',
    templateUrl: './help-forgot-pwd.page.html',
    styleUrls: ['./help-forgot-pwd.page.scss'],
    imports: [
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        CommonModule,
        FormsModule,
        BhHeaderComponent,
        BhBodyComponent,
        BhFooterComponent,
        BhListCardComponent,
        BhGroupBoxComponent,
        PipesModule
    ]
})
export class HelpForgotPwdPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
