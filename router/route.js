const express=require("express");
const route=express();

route.post("/registration",(req,res)=>{
    try {
        const {name}=req.body;
    console.log(name)
    } catch (error) {
        console.log(error)
    }
});

module.exports=route;