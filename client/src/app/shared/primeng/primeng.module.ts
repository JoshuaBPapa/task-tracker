import { NgModule } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [],
  imports: [InputTextModule, ButtonModule, TagModule, TableModule],
  exports: [InputTextModule, ButtonModule, TagModule, TableModule],
})
export class PrimengModule {}
