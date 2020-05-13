import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServerSentEventMiddleware } from 'src/middleware/ServerSentEvent.middleware';
import { MobsController } from './mobs.controller';
import { MobDocument, MobSchema } from './schemas/mob.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: MobDocument.name, schema: MobSchema }])],
  controllers: [MobsController],
  providers: []
})
export class MobsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ServerSentEventMiddleware).forRoutes({ path: 'mobs', method: RequestMethod.GET });
  }
}
