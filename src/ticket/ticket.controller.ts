import { Body, Controller,HttpStatus,Post, Res,Param, NotFoundException, Get,Put,Query} from '@nestjs/common';
import{TicketService}from'./ticket.service';
import{UserDTO} from './dto/user.dto';
import{TicketDTO} from './dto/ticket.dto';
import { resolve } from 'path';
import { User } from './interfaces/user.interface';

@Controller('ticket')
export class TicketController {
constructor(private ticketService:TicketService) {}

@Post('/register')
async register(@Res() res, @Body() userDTO:UserDTO){
    const newUser=await this.ticketService.register(userDTO,res);
     res.send(newUser);
}

@Post('/login')
async login(@Res() res, @Body() userDTO:UserDTO){
    const loginUser=await this.ticketService.login(userDTO,res);
    res.send(loginUser);
}



@Get('/users')
async users(@Res() res){
    const users=await this.ticketService.closeTicket();
   res.send(users);
}




@Post('/addTicket')
async addTicket(@Res() res ,@Body() ticketDTO:TicketDTO){
    const newTicket=await this.ticketService.addTicket(ticketDTO,res);
    res.send(newTicket);

}
@Get('/status/open')
async openTicket(@Res() res){
    const open=await this.ticketService.openTicket();
    res.send(open);
}

@Get('/status/close')
async closeTicket(@Res() res){
    const close=await this.ticketService.closeTicket();
    res.send(close);
}
@Post('/reset')
async resetTickets(@Res() res ,@Body() body,ticketDTO:TicketDTO){
    const username="admin";
    const password="admin";
    if(body.username==username && body.password==password){
        const reset=await this.ticketService.resetTickets(ticketDTO);
        return res.status(HttpStatus.OK).json({
        message: 'All tickets has been reset!!'
  });
}else{res.send("Invalid login credentials!!")}
}
@Get('/:id')
    public async getTicketid(@Res() res, @Param() param){
        const ticket = await this.ticketService.findById(param.id);
        return res.status(HttpStatus.OK).json(ticket);
    }
@Get('/details/:id')
public async getTicketdetails(@Res() res, @Param() param){
    const ticket = await this.ticketService.findDetailsById(param.id);
        return res.status(HttpStatus.OK).json(ticket);
    }

@Put('/update')//update ticket
async updateTicket(@Res() res, @Body() ticketDTO: TicketDTO, @Query('ticketID') ticketID) {
    const updatedTicket = await this.ticketService.updateTicketStatus(ticketID, ticketDTO);
    if (!updatedTicket) throw new NotFoundException('Ticket does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Ticket Updated Successfully',
            updatedTicket 
        });
    }











}



