import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopsCreateComponent } from './workshops-create.component';

describe('WorkshopsCreateComponent', () => {
  let component: WorkshopsCreateComponent;
  let fixture: ComponentFixture<WorkshopsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
