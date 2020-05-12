import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mob } from './mobs.model';

@Injectable({ providedIn: 'root' })
export class MobsService {
  constructor(private httpClient: HttpClient) {}

  getMob$(id: string): Observable<Mob> {
    return new Observable(observer => {
      const eventSource = new EventSource(`/mob-programming/api/mobs/${id}`);
      eventSource.onmessage = event => observer.next(JSON.parse(event.data) as Mob);
      eventSource.onerror = error => {
        if (eventSource.readyState === 0) {
          eventSource.close();
          observer.complete();
        } else {
          observer.error('EventSource error: ' + error);
        }
      };
    });
    // return this.httpClient.get<Mob>(`/mob-programming/api/mobs/${id}`);
  }
}
