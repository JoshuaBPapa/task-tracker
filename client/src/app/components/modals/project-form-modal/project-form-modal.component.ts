import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LabelledInputComponent } from '../../inputs/labelled-input/labelled-input.component';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ModalDataWrapperComponent } from '../modal-data-wrapper/modal-data-wrapper.component';
import { ModalFooterButtonsComponent } from '../modal-footer-buttons/modal-footer-buttons.component';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { ModalDataService } from 'src/app/services/modal-data.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { CreatedResponse } from 'src/types/responses/created-response';

@Component({
  selector: 'app-project-form-modal',
  standalone: true,
  imports: [
    SharedModule,
    LabelledInputComponent,
    ModalDataWrapperComponent,
    ModalFooterButtonsComponent,
  ],
  providers: [ModalDataService],
  templateUrl: './project-form-modal.component.html',
  styleUrls: ['./project-form-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectFormModalComponent {
  @Output() created = new EventEmitter<number>();
  visible = false;
  form = this.nfb.group({
    name: ['', Validators.required],
  });

  constructor(
    private nfb: NonNullableFormBuilder,
    private formValidationService: FormValidationService,
    public modalDataService: ModalDataService,
    private projectsService: ProjectsService
  ) {}

  onSubmit(): void {
    if (!this.formValidationService.checkIsFormValid(this.form)) return;
    const formValue = this.form.getRawValue();
    this.modalDataService
      .sendRequest(this.projectsService.postProject(formValue), 'Project Created', this.form)
      .subscribe((res: CreatedResponse) => {
        this.handleClose();
        this.created.emit(res.id);
      });
  }

  onOpenModal(): void {
    this.visible = true;
  }

  handleClose(): void {
    this.visible = false;
    this.form.reset();
  }
}
