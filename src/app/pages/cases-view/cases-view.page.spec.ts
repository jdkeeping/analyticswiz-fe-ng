import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CasesViewPage } from './cases-view.page';

describe('CasesViewPage', () => {
  let component: CasesViewPage;
  let fixture: ComponentFixture<CasesViewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CasesViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
