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
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class MobRound {
}
__decorate([
    swagger_1.ApiProperty({ required: false }),
    __metadata("design:type", String)
], MobRound.prototype, "timerStartTimestamp", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Boolean)
], MobRound.prototype, "started", void 0);
__decorate([
    swagger_1.ApiProperty({ required: false }),
    __metadata("design:type", String)
], MobRound.prototype, "timerPauseTimestamp", void 0);
__decorate([
    swagger_1.ApiProperty({ required: false }),
    __metadata("design:type", String)
], MobRound.prototype, "currentMober", void 0);
exports.MobRound = MobRound;
class Mob {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], Mob.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsPositive(),
    __metadata("design:type", Number)
], Mob.prototype, "duration", void 0);
__decorate([
    swagger_1.ApiProperty({ required: false }),
    __metadata("design:type", MobRound)
], Mob.prototype, "round", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Array)
], Mob.prototype, "mobers", void 0);
exports.Mob = Mob;
//# sourceMappingURL=mobs.model.js.map