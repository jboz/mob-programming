export interface MobRound {
  timerStartTimestamp?: string;
  started: boolean;
  timerPauseTimestamp?: string;
  currentMober?: string;
}

export interface Mob {
  name: string;
  duration: number;
  round?: MobRound;
  mobers: string[];
}
