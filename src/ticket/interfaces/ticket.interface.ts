import {Document} from 'mongoose';
export interface Ticket extends Document{
    readonly seatnumber:number;
    readonly isbooked:boolean;
    readonly email:string;
}