import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalDataWrapperComponent } from '../modal-data-wrapper/modal-data-wrapper.component';
import { ModalFooterButtonsComponent } from '../modal-footer-buttons/modal-footer-buttons.component';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [SharedModule, ModalDataWrapperComponent, ModalFooterButtonsComponent],
  templateUrl: './delete-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteModalComponent {
  @Input() label = 'item';
  @Output() confirmDelete = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  handleConfirm(): void {
    this.confirmDelete.emit();
  }

  handleCancel(): void {
    this.closeModal.emit();
  }
}
