import { Module } from '@nestjs/common';
import { MobsModule } from './mobs/mobs.module';

export const API_PREFIX = '/mob-programming/api';

@Module({
  imports: [MobsModule],
  controllers: [],
  providers: []
})
export class AppModule {}
