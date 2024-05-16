import { Injectable } from '@angular/core';
import { State } from 'src/app/models/_core/state';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  // App-specific values

  // APIs
  login = 'login';
  serviceDeskPhone = '14137943000';

  // Data collections
  validatorMessaging = {
    required: ' is required',
    maxLength: ' cannot be more than [arg] character(s) long',
    minLength: ' must be at least [arg] character(s) long',
    minLengthTime: ' must be formatted as HH:MM',
    maxDateToday: ' cannot be greater than today\'s date',
    namePattern: ' can only have letters, hyphens (-), and spaces',
    datePattern: ' must be formatted as MM/DD/YYYY',
    phonePattern: ' must be formatted as (XXX) XXX-XXXX',
    ssnPattern: ' must be formatted as XXX-XX-XXXX',
    mrnPattern: ' can only have numbers and letters',
    accountPattern: ' can only have numbers',
    facilityCodePattern: ' can only contain numbers',
    facilityMrnPattern: ' can only contain numbers and letters',
    euidPattern: ' can only contain numbers and letters',
    localIdPattern: ' can only contain numbers and letters',
  };
  validatorParams = {
    nameMaxLength: 20,
    namePattern: new RegExp(/^[a-zA-Z\-\s]*$/),
    birthdateMaxLength: 8,
    phoneMaxLength: 20,
    timeMinLength: 8,
    ssnMinLength: 9,
    ssnMaxLength: 9,
    ssnPattern: new RegExp(/^[0-9\s,./_'-]{1,}$/),
    localIdMaxLength: 20,
    localIdPattern: new RegExp(/^[0-9\s,./_'-]{1,}$/),
    accountMaxLength: 20,
    accountPattern: new RegExp(/^[0-9\s,./_'-]{1,}$/),
    facilityCodeMaxLength: 20,
    facilityCodePattern: new RegExp('', ''),
    facilityMrnMaxLength: 20,
    facilityMrnPattern: new RegExp(/^[a-zA-Z0-9\s,./_'-]{1,}$/),
    euidMaxLength: 20,
    euidPattern: new RegExp(/^[0-9\s,./_'-]{1,}$/),
    inactiveDateMaxLength: 8,
    militaryTimePattern: new RegExp(/^(?:[01][0-9]|2[0-3]):[0-5][0-9]$/)
  };
  states: State[] = [
    {
      stateCode: 'AL',
      stateName: 'Alabama'
    },
    {
      stateCode: 'AK',
      stateName: 'Alaska'
    },
    {
      stateCode: 'AZ',
      stateName: 'Arizona'
    },
    {
      stateCode: 'AR',
      stateName: 'Arkansas'
    },
    {
      stateCode: 'CA',
      stateName: 'California'
    },
    {
      stateCode: 'CO',
      stateName: 'Colorado'
    },
    {
      stateCode: 'CT',
      stateName: 'Connecticut'
    },
    {
      stateCode: 'DE',
      stateName: 'Delaware'
    },
    {
      stateCode: 'FL',
      stateName: 'Florida'
    },
    {
      stateCode: 'GA',
      stateName: 'Georgia'
    },
    {
      stateCode: 'HI',
      stateName: 'Hawaii'
    },
    {
      stateCode: 'ID',
      stateName: 'Idaho'
    },
    {
      stateCode: 'IL',
      stateName: 'Illinois'
    },
    {
      stateCode: 'IN',
      stateName: 'Indiana'
    },
    {
      stateCode: 'IA',
      stateName: 'Iowa'
    },
    {
      stateCode: 'KS',
      stateName: 'Kansas'
    },
    {
      stateCode: 'KY',
      stateName: 'Kentucky'
    },
    {
      stateCode: 'LA',
      stateName: 'Louisiana'
    },
    {
      stateCode: 'ME',
      stateName: 'Maine'
    },
    {
      stateCode: 'MD',
      stateName: 'Maryland'
    },
    {
      stateCode: 'MA',
      stateName: 'Massachusetts'
    },
    {
      stateCode: 'MI',
      stateName: 'Michigan'
    },
    {
      stateCode: 'MN',
      stateName: 'Minnesota'
    },
    {
      stateCode: 'MS',
      stateName: 'Mississippi'
    },
    {
      stateCode: 'MO',
      stateName: 'Missouri'
    },
    {
      stateCode: 'MT',
      stateName: 'Montana'
    },
    {
      stateCode: 'NE',
      stateName: 'Nebraska'
    },
    {
      stateCode: 'NV',
      stateName: 'Nevada'
    },
    {
      stateCode: 'NH',
      stateName: 'New Hampshire'
    },
    {
      stateCode: 'NJ',
      stateName: 'New Jersey'
    },
    {
      stateCode: 'NM',
      stateName: 'New Mexico'
    },
    {
      stateCode: 'NY',
      stateName: 'New York'
    },
    {
      stateCode: 'NC',
      stateName: 'North Carolina'
    },
    {
      stateCode: 'ND',
      stateName: 'North Dakota'
    },
    {
      stateCode: 'OH',
      stateName: 'Ohio'
    },
    {
      stateCode: 'OK',
      stateName: 'Oklahoma'
    },
    {
      stateCode: 'OR',
      stateName: 'Oregon'
    },
    {
      stateCode: 'PA',
      stateName: 'Pennsylvania'
    },
    {
      stateCode: 'RI',
      stateName: 'Rhode Island'
    },
    {
      stateCode: 'SC',
      stateName: 'South Carolina'
    },
    {
      stateCode: 'SD',
      stateName: 'South Dakota'
    },
    {
      stateCode: 'TN',
      stateName: 'Tennessee'
    },
    {
      stateCode: 'TX',
      stateName: 'Texas'
    },
    {
      stateCode: 'UT',
      stateName: 'Utah'
    },
    {
      stateCode: 'VT',
      stateName: 'Vermont'
    },
    {
      stateCode: 'VA',
      stateName: 'Virginia'
    },
    {
      stateCode: 'WA',
      stateName: 'Washington'
    },
    {
      stateCode: 'WV',
      stateName: 'West Virginia'
    },
    {
      stateCode: 'WI',
      stateName: 'Wisconsin'
    },
    {
      stateCode: 'WY',
      stateName: 'Wyoming'
    },
  ];
  constructor() {
   }

   setValidatorMessage(fieldName, validatorMessage, arg: any = '') {
    return fieldName + validatorMessage.replace('[arg]', arg);
   }
}
