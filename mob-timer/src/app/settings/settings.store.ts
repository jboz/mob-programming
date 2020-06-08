import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Sound } from './sound.model';

const DEFAULT_SOUND = 'bullfrog.ogg';

export interface SettingsStateModel {
  sound: string;
}

export class SelectSound {
  static readonly type = '[Settings] SelectSound]';
  constructor(public readonly soundFileName: string) {}
}

@State<SettingsStateModel>({
  name: 'settings',
  defaults: { sound: DEFAULT_SOUND }
})
export class SettingsState {
  @Selector()
  public static sound(state: SettingsStateModel): string {
    return state.sound;
  }

  @Selector()
  public static sounds(): Sound[] {
    return [
      { label: 'Alarm Buzzer', fileName: 'alarm-buzzer.ogg' },
      { label: 'Bull Frog', fileName: 'bullfrog.ogg' },
      { label: 'Bus Horn', fileName: 'bus-horn.ogg' },
      { label: 'Filling Your Inbox', fileName: 'filling-your-inbox.ogg' },
      { label: 'Horse Whinnies', fileName: 'horse-whinnies.ogg' },
      { label: 'Serious Strike', fileName: 'serious-strike.ogg' },
      { label: 'Solemn', fileName: 'solemn.ogg' }
    ];
  }

  @Action(SelectSound)
  selectSound(ctx: StateContext<SettingsStateModel>, { soundFileName }: SelectSound) {
    ctx.patchState({ sound: soundFileName });
  }
}