import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SelectorDataFilterComponent } from '../selector-data-filter/selector-data-filter.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { Page } from 'src/types/page';
import { Project } from 'src/types/responses/project';
import { ParamsService } from 'src/app/services/params.service';
import { UnsubscribeService } from 'src/app/services/unsubscribe.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { Params } from '@angular/router';
import { FormControl } from '@angular/forms';
import { TextTruncateDirective } from 'src/app/shared/directives/text-truncate.directive';

@Component({
  selector: 'app-project-selector',
  standalone: true,
  imports: [SharedModule, SelectorDataFilterComponent, TextTruncateDirective],
  providers: [ParamsService, UnsubscribeService, ProjectsService],
  templateUrl: './project-selector.component.html',
  styleUrls: ['./project-selector.component.scss'],
})
export class ProjectSelectorComponent implements OnInit, OnDestroy {
  @Input() control: FormControl<number | null>;
  @Input() selectedProjectName: string;
  isLoading: BehaviorSubject<boolean>;
  options$: Observable<Page<Project>>;

  constructor(
    private paramsService: ParamsService,
    private unsubscribeService: UnsubscribeService,
    private projectsService: ProjectsService
  ) {}

  ngOnInit(): void {
    this.options$ = this.projectsService.projectsData$;
    this.subscribeToParams();
  }

  subscribeToParams(): void {
    this.isLoading = this.paramsService.isLoading;
    const paramsSub = this.paramsService
      .makeRequestOnParamsChange((params: Params) => this.projectsService.getProjects(params))
      .subscribe();
    this.unsubscribeService.addSubscription(paramsSub);
  }

  handleFilter(search: Params): void {
    this.paramsService.setNewParamsValue(search);
  }

  handleSelect(project: Project): void {
    this.control.setValue(project.id);
    this.selectedProjectName = project.name;
  }

  ngOnDestroy(): void {
    this.unsubscribeService.unsubscribeAll();
  }
}
