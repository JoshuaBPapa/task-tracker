import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaginatorState } from 'primeng/paginator';
import { Page } from 'src/types/page';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './paginator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent {
  @Input() page: Page<unknown> | null;
  @Output() pageChange = new EventEmitter<{ page: number }>();

  handlePageChange(event: PaginatorState): void {
    const page = (event.page as number) + 1;
    this.pageChange.emit({ page });
  }
}
