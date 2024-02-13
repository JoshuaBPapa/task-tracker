import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserIconComponent } from '../user-icon/user-icon.component';
import { AssignedUser } from 'src/types/assigned-user';
import { NamePipe } from 'src/app/shared/pipes/name.pipe';

@Component({
  selector: 'app-assigned-user',
  standalone: true,
  imports: [CommonModule, UserIconComponent, NamePipe],
  templateUrl: './assigned-user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignedUserComponent {
  @Input() assignedUser: AssignedUser | null;
}
