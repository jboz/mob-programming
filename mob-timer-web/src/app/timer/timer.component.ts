import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import * as moment from 'moment';
import { interval, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SetDefaultTimer, TimerState, TimeUp } from '../app.store';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  counter: moment.Duration = moment.duration(0);

  subscription: Subscription = null;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.loadDefaultTimer();
  }

  private loadDefaultTimer() {
    this.store.selectOnce(TimerState.defaultTimer).subscribe(timer => (this.counter = timer));
  }

  start() {
    Notification.requestPermission();

    if (this.subscription === null) {
      this.store.dispatch(new SetDefaultTimer(this.counter));
    }
    this.subscription = interval(1000)
      .pipe(
        map(_ => this.counter.add(-1, 'seconds')),
        tap(_ => {
          this.checkMinDate();
          if (this.counter.asSeconds() === 0) {
            this.timersUp();
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

  private checkMinDate() {
    if (this.counter.asSeconds() < 0) {
      this.counter = moment.duration(0);
    }
  }

  incrementSeconds() {
    this.counter.add(10, 'seconds');
  }

  decrementSeconds() {
    this.counter.add(-10, 'seconds');
    this.checkMinDate();
  }

  incrementMinutes() {
    this.counter.add(1, 'minutes');
  }

  decrementMinutes() {
    this.counter.add(-1, 'minutes');
    this.checkMinDate();
  }

  timersUp() {
    this.reset();
    this.store.dispatch(new TimeUp());
  }
}
