import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { TaskStatusPipe } from 'src/app/shared/pipes/task-status.pipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormControl } from '@angular/forms';

interface StatusOption {
  value: number;
  status: string;
}

@Component({
  selector: 'app-task-status-dropdown',
  standalone: true,
  imports: [SharedModule],
  providers: [TaskStatusPipe],
  templateUrl: './task-status-dropdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskStatusDropdownComponent implements OnInit {
  @Input() control: FormControl<number>;
  options: StatusOption[];

  constructor(private taskStatusPipe: TaskStatusPipe) {}

  ngOnInit(): void {
    const options: StatusOption[] = [];
    for (let i = 1; i <= 4; i++) {
      options.push({ value: i, status: this.taskStatusPipe.transform(i, 'text') });
    }
    this.options = options;
  }
}
