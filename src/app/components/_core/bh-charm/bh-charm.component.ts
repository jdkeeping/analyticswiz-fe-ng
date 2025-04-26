import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnalyticsClickDirective } from 'src/app/directives/analytics-click/analytics-click.directive';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/_core/auth/auth.service';
import { IonIcon } from "@ionic/angular/standalone";

@Component({
    selector: 'bh-charm',
    templateUrl: './bh-charm.component.html',
    styleUrls: ['./bh-charm.component.scss'],
    imports: [IonIcon,
        CommonModule,
        RouterModule,
        AnalyticsClickDirective,
        IonIcon
    ]
})
export class BhCharmComponent  implements OnInit {
  @Input() type: 'user' | 'icon' = 'user';
  @Input() routerLink: string;
  @Input() ionIcon = '';
  @Input() label = '';
  @Input() showBadge = false;
  @Input() eventName = 'charm';
  @Input() eventDetail = this.type + ': ' + this.label;
  authUser: User;
  fnInitial = '';
  lnInitial = '';

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authUser = this.authService.getAuthUser();
    this.fnInitial = this.authUser.firstName ? this.authUser.firstName.substring(0, 1) : '';
    this.lnInitial = this.authUser.lastName ? this.authUser.lastName.substring(0, 1) : '';
  }

}
