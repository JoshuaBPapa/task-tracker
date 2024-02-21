import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePasswordFormModalComponent } from './update-password-form-modal.component';
import { MessageService } from 'primeng/api';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UpdatePasswordFormModalComponent', () => {
  let component: UpdatePasswordFormModalComponent;
  let fixture: ComponentFixture<UpdatePasswordFormModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UpdatePasswordFormModalComponent, NoopAnimationsModule],
      providers: [MessageService],
    });
    fixture = TestBed.createComponent(UpdatePasswordFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
