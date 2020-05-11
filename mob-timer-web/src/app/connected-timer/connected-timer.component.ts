import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import * as moment from 'moment';
import { BehaviorSubject, interval, Subject } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { TimeUp } from '../app.store';

@Component({
  selector: 'app-connected-timer',
  templateUrl: './connected-timer.component.html',
  styleUrls: ['./connected-timer.component.scss']
})
export class ConnectedTimerComponent implements OnInit {
  counter: moment.Duration;
  started = false;

  private startTimestamp$ = new Subject<moment.Moment>();
  private started$ = new Subject<boolean>();
  private duration$ = new BehaviorSubject<moment.Duration>(moment.duration(12, 'minutes'));

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.startTimestamp$
      .pipe(
        map(start => moment().diff(start, 'seconds')),
        tap(data => console.log(`elapsedSeconds=${data}`)),
        tap(elapsedSeconds => {
          this.counter.add(elapsedSeconds * -1, 'seconds');
          this.started = true;
        })
      )
      .subscribe();

    this.duration$.subscribe(duration => (this.counter = duration));

    this.started$.subscribe(flag => (this.started = flag));

    interval(1000)
      .pipe(
        filter(() => this.started),
        tap(_ => this.counter.add(-1, 'seconds')),
        tap(_ => {
          this.checkMinDate();
          if (this.counter.asSeconds() === 0) {
            this.timersUp();
          }
        })
      )
      .subscribe();
  }

  setTimestamp(hours: number, minutes: number) {
    this.startTimestamp$.next(moment().set('hours', hours).set('minutes', minutes));
  }

  timersUp() {
    this.reset();
    this.store.dispatch(new TimeUp());
  }

  start() {
    this.started$.next(true);
  }

  pause() {
    this.started$.next(false);
  }

  resume() {
    this.started$.next(true);
  }

  reset() {
    this.duration$.next(moment.duration(15, 'minutes'));
    this.started$.next(false);
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
}
