import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { produce } from 'immer';
import * as moment from 'moment';
import { Duration } from 'moment';
import { tap } from 'rxjs/operators';
import { Mob, MobRound, RoundStatus } from './mob.model';
import { MobsService } from './mob.service';

const DEFAULT: Mob = { name: '', mobers: [], duration: moment.duration(12, 'minutes').asMinutes() };

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

export class ClearState {
  static readonly type = '[Mob] ClearState]';
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

@State<MobStateModel>({
  name: 'mob',
  defaults: { mob: DEFAULT }
})
@Injectable()
export class MobState {
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

  constructor(private mobsService: MobsService) {}

  @Action(AddMober)
  public add(ctx: StateContext<MobStateModel>, { mober }: AddMober) {
    // ctx.patchState({ mobers: [...ctx.getState().mobers, mober] });
    // this.autoSelection(ctx);
  }

  @Action(RemoveMober)
  public remove(ctx: StateContext<MobStateModel>, { mober }: RemoveMober) {
    // ctx.patchState({ mobers: [...ctx.getState().mobers.filter(name => name !== mober)] });
    // if (ctx.getState().selectedMober === mober) {
    //   ctx.patchState({ selectedMober: undefined });
    //   if (ctx.getState().mobers.length > 0) {
    //     ctx.patchState({ selectedMober: ctx.getState().mobers[0] });
    //   }
    // }
    // this.autoSelection(ctx);
  }

  @Action(SelectMober)
  public select(ctx: StateContext<MobStateModel>, { mober }: SelectMober) {
    // ctx.patchState({ selectedMober: mober });
  }

  private autoSelection(ctx: StateContext<MobStateModel>) {
    // if (ctx.getState().mobers.length === 1) {
    //   ctx.patchState({ selectedMober: ctx.getState().mobers[0] });
    // }
  }

  @Action(ClearState)
  public clear(ctx: StateContext<MobStateModel>) {
    ctx.setState({ mob: DEFAULT });
  }

  @Action(SetDefaultTimer)
  public setDefaultTimer(ctx: StateContext<MobStateModel>, { timer }: SetDefaultTimer) {
    ctx.setState(
      produce(draft => {
        draft.mob.duration = timer.asMinutes();
      })
    );
  }

  @Action(TimeUp)
  public timeUp(ctx: StateContext<MobStateModel>) {
    const nextMober = this.getNextMober(ctx);
    // tslint:disable-next-line: no-unused-expression
    new Notification(`Time is up`, {
      body: `Next mober ${nextMober ? `'${nextMober}' ` : ''}to play!`,
      icon: 'assets/icons/icon-128x128.png',
      dir: 'auto',
      vibrate: [100, 50, 100],
      timestamp: 3000
    });
    return ctx.dispatch(new SetNextMober());
  }

  private getNextMober(ctx: StateContext<MobStateModel>) {
    if (ctx.getState().mob.mobers.length > 0) {
      const actualMober = ctx.getState().mob.round.currentMober;
      const actualIndex = ctx.getState().mob.mobers.indexOf(actualMober);
      if (actualIndex >= 0 && actualIndex < ctx.getState().mob.mobers.length - 1) {
        return ctx.getState().mob.mobers[actualIndex + 1];
      }
      return ctx.getState().mob.mobers[0];
    }
    return undefined;
  }

  @Action(SetNextMober)
  public setNext(ctx: StateContext<MobStateModel>) {
    ctx.setState(
      produce(draft => {
        draft.mob.round.currentMober = this.getNextMober(ctx);
      })
    );
  }

  @Action(Connect)
  public connect(ctx: StateContext<MobStateModel>, { name }: Connect) {
    return this.mobsService.mob$(name).pipe(
      tap(data => console.log(`data=${data}`)),
      tap(mob => ctx.patchState({ mob }))
    );
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
    let instant = moment.duration(ctx.getState().mob.duration, 'minutes').toISOString();

    if (ctx.getState().mob.round?.instant) {
      instant = ctx.getState().mob.round.instant;
    }

    const mob = {
      ...ctx.getState().mob,
      round: { status: RoundStatus.STARTED, instant, playTimestamp: moment().toISOString() } as MobRound
    };
    if (this.isConnectedMob(mob)) {
      return this.mobsService.save(mob);
    }
    return ctx.patchState({ mob });
  }

  @Action(TimerPause)
  timerPause(ctx: StateContext<MobStateModel>, { instant }: TimerPause) {
    const mob = {
      ...ctx.getState().mob,
      round: { status: RoundStatus.PAUSE, instant: instant.toISOString() }
    };
    if (this.isConnectedMob(mob)) {
      return this.mobsService.save(mob);
    }
    return ctx.patchState({ mob });
  }
}
