/**
 * ID: bh-grid-column-definition
 * Name: BH Grid Column Definition
 * Description: bh-grid component's Column Definition used to define and format column data
 * Version: 2
 *
 * ==============================
 * Change Log
 * ==============================
 * 2021-07-02 - MW - v1: Initial dev
 * 2021-07-13 - MW - v2: Added date properties for sorting and display
 */
 export interface GridColumnDefinition {
    fieldName: string;
    columnLabel: string;
    showColumn: boolean;
    isDate?: boolean;
    dateFormat?: string;
    isBooleanIconField?: boolean;
    booleanTrueIconName?: string;
    booleanTrueIconColor?: string;
    booleanTrueIconArg?: any;
    booleanFalseIconName?: string;
    booleanFalseIconColor?: string;
}
