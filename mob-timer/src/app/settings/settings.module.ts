import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { AudioPreviewComponent } from './audio-preview/audio-preview.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: SettingsComponent }]),
    FlexLayoutModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatRadioModule
  ],
  exports: [RouterModule],
  declarations: [SettingsComponent, AudioPreviewComponent],
  providers: []
})
export class SettingsModule {}
