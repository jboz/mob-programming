import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Mob } from './mob.model';
import { MobsService } from './mob.service';
import { ClearState, Connect, Create, MobState } from './mob.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @Select(MobState.mob)
  mob$: Observable<Mob>;

  mobs$ = this.mobService.mobs$();

  constructor(private store: Store, private swUpdate: SwUpdate, private mobService: MobsService) {}

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

  connect(name: string) {
    this.store.dispatch(new Connect(name));
  }

  create(name: string) {
    this.store.dispatch(new Create(name));
  }
}
