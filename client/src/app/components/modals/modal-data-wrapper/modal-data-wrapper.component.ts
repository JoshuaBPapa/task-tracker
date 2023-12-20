import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { LoadingSpinnerComponent } from '../../loading-spinner/loading-spinner.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalDataService } from 'src/app/services/modal-data.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-modal-data-wrapper',
  standalone: true,
  imports: [SharedModule, LoadingSpinnerComponent],
  templateUrl: './modal-data-wrapper.component.html',
  styleUrls: ['./modal-data-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalDataWrapperComponent implements OnInit {
  @Input() header = '';
  isLoading: BehaviorSubject<boolean>;

  constructor(private modalDataService: ModalDataService) {}

  ngOnInit(): void {
    this.isLoading = this.modalDataService.isLoading;
  }
}
