
export interface Language {
  name: string;
  native: string;
  code: LanguageCode;
  enabled: boolean;
  selected?: boolean;
  translatedLines?: string[];
};

export type LanguageCode =
  'en' | // English
  'fr' | // French
  'de' | // German
  'pt' | // Portuguese
  'ru' | // Russian
  'es' | // Spanish
  'tl' | // Taglog
  'uk' | // Ukranian
  'vi' // Vitenamese
;
