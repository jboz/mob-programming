import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor() {
    Notification.requestPermission();
  }

  notify(nextMober: string) {
    this.showDeviceNotification(nextMober);
    // this.playSound(sound);
  }

  private playSound(sound: string) {
    const audio = new Audio(`../assets/sounds/${sound}`);
    audio.load();
    audio.play();
  }

  private showDeviceNotification(nextMober: string) {
    if (Notification.permission === 'granted') {
      // tslint:disable-next-line: no-unused-expression
      new Notification(`Time is up`, {
        body: `Next mober ${nextMober ? `'${nextMober}' ` : ''}to play!`,
        icon: 'assets/icons/icon-128x128.png',
        dir: 'auto',
        vibrate: [100, 50, 100],
        timestamp: 3000
      });
    }
  }
}
