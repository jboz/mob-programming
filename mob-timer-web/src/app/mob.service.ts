import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mob, RoundStatus } from './mob.model';

interface MobEntity {
  name: string;
  duration: string;
  round?: {
    status: RoundStatus;
    instant?: string;
    playTimestamp?: string;
    currentMober?: string;
  };
  mobers: string[];
}

@Injectable({ providedIn: 'root' })
export class MobsService {
  constructor(private db: AngularFirestore) {}

  public static fromEntity(entity: MobEntity) {
    const mob: any = { ...entity, duration: moment.duration(entity.duration) };
    if (entity.round) {
      mob.round.instant = moment.duration(entity.round.instant);
      mob.round.playTimestamp = moment(entity.round.playTimestamp);
    }
    return mob;
  }

  public mobs$(): Observable<Mob[]> {
    return this.db.collection<Mob>('/mobs').valueChanges();
  }

  public mob$(name: string): Observable<Mob> {
    return this.db
      .doc<MobEntity>(`/mobs/${name}`)
      .snapshotChanges()
      .pipe(map(doc => MobsService.fromEntity(doc.payload.data())));
  }

  public save(mob: Mob): Promise<void> {
    return this.db.doc<MobEntity>(`/mobs/${mob.name}`).set(this.toEntity(mob));
  }

  private toEntity(mob: Mob): MobEntity {
    const entity: any = { ...mob, duration: mob.duration.toISOString() };
    if (mob.round) {
      entity.round = { ...mob.round };
      entity.round.instant = mob.round.instant.toISOString();
      if (mob.round.playTimestamp) {
        entity.round.playTimestamp = mob.round.playTimestamp.toISOString();
      }
    }
    return entity;
  }
}
