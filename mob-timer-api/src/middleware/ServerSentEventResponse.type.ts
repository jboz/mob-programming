import { Response as ExpressResponse } from 'express';

export interface Response extends ExpressResponse {
  sse: {
    send(payload: any): void;
  };
}
