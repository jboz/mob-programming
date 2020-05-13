import { Model } from 'mongoose';
import { Response } from 'src/middleware/ServerSentEventResponse.type';
import { Mob } from './mobs.model';
import { MobDocument } from './schemas/mob.schema';
export declare class MobsController {
    private readonly model;
    constructor(model: Model<MobDocument>);
    findAll(response: Response): Promise<void>;
    findOne(id: string): Promise<MobDocument>;
    createMob(mob: Mob): Promise<MobDocument>;
    updateMob(id: string, mob: Mob): Promise<any>;
    delete(id: string): Promise<{
        ok?: number;
        n?: number;
    } & {
        deletedCount?: number;
    }>;
}
