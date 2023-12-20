import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LabelledInputComponent } from '../../inputs/labelled-input/labelled-input.component';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ModalDataWrapperComponent } from '../modal-data-wrapper/modal-data-wrapper.component';
import { ModalFooterButtonsComponent } from '../modal-footer-buttons/modal-footer-buttons.component';
import { ProjectForm } from 'src/types/forms/project-form';

@Component({
  selector: 'app-project-form-modal',
  standalone: true,
  imports: [
    SharedModule,
    LabelledInputComponent,
    ModalDataWrapperComponent,
    ModalFooterButtonsComponent,
  ],
  templateUrl: './project-form-modal.component.html',
  styleUrls: ['./project-form-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectFormModalComponent implements OnInit {
  @Input() formEditData: { name: string } | undefined;
  @Output() submitForm = new EventEmitter<FormGroup<ProjectForm>>();
  @Output() closeModal = new EventEmitter<void>();
  header: string;
  form = this.nfb.group({
    name: ['', [Validators.required, Validators.maxLength(200)]],
  });

  constructor(private nfb: NonNullableFormBuilder) {}

  ngOnInit(): void {
    this.setFormMode();
  }

  setFormMode(): void {
    if (!this.formEditData) {
      this.header = 'Create Project';
    } else {
      this.form.controls.name.setValue(this.formEditData.name);
      this.header = 'Edit Project';
    }
  }

  onSubmit(): void {
    this.submitForm.emit(this.form);
  }

  handleCancel(): void {
    this.closeModal.emit();
  }
}
