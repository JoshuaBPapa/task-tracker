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
  @Input() firstName = '';
  @Input() lastName = '';
  @Input() jobTitle = '';
  @Input() bgColour = '#7239EA';
  @Input() showText = false;
  @Input() responsiveText = false;
}
