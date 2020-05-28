export enum RoundStatus {
  STARTED,
  PAUSE
}

export interface MobRound {
  status: RoundStatus;
  instant?: string;
  currentMober?: string;
}

export interface Mob {
  name: string;
  duration: number;
  round?: MobRound;
  mobers: string[];
}
