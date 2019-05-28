import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopSidebarComponent } from './workshop-sidebar.component';

describe('WorkshopSidebarComponent', () => {
  let component: WorkshopSidebarComponent;
  let fixture: ComponentFixture<WorkshopSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
