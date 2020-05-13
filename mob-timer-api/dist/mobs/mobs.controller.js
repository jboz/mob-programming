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
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const mongoose_2 = require("mongoose");
const ServerSentEventResponse_type_1 = require("../middleware/ServerSentEventResponse.type");
const mobs_model_1 = require("./mobs.model");
const mob_schema_1 = require("./schemas/mob.schema");
let MobsController = class MobsController {
    constructor(model) {
        this.model = model;
    }
    findAll(response) {
        return this.model
            .find()
            .exec()
            .then(data => response.sse.send(data));
    }
    findOne(id) {
        return this.model.findById(id).then(existingMob => {
            if (!existingMob) {
                throw new common_1.NotFoundException(`Mob '${id}' not found.`);
            }
            return existingMob;
        });
    }
    createMob(mob) {
        return this.model
            .findOne({ name: mob.name })
            .exec()
            .then(existingMob => {
            if (existingMob) {
                throw new common_1.UnprocessableEntityException(`Mob '${mob.name}' already exists.`);
            }
            return new this.model(mob).save();
        });
    }
    updateMob(id, mob) {
        return this.model
            .findById(id)
            .exec()
            .then(existingMob => {
            if (!existingMob) {
                throw new common_1.NotFoundException(`Mob '${id}' not found.`);
            }
            return this.model.updateOne({ _id: id }, mob);
        });
    }
    delete(id) {
        return this.model
            .findById(id)
            .exec()
            .then(existingMob => {
            if (!existingMob) {
                throw new common_1.NotFoundException(`Mob '${id}' not found.`);
            }
            return this.model.deleteOne({ _id: id });
        });
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MobsController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    swagger_1.ApiParam({ name: 'id', description: 'Mob id' }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MobsController.prototype, "findOne", null);
__decorate([
    common_1.Post(),
    swagger_1.ApiBody({ type: mobs_model_1.Mob }),
    swagger_1.ApiCreatedResponse({ description: 'Mob created' }),
    swagger_1.ApiUnprocessableEntityResponse({ description: 'Mob already exists' }),
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
    swagger_1.ApiNotFoundResponse({ description: "Mob doesn't exists" }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MobsController.prototype, "delete", null);
MobsController = __decorate([
    common_1.Controller('mobs'),
    __param(0, mongoose_1.InjectModel(mob_schema_1.MobDocument.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MobsController);
exports.MobsController = MobsController;
//# sourceMappingURL=mobs.controller.js.map