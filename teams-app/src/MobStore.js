import addMinutes from 'date-fns/addMinutes';
import addSeconds from 'date-fns/addSeconds';
import intervalToDuration from 'date-fns/intervalToDuration';
import { action, computed, makeObservable, observable } from 'mobx';

class MobStore {
  mob = {
    name: '',
    connected: false,
    mobers: [],
    duration: { minutes: 0, seconds: 2 }
  };

  round = {};

  interval = null;

  constructor() {
    makeObservable(this, {
      mob: observable,
      round: observable,
      instant: computed,
      started: computed,
      _updateInstant: action,
      changeDuration: action,
      start: action,
      pause: action,
      reset: action,
      nextMober: action
    });
  }

  get instant() {
    return this.round.instant || this.mob.duration;
  }

  get started() {
    return !!this.interval;
  }

  changeDuration(value, unit) {
    if (!this.started) {
      if (unit === 'minutes') {
        this.mob.duration = { minutes: this.mob.duration.minutes + value, seconds: this.mob.duration.seconds };
      } else if (unit === 'seconds') {
        this.mob.duration = { minutes: this.mob.duration.minutes, seconds: this.mob.duration.seconds + value };
      }
    } else {
      if (unit === 'minutes') {
        this.round.playTimestamp = addMinutes(this.round.playTimestamp, value);
      } else if (unit === 'seconds') {
        this.round.playTimestamp = addSeconds(this.round.playTimestamp, value);
      }
    }
  }

  start = () => {
    this.round.playTimestamp = new Date();

    this._updateInstant();
    this.interval = setInterval(() => this._updateInstant(), 1000);
  };

  _updateInstant() {
    const duration = intervalToDuration({
      start: this.round.playTimestamp,
      end: new Date()
    });

    this.round.instant = {
      minutes: Math.max(this.mob.duration.minutes - duration.minutes - 1, 0),
      seconds: Math.max(this.mob.duration.seconds - duration.seconds < 0 ? 59 : this.mob.duration.seconds - duration.seconds, 0)
    };

    if (this.round.instant.minutes <= 0 && this.round.instant.seconds <= 0) {
      this.nextMober();
    }
  }

  pause() {
    this.round.status = 'pause';
    clearInterval(this.interval);
  }

  reset() {
    this.pause();
    this.round = {};
  }

  nextMober() {
    this.reset();
    console.log(`next !`);

    // if (window.parent !== window.self) {
    // microsoftTeams.showNotification('next mober', 'fileDownloadComplete');
    // }

    Notification.requestPermission().then(permission => {
      navigator.serviceWorker.getRegistration('/service-worker.js').then(registration => {
        if (registration && registration.active) {
          registration.showNotification('next !', {
            tag: 'nextMober',
            data: { mober: 'TODO name of next mober' },
            body: 'new mober to play',
            vibrate: 200
          });
        }
      });
    });
  }
}

export default MobStore;
