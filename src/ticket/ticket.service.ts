import { Body, Injectable, NotFoundException} from '@nestjs/common';
import { debug } from 'console';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {User} from './interfaces/user.interface';
import {UserDTO} from'./dto/user.dto';
import {Ticket} from './interfaces/ticket.interface';
import {TicketDTO} from'./dto/ticket.dto';

@Injectable()
export class TicketService {
    constructor(@InjectModel('Ticket') private readonly ticketModel:Model<Ticket>,
    @InjectModel('User') private readonly userModel:Model<User>){}
 

    async register(userDTO:UserDTO,res:any):Promise<User>{
        const name=userDTO.name;
        const email=userDTO.email;
        const password=userDTO.password;
        try {
            let user = await this.userModel.findOne({ email });
            if (user) {
              return res.status(400).json({ error: "User already exists" });
            }
            //const hashed_password = await bcrypt.hash(password, 10);
            user = new this.userModel({
              name,
              email,
              password,
            });
            await user.save();
            return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    // console.log(err);
    return res.status(400).json({ error: err.message });
  }
        
 }
 
 async login(userDTO:UserDTO,res:any):Promise<User>{
     const email=userDTO.email;
     const password=userDTO.password;
     try {
        let user = await this.userModel.findOne({ email,password });
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
        // console.log(err);
        return res.status(400).json({ error: err.message });
      }
 }

 async addTicket(ticketDTO:TicketDTO,res:any):Promise<Ticket>{
     const email=ticketDTO.email;
     const seatnumber=ticketDTO.seatnumber;
     
     if(await this.userModel.findOne({email})){
        try{
            let ticket;
            let status=await this.ticketModel.findOne({seatnumber,isbooked:true})
            if(status){
                return res.status(400).json("Seat already booked!!")
            }
            ticket= await this.ticketModel.insertMany({"seatnumber":seatnumber,"isbooked":true,"email":email});
        //ticket.save();
         return res.status(201).json({ message: "ticket added succesfully!!" });
            }
            catch (err) {
                // console.log(err);
                return res.status(400).json({ error: err.message });
              }
            }
         }
    
    async openTicket(){
        return await this.ticketModel.find({isbooked:false});
        }
    async closeTicket(){
        return await this.ticketModel.find({isbooked:true});
        }

        async users(){
            return await this.userModel.find();
            }





     async resetTickets(ticketDTO:TicketDTO):Promise<Ticket>{
        return await this.ticketModel.updateMany({},{$set: {isbooked:false,email:null}})
        }


    async findById(ID: number): Promise<Ticket> {
        const ticket= await this.ticketModel.findById(ID).exec();
        return ticket;
        }


    async findDetailsById(ID:number){
        const details=await this.ticketModel.findById(ID);
            let email=details.email;
            return await this.userModel.find({email})
        }


    async updateTicketStatus(ticketID: string, ticketDTO: TicketDTO): Promise<Ticket> {
            const updatedTicket = await this.ticketModel
                                .findByIdAndUpdate(ticketID, ticketDTO, {new: true});
            return updatedTicket;
        }
        
        
        













}