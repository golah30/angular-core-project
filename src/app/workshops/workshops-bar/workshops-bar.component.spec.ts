import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopsBarComponent } from './workshops-bar.component';

describe('WorkshopsBarComponent', () => {
  let component: WorkshopsBarComponent;
  let fixture: ComponentFixture<WorkshopsBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopsBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
