import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import moment from 'moment';
import { AnalyticsClickDirective } from 'src/app/directives/analytics-click/analytics-click.directive';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'bh-footer',
    templateUrl: './bh-footer.component.html',
    styleUrls: ['./bh-footer.component.scss'],
    imports: [
        CommonModule,
        RouterModule,
        AnalyticsClickDirective,
        PipesModule
    ]
})
export class BhFooterComponent  implements OnInit {
  @Input() marginTop = '48px';
  @Input() lightMode = false;
  env = environment;
  year = moment().year();
  constructor(
    private navService: NavigationService,
  ) { }

  ngOnInit() {}

}
