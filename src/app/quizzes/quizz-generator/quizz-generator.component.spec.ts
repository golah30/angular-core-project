import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzGeneratorComponent } from './quizz-generator.component';

describe('QuizzGeneratorComponent', () => {
  let component: QuizzGeneratorComponent;
  let fixture: ComponentFixture<QuizzGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
