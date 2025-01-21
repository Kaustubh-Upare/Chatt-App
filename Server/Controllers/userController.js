const { compare } = require("bcrypt");
const User = require("../Models/user.js");
const {sendToken, emitEvent}=require("../Util/feature.js");
const { tryCatcher } = require("../Middlewares/error.js");
const {ErrorHandler} =require("../Util/utility.js");
const Chat = require("../Models/Chat.js");
const { default: mongoose } = require("mongoose");
const Request = require("../Models/request.js");
const { NEW_REQUEST, REFETCH_CHATS } = require("../constants/events.js");
const { getotherMember } = require("../lib/Helper.js");
const { uploadToCloudinary } = require("../Cloudinary/config.js");

const newUSer=tryCatcher(async(req,res,next)=>{

    const {name,username,password,bio}=req.body;
    console.log(req.body);

    const file=req.file;
    console.log(file);
    // if(!file) return next(new ErrorHandler("Please Upload Avatar",404)) 

    //     const result=await uploadToCloudinary([file]);

    // const avtaar={
    //     public_id:result[0].public_id,
    //     url:result[0].url
    // }
    // console.log(avataar)

    // const user=await User.create({
    //     name,
    //     username,
    //     password,
    //     avatar:avtaar,
    // })

    // sendToken(res,user,201,"User Created")

    // res.status(201).json({message:"User Created Succesfully"});
})


const login=tryCatcher(async (req,res,next)=>{
    // res.send("Login World");
        const {username,password}=req.body;
        const u=await User.findOne({username}).select("+password")
        console.log(password)
        if(!u) return next(new ErrorHandler("Invalid Username",400));

    const isMatch=await compare(password,u.password);

    if(!isMatch) return next(new Error("Invalid Password"));
    
    sendToken(res,u,201,"Welcome Back");

})


const getMyProfile=tryCatcher(async(req,res,next)=>{
    res.status(201).json({
        success:true,
        data:req.user
    })
})

const logout=tryCatcher(async(req,res,next)=>{
    const cookieOption={
    maxAge:0,
    sameSite:"none",
    httpOnly:true,
    secure:true
    }
    
    return res.status(201).cookie("Chat-Token","",cookieOption).json({
        success:true,
        message:"Logout Succesfully",   
        data:req.user
    })
})

const searchUser=tryCatcher(async(req,res,next)=>{
    const {name=""}=req.query;

    // console.log(typeof req.user)
    // Finding mY Chats
    const myChats=await Chat.find({
        groupChat:false,members: req.user
    })

    // getting users from my Chats that i interacted
    const AllUserFromMyChats=myChats.map(i=>i.members).flat()

    // Extracting users That r not in my chatlist or not my friends
    const userExtractedFromMyChats=await User.find({
        _id:{$nin:AllUserFromMyChats},
        name:{$regex:name,$options:"i"}
    })

    const searchElement=userExtractedFromMyChats.map(({_id,name,avatar})=>(
        {
            _id,
            name,
            avatar:avatar.url
        }
    ))

    return res.status(201).json({
        success:true,
        name,
        message:searchElement,
    
    })
})

const sendFriendRequest=tryCatcher(async(req,res,next)=>{
    const {userId} = req.body;

    const request=await Request.findOne({
        $or:[
            {sender:req.user,reciever:userId},
            {sender:userId,reciever:req.user}
        ]
    });
    if(request) return next(new ErrorHandler("Request Already Sent",403));

    await Request.create({
        sender:req.user,
        reciever:userId,
    });
    emitEvent(req,NEW_REQUEST,[userId]);

    return res.status(201).json({
        success:true,
        message:"Friend Request Sent"
    })
})

const acceptFriendRequest=tryCatcher(async(req,res,next)=>{
    const {requestId,accept}=req.body;

    const request=await Request.findById(requestId)
        .populate("sender","name")
        .populate("reciever","name");

    if(!request) return next(new ErrorHandler("u have Already accepted",403));

    if(request.reciever._id.toString() !== req.user) return next(new ErrorHandler("u are not Autharize To accept it",404));

    if(!accept) {
        await request.deleteOne();
        return res.status(201).json({
            success:true,
            msg:"Request Delete Succesfully"
        })
    }
    
    const membu=[request.sender._id,request.reciever._id];
    // const chatu=await Chat.create({
    //     members:membu,
    //     name:`${request.sender.name}-${request.reciever.name}`

    // })
    Promise.all([
        Chat.create({
            members:membu,
            name:`${request.sender.name}-${request.reciever.name}`
        })
        ,request.deleteOne()
    ])
    
    emitEvent(req,REFETCH_CHATS,membu)
    
    return res.status(201).json({
        success:true,
        message:"Friend Request Accepted",
        sender:request.sender._id
    })
})

const getAllNotifications=tryCatcher(async(req,res,next)=>{
    const request=await Request.find({reciever:req.user}).populate('sender','name avatar')

    const allRequest=request.map(({_id,sender})=>({
        _id,
        sender:{
            _id:sender._id,
            name:sender.name,
            avatar:sender.avatar.url
        }
    }))


    return res.status(201).json({
        success:true,
        sender:allRequest
    })
})

const getFriends=tryCatcher(async(req,res,next)=>{

    const {chatId}=req.query

    const chatu=await Chat.find({members:req.user,groupChat:false})
            .populate("members","name avatar");

    const friends=chatu.map(({members})=>{
        const otherUser=getotherMember(members,req.user)

        return{
            _id:otherUser._id,
            name:otherUser.name,
            avatar:otherUser.avatar.url
        }
    })

    if(chatId){
        const specificChat=await Chat.findById(chatId);
        friends.includes(specificChat.members)
        const availableFriends=friends.filter((f)=>!specificChat.members.includes(f._id))
    
        return res.status(201).json({
            success:true,
            msg:availableFriends
        })
    }else{
            return res.status(201).json({
                success:true,
                ff:friends
            })
        }
})



module.exports={
    login,newUSer,getMyProfile,logout,searchUser,sendFriendRequest
    ,acceptFriendRequest,getAllNotifications,getFriends,
}