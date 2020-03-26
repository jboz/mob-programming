import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { interval, Observable } from "rxjs";
import { map, take } from "rxjs/operators";

@Component({
  selector: "app-timer",
  templateUrl: "./timer.component.html",
  styleUrls: ["./timer.component.scss"]
})
export class TimerComponent implements OnInit {
  counter$: Observable<moment.Duration>;

  duration: moment.Duration = moment.duration(20, "seconds");

  ngOnInit(): void {}

  public start() {
    this.counter$ = interval(1000).pipe(
      take(this.duration.asSeconds()),
      map(_ => this.duration.add(-1, "seconds"))
    );
  }

  public stop() {
    this.counter$ = null;
  }
}
