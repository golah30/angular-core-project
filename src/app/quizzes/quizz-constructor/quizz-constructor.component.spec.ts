import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzConstructorComponent } from './quizz-constructor.component';

describe('QuizzConstructorComponent', () => {
  let component: QuizzConstructorComponent;
  let fixture: ComponentFixture<QuizzConstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzConstructorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzConstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
