import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcpCollapseComponent } from './acp-collapse.component';

describe('AcpCollapseComponent', () => {
  let component: AcpCollapseComponent;
  let fixture: ComponentFixture<AcpCollapseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcpCollapseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcpCollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
