import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFormModalComponent } from './task-form-modal.component';
import { MessageService } from 'primeng/api';
import { provideHttpClient } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

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
