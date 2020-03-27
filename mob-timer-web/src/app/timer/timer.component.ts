import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { interval, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  counter: moment.Duration = moment.duration(20, 'seconds');

  subscription: Subscription;

  ngOnInit(): void {}

  start() {
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

  get started(): boolean {
    return !!this.subscription;
  }

  reset() {
    this.pause();
    this.counter = moment.duration(20, 'seconds');
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

  pause() {
    this.subscription.unsubscribe();
    this.subscription = null;
  }
}
