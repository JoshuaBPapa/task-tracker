import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchInputComponent } from '../../inputs/search-input/search-input.component';
import { Params } from 'src/types/params/params';
import { LoadingSpinnerComponent } from '../../loading-spinner/loading-spinner.component';
import { OverlayPanel } from 'primeng/overlaypanel';
import { TextTruncateDirective } from 'src/app/shared/directives/text-truncate.directive';

@Component({
  selector: 'app-selector-data-filter',
  standalone: true,
  imports: [SharedModule, SearchInputComponent, LoadingSpinnerComponent, TextTruncateDirective],
  templateUrl: './selector-data-filter.component.html',
  styleUrls: ['./selector-data-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorDataFilterComponent {
  @Input() isLoading: boolean;
  @Input() options: unknown[];
  @Input() placeholder = '';
  @Input() optionTemplate: TemplateRef<any>;
  @Input() isInvalid = false;
  @Input() nullable = false;
  @Output() select = new EventEmitter<any>();
  @Output() filter = new EventEmitter<Params>();
  @Output() clearSelected = new EventEmitter<void>();
  @ViewChild('selector') selector: OverlayPanel;

  handleSearchInput(search: Params): void {
    this.filter.emit(search);
  }

  onSelected(value: any): void {
    this.selector.hide();
    this.select.emit(value);
  }

  onClearSelected(): void {
    this.selector.hide();
    this.clearSelected.emit();
  }
}
