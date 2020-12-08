import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { ThemePickerModule } from '../theme-picker/theme-picker.module';
import { ConnectDialogComponent } from './components/connect-dialog/connect-dialog.component';
import { CreateDialogComponent } from './components/create-dialog/create-dialog.component';
import { DisconnectDialogComponent } from './components/disconnect-dialog/disconnect-dialog.component';
import { MobComponent } from './components/mob.component';
import { MobersComponent } from './components/mobers/mobers.component';
import { TimerComponent } from './components/timer/timer.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([{ path: '', component: MobComponent }]),

    ReactiveFormsModule,

    FlexLayoutModule,

    ThemePickerModule,

    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatRadioModule
  ],
  exports: [RouterModule],
  declarations: [MobComponent, TimerComponent, MobersComponent, ConnectDialogComponent, DisconnectDialogComponent, CreateDialogComponent],
  providers: []
})
export class MobModule {}
