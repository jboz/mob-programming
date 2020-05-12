import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ServerSentEventMiddleware } from 'src/middleware/ServerSentEvent.middleware';
import { MobsController } from './mobs.controller';

@Module({
  imports: [],
  controllers: [MobsController],
  providers: []
})
export class MobsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ServerSentEventMiddleware).forRoutes({ path: 'mobs', method: RequestMethod.GET });
  }
}
