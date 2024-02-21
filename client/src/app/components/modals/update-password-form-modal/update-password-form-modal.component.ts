import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalDataWrapperComponent } from '../modal-data-wrapper/modal-data-wrapper.component';
import { ModalFooterButtonsComponent } from '../modal-footer-buttons/modal-footer-buttons.component';
import { LabelledInputComponent } from '../../inputs/labelled-input/labelled-input.component';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { passwordsMatch } from 'src/app/shared/validators/passwords-match.validator';
import { UpdatePasswordForm } from 'src/types/forms/update-password-form';

@Component({
  selector: 'app-update-password-form-modal',
  standalone: true,
  imports: [
    SharedModule,
    ModalDataWrapperComponent,
    ModalFooterButtonsComponent,
    LabelledInputComponent,
  ],
  templateUrl: './update-password-form-modal.component.html',
  styleUrls: ['./update-password-form-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdatePasswordFormModalComponent {
  @Output() submitForm = new EventEmitter<FormGroup<UpdatePasswordForm>>();
  @Output() closeModal = new EventEmitter<void>();
  form = this.nfb.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, passwordsMatch()]],
  });

  constructor(private nfb: NonNullableFormBuilder) {}

  onSubmit(): void {
    this.submitForm.emit(this.form);
  }

  handleCancel(): void {
    this.closeModal.emit();
  }
}
