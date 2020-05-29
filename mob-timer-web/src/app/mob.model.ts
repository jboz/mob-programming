import { Duration, Moment } from 'moment';
export enum RoundStatus {
  STARTED,
  PAUSE
}

export interface MobRound {
  status: RoundStatus;
  instant?: Duration;
  playTimestamp?: Moment;
  currentMober?: string;
}

export interface Mob {
  name: string;
  duration: Duration;
  round?: MobRound;
  mobers: string[];
}
