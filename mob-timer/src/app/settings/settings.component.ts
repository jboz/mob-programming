import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SelectSound, SettingsState } from './settings.store';
import { Sound } from './sound.model';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  @Select(SettingsState.sounds)
  sounds$: Observable<Sound[]>;

  selection: Sound;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.selectOnce(SettingsState.sound).subscribe(sound => (this.selection = sound));
  }

  selectSound(sound: Sound) {
    this.store.dispatch(new SelectSound(sound)).subscribe(() => (this.selection = sound));
  }
}
