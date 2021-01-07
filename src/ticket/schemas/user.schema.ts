import * as mongoose from 'mongoose';
export const UserSchema=new mongoose.Schema({
    /*name:String,
    gender:String,
    age:Number,
    email:
    {
        type:String,
        unique:true
    },
    phone:
    {
        type:Number,
        unique:true
    },
    seatnumber:Number*/
    name: {
        type: String,
        trim: true,
        required: true,
      },
      email: {
        type: String,
        trim: true,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
    
})
