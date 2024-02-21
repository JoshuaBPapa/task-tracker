import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { isAlphanumeric } from 'src/app/shared/validators/isAlphanumeric.validator';
import { passwordsMatch } from 'src/app/shared/validators/passwords-match.validator';
import { CreateUserForm, EditUserForm } from 'src/types/forms/user-form';
import { User } from 'src/types/responses/user';
import { ModalDataWrapperComponent } from '../modal-data-wrapper/modal-data-wrapper.component';
import { ModalFooterButtonsComponent } from '../modal-footer-buttons/modal-footer-buttons.component';
import { LabelledInputComponent } from '../../inputs/labelled-input/labelled-input.component';
import { LabelValidationWrapperComponent } from '../../inputs/label-validation-wrapper/label-validation-wrapper.component';
import { AuthLevelPipe } from 'src/app/shared/pipes/auth-level.pipe';

@Component({
  selector: 'app-user-form-modal',
  standalone: true,
  imports: [
    SharedModule,
    ModalDataWrapperComponent,
    ModalFooterButtonsComponent,
    LabelledInputComponent,
    LabelValidationWrapperComponent,
  ],
  providers: [AuthLevelPipe],
  templateUrl: './user-form-modal.component.html',
  styleUrls: ['./user-form-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormModalComponent implements OnInit {
  @Input() formEditData: User | undefined;
  @Output() submitForm = new EventEmitter<FormGroup<CreateUserForm> | FormGroup<EditUserForm>>();
  @Output() closeModal = new EventEmitter<void>();
  header: string;
  authLevelOptions: { value: number; label: string }[];
  form: FormGroup<CreateUserForm> | FormGroup<EditUserForm>;

  constructor(private nfb: NonNullableFormBuilder, private authLevelPipe: AuthLevelPipe) {}

  ngOnInit(): void {
    this.setModal();
    this.buildAuthLevelOptions();
  }

  setModal(): void {
    this.form = this.nfb.group({
      firstName: ['', [Validators.required, Validators.maxLength(100)]],
      lastName: ['', [Validators.required, Validators.maxLength(100)]],
      jobTitle: ['', [Validators.required, Validators.maxLength(50)]],
      authLevel: [1, [Validators.required]],
    });

    if (!this.formEditData) {
      this.header = 'Create User';
      this.form = this.nfb.group({
        ...this.form.controls,
        username: ['', [Validators.required, isAlphanumeric(), Validators.maxLength(50)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, passwordsMatch()]],
      });
    } else {
      this.header = 'Edit User';
      this.form.patchValue(this.formEditData);
    }
  }

  buildAuthLevelOptions(): void {
    const authLevelOptions = [];
    for (let i = 1; i <= 3; i++) {
      authLevelOptions.push({ value: i, label: this.authLevelPipe.transform(i) });
    }
    this.authLevelOptions = authLevelOptions;
  }

  onSubmit(): void {
    this.submitForm.emit(this.form);
  }

  handleCancel(): void {
    this.closeModal.emit();
  }
}
