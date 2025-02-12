const express=require("express");
const connectDB = require("./Util/DbConnect.js");
const { errorMiddleware } = require("./Middlewares/error.js");
const cookieParser = require('cookie-parser')
const { v4: uuid } = require('uuid');
const cors=require('cors')

// Socket THing
const {Server}=require("socket.io")
const {createServer}=require("http");


const userRoute=require("./Routes/user.js");
const chatRoute=require("./Routes/chat.js");
const adminRoute=require("./Routes/admin.js");
const { NEW_MSG, NEW_MSG_ALERT, Start_Typing, Stop_Typing, Chat_Joined, Chat_Leaved,Online_Users } = require("./constants/events.js");
const user = require("./Models/user.js");
const { getSockets, userSocketIds } = require("./lib/Helper.js");
const Message = require("./Models/Message.js");
const corsOption = require("./constants/config.js");
const { socketAuthenticator } = require("./Middlewares/Auth.js");
require('dotenv').config()
// const ok = require("./Seeders/createUser.js");


connectDB("mongodb://localhost:27017/ChattApp")
const app=express();

//Socket *************************
const server=createServer(app);
const io=new Server(server,{
    cors:corsOption
});

app.set("io",io)

//Socket *************************


// Middleware
app.use(cors(corsOption))
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser())


// Routes
app.use('/user',userRoute);
app.use('/chat',chatRoute);
app.use("/admin",adminRoute)
app.use(errorMiddleware);

const onlineUsers=new Set();

// Socket COnnection THing-------------------
app.get("/",(req,res,next)=>{
    res.send("okay");
})

io.use((socket,next)=>{
    cookieParser()(socket.request,socket.request.res,async (er)=>{
        await socketAuthenticator(socket,er,next)
    })
})

io.on("connection",(socket)=>{
    
    // console.log("okay")
    const tempUser=socket.user;
    
    if (!tempUser || !tempUser._id) {
        console.error("Invalid user. Disconnecting socket:", socket.id);
        socket.disconnect();
        return;
    }
    
    // console.log(tempUser)
    
    userSocketIds?.set(tempUser._id.toString(),socket.id);

    console.log("okayss",userSocketIds)
    console.log("Socket Connected",socket.id);
    
    socket.on(NEW_MSG,async ({chatId,members,message})=>{

        const msgForRealTime={
            _id:uuid(),
            content:message,
            sender:{
                _id:tempUser._id,
                name:tempUser.name
            },
            chat:chatId,
            createdAt:new Date().toISOString()
        }
        console.log(message)
        const msgForDB={
            content:message,
            sender:tempUser._id,
            chat:chatId
        }

        console.log("Emitting")
        console.log(members)
        const memberSocket=getSockets(members)
        console.log(memberSocket)
        io.to(memberSocket).emit(NEW_MSG,{
            chatId,
            message:msgForRealTime,
        });
        io.to(memberSocket).emit(NEW_MSG_ALERT,{chatId})

        await Message.create(msgForDB) 

        console.log("New Message : ",msgForRealTime)
      

    
    // socket.on("disconnect",(so)=>{
    //     console.log("dissconnected",so);
    //     userSocketIds.delete(user._id);
})
    socket.on(Start_Typing,({chatId,members})=>{
        console.log("Typing...")
        const memSockets=getSockets(members);
        socket.to(memSockets).emit(Start_Typing,{chatId});
    })
    socket.on(Stop_Typing,({chatId,members})=>{
        console.log("Stopped Typing")
        const memSockets=getSockets(members);
        socket.to(memSockets).emit(Stop_Typing,{chatId});
    })
    socket.on(Chat_Joined,({userId,members})=>{
        console.log("Chat Joined",userId);
        onlineUsers.add(userId);
        const membersSocket=getSockets(members);
        io.to(membersSocket).emit(Online_Users,Array.from(onlineUsers))
    })
    
    socket.on(Chat_Leaved,({userId,members})=>{
        console.log("Chat Leaved",userId);
        onlineUsers.delete(userId);
        const membersSocket=getSockets(members);
        io.to(membersSocket).emit(Online_Users,Array.from(onlineUsers))
    })
    socket.on("disconnect",()=>{
    console.log("Disconnected", socket.id); 
    // Ensure _id is converted to string to match the map key format
    userSocketIds.delete(tempUser._id);
    onlineUsers.delete(tempUser._id);
    socket.broadcast.emit(Online_Users,Array.from(onlineUsers))
    console.log(onlineUsers)
    console.log("User deleted successfully from userSocketIds");
    })
socket.on("reconnect", () => {
    console.log(`Socket reconnected: ${socket.id} for user ${tempUser._id}`);

    // Update the socket ID in the map
    userSocketIds.set(tempUser._id.toString(), socket.id);
});


})




server.listen(3000,()=>{
    console.log("Server is running on port 3000");
})
