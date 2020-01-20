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
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const account_entity_1 = require("./entities/account.entity");
const job_entity_1 = require("./entities/job.entity");
let AppService = class AppService {
    constructor(userRepository, accountRepository, jobRepository) {
        this.userRepository = userRepository;
        this.accountRepository = accountRepository;
        this.jobRepository = jobRepository;
        this.init();
    }
    async init() {
        if ((await this.userRepository.findOne({ username: 'admin' })) !== undefined)
            return;
        const user = this.userRepository.create({ username: 'admin', password: 'kolorowemaslojestnajlepsze' });
        const account = this.accountRepository.create({ login: 'jaca7_', password: 'Panasonic7', user });
        user.accounts = [account];
        const job = this.jobRepository.create({ cron: '0 * * * * *', supervisor: 'identity', supervisorPayload: 'xD', account });
        account.jobs = [job];
        this.jobRepository.save(job);
        console.log('Added dev user');
    }
};
AppService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __param(1, typeorm_1.InjectRepository(account_entity_1.Account)),
    __param(2, typeorm_1.InjectRepository(job_entity_1.Job)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map