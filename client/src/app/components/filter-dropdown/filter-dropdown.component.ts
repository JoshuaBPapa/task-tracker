import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { Params } from 'src/types/params/params';
import cloneDeep from 'lodash.clonedeep';
import { FilterDropdownConfig } from 'src/types/filter-dropdown-config/filter-dropdown-config';

interface ActiveFilters {
  [filterKey: string]: string[] | number[];
}

@Component({
  selector: 'app-filter-dropdown',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './filter-dropdown.component.html',
  styleUrls: ['./filter-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterDropdownComponent implements OnInit {
  @Input() config: FilterDropdownConfig[];
  @Output() filter = new EventEmitter<Params>();
  checkedFilters: ActiveFilters;
  activeFilters: ActiveFilters;

  ngOnInit(): void {
    this.buildFilters();
  }

  buildFilters(): void {
    const checkedFilters: ActiveFilters = {};
    this.config.forEach((filter) => (checkedFilters[filter.filterKey] = []));
    this.checkedFilters = checkedFilters;
    this.activeFilters = cloneDeep(checkedFilters);
  }

  handleOpen(): void {
    // reset checked checkboxes to current active filters on open
    this.checkedFilters = cloneDeep(this.activeFilters);
  }

  onApply(): void {
    this.activeFilters = cloneDeep(this.checkedFilters);
    this.emitFilter();
  }

  onClear(): void {
    // rebuild all filters again so all checkboxes are not checked
    this.buildFilters();
    this.emitFilter();
  }

  emitFilter(): void {
    const filterParams: { [filter: string]: string } = {};
    for (const filter in this.activeFilters) {
      if (this.activeFilters.hasOwnProperty(filter)) {
        filterParams[filter] = this.activeFilters[filter].join(',');
      }
    }
    this.filter.emit({ ...filterParams });
  }
}
