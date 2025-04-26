import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { BhHeaderComponent } from 'src/app/components/_core/bh-header/bh-header.component';
import { BhBodyComponent } from 'src/app/components/_core/bh-body/bh-body.component';
import { BhFooterComponent } from 'src/app/components/_core/bh-footer/bh-footer.component';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/_core/auth/auth.service';
import { BhUserIconComponent } from 'src/app/components/_core/bh-user-icon/bh-user-icon.component';
import { BhGroupBoxComponent } from 'src/app/components/_core/bh-group-box/bh-group-box.component';
import { BhPropertyRowComponent } from 'src/app/components/_core/bh-property-row/bh-property-row.component';
import { BhPropertyCellComponent } from 'src/app/components/_core/bh-property-cell/bh-property-cell.component';
import { PipesModule } from 'src/app/pipes/pipes.module';

@Component({
    selector: 'app-my-account',
    templateUrl: './my-account.page.html',
    styleUrls: ['./my-account.page.scss'],
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
        BhUserIconComponent,
        BhGroupBoxComponent,
        BhPropertyRowComponent,
        BhPropertyCellComponent,
        PipesModule
    ]
})
export class MyAccountPage implements OnInit {
  authUser: User;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authUser = this.authService.getAuthUser();
  }

}
