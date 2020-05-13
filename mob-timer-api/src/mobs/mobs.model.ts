import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class MobRound {
  @ApiProperty({ required: false })
  timerStartTimestamp?: string;

  @ApiProperty()
  started: boolean;

  @ApiProperty({ required: false })
  timerPauseTimestamp?: string;

  @ApiProperty({ required: false })
  currentMober?: string;
}

export class Mob {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsPositive()
  duration: number;

  @ApiProperty({ required: false })
  round?: MobRound;

  @ApiProperty()
  mobers: string[];
}
