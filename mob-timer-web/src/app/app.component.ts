import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Store } from '@ngxs/store';
import { ClearState } from './app.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store, private swUpdate: SwUpdate) {}

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('New version available. Load New Version?')) {
          window.location.reload();
        }
      });
    }
  }

  clearState() {
    this.store.dispatch(new ClearState());
  }
}
