import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, PopoverController } from '@ionic/angular/standalone';
import { BhLogoComponent } from 'src/app/components/_core/bh-logo/bh-logo.component';
import { BhToolbarComponent } from 'src/app/components/_core/bh-toolbar/bh-toolbar.component';
import { BhLoginFormComponent } from 'src/app/components/bh-login-form/bh-login-form.component';
import { BhBackgroundBlueComponent } from 'src/app/components/_core/bh-background-blue/bh-background-blue.component';
import { TranslatorService } from 'src/app/services/_core/translator/translator.service';
import { Language, LanguageCode } from 'src/app/models/translation-dict';
import { LanguagePopoverPage } from '../_core/language-popover/language-popover.page';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
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
  env = environment;
  preferredLanguage: Language;
  langReady = true;

  constructor(
    private translator: TranslatorService,
    private popCtrl: PopoverController,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    const langCode = this.translator.getPreferredLanguage();
    this.preferredLanguage = this.translator.supportedLanguages.find(l => l.code === langCode);
  }

  refreshView() {
    this.cdr.detectChanges();
    this.langReady = false;
    const langCode = this.translator.getPreferredLanguage();
    this.preferredLanguage = this.translator.supportedLanguages.find(l => l.code === langCode);
    setTimeout(() => {
      this.langReady = true;
      this.cdr.detectChanges();
    }, 0);

  }

  async changeLanguage(ev) {
    const pop = await this.popCtrl.create({
      component: LanguagePopoverPage,
      event: ev
    });

    pop.onDidDismiss().then(d => {
      this.refreshView();
    });

    pop.present();
  }
}
