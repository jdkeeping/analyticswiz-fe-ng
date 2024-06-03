import { Component, OnInit } from '@angular/core';
import { BhLogoComponent } from '../bh-logo/bh-logo.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AnalyticsClickDirective } from 'src/app/directives/analytics-click/analytics-click.directive';
import { BhCharmComponent } from '../bh-charm/bh-charm.component';
import { AuthService } from 'src/app/services/_core/auth/auth.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'bh-header',
  templateUrl: './bh-header.component.html',
  styleUrls: ['./bh-header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BhLogoComponent,
    BhCharmComponent,
    AnalyticsClickDirective
  ]
})
export class BhHeaderComponent  implements OnInit {
  activePage: 'cases' | 'requests-lis' | 'requests-cis' | 'auditing' | 'manage';

  constructor(
    private authService: AuthService,
    private navService: NavigationService
  ) { }

  ngOnInit() {
    this.setActivePage();
  }

  openTab(page) {
    this.navService.navigateBack(page);
  }

  setActivePage() {
    const path = window.location.pathname;
    if (path.indexOf('/tabs/cases') > -1) {
      this.activePage = 'cases';
    }
    if (path.indexOf('/tabs/requests-cis') > -1) {
      this.activePage = 'requests-cis';
    }
    if (path.indexOf('/tabs/requests-lis') > -1) {
      this.activePage = 'requests-lis';
    }
    if (path.indexOf('/tabs/auditing') > -1) {
      this.activePage = 'auditing';
    }
    if (path.indexOf('/tabs/manage') > -1) {
      this.activePage = 'manage';
    }
  }

  openUserMenu() {
    console.log('Opening user menu');
    this.authService.menuOpen.next(true);
  }

}
