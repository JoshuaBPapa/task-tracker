import { Component } from '@angular/core';
import { TableCellLinkDirective } from './table-cell-link.directive';

@Component({
  imports: [TableCellLinkDirective],
  standalone: true,
  template: '<td appTableCellLink>Directive Test Component</td>',
})
export class TableCellLinkTestComponent {}
