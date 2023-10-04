import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from './primeng/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [CommonModule, PrimengModule, ReactiveFormsModule],
  exports: [CommonModule, PrimengModule, ReactiveFormsModule],
})
export class SharedModule {}
