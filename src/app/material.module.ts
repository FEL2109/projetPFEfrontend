
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  exports: [
    MatBadgeModule,
    MatRippleModule,
    MatTableModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatDividerModule
  ]
})
export class MaterialModule {}
