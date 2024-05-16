import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BhBackgroundBlueComponent } from './bh-background-blue.component';

describe('BhBackgroundBlueComponent', () => {
  let component: BhBackgroundBlueComponent;
  let fixture: ComponentFixture<BhBackgroundBlueComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BhBackgroundBlueComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BhBackgroundBlueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
