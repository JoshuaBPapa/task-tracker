import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFormModalComponent } from './task-form-modal.component';
import { MessageService } from 'primeng/api';
import { provideHttpClient } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TaskDetailed } from 'src/types/responses/task';

const mockEditData: TaskDetailed = {
  id: 1,
  title: 'test',
  status: 1,
  priority: 4,
  dateTimeCreated: '2023-08-02T15:01:00.000Z',
  dateTimeUpdated: '2023-11-30T10:07:37.000Z',
  assignedUser: {
    id: 1,
    jobTitle: 'Developer',
    lastName: 'Doe',
    firstName: 'John',
    pictureColour: 'red',
  },
  description: '',
  project: {
    id: 1,
    name: 'Mock project',
  },
};

describe('TaskFormModalComponent', () => {
  let component: TaskFormModalComponent;
  let fixture: ComponentFixture<TaskFormModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TaskFormModalComponent, NoopAnimationsModule],
      providers: [MessageService, provideHttpClient()],
    });
    fixture = TestBed.createComponent(TaskFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should call setFormMode', () => {
    spyOn(component, 'setEditModalValues');
    component.ngOnInit();
    expect(component.setEditModalValues).toHaveBeenCalled();
  });

  it('setEditModalValues should set the header correctly', () => {
    component.setEditModalValues();
    expect(component.header).toBe('Create Task');

    component.formEditData = mockEditData;
    component.setEditModalValues();
    expect(component.header).toBe('Edit Task');
  });

  it('setEditModalValues should set the value of the form, assignedProjectName, and assignedUserName if formEditData has a value', () => {
    component.formEditData = mockEditData;
    component.setEditModalValues();
    const formValue = component.form.getRawValue();
    expect(formValue.title).toEqual(mockEditData.title);
    expect(formValue.description).toEqual(mockEditData.description);
    expect(formValue.status).toEqual(mockEditData.status);
    expect(formValue.priority).toEqual(mockEditData.priority);
    expect(formValue.projectId).toEqual(mockEditData.project.id);
    expect(formValue.assignedUserId).toEqual(mockEditData.assignedUser?.id as number);
    expect(component.assignedProjectName).toEqual(mockEditData.project.name);
    expect(component.assignedUserName).toEqual(
      mockEditData.assignedUser?.firstName + ' ' + mockEditData.assignedUser?.lastName
    );
  });

  it('onSubmit should call submitForm.emit with the form', () => {
    spyOn(component.submitForm, 'emit');
    component.onSubmit();
    expect(component.submitForm.emit).toHaveBeenCalledWith(component.form);
  });

  it('handleCancel should call closeModal.emit', () => {
    spyOn(component.closeModal, 'emit');
    component.handleCancel();
    expect(component.closeModal.emit).toHaveBeenCalled();
  });
});
