import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserIconComponent } from '../user-icon/user-icon.component';
import { AssignedUser } from 'src/types/assigned-user';
import { NamePipe } from 'src/app/shared/pipes/name.pipe';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-assigned-user',
  standalone: true,
  imports: [SharedModule, UserIconComponent, NamePipe],
  templateUrl: './assigned-user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignedUserComponent {
  @Input() assignedUser: AssignedUser | null;
}
