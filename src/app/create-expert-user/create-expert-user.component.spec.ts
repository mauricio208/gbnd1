import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExpertUserComponent } from './create-expert-user.component';

describe('CreateExpertUserComponent', () => {
  let component: CreateExpertUserComponent;
  let fixture: ComponentFixture<CreateExpertUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateExpertUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateExpertUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
