import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import * as moment from 'moment';
import { interval, Observable, Subject } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Connect, TimerState, TimeUp } from '../app.store';
import { MobsService } from '../mobs.service';

@Component({
  selector: 'app-connected-timer',
  templateUrl: './connected-timer.component.html',
  styleUrls: ['./connected-timer.component.scss']
})
export class ConnectedTimerComponent implements OnInit {
  counter: moment.Duration;
  started = false;

  @Select(TimerState.started)
  started$: Observable<boolean>;

  private startTimestamp$ = new Subject<moment.Moment>();

  mobs$ = this.mobService.mobs$();

  constructor(private store: Store, private mobService: MobsService) {}

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

    this.store.select(TimerState.duration).subscribe(duration => (this.counter = duration));

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

  connect(name: string) {
    this.store.dispatch(new Connect(name));
  }

  timersUp() {
    this.reset();
    this.store.dispatch(new TimeUp());
  }

  start() {
    // this.started$.next(true);
  }

  pause() {
    // this.started$.next(false);
  }

  resume() {
    // this.started$.next(true);
  }

  reset() {
    // this.duration$.next(moment.duration(15, 'minutes'));
    // this.started$.next(false);
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
