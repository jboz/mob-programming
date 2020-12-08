import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { SettingsState } from './settings/settings.store';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private store: Store) {
    Notification.requestPermission();
  }

  notify(nextMober: string) {
    this.showDeviceNotification(nextMober);
    this.store.selectOnce(SettingsState.sound).subscribe(sound => this.playSound(sound.fileName));
  }

  private playSound(sound: string) {
    const audio = new Audio(`../assets/sounds/${sound}`);
    audio.load();
    audio.play();
  }

  private showDeviceNotification(nextMober: string) {
    if (Notification.permission === 'granted') {
      this.getServiceWorker().then(registration => {
        if (registration) {
          registration.showNotification(`Time is up`, {
            body: `Next mober ${nextMober ? `'${nextMober}' ` : ''}to play!`,
            icon: 'assets/icons/icon-128x128.png',
            dir: 'auto',
            vibrate: [100, 50, 100],
            timestamp: 3000
          });
        }
      });
    }
  }

  private getServiceWorker() {
    return navigator.serviceWorker.getRegistration('/ngsw-worker.js');
  }

  public requestPermission() {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        navigator.serviceWorker.register('/ngsw-worker.js');
      }
    });
  }
}
