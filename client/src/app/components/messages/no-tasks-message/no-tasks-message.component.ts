import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-no-tasks-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './no-tasks-message.component.html',
  styleUrls: ['./no-tasks-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoTasksMessageComponent {}
