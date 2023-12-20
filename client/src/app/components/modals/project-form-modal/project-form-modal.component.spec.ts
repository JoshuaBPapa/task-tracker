import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFormModalComponent } from './project-form-modal.component';
import { MessageService } from 'primeng/api';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ProjectFormModalComponent', () => {
  let component: ProjectFormModalComponent;
  let fixture: ComponentFixture<ProjectFormModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProjectFormModalComponent, NoopAnimationsModule],
      providers: [MessageService],
    });

    fixture = TestBed.createComponent(ProjectFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should call setFormMode', () => {
    spyOn(component, 'setFormMode');
    component.ngOnInit();
    expect(component.setFormMode).toHaveBeenCalled();
  });

  it('setFormMode should set the header correctly', () => {
    component.setFormMode();
    expect(component.header).toBe('Create Project');

    component.formEditData = { name: 'Mock Project Name' };
    component.setFormMode();
    expect(component.header).toBe('Edit Project');
  });

  it('onSubmit should call submitForm.emit', () => {
    spyOn(component.submitForm, 'emit');
    component.onSubmit();
    expect(component.submitForm.emit).toHaveBeenCalled();
  });

  it('handleCancel should call closeModal.emit', () => {
    spyOn(component.closeModal, 'emit');
    component.handleCancel();
    expect(component.closeModal.emit).toHaveBeenCalled();
  });
});
