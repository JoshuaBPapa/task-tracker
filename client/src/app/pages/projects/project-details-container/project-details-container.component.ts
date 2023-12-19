import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountCardComponent } from 'src/app/components/statistics/count-card/count-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { Project } from 'src/types/responses/project';

@Component({
  selector: 'app-project-details-container',
  standalone: true,
  imports: [SharedModule, CountCardComponent],
  templateUrl: './project-details-container.component.html',
  styleUrls: ['./project-details-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailsContainerComponent implements OnInit {
  project: Project;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ project }) => {
      this.project = project;
    });
  }
}
