import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { TableLazyLoadEvent } from 'primeng/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { Page } from 'src/types/page';
import { Params } from 'src/types/params/params';

type SortColumn = string | undefined;

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent implements AfterContentInit {
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @Input() page: Page<unknown> | null;
  @Input() isLoading: boolean;
  @Input() isError: boolean;
  @Input() headers: { key: string; label: string }[] = [];
  @Output() paramsChange = new EventEmitter<Params>();
  bodyTemplate: TemplateRef<any> | null;

  ngAfterContentInit() {
    this.templates.forEach((item) => {
      if (item.getType() === 'body') {
        this.bodyTemplate = item.template;
      }
    });
  }

  onChangeParam(event: TableLazyLoadEvent): void {
    const sortColumn = event.sortField as SortColumn;
    const sortOrder = event.sortOrder as number;
    const pageRange = event.first as number;
    this.paramsChange.emit(this.buildTableParams(sortColumn, sortOrder, pageRange));
  }

  buildTableParams(sortColumn: SortColumn, order: number, pageRange: number): Params {
    const tableParams: Params = {};
    tableParams.page = (pageRange as number) / 10 + 1;
    if (sortColumn) {
      let orderBy = sortColumn;
      if (order === 1) orderBy += '-asc';
      if (order === -1) orderBy += '-desc';
      tableParams.orderBy = orderBy;
    }

    return tableParams;
  }
}
