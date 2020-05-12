import { Response as ExpressResponse } from 'express';

export interface Response extends ExpressResponse {
  sse(message: string): void;
  sendEvent(payload: any): void;
}
