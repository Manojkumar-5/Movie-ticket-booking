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
exports.TicketController = void 0;
const common_1 = require("@nestjs/common");
const ticket_service_1 = require("./ticket.service");
const user_dto_1 = require("./dto/user.dto");
const ticket_dto_1 = require("./dto/ticket.dto");
let TicketController = class TicketController {
    constructor(ticketService) {
        this.ticketService = ticketService;
    }
    async register(res, userDTO) {
        const newUser = await this.ticketService.register(userDTO, res);
    }
    async login(res, userDTO) {
        const loginUser = await this.ticketService.login(userDTO, res);
    }
    async users() {
        const users = await this.ticketService.closeTicket();
        console.log(users);
    }
    async addTicket(res, ticketDTO) {
        const newTicket = await this.ticketService.addTicket(ticketDTO, res);
    }
    async openTicket() {
        const open = await this.ticketService.openTicket();
        return open;
    }
    async closeTicket() {
        const close = await this.ticketService.closeTicket();
        console.log(close);
    }
    async resetTickets(res, body, ticketDTO) {
        const username = "admin";
        const password = "admin";
        if (body.username == username && body.password == password) {
            const reset = await this.ticketService.resetTickets(ticketDTO);
            return res.status(common_1.HttpStatus.OK).json({
                message: 'All tickets has been reset!!'
            });
        }
        else {
            res.send("Invalid login credentials!!");
        }
    }
    async getTicketid(res, param) {
        const ticket = await this.ticketService.findById(param.id);
        return res.status(common_1.HttpStatus.OK).json(ticket);
    }
    async getTicketdetails(res, param) {
        const ticket = await this.ticketService.findDetailsById(param.id);
        return res.status(common_1.HttpStatus.OK).json(ticket);
    }
    async updateTicket(res, ticketDTO, ticketID) {
        const updatedTicket = await this.ticketService.updateTicketStatus(ticketID, ticketDTO);
        if (!updatedTicket)
            throw new common_1.NotFoundException('Ticket does not exist!');
        return res.status(common_1.HttpStatus.OK).json({
            message: 'Ticket Updated Successfully',
            updatedTicket
        });
    }
};
__decorate([
    common_1.Post('/register'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UserDTO]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "register", null);
__decorate([
    common_1.Post('/login'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UserDTO]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "login", null);
__decorate([
    common_1.Get('/users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "users", null);
__decorate([
    common_1.Post('/addTicket'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ticket_dto_1.TicketDTO]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "addTicket", null);
__decorate([
    common_1.Get('/status/open'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "openTicket", null);
__decorate([
    common_1.Get('/status/close'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "closeTicket", null);
__decorate([
    common_1.Post('/reset'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, ticket_dto_1.TicketDTO]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "resetTickets", null);
__decorate([
    common_1.Get('/:id'),
    __param(0, common_1.Res()), __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "getTicketid", null);
__decorate([
    common_1.Get('/details/:id'),
    __param(0, common_1.Res()), __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "getTicketdetails", null);
__decorate([
    common_1.Put('/update'),
    __param(0, common_1.Res()), __param(1, common_1.Body()), __param(2, common_1.Query('ticketID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ticket_dto_1.TicketDTO, Object]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "updateTicket", null);
TicketController = __decorate([
    common_1.Controller('ticket'),
    __metadata("design:paramtypes", [ticket_service_1.TicketService])
], TicketController);
exports.TicketController = TicketController;
//# sourceMappingURL=ticket.controller.js.map