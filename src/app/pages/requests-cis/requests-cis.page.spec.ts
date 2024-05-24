import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestsCisPage } from './requests-cis.page';

describe('RequestsCisPage', () => {
  let component: RequestsCisPage;
  let fixture: ComponentFixture<RequestsCisPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsCisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
