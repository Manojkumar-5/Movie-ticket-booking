import * as mongoose from 'mongoose';
import { type } from 'os';
export const TicketSchema= new mongoose.Schema({
   /* seatnumber:
    {
        type:number,
        min:1,
        max:40,
        required:true
    },
    isbooked:{
        type:Boolean,
    }*/
    //ticketid:Number,
    seatnumber:
    {
        type:Number,
        min:1,
        max:40,
        required:true
    },
    isbooked:{type:Boolean},
   // name:{type:String},
    email:String
        
})