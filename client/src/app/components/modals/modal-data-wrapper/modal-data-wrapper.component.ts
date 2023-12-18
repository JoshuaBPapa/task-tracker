import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LoadingSpinnerComponent } from '../../loading-spinner/loading-spinner.component';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-modal-data-wrapper',
  standalone: true,
  imports: [SharedModule, LoadingSpinnerComponent],
  templateUrl: './modal-data-wrapper.component.html',
  styleUrls: ['./modal-data-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalDataWrapperComponent {
  @Input() header = '';
  @Input() visible = false;
  @Input() isLoading = false;
}
