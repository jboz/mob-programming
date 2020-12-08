import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ThemePickerComponent } from './theme-picker.component';
import { ThemeStorage } from './theme-storage.service';

@NgModule({
  declarations: [ThemePickerComponent],
  imports: [CommonModule, MatDialogModule, MatIconModule, MatMenuModule, MatButtonModule],
  exports: [ThemePickerComponent],
  providers: [ThemeStorage]
})
export class ThemePickerModule {}
