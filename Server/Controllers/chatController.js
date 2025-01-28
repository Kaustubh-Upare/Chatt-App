const { tryCatcher } = require("../Middlewares/error.js");
const { ErrorHandler } = require("../Util/utility.js");
const Chat=require('../Models/Chat.js');
const { emitEvent } = require("../Util/feature.js");
const { ALERT, REFETCH_CHATS, NEW_ATTACHMENTS, NEW_MSG_ALERT, NEW_MSG } = require("../constants/events.js");
const { getotherMember } = require("../lib/Helper.js");
const User = require("../Models/user.js");
const Message=require("../Models/Message.js");
const { uploadToCloudinary } = require("../Cloudinary/config.js");

const newGroupChat=tryCatcher(async(req,res,next)=>{
    
    const {name,members}=req.body;

    if(members.length<2) return next(new ErrorHandler("Group Chat must have atleast 2 members",400));
    
    const totalMembers=[...members,req.user];
    
    const u=await Chat.create({
        name,
        groupChat:true,
        members:totalMembers,
        creator:req.user
    })

    emitEvent(req,ALERT,totalMembers,`Welcome to ${name} Group`)
    emitEvent(req,REFETCH_CHATS,members);

    return res.status(201).json({
        success:"true",
        msg:"Group Chat Created"
    })

})

const getMyChat=tryCatcher(async (req,res,next)=>{
    const u=await Chat.find({members:req.user}).populate(
        "members",
        "name avatar"
    );
    console.log(u);
    
    const transformedChats= u.map(({_id,name,members,groupChat})=>{
        const otherMember=getotherMember(members,req.user)
        return {
            _id,
            groupChat,
            name:groupChat
                ? name
                : otherMember.name    
            ,
            members:members.reduce((prev,curr)=>{
                if(curr._id.toString()!==req.user.toString()){
                    prev.push(curr._id);
                }
                return prev;
            },[]),
            avatar:groupChat
                    ? members.slice(0,3).map(({avatar})=>avatar.url)
                    : [otherMember.avatar.url]

        }
    })
    
    
    return res.status(201).json({
        success:true,
        chats:transformedChats
    })
})

const getMyGroups=tryCatcher(async(req,res,next)=>{
    const gchats=await Chat.find({
        members:req.user,
        groupChat:true,
        creator:req.user
    }).populate("members","name avatar");

    const groups=gchats.map(({members,_id,groupChat,name})=>({
        _id,
        name,
        groupChat,
        avatar: members.slice(0,3).map(({avatar})=>avatar.url),
    }))

    return res.status(200).json({
        success:true,
        GChats:groups
    })

})

const   addMembers=tryCatcher(async(req,res,next)=>{

    const {chatId,members}=req.body;
    
    const chatu=await Chat.findById(chatId);
    
    if(!chatu) return next(new ErrorHandler("Chat is Not FOund",401));
    if(!chatu.groupChat) return next(new ErrorHandler("This is not Group Chat",400));
    if(chatu.creator.toString()!==req.user.toString()) return next(new ErrorHandler("U r not Allowed to Handle Members",400))
    
    const uMemPromise=members.map((t)=>User.findById(t));
    const allNewMembers=await Promise.all(uMemPromise);

    chatu.members.push(...allNewMembers.map((i)=> i._id));

    if(chatu.members.length>100){
        return next(new ErrorHandler("Try to buy Premium Version to add the members",403));
    }
    await chatu.save();

    const allUserNames=allNewMembers.map((i)=>i.name).join(',');
    emitEvent(req,ALERT,chatu.members,`${allUserNames} r added to the ${chatu.name} group`);
    emitEvent(req,REFETCH_CHATS,chatu.members);

    return res.status(200).json({
        success:true,
        GChats:allUserNames,
        msg:"members Added Succesfully"
    })
})

const removeMembers=tryCatcher(async(req,res,next)=>{
    const {chatId,userId}=req.body;
    
    const [chatu,userThatWillBeRemoved]=await Promise.all([Chat.findById(chatId),User.findById(userId,"name")]);

    if(!chatu) return next(new ErrorHandler("Chat is Not Found",401));
    if(!chatu.groupChat) return next(new ErrorHandler("This is not Group Chat",400));
    if(chatu.creator.toString()!==req.user.toString()) return next(new ErrorHandler("U r not Allowed to Handle Members",400))

    if(chatu.members.length<3) return next(new ErrorHandler("Group Should atleast have 3 Members",403));
    
    chatu.members=chatu.members.filter((mem)=>(
        mem.toString()!==userId.toString()
    ))

    await chatu.save();
    emitEvent(req,ALERT,chatu.members,`${userThatWillBeRemoved.name} has been removed from the Group`);
    emitEvent(req,REFETCH_CHATS,chatu.members);

    return res.status(201).json({
        success:true,
        msg:"Members Succesfully Removed"
    })

})

const leaveGroup=tryCatcher(async(req,res,next)=>{
    const gchatId=req.params.id;
    
    const chatu=await Chat.findById(gchatId);
    
    if(!chatu) return next(new ErrorHandler("Chat is Not Found",401));
    if(!chatu.groupChat) return next(new ErrorHandler("This is not Group Chat",400));
    
    const remainingMembers=chatu.members.filter((user)=>(
        user.toString()!==req.user.toString()
    ));

    if(chatu.creator.toString()===req.user.toString()){
        chatu.creator=remainingMembers[0];
    }
    chatu.members=remainingMembers;

    const rUser=Promise.all([User.findById(req.user,'name'),chatu.save()]);
    emitEvent(req,ALERT,chatu.members,`User ${rUser.name} is leave from The Group`);
    
    return res.status(201).json({
        success:true,
        msg:"User Leaved The Group"
    })

})

const sendAttachments=tryCatcher(async(req,res,next)=>{
    console.log("server bby")
    console.log(req.body)
    const {chatId}= req.body;
    console.log("server bby2")
    console.log(chatId)
    
    const [chatu,me]= await Promise.all([
        Chat.findById(chatId),
        User.findById(req.user,'name')
    ])
    if(!chatu) return next(new ErrorHandler("Chat Not Found",401));
    const files=req.files || [];
    console.log(files)
    console.log("Clooooooouddddiiiiiinaaary")
    
    
    if(files.length<1) return next(new ErrorHandler("Please Provide attachments",403));

    const attachments=await uploadToCloudinary(files);

    const msgForDB={content:'',attachments,sender:me._id,chat:chatId}
    const msgForRealTime={...msgForDB,sender:{
        _id:me._id,
        name:me.name
    }};

    
    
    const message=await Message.create(msgForDB)

    emitEvent(req,NEW_MSG,chatu.members,{
        message:msgForRealTime,
        chatId
    })
    
    emitEvent(req,NEW_MSG_ALERT,chatu.members,{
        sender:me._id,
        chatId
    })

    return res.status(201).json({
        success:true,
        message
    })
})

const getChatDetails=tryCatcher(async(req,res,next)=>{

    if(req.query.populate==='true'){
        console.log("populate")
        const chatu=await Chat.findById(req.params.id).populate('members','name avatar').lean()
    
        if(!chatu) return next(new ErrorHandler("Chat Not Found",401));
        chatu.members=chatu.members.map(({_id,name,avatar})=>(
            {
                _id,
                name,
                avatar
            }
        ))
        return res.status(201).json({
            success:true,
            chatu
        })
    
    }else{
        const chatu=await Chat.findById(req.params.id)
    
        if(!chatu) return next(new ErrorHandler("Chat Not Found",404));

        return res.status(201).json({
            success:true,
            chatu
        })
    }


})

const renameGroup=tryCatcher(async(req,res,next)=>{
    const chatId=req.params.id;
    const {name}=req.body;


    const chatu=await Chat.findById(chatId);
    if(!chatu) return next(new ErrorHandler("The Group Doesnt Exist",404));

    if(!chatu.groupChat) return next(new ErrorHandler("It is Not Group Jerk",404));

    if(chatu.creator.toString()!==req.user.toString()) return next(new ErrorHandler("U r Not Authorize to Change it",404))

        chatu.name=name;
        await chatu.save();
        
        emitEvent(req,REFETCH_CHATS,chatu.members)

    res.status(201).json({
        success:true,
        msg:`Group Name Changed to ${name}`
    })

})

const deleteGroup=tryCatcher(async(req,res,next)=>{
    const chatId=req.params.id;

    const chatu=await Chat.findById(chatId);
    if(!chatu) return next(new ErrorHandler("The Group Doesnt Exist",404));

    if(!chatu.groupChat) return next(new ErrorHandler("It is Not Group Jerk",404));

    if(chatu.creator.toString()!==req.user.toString()) return next(new ErrorHandler("U r Not Authorize to Change it",404))

    const msgWithAttachments=await Message.find({
        chat:chatu,
        attachments:{$exists:true,$ne:[]}
    })

    const public_ids=[]
    
    msgWithAttachments.forEach((t)=>{
        t.attachments.forEach((k)=>{
            public_ids.push(k.public_ids)
        })
    })

    await Promise.all([
        // Delete Files From Cloudinary,
        chatu.deleteOne(),
        Message.deleteMany({chat:chatId})
    ])

    emitEvent(req,REFETCH_CHATS,chatu.members)

    res.status(201).json({
        success:true,
        msg:`Group Deleted Succesfully`
    })
    
})

const getMsgs=tryCatcher(async(req,res,next)=>{
    const chatId=req.params.id;

    const {page =1}=req.query;
    const limit=20;
    const skip=(page-1)*limit;

    const currentPage = Math.max(1, parseInt(page, 10));

    const [messages,totalMsgsCount]=await Promise.all([await Message.find({chat:chatId})
        .sort({createdAt:-1})
        .skip((currentPage-1)*limit)
        .limit(limit)
        .populate("sender","name avatar")
        .lean(),
        Message.countDocuments({chat:chatId})])
        
        const totalPages=Math.ceil(totalMsgsCount/limit)

        res.status(201).json({
            success:true,
            msg:messages,totalPages
        })

})



module.exports={newGroupChat,getMyChat,getMyGroups,addMembers,removeMembers,leaveGroup,sendAttachments,
    getChatDetails,renameGroup,deleteGroup,getMsgs
}