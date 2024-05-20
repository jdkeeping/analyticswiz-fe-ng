import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BhInputComponent } from '../_core/bh-input/bh-input.component';
import { IonButton, IonSpinner } from "@ionic/angular/standalone";
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/_core/auth/auth.service';
import { AnalyticsService } from 'src/app/services/_core/analytics/analytics.service';
import { NotificationsService } from 'src/app/services/_core/notifications/notifications.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { ModalController } from '@ionic/angular';
import { BhMessageBannerComponent } from '../_core/bh-message-banner/bh-message-banner.component';

@Component({
  selector: 'bh-login-form',
  templateUrl: './bh-login-form.component.html',
  styleUrls: ['./bh-login-form.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonSpinner,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BhInputComponent,
    BhMessageBannerComponent
  ]
})
export class BhLoginFormComponent implements OnInit {
  env = environment;
  form1: FormGroup = this.formBuilder.group({
    userId: [null, Validators.required],
    password: [null, Validators.required],
  });
  errorMessage = '';
  submitAttempted = false;
  validationMessages = {
    userId: [{ type: 'required', message: 'Type your Baystate User ID.' }],
    password: [{ type: 'required', message: 'Type your Baystate password.' }],
  };
  isSigningIn = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private analytics: AnalyticsService,
    private notifications: NotificationsService,
    private navService: NavigationService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() { }

  async signIn() {
    this.submitAttempted = true;
    if (this.form1.valid && !this.isSigningIn) {
      this.errorMessage = null;
      this.isSigningIn = true;
      const userId = this.form1.controls['userId'].value;
      const password = this.form1.controls['password'].value;
      try {
        const res = await firstValueFrom(this.authService.login(userId, password));
        if (res.x_status && res.x_status === 'S') {
          this.analytics.loginEvent(userId);
          this.notifications.stopLoading();

          // Check for target URL
          if (this.authService.targetUrl) {
            this.navService.navigateForward(this.authService.targetUrl);
          } else {
            this.navService.navigateRoot('/tabs/cases');
          }
        } else {
          this.notifications.stopLoading();
          this.errorMessage = res.error.message;
          console.error(res);
        }
        this.isSigningIn = false;
      } catch (err) {
        this.notifications.stopLoading();
        this.errorMessage = err.error.message;
        this.isSigningIn = false;
        console.error(err);
      }
    }
  }


}
