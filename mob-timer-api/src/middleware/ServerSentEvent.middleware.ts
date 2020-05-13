import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';
import { Response } from './ServerSentEventResponse.type';

@Injectable()
export class ServerSentEventMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    req.socket.setKeepAlive(true);
    req.socket.setTimeout(0);
    res.status(200);
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // export a function to send server-side-events
    res.sse.send = payload => {
      const data = `data: ${JSON.stringify(payload)}\n\n`;
      res.write(data);

      // support running within the compression middleware
      // @ts-ignore
      if (res.flushHeaders() && data.match(/\n\n$/)) {
        res.flushHeaders();
      }
    };

    // write 2kB of padding (for IE) and a reconnection timeout
    // then use res.sse to send to the client
    res.write(':' + Array(2049).join(' ') + '\n');
    res.sse.send('retry: 2000\n\n');

    // keep the connection open by sending a comment
    const keepAlive = setInterval(() => {
      res.sse.send(':keep-alive\n\n');
    }, 20000);

    // cleanup on close
    res.on('close', function close() {
      clearInterval(keepAlive);
    });

    next();
  }
}
