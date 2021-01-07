import { TicketService } from './ticket.service';
import { UserDTO } from './dto/user.dto';
import { TicketDTO } from './dto/ticket.dto';
export declare class TicketController {
    private ticketService;
    constructor(ticketService: TicketService);
    register(res: any, userDTO: UserDTO): Promise<void>;
    login(res: any, userDTO: UserDTO): Promise<void>;
    users(): Promise<void>;
    addTicket(res: any, ticketDTO: TicketDTO): Promise<void>;
    openTicket(): Promise<any>;
    closeTicket(): Promise<void>;
    resetTickets(res: any, body: any, ticketDTO: TicketDTO): Promise<any>;
    getTicketid(res: any, param: any): Promise<any>;
    getTicketdetails(res: any, param: any): Promise<any>;
    updateTicket(res: any, ticketDTO: TicketDTO, ticketID: any): Promise<any>;
}
