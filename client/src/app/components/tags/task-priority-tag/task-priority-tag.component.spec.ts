import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPriorityTagComponent } from './task-priority-tag.component';

describe('TaskPriorityTagComponent', () => {
  let component: TaskPriorityTagComponent;
  let fixture: ComponentFixture<TaskPriorityTagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TaskPriorityTagComponent],
    });
    fixture = TestBed.createComponent(TaskPriorityTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should set the correct properties depending on the value input', () => {
    component.value = 1;
    component.ngOnInit();
    expect(component.severity).toEqual('success');

    component.value = 2;
    component.ngOnInit();
    expect(component.severity).toEqual('info');

    component.value = 3;
    component.ngOnInit();
    expect(component.severity).toEqual('warning');

    component.value = 4;
    component.ngOnInit();
    expect(component.severity).toEqual('danger');
  });
});
