import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Mob } from './mob.model';

@Injectable({ providedIn: 'root' })
export class MobsService {
  constructor(private db: AngularFirestore) {}

  public mobs$(): Observable<Mob[]> {
    return this.db.collection<Mob>('/mobs').valueChanges();
  }

  public mob$(name: string): Observable<Mob> {
    return this.db.doc<Mob>(`/mobs/${name}`).valueChanges();
  }

  public save(mob: Mob): Promise<void> {
    return this.db.doc<Mob>(`/mobs/${mob.name}`).set(mob);
  }
}
