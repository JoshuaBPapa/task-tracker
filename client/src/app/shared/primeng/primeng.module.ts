import { NgModule } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@NgModule({
  declarations: [],
  imports: [InputTextModule, ButtonModule, TagModule],
  exports: [InputTextModule, ButtonModule, TagModule],
})
export class PrimengModule {}
