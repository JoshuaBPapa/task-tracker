import { NgModule } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [],
  imports: [InputTextModule, ButtonModule, TagModule, TableModule, CardModule],
  exports: [InputTextModule, ButtonModule, TagModule, TableModule, CardModule],
})
export class PrimengModule {}
