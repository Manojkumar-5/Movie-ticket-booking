import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { UserDTO } from './dto/user.dto';
import { Ticket } from './interfaces/ticket.interface';
import { TicketDTO } from './dto/ticket.dto';
export declare class TicketService {
    private readonly ticketModel;
    private readonly userModel;
    constructor(ticketModel: Model<Ticket>, userModel: Model<User>);
    register(userDTO: UserDTO, res: any): Promise<User>;
    login(userDTO: UserDTO, res: any): Promise<User>;
    addTicket(ticketDTO: TicketDTO, res: any): Promise<Ticket>;
    openTicket(): Promise<any>;
    closeTicket(): Promise<any>;
    users(): Promise<any>;
    resetTickets(ticketDTO: TicketDTO): Promise<Ticket>;
    findById(ID: number): Promise<Ticket>;
    findDetailsById(ID: number): Promise<any>;
    updateTicketStatus(ticketID: string, ticketDTO: TicketDTO): Promise<Ticket>;
}
