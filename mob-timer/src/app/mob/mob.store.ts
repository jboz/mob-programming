import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { produce } from 'immer';
import * as moment from 'moment';
import { Duration } from 'moment';
import { Subscription } from 'rxjs';
import { mergeMap, takeWhile, tap } from 'rxjs/operators';
import { Mob, MobRound, RoundStatus } from './mob.model';
import { MobsService } from './mob.service';
import { NotificationService } from './notification.service';

const DEFAULT: Mob = { name: '', mobers: [], duration: moment.duration(15, 'minutes') };

export interface MobStateModel {
  mob: Mob;
}

export class AddMober {
  static readonly type = '[Mob] AddMober]';
  constructor(public readonly mober: string) {}
}

export class RemoveMober {
  static readonly type = '[Mob] RemoveMober]';
  constructor(public readonly mober: string) {}
}

export class SelectMober {
  static readonly type = '[Mob] SelectMober]';
  constructor(public readonly mober: string) {}
}

export class SetDefaultTimer {
  static readonly type = '[Mob] SetDefaultTimer]';
  constructor(public readonly timer: moment.Duration) {}
}

export class TimeUp {
  static readonly type = '[Mob] TimeUp]';
}

export class SetNextMober {
  static readonly type = '[Mob] SetNextMober]';
}

export class Connect {
  static readonly type = '[Mob] Connect]';
  constructor(public readonly name?: any) {}
}

export class Create {
  static readonly type = '[Mob] Create]';
  constructor(public readonly name?: any) {}
}

export class TimerStart {
  static readonly type = '[Mob] TimerStart]';
}

export class TimerPause {
  static readonly type = '[Mob] TimerPause]';
  constructor(public readonly instant: Duration) {}
}

export class TimerChange {
  static readonly type = '[Mob] TimerChange]';
  constructor(public readonly value: number, public readonly unit: moment.unitOfTime.DurationConstructor) {}
}

export class TimerReset {
  static readonly type = '[Mob] TimerReset]';
}

export class TryToReConnect {
  static readonly type = '[Mob] AutoConnect]';
}

export class Disconnect {
  static readonly type = '[Mob] Disconnect]';
}

@State<MobStateModel>({
  name: 'mob',
  defaults: { mob: DEFAULT }
})
@Injectable()
export class MobState {
  private subscription: Subscription;

  @Selector()
  public static mob(state: MobStateModel) {
    return state.mob;
  }

  @Selector()
  public static mobers(state: MobStateModel) {
    return state.mob.mobers;
  }

  @Selector()
  public static selectedMober(state: MobStateModel) {
    return state.mob.round.currentMober;
  }

  constructor(private mobsService: MobsService, private notificationService: NotificationService) {}

  @Action(AddMober)
  public add(ctx: StateContext<MobStateModel>, { mober }: AddMober) {
    const state = produce(ctx.getState(), draft => {
      draft.mob.mobers.push(mober);
      this.autoSelection(draft.mob);
    });
    return this.saveOrPatch(ctx, state.mob);
  }

  @Action(RemoveMober)
  public remove(ctx: StateContext<MobStateModel>, { mober }: RemoveMober) {
    const state = produce(ctx.getState(), draft => {
      draft.mob.mobers = [...draft.mob.mobers.filter(name => name !== mober)];
      this.autoSelection(draft.mob);
    });
    return this.saveOrPatch(ctx, state.mob);
  }

  @Action(SelectMober)
  public select(ctx: StateContext<MobStateModel>, { mober }: SelectMober) {
    const state = produce(ctx.getState(), draft => {
      draft.mob.round = { ...draft.mob.round, currentMober: mober };
    });
    return this.saveOrPatch(ctx, state.mob);
  }

  private autoSelection(mob: Mob) {
    if (!mob.mobers || mob.mobers.length === 0) {
      delete mob.round;
    } else if (
      mob.mobers.length === 1 ||
      (mob.mobers.length > 1 && (!mob.round || !mob.round.currentMober || !mob.mobers.includes(mob.round.currentMober)))
    ) {
      mob.round = { ...mob.round, currentMober: mob.mobers[0] };
    }
  }

  @Action(SetDefaultTimer)
  public setDefaultTimer(ctx: StateContext<MobStateModel>, { timer }: SetDefaultTimer) {
    const state = produce(ctx.getState(), draft => {
      draft.mob.duration = timer.clone();
    });
    return this.saveOrPatch(ctx, state.mob);
  }

  @Action(TimeUp)
  public timeUp(ctx: StateContext<MobStateModel>) {
    const nextMober = this.getNextMober(ctx.getState().mob);
    this.notificationService.notify(nextMober);
    return ctx.dispatch(new TimerReset()).pipe(mergeMap(_ => ctx.dispatch(new SetNextMober())));
  }

  private getNextMober(mob: Mob) {
    if (mob.mobers.length > 0) {
      if (mob.round) {
        const actualMober = mob.round.currentMober;
        const actualIndex = mob.mobers.indexOf(actualMober);
        if (actualIndex >= 0 && actualIndex < mob.mobers.length - 1) {
          return mob.mobers[actualIndex + 1];
        }
      }
      return mob.mobers[0];
    }
    return undefined;
  }

  @Action(SetNextMober)
  public setNext(ctx: StateContext<MobStateModel>) {
    const state = produce(ctx.getState(), draft => {
      draft.mob.round.currentMober = this.getNextMober(draft.mob);
    });
    return this.saveOrPatch(ctx, state.mob);
  }

  @Action(TryToReConnect)
  public tryToReConnect(ctx: StateContext<MobStateModel>) {
    const name = ctx.getState().mob.name;
    if (name) {
      return ctx.dispatch(new Connect(name));
    }
  }

  @Action(Connect)
  public connect(ctx: StateContext<MobStateModel>, { name }: Connect) {
    this.subscription = this.mobsService
      .mob$(name)
      .pipe(
        tap(mob => ctx.patchState({ mob })),
        takeWhile(() => !!ctx.getState().mob.name)
      )
      .subscribe();
  }

  @Action(Disconnect)
  public disconnect(ctx: StateContext<MobStateModel>) {
    if (this.subscription) {
      this.subscription.unsubscribe();
      delete this.subscription;
    }
    ctx.patchState({ mob: { ...ctx.getState().mob, name: DEFAULT.name } });
  }

  @Action(Create)
  public create(ctx: StateContext<MobStateModel>, { name }: Create) {
    const mob = { ...ctx.getState().mob, name } as Mob;
    return this.mobsService.save(mob).then(_ => ctx.dispatch(new Connect(mob.name)));
  }

  private isConnectedMob(mob: Mob) {
    return mob.name !== DEFAULT.name;
  }

  @Action(TimerStart)
  timerStart(ctx: StateContext<MobStateModel>) {
    let instant = ctx.getState().mob.duration;
    if (ctx.getState().mob.round?.instant) {
      instant = ctx.getState().mob.round.instant;
    }

    const mob = {
      ...ctx.getState().mob,
      round: { ...ctx.getState().mob.round, status: RoundStatus.STARTED, instant, playTimestamp: moment() } as MobRound
    };
    return this.saveOrPatch(ctx, mob);
  }

  @Action(TimerPause)
  timerPause(ctx: StateContext<MobStateModel>, { instant }: TimerPause) {
    const mob = {
      ...ctx.getState().mob,
      round: { ...ctx.getState().mob.round, status: RoundStatus.PAUSE, instant }
    };
    return this.saveOrPatch(ctx, mob);
  }

  @Action(TimerChange)
  timerChange(ctx: StateContext<MobStateModel>, { value, unit }: TimerChange) {
    const mob = { ...ctx.getState().mob };
    if (mob.round && mob.round.instant) {
      mob.round = { ...mob.round };
      mob.round.instant = mob.round.instant.clone().add(value, unit);
      if (mob.round.instant.asSeconds() < 0) {
        mob.round.instant = moment.duration(0);
      }
    } else {
      mob.duration = mob.duration.clone().add(value, unit);
      if (mob.duration.asSeconds() < 0) {
        mob.duration = moment.duration(0);
      }
    }
    return this.saveOrPatch(ctx, mob);
  }

  @Action(TimerReset)
  timerReset(ctx: StateContext<MobStateModel>) {
    const mob = { ...ctx.getState().mob, round: { ...ctx.getState().mob.round } };
    if (mob.round) {
      delete mob.round.instant;
      delete mob.round.playTimestamp;
      mob.round.status = RoundStatus.STOPPED;
    }
    return this.saveOrPatch(ctx, mob);
  }

  private saveOrPatch(ctx: StateContext<MobStateModel>, mob: Mob) {
    if (this.isConnectedMob(mob)) {
      return this.mobsService.save(mob);
    }
    return ctx.patchState({ mob });
  }
}
