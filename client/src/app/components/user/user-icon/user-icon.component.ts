import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-user-icon',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './user-icon.component.html',
  styleUrls: ['./user-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserIconComponent {
  @Input() name = '';
  @Input() jobTitle = '';
  @Input() pictureColour = '#7239EA';
  @Input() showText = false;
}
