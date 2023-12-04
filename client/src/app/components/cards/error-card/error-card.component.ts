import { Component, Input } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NotificationCardComponent } from '../notification-card/notification-card.component';

@Component({
  selector: 'app-error-card',
  standalone: true,
  imports: [SharedModule, NotificationCardComponent],
  templateUrl: './error-card.component.html',
  styleUrls: ['./error-card.component.scss'],
})
export class ErrorCardComponent {
  @Input() text = 'Sorry, there was an error while making this request. Please try again later.';
}
