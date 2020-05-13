import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MobsModule } from './mobs/mobs.module';

export const API_PREFIX = '/mob-programming/api';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/data'), MobsModule],
  controllers: [],
  providers: []
})
export class AppModule {}
