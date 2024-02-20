import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TextTruncateDirective } from 'src/app/shared/directives/text-truncate.directive';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-user-icon',
  standalone: true,
  imports: [SharedModule, TextTruncateDirective],
  templateUrl: './user-icon.component.html',
  styleUrls: ['./user-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserIconComponent {
  @Input() name = '';
  @Input() jobTitle = '';
  @Input() pictureColour = '#7239EA';
  @Input() showText = false;
  @Input() size: 'medium' | 'large' = 'medium';
}
