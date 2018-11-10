import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpChartsComponent } from './cp-charts.component';

describe('CpChartsComponent', () => {
  let component: CpChartsComponent;
  let fixture: ComponentFixture<CpChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
