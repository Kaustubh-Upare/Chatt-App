const jwt =require('jsonwebtoken');
const cloudinary=require('../Cloudinary/config')
const { v4: uuid } = require('uuid');
const { ErrorHandler } = require('./utility');
const { getSockets } = require('../lib/Helper');


const cookieOptions={
    maxAge:15*24*60*60*1000,
    sameSite:"none",
    httpOnly:true,
    secure:true
}

const sendToken=(res,user,code,msg)=>{
    const token=jwt.sign({_id:user._id},"Anything");
    
    return res.status(code).cookie("Chat-Token",token,cookieOptions).json({
        success:true,
        msg,
    })

}

const emitEvent=(req,event,users,data)=>{
    console.log("Emitting Event",event);
    const io=req.app.get("io");
    const userSocket=getSockets(users);
    io.to(userSocket).emit(event,data)

}





module.exports={sendToken,emitEvent,cookieOptions}