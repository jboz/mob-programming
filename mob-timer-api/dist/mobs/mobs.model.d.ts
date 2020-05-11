export declare class MobRound {
    timerStartTimestamp?: string;
    started: boolean;
    timerPauseTimestamp?: string;
    currentMober?: string;
}
export declare class Mob {
    id: string;
    duration: number;
    round?: MobRound;
    mobers: string[];
}
