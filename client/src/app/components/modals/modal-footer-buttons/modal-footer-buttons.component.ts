import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-modal-footer-buttons',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './modal-footer-buttons.component.html',
  styleUrls: ['./modal-footer-buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalFooterButtonsComponent {
  @Input() confirmLabel = 'Confirm';
  @Input() confirmClass = 'p-button';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
