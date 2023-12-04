import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-count-card',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './count-card.component.html',
  styleUrls: ['./count-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountCardComponent {
  @Input() bgColour = '#1096e3';
  @Input() icon = 'pi pi-info-circle';
  @Input() count = 0;
  @Input() label = '';
}
