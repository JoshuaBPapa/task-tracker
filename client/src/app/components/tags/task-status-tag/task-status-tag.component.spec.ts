import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskStatusTagComponent } from './task-status-tag.component';

describe('TaskStatusTagComponent', () => {
  let component: TaskStatusTagComponent;
  let fixture: ComponentFixture<TaskStatusTagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TaskStatusTagComponent],
    });
    fixture = TestBed.createComponent(TaskStatusTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
