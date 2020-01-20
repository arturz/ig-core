"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const logs_service_1 = require("./logs.service");
const logs_controller_1 = require("./logs.controller");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
const log_entity_1 = require("../entities/log.entity");
const followed_entity_1 = require("../entities/followed.entity");
const account_entity_1 = require("../entities/account.entity");
let LogsModule = class LogsModule {
};
LogsModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([log_entity_1.Log, followed_entity_1.Followed, account_entity_1.Account]), auth_module_1.AuthModule],
        providers: [logs_service_1.LogsService],
        controllers: [logs_controller_1.LogsController],
        exports: [logs_service_1.LogsService]
    })
], LogsModule);
exports.LogsModule = LogsModule;
//# sourceMappingURL=logs.module.js.map