import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { Comment } from 'src/types/responses/comment';
import { UserIconComponent } from '../../user/user-icon/user-icon.component';
import { NamePipe } from 'src/app/shared/pipes/name.pipe';
import { TextTruncateDirective } from 'src/app/shared/directives/text-truncate.directive';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [SharedModule, UserIconComponent, NamePipe, TextTruncateDirective],
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentListComponent {
  @Input() comments: Comment[];
}
