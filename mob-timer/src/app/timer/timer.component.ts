import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import * as moment from 'moment';
import { interval } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { RoundStatus } from '../mob.model';
import { MobState, TimerChange, TimerPause, TimerReset, TimerStart, TimeUp } from '../mob.store';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  counter: moment.Duration;
  started = false;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(MobState.mob)
      .pipe(
        tap(mob => {
          if (mob.round && mob.round.status === RoundStatus.STARTED) {
            const elapsedSeconds = moment().diff(mob.round.playTimestamp, 'seconds');
            this.counter = mob.round.instant.clone().add(-elapsedSeconds, 'seconds');
            this.started = true;
          } else if (mob.round && mob.round.status === RoundStatus.PAUSE) {
            this.started = false;
            this.counter = mob.round.instant.clone();
          } else {
            this.started = false;
            this.counter = mob.duration;
          }
        })
      )
      .subscribe();

    interval(1000)
      .pipe(
        filter(() => this.started),
        tap(_ => this.counter.add(-1, 'seconds')),
        tap(_ => {
          if (this.counter.asSeconds() < 0) {
            this.counter = moment.duration(0);
            this.started = false;
            this.timersUp();
          }
        })
      )
      .subscribe();
  }

  timersUp() {
    this.store.dispatch(new TimeUp());
  }

  start() {
    this.store.dispatch(new TimerStart());
  }

  pause() {
    this.store.dispatch(new TimerPause(this.counter.clone()));
  }

  resume() {
    this.store.dispatch(new TimerStart());
  }

  reset() {
    this.store.dispatch(new TimerReset());
  }

  incrementSeconds() {
    this.store.dispatch(new TimerChange(10, 'seconds'));
  }

  decrementSeconds() {
    this.store.dispatch(new TimerChange(-10, 'seconds'));
  }

  incrementMinutes() {
    this.store.dispatch(new TimerChange(1, 'minutes'));
  }

  decrementMinutes() {
    this.store.dispatch(new TimerChange(-1, 'minutes'));
  }
}
