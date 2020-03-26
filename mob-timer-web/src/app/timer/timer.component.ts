import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { interval, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  counter: moment.Duration = moment.duration(0);

  subscription: Subscription;

  ngOnInit(): void {}

  start() {
    this.subscription = interval(1000)
      .pipe(
        take(this.counter.asSeconds()),
        map(_ => this.counter.add(-1, 'seconds'))
      )
      .subscribe();
  }

  get started(): boolean {
    return !!this.subscription;
  }

  stop() {
    this.subscription.unsubscribe();
    this.subscription = null;
    this.counter = moment.duration(20, 'seconds');
  }
}
