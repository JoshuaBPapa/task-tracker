import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoadingSpinnerComponent } from '../../loading-spinner/loading-spinner.component';
import { NotificationCardComponent } from '../notification-card/notification-card.component';

@Component({
  selector: 'app-loading-card',
  standalone: true,
  imports: [SharedModule, LoadingSpinnerComponent, NotificationCardComponent],
  templateUrl: './loading-card.component.html',
  styleUrls: ['./loading-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingCardComponent {
  @Input() text = '';
}
