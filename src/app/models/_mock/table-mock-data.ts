import { Injectable } from "@angular/core";
import { GridColumnDefinition } from "../_core/grid-column-definition";


@Injectable({
  providedIn: 'root'
})
export class TableMockData {
  columnDefinitions: GridColumnDefinition[] = [
    {
      fieldName: 'name', columnLabel: 'Pokemon', showColumn: true, isDate: false
    },
    {
      fieldName: 'type', columnLabel: 'Type', showColumn: true, isDate: false
    },
    {
      fieldName: 'type2', columnLabel: 'Type 2', showColumn: true, isDate: false
    },
    {
      fieldName: 'active', columnLabel: 'Active', showColumn: true, isDate: false, isBooleanIconField: true,
      booleanTrueIconName: 'checkmark-circle-outline', booleanTrueIconColor: 'success', booleanTrueIconArg: true,
      booleanFalseIconName: 'close-circle-outline', booleanFalseIconColor: 'danger'
    },
    {
      fieldName: 'id', columnLabel: 'ID', showColumn: true, isDate: false
    },
  ];

  data = [
    {
      name: 'Bulbasaur',
      nickname: 'Bully',
      type: 'Grass',
      type2: 'Poison',
      id: '001',
      active: true
    },
    {
      name: 'Ivysaur',
      nickname: 'Ivy',
      type: 'Grass',
      type2: 'Poison',
      id: '002',
      active: false
    },
    {
      name: 'Venusaur',
      nickname: 'Venney',
      type: 'Grass',
      type2: 'Poison',
      id: '003',
      active: true
    },
    {
      name: 'Charmander',
      nickname: '',
      type: 'Fire',
      type2: '',
      id: '004',
      active: true
    },
    {
      name: 'Charmeleon',
      nickname: '',
      type: 'Fire',
      type2: '',
      id: '005',
      active: true
    },
    {
      name: 'Charizard',
      nickname: '',
      type: 'Fire',
      type2: 'Flying',
      id: '006',
      active: true
    },
  ];
}
