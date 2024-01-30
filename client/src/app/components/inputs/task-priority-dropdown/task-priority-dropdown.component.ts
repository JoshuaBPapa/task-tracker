import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TaskPriorityPipe } from 'src/app/shared/pipes/task-priority.pipe';
import { SharedModule } from 'src/app/shared/shared.module';

interface PriorityOption {
  value: number;
  priority: string;
}

@Component({
  selector: 'app-task-priority-dropdown',
  standalone: true,
  imports: [SharedModule],
  providers: [TaskPriorityPipe],
  templateUrl: './task-priority-dropdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskPriorityDropdownComponent implements OnInit {
  @Input() control: FormControl<number>;
  options: PriorityOption[];

  constructor(private taskPriorityPipe: TaskPriorityPipe) {}

  ngOnInit(): void {
    const options: PriorityOption[] = [];
    for (let i = 1; i <= 4; i++) {
      options.push({ value: i, priority: this.taskPriorityPipe.transform(i, 'text') });
    }
    this.options = options;
  }
}
