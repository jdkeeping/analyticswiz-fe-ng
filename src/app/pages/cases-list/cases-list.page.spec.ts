import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasesListPage } from './cases-list.page';

describe('CasesListPage', () => {
  let component: CasesListPage;
  let fixture: ComponentFixture<CasesListPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(CasesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
