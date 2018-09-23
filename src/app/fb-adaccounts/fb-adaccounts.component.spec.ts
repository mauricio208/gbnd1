import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FbAdaccountsComponent } from './fb-adaccounts.component';

describe('FbAdaccountsComponent', () => {
  let component: FbAdaccountsComponent;
  let fixture: ComponentFixture<FbAdaccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FbAdaccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FbAdaccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
