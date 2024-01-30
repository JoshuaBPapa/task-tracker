import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPriorityDropdownComponent } from './task-priority-dropdown.component';
import { FormControl } from '@angular/forms';

describe('TaskPriorityDropdownComponent', () => {
  let component: TaskPriorityDropdownComponent;
  let fixture: ComponentFixture<TaskPriorityDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TaskPriorityDropdownComponent],
    });
    fixture = TestBed.createComponent(TaskPriorityDropdownComponent);
    component = fixture.componentInstance;
    component.control = new FormControl(1, { nonNullable: true });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should set the value of options', () => {
    const expectedOptions = [
      {
        value: 1,
        priority: 'Low',
      },
      {
        value: 2,
        priority: 'Medium',
      },
      {
        value: 3,
        priority: 'High',
      },
      {
        value: 4,
        priority: 'Severe',
      },
    ];
    component.ngOnInit();
    expect(component.options).toEqual(expectedOptions);
  });
});
