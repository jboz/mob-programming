import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class RoundDocument extends Document {
  @Prop()
  timerStartTimestamp?: string;

  @Prop()
  started: boolean;

  @Prop()
  timerPauseTimestamp?: string;

  @Prop()
  currentMober?: string;
}

@Schema()
export class MobDocument extends Document {
  @Prop()
  name: string;

  @Prop()
  duration: number;

  @Prop()
  mobers: string[];

  // @Prop()
  // round?: RoundDocument;
}

export const MobSchema = SchemaFactory.createForClass(MobDocument);
