import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestsLisPage } from './requests-lis.page';

describe('RequestsLisPage', () => {
  let component: RequestsLisPage;
  let fixture: ComponentFixture<RequestsLisPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsLisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
