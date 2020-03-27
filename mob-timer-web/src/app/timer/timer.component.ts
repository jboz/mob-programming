import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import * as moment from 'moment';
import { interval, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SetDefaultTimer, TimerState } from '../app.store';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  counter: moment.Duration = moment.duration(0);

  subscription: Subscription;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.loadDefaultTimer();
  }

  private loadDefaultTimer() {
    this.store.selectOnce(TimerState.defaultTimer).subscribe(timer => (this.counter = timer));
  }

  start() {
    if (!this.started) {
      this.store.dispatch(new SetDefaultTimer(this.counter));
    }
    this.subscription = interval(1000)
      .pipe(
        map(_ => this.counter.add(-1, 'seconds')),
        tap(_ => {
          if (this.counter.asSeconds() === 0) {
            this.pause();
          }
        })
      )
      .subscribe();
  }

  pause() {
    this.subscription.unsubscribe();
  }

  reset() {
    if (this.subscription) {
      this.pause();
    }
    this.subscription = null;
    this.loadDefaultTimer();
  }

  get started(): boolean {
    return !!this.subscription && !this.subscription.closed;
  }

  incrementSeconds() {
    this.counter.add(10, 'seconds');
  }

  decrementSeconds() {
    this.counter.add(-10, 'seconds');
  }

  incrementMinutes() {
    this.counter.add(1, 'minutes');
  }

  decrementMinutes() {
    this.counter.add(-1, 'minutes');
  }
}
