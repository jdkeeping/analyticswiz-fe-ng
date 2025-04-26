import { IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/_core/auth/auth.service';
import { HelperUtilitiesService } from 'src/app/services/_core/helper-utilities/helper-utilities.service';

@Component({
    selector: 'bh-user-icon',
    templateUrl: './bh-user-icon.component.html',
    styleUrls: ['./bh-user-icon.component.scss'],
    imports: [
        CommonModule,
        RouterModule,
        IonIcon
    ]
})
export class BhUserIconComponent  implements OnChanges {
  @Input() userFullName: string;
  @Input() userId: string | number;
  @Input() size: 'small' | 'medium' | 'large' = 'small';
  @Input() user: User;
  initials: string;
  colorClass: string;
  isSelf = false;

  constructor(
    private authService: AuthService,
    private helpers: HelperUtilitiesService
  ) { }

  ngOnChanges() {
    const authUser = this.authService.getAuthUser();
    this.isSelf = (authUser.userId === this.userId);
    this.setUserBadge();
    console.log('user-icon: ', authUser.userId, this.userId);
  }

  setUserBadge() {
    if (this.userFullName) {
      const firstName = this.helpers.getFirstName(this.userFullName);
      const lastName = this.helpers.getLastName(this.userFullName);
      const firstNameInitial = firstName ? firstName.substr(0, 1) : null;
      const lastNameInitial = lastName ? lastName.substr(0, 1) : null;
      this.initials = firstNameInitial + lastNameInitial;
      }
    this.setBadgeColor();
  }

  setBadgeColor() {
    if (this.isSelf) {
      this.colorClass = 'self';
    } else {
      if (this.userId) {
        const lastChar = this.userId.toString().substr(this.userId.toString().length - 1, 1);
        this.colorClass = 'color-' + lastChar;
      }
    }
  }


}
