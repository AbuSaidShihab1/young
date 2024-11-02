const express=require("express");
const app=express();
const database=require("./config/database");
const route=require("./router/route");
const cors=require("cors");
const bodyparser=require("body-parser");
const registermodel = require("./models/Resistermodel");
const multer=require("multer");
const bcrypt=require("bcryptjs")


app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(cors());
app.use(express.static("public"))

database();

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public/images")
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}_${file.originalname}`)
    }

});
const uploadimage=multer({storage:storage});

app.post("/registration",uploadimage.single("file"),async(req,res)=>{
    try {
        const {name,email,passwrord,fathername,mothername,number,signature}=req.body;
        const find_user=await registermodel.findOne({email:email});
        console.log(name,email,passwrord,fathername,mothername,number,signature)
        if(find_user){
            res.send({success:true,message:"Email already exist!"})
        }
        const password_hash=await bcrypt.hash(passwrord,10)
        const create_user=new registermodel({
            name,email,password:password_hash,fathername,mothername,number,signature,
            nid_copy:req.file.filename
        });
        if(create_user){
               res.send({success:true,message:"User registered!"});
               create_user.save();
        }
        res.send({success:false,message:"Email already exist!"})
    } catch (error) {
        console.log(error)
    }
});
app.get("/",(req,res)=>{
    res.send("hello")
})
app.listen(4000,()=>{
    console.log(`Your server is running on ${4000}`)
})