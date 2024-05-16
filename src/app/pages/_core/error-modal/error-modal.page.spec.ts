import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorModalPage } from './error-modal.page';

describe('ErrorModalPage', () => {
  let component: ErrorModalPage;
  let fixture: ComponentFixture<ErrorModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ErrorModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
