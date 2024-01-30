import { NgModule } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';

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
    CheckboxModule,
    AccordionModule,
    DropdownModule,
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
    CheckboxModule,
    AccordionModule,
    DropdownModule,
  ],
})
export class PrimengModule {}
