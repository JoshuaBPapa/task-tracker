import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from './primeng/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [CommonModule, PrimengModule, ReactiveFormsModule, RouterModule],
  exports: [CommonModule, PrimengModule, ReactiveFormsModule, RouterModule],
})
export class SharedModule {}
