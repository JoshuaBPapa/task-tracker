import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteModalComponent } from 'src/app/components/modals/delete-modal/delete-modal.component';
import { ProjectFormModalComponent } from 'src/app/components/modals/project-form-modal/project-form-modal.component';
import { CountCardComponent } from 'src/app/components/statistics/count-card/count-card.component';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { ModalDataService } from 'src/app/services/modal-data.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectForm } from 'src/types/forms/project-form';
import { Project } from 'src/types/responses/project';

@Component({
  selector: 'app-project-details-container',
  standalone: true,
  imports: [SharedModule, CountCardComponent, ProjectFormModalComponent, DeleteModalComponent],
  templateUrl: './project-details-container.component.html',
  styleUrls: ['./project-details-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailsContainerComponent implements OnInit {
  project: Project;
  isEditProjectModalVisible = false;
  isDeleteProjectModalVisible = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectsService: ProjectsService,
    private router: Router,
    private formValidationService: FormValidationService,
    private modalDataService: ModalDataService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ project }) => {
      this.project = project;
    });
  }

  onOpenEditProjectModal(): void {
    this.isEditProjectModalVisible = true;
  }

  handleEditProjectModalClose(): void {
    this.isEditProjectModalVisible = false;
  }

  handleEditProjectModalSubmit(form: FormGroup<ProjectForm>): void {
    if (!this.formValidationService.checkIsFormValid(form)) return;
    const formValue = form.getRawValue();

    this.modalDataService
      .sendRequest(
        this.projectsService.putProject(formValue, this.project.id),
        'Project Created',
        form
      )
      .subscribe(() => {
        this.handleEditProjectModalClose();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigateByUrl(`/projects/${this.project.id}`);
        });
      });
  }

  openDeleteProjectModal(): void {
    this.isDeleteProjectModalVisible = true;
  }

  handleDeleteProjectModalClose(): void {
    this.isDeleteProjectModalVisible = false;
  }

  handleDeleteProjectModalConfirm(): void {
    this.modalDataService
      .sendRequest(this.projectsService.deleteProject(this.project.id), 'Project Deleted')
      .subscribe(() => {
        this.handleDeleteProjectModalClose();
        this.router.navigateByUrl('/projects');
      });
  }
}
