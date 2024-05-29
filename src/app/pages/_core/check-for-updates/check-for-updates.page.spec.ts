import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckForUpdatesPage } from './check-for-updates.page';

describe('CheckForUpdatesPage', () => {
  let component: CheckForUpdatesPage;
  let fixture: ComponentFixture<CheckForUpdatesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckForUpdatesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
