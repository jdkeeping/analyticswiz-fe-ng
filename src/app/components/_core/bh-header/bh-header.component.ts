import { IonIcon } from '@ionic/angular/standalone';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BhLogoComponent } from '../bh-logo/bh-logo.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AnalyticsClickDirective } from 'src/app/directives/analytics-click/analytics-click.directive';
import { BhCharmComponent } from '../bh-charm/bh-charm.component';
import { AuthService } from 'src/app/services/_core/auth/auth.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { NavPage } from 'src/app/models/_core/nav-page';
import { Subscription } from 'rxjs';
import { PipesModule } from 'src/app/pipes/pipes.module';

@Component({
  selector: 'bh-header',
  templateUrl: './bh-header.component.html',
  styleUrls: ['./bh-header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonIcon,
    BhLogoComponent,
    BhCharmComponent,
    AnalyticsClickDirective,
    PipesModule
  ]
})
export class BhHeaderComponent  implements OnInit, OnDestroy {
  @Input() fixed = false;
  @Input() showSearch = false;
  activePage: string;
  pages: NavPage[] = [];
  subs: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private navService: NavigationService
  ) { }

  ngOnInit() {
    this.pages = this.navService.navPages;
    this.setActivePage();
    this.subscribeToNav();
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  openTab(page) {
    this.navService.navigateBack(page);
  }

  setActivePage() {
    const path = window.location.pathname;
    for (const p of this.pages) {
      if (path.indexOf(p.navPath) > -1) {
        this.activePage = p.tabId;
        break;
      }
    }
  }

  openUserMenu() {
    this.authService.menuOpen.next(true);
  }

  subscribeToNav() {
    this.subs.push(
      this.navService.navPagesSubject.subscribe(p => {
        this.pages = p;
        this.setActivePage();
      })
    )
  }

  unsubscribe() {
    this.subs.forEach(s => {
      s.unsubscribe();
      s = null;
    });
  }

}
