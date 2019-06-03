import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvglogoComponent } from './svglogo.component';

describe('SvglogoComponent', () => {
  let component: SvglogoComponent;
  let fixture: ComponentFixture<SvglogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvglogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvglogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
