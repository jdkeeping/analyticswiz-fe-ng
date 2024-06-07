import { CommonModule } from '@angular/common';
import { Component, EnvironmentInjector, inject, OnDestroy, OnInit } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square } from 'ionicons/icons';
import { Subscription } from 'rxjs';
import { AnalyticsClickDirective } from 'src/app/directives/analytics-click/analytics-click.directive';
import { NavPage } from 'src/app/models/_core/nav-page';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    AnalyticsClickDirective
  ],
})
export class TabsPage implements OnInit, OnDestroy {
  pages: NavPage[] = [];
  subs: Subscription[] = [];

  constructor(
    private navService: NavigationService
  ) {
  }

  ngOnInit() {
    this.pages = this.navService.navPages;
    this.subscribeToNav();
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  subscribeToNav() {
    this.subs.push(
      this.navService.navPagesSubject.subscribe(p => {
        this.pages = p;
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
