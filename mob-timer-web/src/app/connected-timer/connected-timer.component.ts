import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import * as moment from 'moment';
import { interval } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { RoundStatus } from '../mob.model';
import { MobState, TimeUp } from '../mob.store';
import { TimerPause, TimerStart } from './../mob.store';

@Component({
  selector: 'app-connected-timer',
  templateUrl: './connected-timer.component.html',
  styleUrls: ['./connected-timer.component.scss']
})
export class ConnectedTimerComponent implements OnInit {
  counter: moment.Duration;
  started = false;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(MobState.mob)
      .pipe(
        tap(mob => {
          if (mob.round && mob.round.status === RoundStatus.STARTED) {
            const elapsedSeconds = moment().diff(moment(mob.round.playTimestamp), 'seconds');
            this.counter = moment.duration(mob.round.instant).add(-elapsedSeconds, 'seconds');
            this.started = true;
          } else if (mob.round && mob.round.status === RoundStatus.PAUSE) {
            this.started = false;
            this.counter = moment.duration(mob.round.instant);
          } else {
            this.counter = moment.duration(mob.duration, 'minutes');
          }
        })
      )
      .subscribe();

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

  timersUp() {
    this.reset();
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
