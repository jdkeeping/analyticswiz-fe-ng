import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageTranslatorPage } from './language-translator.page';

describe('LanguageTranslatorPage', () => {
  let component: LanguageTranslatorPage;
  let fixture: ComponentFixture<LanguageTranslatorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageTranslatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
