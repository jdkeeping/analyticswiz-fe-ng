/**
 * ID: bh-input-select-option
 * Name: BH Input Select Option
 * Description: Object type for bh-inputs with type of select, radio-list, checklist
 * Version: 1
 *
 * ==============================
 * Change Log
 * ==============================
 * 2021-07-02 - MW - v1: Initial dev
 * 2022-08-26 - DW - v2: Added detail field
 */
 export interface SelectOption {
  // qoSeq?: number;
  label?: string;
  detail?: string;
  value?: any;
  checkValue?: any;
  active?: number;
  order?: number;
}
