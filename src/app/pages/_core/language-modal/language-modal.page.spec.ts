import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageModalPage } from './language-modal.page';

describe('LanguageModalPage', () => {
  let component: LanguageModalPage;
  let fixture: ComponentFixture<LanguageModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
