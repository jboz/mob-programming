export interface MobRound {
  timerStartTimestamp?: string;
  started: boolean;
  timerPauseTimestamp?: string;
  currentMober?: string;
}

export interface Mob {
  id: string;
  duration: number;
  round?: MobRound;
  mobers: string[];
}
