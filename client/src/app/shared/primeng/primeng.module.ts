import { NgModule } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';

@NgModule({
  declarations: [],
  imports: [
    InputTextModule,
    ButtonModule,
    TagModule,
    TableModule,
    CardModule,
    PaginatorModule,
    DialogModule,
    DividerModule,
  ],
  exports: [
    InputTextModule,
    ButtonModule,
    TagModule,
    TableModule,
    CardModule,
    PaginatorModule,
    DialogModule,
    DividerModule,
  ],
})
export class PrimengModule {}
