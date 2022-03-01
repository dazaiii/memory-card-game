import { Component, Input, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';

const time = timer(0, 1000);

@Component({
  selector: 'app-time-counter',
  templateUrl: './time-counter.component.html',
  styleUrls: ['./time-counter.component.scss'],
})
export class TimeCounterComponent {
  @Input()
  startTimer: Date;

  @Input()
  isTimeStopped: boolean;

  constructor() {}

  public clock: any = 0;

  timer: Date;

  subscription: Subscription;

  ngOnChanges() {
    if (this.isTimeStopped === true) {
      this.stopTimer();
    } else {
      this.subscription = time.subscribe(() => {
        this.countTime();
      });
    }
  }

  countTime() {
    let actualDate = new Date(Date.now());
    this.timer = new Date(actualDate.getTime() - this.startTimer.getTime());
  }

  stopTimer() {
    this.subscription.unsubscribe();
    console.log('zatrzymano czas');
  }
}
