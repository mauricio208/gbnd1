import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowButtonsComponent } from './flow-buttons.component';

describe('FlowButtonsComponent', () => {
  let component: FlowButtonsComponent;
  let fixture: ComponentFixture<FlowButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
