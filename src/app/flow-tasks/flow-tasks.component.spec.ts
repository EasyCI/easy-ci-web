import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowTasksComponent } from './flow-tasks.component';

describe('FlowTasksComponent', () => {
  let component: FlowTasksComponent;
  let fixture: ComponentFixture<FlowTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
