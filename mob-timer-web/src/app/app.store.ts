import { Action, Selector, State, StateContext } from '@ngxs/store';
import * as moment from 'moment';

const DEFAULT: TimerStateModel = { mobers: [], defaultTimer: moment.duration(15, 'minutes') };

export interface TimerStateModel {
  mobers: string[];
  selectedMober?: string;
  defaultTimer: moment.Duration;
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

@State<TimerStateModel>({
  name: 'timer',
  defaults: DEFAULT
})
export class TimerState {
  @Selector()
  public static mobers(state: TimerStateModel) {
    return state.mobers;
  }

  @Selector()
  public static selectedMober(state: TimerStateModel) {
    return state.selectedMober;
  }

  @Selector()
  public static defaultTimer(state: TimerStateModel) {
    return moment.duration(state.defaultTimer);
  }

  @Action(AddMober)
  public add(ctx: StateContext<TimerStateModel>, { mober }: AddMober) {
    ctx.patchState({ mobers: [...ctx.getState().mobers, mober] });
    this.autoSelection(ctx);
  }

  @Action(RemoveMober)
  public remove(ctx: StateContext<TimerStateModel>, { mober }: RemoveMober) {
    ctx.patchState({ mobers: [...ctx.getState().mobers.filter(name => name !== mober)] });
    if (ctx.getState().selectedMober === mober) {
      ctx.patchState({ selectedMober: undefined });
      if (ctx.getState().mobers.length > 0) {
        ctx.patchState({ selectedMober: ctx.getState().mobers[0] });
      }
    }
    this.autoSelection(ctx);
  }

  @Action(SelectMober)
  public select(ctx: StateContext<TimerStateModel>, { mober }: SelectMober) {
    ctx.patchState({ selectedMober: mober });
  }

  private autoSelection(ctx: StateContext<TimerStateModel>) {
    if (ctx.getState().mobers.length === 1) {
      ctx.patchState({ selectedMober: ctx.getState().mobers[0] });
    }
  }

  @Action(ClearState)
  public clear(ctx: StateContext<TimerStateModel>) {
    ctx.setState({ ...DEFAULT, defaultTimer: ctx.getState().defaultTimer });
  }

  @Action(SetDefaultTimer)
  public setDefaultTimer(ctx: StateContext<TimerStateModel>, { timer }: SetDefaultTimer) {
    ctx.patchState({ defaultTimer: timer.clone() });
  }
}
