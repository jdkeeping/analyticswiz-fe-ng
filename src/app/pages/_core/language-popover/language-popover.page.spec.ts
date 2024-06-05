import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguagePopoverPage } from './language-popover.page';

describe('LanguagePopoverPage', () => {
  let component: LanguagePopoverPage;
  let fixture: ComponentFixture<LanguagePopoverPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagePopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
