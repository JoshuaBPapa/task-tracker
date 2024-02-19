import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormModalComponent } from './user-form-modal.component';
import { MessageService } from 'primeng/api';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthLevelPipe } from 'src/app/shared/pipes/auth-level.pipe';

const mockUser = {
  id: 1,
  firstName: `John`,
  lastName: 'Doe',
  username: 'johndoe',
  authLevel: 1,
  jobTitle: 'Tester',
  pictureColour: 'red',
  assignedTasks: 0,
};

describe('UserFormModalComponent', () => {
  let component: UserFormModalComponent;
  let fixture: ComponentFixture<UserFormModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserFormModalComponent, NoopAnimationsModule],
      providers: [MessageService, AuthLevelPipe],
    });
    fixture = TestBed.createComponent(UserFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should call setModal and buildAuthLevelOptions', () => {
    spyOn(component, 'setModal');
    spyOn(component, 'buildAuthLevelOptions');
    component.ngOnInit();
    expect(component.setModal).toHaveBeenCalled();
    expect(component.buildAuthLevelOptions).toHaveBeenCalled();
  });

  it('setModal should set the correct header and form depending if formEditData is present', () => {
    component.setModal();
    expect(component.header).toBe('Create User');
    expect(component.form.contains('firstName')).toBeTrue();
    expect(component.form.contains('lastName')).toBeTrue();
    expect(component.form.contains('authLevel')).toBeTrue();
    expect(component.form.contains('jobTitle')).toBeTrue();
    expect(component.form.contains('username')).toBeTrue();
    expect(component.form.contains('password')).toBeTrue();
    expect(component.form.contains('confirmPassword')).toBeTrue();

    component.formEditData = mockUser;
    component.setModal();
    expect(component.header).toBe('Edit User');
    expect(component.form.contains('firstName')).toBeTrue();
    expect(component.form.contains('lastName')).toBeTrue();
    expect(component.form.contains('authLevel')).toBeTrue();
    expect(component.form.contains('jobTitle')).toBeTrue();
    expect(component.form.contains('username')).toBeFalse();
    expect(component.form.contains('password')).toBeFalse();
    expect(component.form.contains('confirmPassword')).toBeFalse();
  });

  it('buildAuthLevelOptions should call authLevelPipe.transform three times with the correct values', () => {
    const authLevelPipeSpy = spyOn(AuthLevelPipe.prototype, 'transform');
    component.buildAuthLevelOptions();
    expect(authLevelPipeSpy).toHaveBeenCalledWith(1);
    expect(authLevelPipeSpy).toHaveBeenCalledWith(2);
    expect(authLevelPipeSpy).toHaveBeenCalledWith(3);
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
