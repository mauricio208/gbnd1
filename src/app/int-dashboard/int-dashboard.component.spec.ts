import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntDashboardComponent } from './int-dashboard.component';

describe('IntDashboardComponent', () => {
  let component: IntDashboardComponent;
  let fixture: ComponentFixture<IntDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
