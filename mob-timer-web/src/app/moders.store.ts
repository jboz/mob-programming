import { Action, State, StateContext } from '@ngxs/store';

export interface MobersStateModel {
  mobers: string[];
}

export class AddMober {
  static readonly type = '[Mobers] AddMober]';
  constructor(public readonly mober: string) {}
}

export class RemoveMober {
  static readonly type = '[Mobers] RemoveMober]';
  constructor(public readonly mober: string) {}
}

@State<MobersStateModel>({
  name: 'mobers',
  defaults: { mobers: [] }
})
export class MobersState {
  @Action(AddMober)
  public add(ctx: StateContext<MobersStateModel>, { mober }: AddMober) {
    ctx.patchState({ mobers: [...ctx.getState().mobers, mober] });
  }

  @Action(RemoveMober)
  public remove(ctx: StateContext<MobersStateModel>, { mober }: RemoveMober) {
    ctx.patchState({ mobers: [...ctx.getState().mobers.filter(name => name !== mober)] });
  }
}
