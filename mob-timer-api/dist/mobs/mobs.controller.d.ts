import { Observable } from 'rxjs';
import { Mob } from './mobs.model';
export declare class MobsController {
    private repository;
    constructor();
    findAll(): Observable<Mob[]>;
    findOne(id: string): Observable<Mob>;
    createMob(mob: Mob): void;
    updateMob(id: string, mob: Mob): void;
}
