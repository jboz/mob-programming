import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { filter, take, tap } from 'rxjs/operators';
import { NotificationService } from './notification.service';
import { ThemeStorage } from './theme-picker/theme-storage.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
  constructor(
    private swUpdate: SwUpdate,
    private location: Location,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private themeStorage: ThemeStorage
  ) {}

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(message => {
        if (confirm('A new version is available. Would you like to it ?')) {
          this.location.go(this.location.path());
        }
      });
    }
    this.notificationService.requestPermission();
    this.route.queryParams
      .pipe(
        filter(params => !!params.theme),
        take(1),
        tap(params => this.themeStorage.storeTheme(params.theme))
      )
      .subscribe();
  }
}
