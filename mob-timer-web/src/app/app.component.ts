import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { ClearState } from './app.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private store: Store) {}

  clearState() {
    this.store.dispatch(new ClearState());
  }
}
