import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzSidebarComponent } from './quizz-sidebar.component';

describe('QuizzSidebarComponent', () => {
  let component: QuizzSidebarComponent;
  let fixture: ComponentFixture<QuizzSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
