import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { TaskPriorityPipe } from 'src/app/shared/pipes/task-priority.pipe';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-task-priority-tag',
  standalone: true,
  imports: [SharedModule, TaskPriorityPipe],
  templateUrl: './task-priority-tag.component.html',
  styleUrls: ['./task-priority-tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskPriorityTagComponent implements OnInit {
  @Input() value: 1 | 2 | 3 | 4 = 1;
  severity: string;

  ngOnInit(): void {
    switch (this.value) {
      case 1:
        this.severity = 'success';
        break;
      case 2:
        this.severity = 'info';
        break;
      case 3:
        this.severity = 'warning';
        break;
      case 4:
        this.severity = 'danger';
        break;
      default:
        this.severity = 'info';
        break;
    }
  }
}
