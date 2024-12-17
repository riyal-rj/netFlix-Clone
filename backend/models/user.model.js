import mongoose from "mongoose";
import validator from 'validator';

const userSchema=mongoose.Schema({
    userName:{
        type:String,
        required:[true, 'Please enter your name'],
        unique:true,
        trim:true,
        maxlength:[200,'Please provide the name withing 200 characters'],
        minlength:[5,'Please provide  a name of atleast 5 characters']
    },
    email:{
        type:String,
        unique:true,
        required:[true,'Please enter your email id'],
        lowercase:true,
        validate:[validator.isEmail,'Please enter a valid email id']
    },
    password:{
        type:String,
        required:[true, 'Please enter password'],
        minlength:[8,'Password must have atleast 8 characters'],
        select:false,
    },
    image:{
        type:String,
        default:""
    },
    searchHistory:{
        type:Array,
        default:[]
    }
});

export const User=mongoose.model('User',userSchema);