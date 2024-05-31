import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { BhHeaderComponent } from 'src/app/components/_core/bh-header/bh-header.component';
import { BhBodyComponent } from 'src/app/components/_core/bh-body/bh-body.component';
import { BhFooterComponent } from 'src/app/components/_core/bh-footer/bh-footer.component';
import { BhEditorCaseComponent } from 'src/app/components/bh-editor-case/bh-editor-case.component';

@Component({
  selector: 'app-cases-view',
  templateUrl: './cases-view.page.html',
  styleUrls: ['./cases-view.page.scss'],
  standalone: true,
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
    BhEditorCaseComponent
  ]
})
export class CasesViewPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
