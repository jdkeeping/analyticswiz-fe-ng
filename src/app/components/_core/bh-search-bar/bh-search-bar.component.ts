import { IonSpinner } from '@ionic/angular/standalone';
import { IonInput, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';

@Component({
  selector: 'bh-search-bar',
  templateUrl: './bh-search-bar.component.html',
  styleUrls: ['./bh-search-bar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonInput,
    IonButton,
    IonIcon,
    IonSpinner,
    PipesModule
  ]
})
export class BhSearchBarComponent  implements OnInit, OnChanges {
  @Input() showSearchButton = true;
  @Input() showSuggestions = true;
  @Input() placeholderText = 'Search';
  @Input() searchTerm = '';
  @Input() searchDelay = 300;
  @Input() isSearching = true;
  @Output() searchEvent = new EventEmitter();
  @Output() clickEvent = new EventEmitter();
  @Output() clearEvent = new EventEmitter();
  timer;

  constructor() { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {}

  onSearch() {
    if (this.showSuggestions) {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = undefined;
      }
      this.timer = setTimeout(() => {
        this.searchEvent.emit(this.searchTerm);
      }, this.searchDelay);

    }
  }

  onClick() {
    this.clickEvent.emit(this.searchTerm);
  }

  onClear() {
    this.searchTerm = '';
    this.clearEvent.emit();
  }


}
