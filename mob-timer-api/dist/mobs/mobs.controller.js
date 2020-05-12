"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const rxjs_1 = require("rxjs");
const mobs_model_1 = require("./mobs.model");
let MobsController = class MobsController {
    constructor() {
        this.repository = {};
        this.repository['lesDaltons'] = {
            id: 'lesDaltons',
            duration: 10,
            mobers: ['Joe', 'Jack', 'William', 'Averell']
        };
    }
    findAll() {
        return rxjs_1.of(Object.values(this.repository).filter(data => !!data.id));
    }
    findOne(id) {
        if (this.repository[id] === undefined) {
            throw new common_1.NotFoundException(`Mob '${id}' not found`);
        }
        return rxjs_1.of(this.repository[id]);
    }
    createMob(mob) {
        this.repository[mob.id] = mob;
    }
    updateMob(id, mob) {
        if (id !== mob.id) {
            throw new common_1.BadRequestException(`Requested id doesn't match body id '${mob.id}'`);
        }
        if (this.repository[id] === undefined) {
            throw new common_1.NotFoundException(`Mob '${id}' not found`);
        }
        this.repository[id] = mob;
    }
    delete(id) {
        if (this.repository[id] === undefined) {
            throw new common_1.NotFoundException(`Mob '${id}' not found`);
        }
        delete this.repository[id];
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], MobsController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    swagger_1.ApiParam({ name: 'id', description: 'Mob id' }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Observable)
], MobsController.prototype, "findOne", null);
__decorate([
    common_1.Post(),
    swagger_1.ApiCreatedResponse({ description: 'Mob created' }),
    swagger_1.ApiBody({ type: mobs_model_1.Mob }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mobs_model_1.Mob]),
    __metadata("design:returntype", void 0)
], MobsController.prototype, "createMob", null);
__decorate([
    common_1.Put(':id'),
    common_1.HttpCode(204),
    swagger_1.ApiBody({ type: mobs_model_1.Mob }),
    swagger_1.ApiNoContentResponse({ description: 'Mob updated' }),
    swagger_1.ApiNotFoundResponse({ description: "Mob doesn't exists" }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, mobs_model_1.Mob]),
    __metadata("design:returntype", void 0)
], MobsController.prototype, "updateMob", null);
__decorate([
    common_1.Delete(':id'),
    swagger_1.ApiParam({ name: 'id', description: 'Mob id' }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MobsController.prototype, "delete", null);
MobsController = __decorate([
    common_1.Controller('mobs'),
    __metadata("design:paramtypes", [])
], MobsController);
exports.MobsController = MobsController;
//# sourceMappingURL=mobs.controller.js.map