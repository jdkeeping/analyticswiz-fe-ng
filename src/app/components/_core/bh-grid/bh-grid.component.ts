import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import * as moment from 'moment';
import { GridColumnDefinition } from 'src/app/models/_core/grid-column-definition';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { IonIcon, IonCheckbox } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'bh-grid',
  templateUrl: './bh-grid.component.html',
  styleUrls: ['./bh-grid.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PipesModule,
    IonIcon,
    IonCheckbox
  ]
})
export class BhGridComponent implements OnChanges, AfterViewInit {
  @Input() columnDefinitions: GridColumnDefinition[] = [];
  @Input() data: any[] = [];
  @Input() ionIcon: string;
  @Input() statusField: string;
  @Input() isNewStatusArg: any;
  @Input() isCompleteStatusArg: any;
  @Input() sortField: string;
  @Input() sortDirection: 'up' | 'down' = 'up';
  @Input() selectionMode: 'single' | 'multi' = 'single';
  @Output() clickEvent = new EventEmitter();
  initData: any[] = [];
  parsedData: any[] = [];
  displayedColumns: string[] = [];
  isClickable = false;
  selectedData: any;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges', changes);
    if ('columnDefinitions' in changes && this.columnDefinitions) {
      this.setColumnDefinitions();
    }

    if ('data' in changes && this.data) {
      let i = 0;
      this.parsedData = [];
      for (const dataItem of this.data) {
        const parsedItem = { bhGridRowIndex: i, gridItemSelected: false };
        for (const colDef of this.columnDefinitions) {
          let dataElement = dataItem[colDef.fieldName];
          // Check if date and format for sorting
          if (colDef.isDate && colDef.dateFormat) {
            const dataElementMoment = moment(dataElement, colDef.dateFormat);
            // Check for successful date parse
            if (dataElementMoment.isValid()) {
              dataElement = dataElementMoment.format('YYYY-MM-DD HH:mm:ss');
            } else {
              colDef.isDate = false;
            }
          } else {
            colDef.isDate = false;
          }
          parsedItem[colDef.fieldName] = dataElement;
        }
        this.parsedData.push(parsedItem);
        i += 1;
      }
      this.initData = Object.assign([], this.parsedData);
      this.sortData();
      // this.setDataSource();
    }
  }

  ngAfterViewInit() {
    if (this.clickEvent.observed) {
      this.isClickable = true;
    }
  }

  setColumnDefinitions() {
    this.displayedColumns = [];
    for (const cd of this.columnDefinitions) {
      if (cd.showColumn) {
        this.displayedColumns.push(cd.fieldName);
      }
    }
  }

  toggleSort(cd: GridColumnDefinition) {
    if (this.sortField === cd.fieldName) {
      this.sortDirection = (this.sortDirection === 'up' ? 'down' : 'up');
    } else {
      this.sortDirection = 'up';
    }
    this.sortField = cd.fieldName;
    this.sortData();
  }

  sortData() {
    if (this.sortField && this.sortDirection) {
      console.log('sorting', this.sortField, this.sortDirection, this.parsedData);
      this.parsedData.sort((a, b) =>{
        const propA = this.sortDirection === 'up' ? a[this.sortField] : b[this.sortField];
        const propB = this.sortDirection === 'up' ? b[this.sortField] : a[this.sortField];
        const value = this.parsedData[0][this.sortField];
        const isNumber = typeof value === 'number' && !isNaN(value);
        return isNumber ? propA - propB : propA.localeCompare(propB);
      });
    }
  }

  selectRow(d) {
    this.clickEvent.emit(d);
    this.selectedData = d;
  }

  setSelection() {
    const selectedItems = Object.assign([], this.parsedData.filter(pd => pd.gridItemSelected));
    for (const i of selectedItems) {
      delete i.gridItemSelected;
    }
    this.clickEvent.emit(selectedItems);
  }

}
