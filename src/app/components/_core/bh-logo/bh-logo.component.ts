import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'bh-logo',
  templateUrl: './bh-logo.component.html',
  styleUrls: ['./bh-logo.component.scss'],
  standalone: true
})
export class BhLogoComponent  implements OnInit {
  env = environment;

  constructor() { }

  ngOnInit() {}

}
