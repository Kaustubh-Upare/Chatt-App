const jwt = require("jsonwebtoken");
const { ErrorHandler } = require("../Util/utility.js");
const {tryCatcher}=require("./error.js");
const User = require("../Models/user.js");

const isAuth=tryCatcher(async(req,resizeBy,next)=>{
    const token =req.cookies['Chat-Token'];
    if(!token) return next(new ErrorHandler("Please! Login First to access",401));

    const decodedData=jwt.verify(token,"Anything");
    // console.log(decodedData._id);
    req.user=decodedData._id
    next();
})

const adminAuth=tryCatcher(async(req,res,next)=>{
    const token=req.cookies['C_Admin_Token'];
    if(!token) return next(new ErrorHandler("You r Not autherize To Access this",401));

    const AdminIDKey=jwt.verify(token,'Anything');

    if(AdminIDKey !=="Admino") return next(new ErrorHandler("U r imposter Please re login it",403));
    req.user=AdminID._id
    next()
})

const socketAuthenticator=async (socket,err,next)=>{
    try {
        
        if(err) return next(err)
            console.log("-------------------------------");
        const authToken=socket.request.cookies['Chat-Token'];
        console.log("---------lll------------")
       

        if(!authToken) return next(new ErrorHandler("Please Login to this route",401));
        const decodedData=jwt.verify(authToken,"Anything")
        const uso=await User.findById(decodedData._id);
        if(!uso) return next(new ErrorHandler("Please Login Correctly",401))
        socket.user=uso;
    console.log(uso)
        return next()

    } catch (error) {
        return next(new ErrorHandler("please Login To access This route",401))
    }
}

module.exports={isAuth,adminAuth,socketAuthenticator}