import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalDataWrapperComponent } from '../modal-data-wrapper/modal-data-wrapper.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LabelledInputComponent } from '../../inputs/labelled-input/labelled-input.component';
import { ModalFooterButtonsComponent } from '../modal-footer-buttons/modal-footer-buttons.component';
import { ProjectSelectorComponent } from '../../selectors/project-selector/project-selector.component';
import { UserSelectorComponent } from '../../selectors/user-selector/user-selector.component';
import { LabelValidationWrapperComponent } from '../../inputs/label-validation-wrapper/label-validation-wrapper.component';
import { TaskStatusDropdownComponent } from '../../inputs/task-status-dropdown/task-status-dropdown.component';
import { TaskPriorityDropdownComponent } from '../../inputs/task-priority-dropdown/task-priority-dropdown.component';
import { TaskForm } from 'src/types/forms/task-form';

@Component({
  selector: 'app-task-form-modal',
  standalone: true,
  imports: [
    SharedModule,
    ModalDataWrapperComponent,
    LabelledInputComponent,
    ModalFooterButtonsComponent,
    ProjectSelectorComponent,
    UserSelectorComponent,
    LabelValidationWrapperComponent,
    TaskStatusDropdownComponent,
    TaskPriorityDropdownComponent,
  ],
  templateUrl: './task-form-modal.component.html',
  styleUrls: ['./task-form-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormModalComponent {
  @Output() submitForm = new EventEmitter<FormGroup<TaskForm>>();
  @Output() closeModal = new EventEmitter<void>();
  header = 'Create Task';
  form = new FormGroup<TaskForm>({
    title: new FormControl<string>('', {
      validators: [Validators.required, Validators.maxLength(300)],
      nonNullable: true,
    }),
    projectId: new FormControl<number | null>(null, {
      validators: [Validators.required],
    }),
    assignedUserId: new FormControl<number | null>(null),
    priority: new FormControl<number>(1, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    status: new FormControl<number>(1, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    description: new FormControl<string>('', {
      validators: [Validators.maxLength(2000)],
      nonNullable: true,
    }),
  });

  onSubmit(): void {
    this.submitForm.emit(this.form);
  }

  handleCancel(): void {
    this.closeModal.emit();
  }
}
