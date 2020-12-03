import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
  constructor(private swUpdate: SwUpdate, private location: Location, private notificationService: NotificationService) {}

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(message => {
        if (confirm('A new version is available. Would you like to it ?')) {
          this.location.go(this.location.path());
        }
      });
    }
    this.notificationService.requestPermission();
  }
}
