import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HelpForgotPwdPage } from './help-forgot-pwd.page';

describe('HelpForgotPwdPage', () => {
  let component: HelpForgotPwdPage;
  let fixture: ComponentFixture<HelpForgotPwdPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpForgotPwdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
