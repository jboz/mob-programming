import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { produce } from 'immer';
import * as moment from 'moment';
import { tap } from 'rxjs/operators';
import { Mob } from './mobs.model';
import { MobsService } from './mobs.service';

const DEFAULT: Mob = { name: 'MOB_LOCAL', mobers: [], duration: moment.duration(12, 'minutes').asMinutes() };

export interface TimerStateModel {
  mob: Mob;
}

export class AddMober {
  static readonly type = '[Timer] AddMober]';
  constructor(public readonly mober: string) {}
}

export class RemoveMober {
  static readonly type = '[Timer] RemoveMober]';
  constructor(public readonly mober: string) {}
}

export class SelectMober {
  static readonly type = '[Timer] SelectMober]';
  constructor(public readonly mober: string) {}
}

export class ClearState {
  static readonly type = '[Timer] ClearState]';
}

export class SetDefaultTimer {
  static readonly type = '[Timer] SetDefaultTimer]';
  constructor(public readonly timer: moment.Duration) {}
}

export class TimeUp {
  static readonly type = '[Timer] TimeUp]';
}

export class SetNextMober {
  static readonly type = '[Timer] SetNextMober]';
}

export class Connect {
  static readonly type = '[Timer] Connect]';
  constructor(public readonly name?: any) {}
}

@State<TimerStateModel>({
  name: 'timer',
  defaults: { mob: DEFAULT }
})
@Injectable()
export class TimerState {
  @Selector()
  public static mobers(state: TimerStateModel) {
    return state.mob.mobers;
  }

  @Selector()
  public static selectedMober(state: TimerStateModel) {
    return state.mob.round.currentMober;
  }

  @Selector()
  public static duration(state: TimerStateModel) {
    return moment.duration(state.mob.duration, 'minutes');
  }

  @Selector()
  public static started(state: TimerStateModel): boolean {
    return state.mob.round.started;
  }

  @Selector()
  public static timerStartTimestamp(state: TimerStateModel): moment.Moment {
    return moment(state.mob.round.timerStartTimestamp);
  }

  @Selector()
  public static timerPauseTimestamp(state: TimerStateModel): moment.Moment {
    return moment(state.mob.round.timerPauseTimestamp);
  }

  constructor(private mobsService: MobsService) {}

  @Action(AddMober)
  public add(ctx: StateContext<TimerStateModel>, { mober }: AddMober) {
    // ctx.patchState({ mobers: [...ctx.getState().mobers, mober] });
    // this.autoSelection(ctx);
  }

  @Action(RemoveMober)
  public remove(ctx: StateContext<TimerStateModel>, { mober }: RemoveMober) {
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
  public select(ctx: StateContext<TimerStateModel>, { mober }: SelectMober) {
    // ctx.patchState({ selectedMober: mober });
  }

  private autoSelection(ctx: StateContext<TimerStateModel>) {
    // if (ctx.getState().mobers.length === 1) {
    //   ctx.patchState({ selectedMober: ctx.getState().mobers[0] });
    // }
  }

  @Action(ClearState)
  public clear(ctx: StateContext<TimerStateModel>) {
    ctx.setState({ mob: DEFAULT });
  }

  @Action(SetDefaultTimer)
  public setDefaultTimer(ctx: StateContext<TimerStateModel>, { timer }: SetDefaultTimer) {
    ctx.setState(
      produce(draft => {
        draft.mob.duration = timer.asMinutes();
      })
    );
  }

  @Action(TimeUp)
  public timeUp(ctx: StateContext<TimerStateModel>) {
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

  private getNextMober(ctx: StateContext<TimerStateModel>) {
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
  public setNext(ctx: StateContext<TimerStateModel>) {
    ctx.setState(
      produce(draft => {
        draft.mob.round.currentMober = this.getNextMober(ctx);
      })
    );
  }

  @Action(Connect)
  public connect(ctx: StateContext<TimerStateModel>, { name }: Connect) {
    return this.mobsService.mob$(name).pipe(
      tap(data => console.log(`data=${data}`)),
      tap(mob => ctx.patchState({ mob }))
    );
  }
}
