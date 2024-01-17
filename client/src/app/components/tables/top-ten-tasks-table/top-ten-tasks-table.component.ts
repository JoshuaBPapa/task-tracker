import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { StatisticsTask } from 'src/types/statistics/statistics-task';
import { TaskPriorityTagComponent } from '../../tags/task-priority-tag/task-priority-tag.component';
import { TaskStatusTagComponent } from '../../tags/task-status-tag/task-status-tag.component';
import { TextTruncateDirective } from 'src/app/shared/directives/text-truncate.directive';

@Component({
  selector: 'app-top-ten-tasks-table',
  standalone: true,
  imports: [SharedModule, TaskPriorityTagComponent, TaskStatusTagComponent, TextTruncateDirective],
  templateUrl: './top-ten-tasks-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopTenTasksTableComponent {
  @Input() tasks: StatisticsTask[] = [];
}
