import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TaskStatusPipe } from 'src/app/shared/pipes/task-status.pipe';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-task-status-tag',
  standalone: true,
  imports: [SharedModule, TaskStatusPipe],
  templateUrl: './task-status-tag.component.html',
  styleUrls: ['./task-status-tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskStatusTagComponent {
  @Input() value: 1 | 2 | 3 | 4 = 1;
}
