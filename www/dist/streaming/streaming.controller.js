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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const nestjs_sse_1 = require("nestjs-sse");
const streaming_service_1 = require("./streaming.service");
let StreamingController = class StreamingController {
    constructor(streamingService) {
        this.streamingService = streamingService;
    }
    streaming(id, res, req) {
        const cleanup = this.streamingService.createStreaming(id, (data) => res.sse(`data:${data}\n\n`));
        if (this.streamingService.getLastData(id)) {
            res.sse(`data:${this.streamingService.getLastData(id)}\n\n`);
        }
        req.on('close', cleanup);
    }
};
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Res()), __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_a = typeof nestjs_sse_1.Response !== "undefined" && nestjs_sse_1.Response) === "function" ? _a : Object, Object]),
    __metadata("design:returntype", void 0)
], StreamingController.prototype, "streaming", null);
StreamingController = __decorate([
    common_1.Controller('streaming'),
    __metadata("design:paramtypes", [streaming_service_1.StreamingService])
], StreamingController);
exports.StreamingController = StreamingController;
//# sourceMappingURL=streaming.controller.js.map