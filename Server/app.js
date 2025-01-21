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
const { NEW_MSG, NEW_MSG_ALERT } = require("./constants/events.js");
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
    
    console.log("okay")
    const tempUser=socket.user;
    // console.log("uip",tempUser)
    
    if (!tempUser || !tempUser._id) {
        console.error("Invalid user. Disconnecting socket:", socket.id);
        socket.disconnect();
        return;
    }
    
    
    console.log(tempUser)
    
    userSocketIds.set(tempUser._id,socket.id);

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
socket.on("disconnect",()=>{
    console.log("dissconnected",socket.id);
    userSocketIds.delete(tempUser._id.toString());
    
    console.log("User deleted succesfully")
})
})




server.listen(3000,()=>{
    console.log("Server is running on port 3000");
})
