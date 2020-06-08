import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AudioPreviewComponent } from './audio-preview/audio-preview.component';
import { SettingsComponent } from './settings.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: SettingsComponent }]),
    FlexLayoutModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatRadioModule,
    MatProgressSpinnerModule
  ],
  exports: [RouterModule],
  declarations: [SettingsComponent, AudioPreviewComponent],
  providers: []
})
export class SettingsModule {}
