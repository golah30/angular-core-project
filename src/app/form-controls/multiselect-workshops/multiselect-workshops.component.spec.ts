import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiselectWorkshopsComponent } from './multiselect-workshops.component';

describe('MultiselectWorkshopsComponent', () => {
  let component: MultiselectWorkshopsComponent;
  let fixture: ComponentFixture<MultiselectWorkshopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiselectWorkshopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiselectWorkshopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
