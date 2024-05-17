import { Component, OnInit } from '@angular/core';
import { BhLogoComponent } from '../bh-logo/bh-logo.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AnalyticsClickDirective } from 'src/app/directives/analytics-click/analytics-click.directive';
import { BhCharmComponent } from '../bh-charm/bh-charm.component';

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
  activePage: 'cases' | 'requests' | 'auditing' | 'manage';

  constructor() { }

  ngOnInit() {
    this.setActivePage();
  }

  setActivePage() {
    const path = window.location.pathname;
    if (path.indexOf('/tabs/cases') > -1) {
      this.activePage = 'cases';
    }
    if (path.indexOf('/tabs/requests') > -1) {
      this.activePage = 'requests';
    }
    if (path.indexOf('/tabs/auditing') > -1) {
      this.activePage = 'auditing';
    }
    if (path.indexOf('/tabs/manage') > -1) {
      this.activePage = 'manage';
    }
  }

}
