import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/angular/standalone';
import { BhLogoComponent } from 'src/app/components/_core/bh-logo/bh-logo.component';
import { BhToolbarComponent } from 'src/app/components/_core/bh-toolbar/bh-toolbar.component';
import { BhLoginFormComponent } from 'src/app/components/bh-login-form/bh-login-form.component';
import { BhBackgroundBlueComponent } from 'src/app/components/_core/bh-background-blue/bh-background-blue.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonIcon,
    CommonModule,
    FormsModule,
    BhLogoComponent,
    BhToolbarComponent,
    BhLoginFormComponent,
    BhBackgroundBlueComponent
  ]
})
export class LoginPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
