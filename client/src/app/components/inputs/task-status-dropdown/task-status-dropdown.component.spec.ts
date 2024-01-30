import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskStatusDropdownComponent } from './task-status-dropdown.component';
import { FormControl } from '@angular/forms';

describe('TaskStatusDropdownComponent', () => {
  let component: TaskStatusDropdownComponent;
  let fixture: ComponentFixture<TaskStatusDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TaskStatusDropdownComponent],
    });
    fixture = TestBed.createComponent(TaskStatusDropdownComponent);
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
        status: 'Not Started',
      },
      {
        value: 2,
        status: 'In Progress',
      },
      {
        value: 3,
        status: 'In Review',
      },
      {
        value: 4,
        status: 'Complete',
      },
    ];
    component.ngOnInit();
    expect(component.options).toEqual(expectedOptions);
  });
});
