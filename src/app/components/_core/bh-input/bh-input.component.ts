import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { IonInput, IonIcon, IonItem, IonInputPasswordToggle } from '@ionic/angular/standalone';
import { ControlValueAccessor, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { SelectOption } from 'src/app/models/_core/select-option';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bh-input',
  templateUrl: './bh-input.component.html',
  styleUrls: ['./bh-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BhInputComponent),
      multi: true
    },
    // { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    // { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
  ],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonItem,
    IonInput,
    IonInputPasswordToggle,
    IonIcon,
    CommonModule
  ]
})
export class BhInputComponent  implements ControlValueAccessor, OnInit {
  @Input() formGroup: FormGroup;
  @Input() formControlName: string;
  @Input() type: 'text' | 'password';
  @Input() label: string;
  @Input() placeholder: string;
  @Input() selectOptions: any[] = [];
  @Input() selectLabelProperty = 'label';
  @Input() selectDetailProperty = '';
  @Input() selectValueProperty = 'value';
  @Input() readonly = false;
  @Input() viewOnly = false;
  @Input() viewOnlyValue = '';
  @Input() pattern;
  @Input() maxlength;
  @Input() index = -1;
  @Input() yearValues;
  @Input() min;
  @Input() max;
  @Input() minWidth;
  @Input() step;
  @Input() required;
  @Input() validationMessages: any;
  @Input() submitAttempted = false;
  @Input() helperText: string;
  @Input() mask: string;
  @Output() valueChangeEvent = new EventEmitter();
  @Output() blurEvent = new EventEmitter();
  @Output() selectDxEvent = new EventEmitter();
  @Output() selectTagEvent = new EventEmitter();
  @Output() addTagEvent = new EventEmitter();
  onChange;
  onTouched;
  showPlaceholder = true;
  parsedSelectOptions: SelectOption[] = [];
  isRequired = false;
  value;

  constructor() { }

  ngOnInit() {}

  registerOnChange(fn) {
    this.onChange = fn;
  }

  writeValue(value) {
    if (value) {
      this.value = value;
    }
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  valueChanged(index: number, label: string, evt: any) {
    const value = evt.detail.value;
    const input = { index, label, value };
    this.valueChangeEvent.emit(input);
    this.showPlaceholder = (value && value !== '');
  }

  handleKeyDown(ev, inputIdPrefix): boolean {
    const input = { index: this.index, label: this.label, value: ev, mask: this.mask };
    let isValid = true;
    // Check mask
    if (this.mask) {
      const formControl = this.formGroup.controls[this.formControlName];
      const value = formControl.value as string;
      const lastCharPos = (value && value.length > 0) ? (value.length - 1) : 0;
      const lastChar = (value && value.length > 0) ? value.charAt(lastCharPos) : '';
      const maskChar = this.mask.charAt(lastCharPos + 1);
      const isIgnoredKey = this.isIgnoredKey(ev);
      const inputElement: HTMLInputElement = document.querySelector('#' + inputIdPrefix + this.formControlName + ' input');
      const selectionStart = inputElement.selectionStart;
      const selectionEnd = inputElement.selectionEnd;
      const endOfInput = (value && value.length > 0) ? value.length === selectionStart : true;
      const hasSelectedRange = selectionStart !== selectionEnd;

      if (!isIgnoredKey) {
        // Check for end of input
        // console.log('Non-backspace detected: ' + ev.keyCode);
        const isBackspacing = ev.keyCode === 8;
        const isDeleting = ev.keyCode === 46;

        // Entering new characters
        if (!isBackspacing && !isDeleting) {
          if (endOfInput) {
            // Refactor
            this.refactorEntry(value, 0, null);

            // Check input character
            const currentPosValid = this.checkMaskCharacter(maskChar, ev.key);
            if (!currentPosValid) {
              isValid = false;
            }
          } else {
            // Key entries occur in middle of input
            // console.log('Inserting characters', value);
            const refactorValue = value.slice(0, selectionStart) + ev.key + value.slice(selectionStart);
            this.refactorEntry(refactorValue, 1, inputElement);
            ev.preventDefault();
          }
        } else {
          // Backspace key detected, deleted masked non-alpha-numeric char
          const prevChar = this.mask.charAt(value.length - 2);
          // console.log('Backspacing --- checking previous character: ' + prevChar);
          if (prevChar !== undefined && !this.isAlphabetic(prevChar) && !this.isNumeric(prevChar)) {
            formControl.setValue(value.substring(0, value.length - 2));
            isValid = false;
          }
        }
      }
    }
    return isValid;
  }

  handleKeyUp(ev, inputIdPrefix) {
    if (this.mask) {
      const formControl = this.formGroup.controls[this.formControlName];
      const value = formControl.value as string;
      const lastCharPos = (value.length - 1);
      const lastChar = value.charAt(lastCharPos);
      const maskChar = this.mask.charAt(lastCharPos);
      const inputElement: HTMLInputElement = document.querySelector('#' + inputIdPrefix + this.formControlName + ' input');
      const selectionStart = inputElement.selectionStart;
      const selectionEnd = inputElement.selectionEnd;
      const endOfInput = value.length === selectionStart;

      // Detect backspace -- key == 8 || key == 46
      if (ev.keyCode !== 8 && ev.keyCode !== 46 && endOfInput) {
        // Check next mask character
        const nextChar = this.mask.charAt(value.length);
        // console.log('handleKeyUp: keyCode: ' + ev.keyCode);
        // console.log(`handleKeyUp => checking: ${value} || ${maskChar} || ${nextChar}`);
        if (nextChar !== undefined && !this.isAlphabetic(nextChar) && !this.isNumeric(nextChar) && !this.isWildCard(nextChar)) {
          formControl.setValue(value + nextChar);
        }
      }
    }
  }

  isIgnoredKey(ev) {
    const ignoredKeyCodes = [
      9,    // Tab
      13,   // Enter
      16,   // Shift
      17,   // Ctrl
      18,   // Alt
      20,   // Caps Lock
      27,   // Escape
      33,   // Page Up
      34,   // Page Down
      35,   // End
      36,   // Home
      37,   // Left Arrow
      38,   // Up Arrow
      39,   // Right Arrow
      40,   // Down Arrow
      44,   // Print Screen
      45,   // Insert
      46,   // Delete
      144,  // Num lock
      145,  // Scroll lock
    ];
    return (
      // Check for CTRL/Cmd + V
      ((ev.ctrlKey || ev.metaKey) && ev.keyCode === 86) ||
      // Check for CTRL/Cmd + C
      ((ev.ctrlKey || ev.metaKey) && ev.keyCode === 67) ||
      // Check for CTRL/Cmd + Z
      ((ev.ctrlKey || ev.metaKey) && ev.keyCode === 90) ||
      (ev.ctrlKey) ||
      (ev.metaKey) ||
      // Check for ignored key codes
      ignoredKeyCodes.find(k => ev.keyCode === k) !== undefined
    );
  }

  handlePaste(ev: ClipboardEvent, inputIdPrefix) {
    // console.log('handlePaste => Pasting value', ev, ev.clipboardData.getData);
    if (this.mask) {
      const formControl = this.formGroup.controls[this.formControlName];
      const value = formControl.value as string;
      const inputElement: HTMLInputElement = document.querySelector('#' + inputIdPrefix + this.formControlName + ' input');
      const selectionStart = inputElement.selectionStart;
      const selectionEnd = inputElement.selectionEnd;
      const endOfInput = value.length === selectionStart;
      const clipboardText = ev.clipboardData.getData('text');
      const refactorValue =
        // Check for end of input
        (endOfInput) ?
          // Handle end of value paste
          (value + clipboardText)
          :
          // Handle paste insertion
          (value.slice(0, selectionStart) + clipboardText + value.slice(selectionStart));
      this.refactorEntry(refactorValue, clipboardText.length, inputElement);
      ev.preventDefault();
    }
  }

  refactorEntry(value, cursorOffset, inputElement) {
    let newValue = '';
    // Define cursor position
    const cursorPos = (inputElement) ? inputElement.selectionEnd + cursorOffset : 0;
    if (this.mask && value) {
      let cleanedValue = '';
      // Strip any special characters
      for (const char of value) {
        cleanedValue += (this.isAlphabetic(char) || this.isNumeric(char)) ? char : '';
      }
      let valCharPos = 0;
      let lookAhead = true;
      for (const maskChar of this.mask) {
        const valChar = cleanedValue.charAt(valCharPos);
        // console.log(`checking valChar: ${valChar} of ${cleanedValue}`);
        if (valChar) {
          if (this.isNumeric(maskChar) || this.isAlphabetic(maskChar) || this.isWildCard(maskChar)) {
            // Check for character
            const isValidChar = this.checkMaskCharacter(maskChar, valChar);
            // console.log(`refactorEntry: validMaskedChar: ${char} === ${valChar} (${valCharPos}) || ${isValidChar}`);
            newValue += (isValidChar) ? valChar : '';
            valCharPos += 1;
          } else {
            // Enter non-alpha-numeric
            newValue += maskChar;
          }
        } else {
          // Look ahead to next character and populate special character in mask
          if (lookAhead) {
            lookAhead = false;
            if (!this.isNumeric(maskChar) && !this.isAlphabetic(maskChar) && !this.isWildCard(maskChar)) {
              newValue += maskChar;
            }
          }
        }
      }
    } else {
      newValue = value;
    }

    // Set control value
    const formControl = this.formGroup.controls[this.formControlName];
    formControl.setValue(newValue ? newValue.substring(0, this.mask.length) : '');

    // Set cursor position
    if (inputElement) {
      inputElement.setSelectionRange(cursorPos, cursorPos);
    }
  }

  checkMaskCharacter(maskChar, valChar): boolean {
    let validChar = true;
    if (maskChar !== undefined && maskChar) {
      if (this.isNumeric(maskChar)) {
        if (!this.isNumeric(valChar)) {
          // console.log('Numeric mask violated by: ' + valChar);
          validChar = false;
        }
      } else if (this.isAlphabetic(maskChar)) {
        if (!this.isAlphabetic(valChar) && maskChar !== valChar) {
          // console.log('Alpha mask violated by: ' + valChar);
          validChar = false;
        }
        // } else if (
        //   (this.isNumeric(maskChar) || this.isAlphabetic(maskChar)) &&
        //   !this.isNumeric(valChar) &&
        //   !this.isAlphabetic(valChar) &&
        //   maskChar !== valChar
        // ) {
        //   console.log('Non-alpha-numeric mask violated but ')
        //   validChar = false;
      } else if (this.isWildCard(maskChar) && !this.isAlphabetic(valChar) && !this.isNumeric(valChar)) {
        validChar = false;
      } else {
        if ((this.isNumeric(maskChar) || this.isAlphabetic(maskChar)) && maskChar !== valChar) {
          // console.log('Non-alpha-numeric mask violated by: ' + valChar);
          validChar = false;
        }
      }
    } else {
      validChar = false;
    }
    return validChar;
  }

  isNumeric(k) {
    // return !isNaN(k);
    return new RegExp('^[0-9]*$').test(k);
  }

  isAlphabetic(k) {
    return new RegExp('^[a-zA-Z]*$').test(k);
  }

  isWildCard(k) {
    return k === '*';
  }

  blurInput(ev) {
    const value = this.formGroup.controls[ev].value;
    // console.log('Blur value', value);
    this.blurEvent.emit(value);
  }


}
