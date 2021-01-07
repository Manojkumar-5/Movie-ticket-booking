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
exports.TicketService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let TicketService = class TicketService {
    constructor(ticketModel, userModel) {
        this.ticketModel = ticketModel;
        this.userModel = userModel;
    }
    async register(userDTO, res) {
        const name = userDTO.name;
        const email = userDTO.email;
        const password = userDTO.password;
        try {
            let user = await this.userModel.findOne({ email });
            if (user) {
                return res.status(400).json({ error: "User already exists" });
            }
            user = new this.userModel({
                name,
                email,
                password,
            });
            await user.save();
            return res.status(201).json({ message: "User created successfully" });
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async login(userDTO, res) {
        const email = userDTO.email;
        const password = userDTO.password;
        try {
            let user = await this.userModel.findOne({ email, password });
            if (!user) {
                return res.status(400).json({ error: "Invalid credentials" });
            }
            return res.status(200).json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                },
            });
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async addTicket(ticketDTO, res) {
        const email = ticketDTO.email;
        const seatnumber = ticketDTO.seatnumber;
        if (await this.userModel.findOne({ email })) {
            try {
                let ticket;
                let status = await this.ticketModel.findOne({ seatnumber, isbooked: true });
                if (status) {
                    return res.status(400).json("Seat already booked!!");
                }
                ticket = await this.ticketModel.insertMany({ "seatnumber": seatnumber, "isbooked": true, "email": email });
                return res.status(201).json({ message: "ticket added succesfully!!" });
            }
            catch (err) {
                return res.status(400).json({ error: err.message });
            }
        }
    }
    async openTicket() {
        return await this.ticketModel.find({ isbooked: false });
    }
    async closeTicket() {
        return await this.ticketModel.find({ isbooked: true });
    }
    async users() {
        return await this.userModel.find();
    }
    async resetTickets(ticketDTO) {
        return await this.ticketModel.updateMany({}, { $set: { isbooked: false, email: null } });
    }
    async findById(ID) {
        const ticket = await this.ticketModel.findById(ID).exec();
        return ticket;
    }
    async findDetailsById(ID) {
        const details = await this.ticketModel.findById(ID);
        let email = details.email;
        return await this.userModel.find({ email });
    }
    async updateTicketStatus(ticketID, ticketDTO) {
        const updatedTicket = await this.ticketModel
            .findByIdAndUpdate(ticketID, ticketDTO, { new: true });
        return updatedTicket;
    }
};
TicketService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('Ticket')),
    __param(1, mongoose_2.InjectModel('User')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], TicketService);
exports.TicketService = TicketService;
//# sourceMappingURL=ticket.service.js.map