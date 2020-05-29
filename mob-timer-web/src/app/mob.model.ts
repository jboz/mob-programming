export enum RoundStatus {
  STARTED,
  PAUSE
}

export interface MobRound {
  status: RoundStatus;
  instant?: string;
  playTimestamp?: string;
  currentMober?: string;
}

export interface Mob {
  name: string;
  duration: number;
  round?: MobRound;
  mobers: string[];
}
