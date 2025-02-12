const jwt = require("jsonwebtoken");
const { tryCatcher } = require("../Middlewares/error.js");
const Chat = require("../Models/Chat.js");
const Message = require("../Models/Message.js");
const User = require("../Models/user.js");
const { ErrorHandler } = require("../Util/utility.js");
const { cookieOptions } = require("../Util/feature.js");

const userAdmin=tryCatcher(async(req,res,next)=>{
    const users=await User.find({});

    const transformedUsers=await Promise.all(
        users.map(async({name,username,avatar,_id})=>{
            const [groups,friends] = await Promise.all([
                Chat.countDocuments({groupChat:true,members:_id}),
                Chat.countDocuments({groupChat:false,members:_id})
            ]);
            return{
                _id,
                name,
                username,
                avatar:avatar.url,
                groups,
                friends
            }
        
        })

    )

    res.status(201).json({
        success:true,
        msg:transformedUsers
    })


})

const userMsgs=tryCatcher(async(req,res,next)=>{
    const chatu=await Chat.find({}).populate('members',"name avatar").populate('creator',"name avatar");

    const chatuDetails=await Promise.all(
        chatu.map(async({_id,name,members,creator,groupChat})=>{
            
            const totalMsgs=await Message.countDocuments({chat:_id})

            return{
                groupChat,
                _id,
                name,
                members:members.map(({name,avatar,_id})=>({
                    name,
                    _id,
                    avatar:avatar.url,
                }
                )),
                creator:{
                    name:creator?.name || "none",
                    avatar:creator?.avatar.url || ""
                },
                totalMembers:members.length,
                totalMessages:totalMsgs
            }
        })

    )
    return res.status(201).json({
        success:true,
        msg:chatuDetails
    })

})

const userDashboard=tryCatcher(async(req,res,next)=>{
    
    const [usero,groupo,msgs]=await Promise.all([
         User.countDocuments(),
         Chat.countDocuments({groupChat:true}),
         Message.countDocuments()
    ])
    
    const today= new Date();
    const last7Days=new Date();
    last7Days.setDate(today.getDate()-7);

    const last7DaysMsgs=await Message.find({createdAt:{
        $gte:last7Days,
        $lte:today,
    }}).select('+createdAt');
    console.log(last7DaysMsgs)
    const msgsChart=new Array(7).fill(0);

    last7DaysMsgs.forEach(msg=>{
        const approxIndex=(today.getTime()-msg.createdAt.getTime())/(1000*60*60*24);
        const Index=Math.min(6, Math.max(0, Math.floor(approxIndex)));
        msgsChart[6-Index]++
    })
    console.log(msgsChart)

    return res.status(201).json({
        success:true,
        msgsChart,
        user:usero,
        groupo,
        msgs,

    })
})

const AdminLogin=tryCatcher(async(req,res,next)=>{
    const {secretKey}=req.body;

    const adminSecretKey="Admino";

    const isMatch=secretKey === adminSecretKey;
    if(!isMatch) return next(new ErrorHandler("Ur Admin Validation Fails",401));
    
    const token=jwt.sign(secretKey,"Anything");
    return res.status(201).cookie("C_Admin_Token",token,{...cookieOptions,maxAge:1000*60*15}).json({
        success:true,
        msg:"Admin Autheticated Welcome Boss"
    })

})

const AdminLogout=tryCatcher(async(req,res,next)=>{
    return res.status(201).cookie("C_Admin_Token","",{...cookieOptions,maxAge:0}).json({
        success:true,
        msg:"Admin Logout Succesfully"
    })
})

const getAdminData=tryCatcher(async(req,res,next)=>{
    return res.status(200).json({
        admin:true
    })
})

module.exports={userAdmin,userMsgs,userDashboard,AdminLogin,AdminLogout,getAdminData}