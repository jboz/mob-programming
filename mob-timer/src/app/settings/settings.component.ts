import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { SettingsState } from './settings.store';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  selection: string;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.selectOnce(SettingsState.sound).subscribe(sound => (this.selection = sound));
  }

  selectSound(file: string) {}
}
