const mongoose=require("mongoose");

const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    },
    fathername:{
       type:String,
        required:true
    },
       mothername:{
        type:String,
        required:true
    },
    nid_copy:{
     type:String,
        required:true
    },
       signature:{
        type:String,
        required:true
    },
    verified:{
           type:Number,
            default:0
    },
    otp:{
        type:Number,
        default:0
    },
    is_admin:{
        type:Number,
        default:0,
    }
},{timestamps:true});

const registermodel=mongoose.model("User",userschema);

module.exports=registermodel;