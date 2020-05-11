import { Module } from '@nestjs/common';
import { MobsController } from './mobs.controller';

@Module({
  imports: [],
  controllers: [MobsController],
  providers: [],
})
export class MobsModule {}
