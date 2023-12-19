import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFormModalComponent } from './project-form-modal.component';
import { ModalDataService } from 'src/app/services/modal-data.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

describe('ProjectFormModalComponent', () => {
  let component: ProjectFormModalComponent;
  let fixture: ComponentFixture<ProjectFormModalComponent>;
  const modalDataServiceSpy = jasmine.createSpyObj('ModalDataService', ['sendRequest']);
  const projectsServiceSpy = jasmine.createSpyObj('ProjectsService', ['postProject']);
  const formValidationServiceSpy = jasmine.createSpyObj('FormValidationService', [
    'checkIsFormValid',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProjectFormModalComponent],
      providers: [
        MessageService,
        { provide: FormValidationService, useValue: formValidationServiceSpy },
      ],
    });
    TestBed.overrideProvider(ProjectsService, { useValue: projectsServiceSpy });
    TestBed.overrideProvider(ModalDataService, { useValue: modalDataServiceSpy });

    fixture = TestBed.createComponent(ProjectFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.form.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onSubmit should call formValidationService.checkIsFormValid', () => {
    component.onSubmit();
    expect(formValidationServiceSpy.checkIsFormValid).toHaveBeenCalledWith(component.form);
  });

  it('onSubmit should call modalDataService.sendRequest if the form is valid', () => {
    formValidationServiceSpy.checkIsFormValid.and.returnValue(true);
    projectsServiceSpy.postProject.and.returnValue(of({ id: 1 }));
    modalDataServiceSpy.sendRequest.and.returnValue(of({ id: 1 }));
    component.form.controls.name.setValue('Mock Name');
    component.onSubmit();
    expect(modalDataServiceSpy.sendRequest).toHaveBeenCalledWith(
      projectsServiceSpy.postProject({ name: 'Mock Name' }),
      'Project Created',
      component.form
    );
  });

  it('onOpenModal should set visible to true', () => {
    expect(component.visible).toBeFalse();

    component.onOpenModal();
    expect(component.visible).toBeTrue();
  });

  it('handleClose should set visible to false and reset the form', () => {
    component.visible = true;
    component.form.controls.name.setValue('mock name');
    expect(component.visible).toBeTrue();
    expect(component.form.getRawValue()).toEqual({ name: 'mock name' });

    component.handleClose();
    expect(component.visible).toBeFalse();
    expect(component.form.getRawValue()).toEqual({ name: '' });
  });
});
