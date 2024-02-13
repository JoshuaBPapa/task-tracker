import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailsContainerComponent } from './task-details-container.component';

xdescribe('TaskDetailsContainerComponent', () => {
  let component: TaskDetailsContainerComponent;
  let fixture: ComponentFixture<TaskDetailsContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TaskDetailsContainerComponent],
    });
    fixture = TestBed.createComponent(TaskDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
