"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const ServerSentEvent_middleware_1 = require("../middleware/ServerSentEvent.middleware");
const mobs_controller_1 = require("./mobs.controller");
const mob_schema_1 = require("./schemas/mob.schema");
let MobsModule = class MobsModule {
    configure(consumer) {
        consumer.apply(ServerSentEvent_middleware_1.ServerSentEventMiddleware).forRoutes({ path: 'mobs', method: common_1.RequestMethod.GET });
    }
};
MobsModule = __decorate([
    common_1.Module({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: mob_schema_1.MobDocument.name, schema: mob_schema_1.MobSchema }])],
        controllers: [mobs_controller_1.MobsController],
        providers: []
    })
], MobsModule);
exports.MobsModule = MobsModule;
//# sourceMappingURL=mobs.module.js.map