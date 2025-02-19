import { Box, IconButton, Input, Skeleton, Stack, TextField, Typography } from "@mui/material";
import AppLayout from "../components/layout/AppLayout";
import {AttachFile as AttachIcon,Send as SendIcon} from "@mui/icons-material"
import { InputBox } from "../components/styled/StyleComponents";
import MessageComponent from "../components/shared/MessageComponent";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getSocket } from "../Socket";
import { Chat_Joined, Chat_Leaved, NEW_MSG, Start_Typing, Stop_Typing } from "../components/constants/socketevents";
import { useGetChatDetailsQuery, useGetOldMsgsQuery } from "../redux/api/api";
import { useSocketEvents } from "../hooks/hook";
import { useDispatch, useSelector } from "react-redux";
import { setIsFileMenu } from "../redux/reducers/misc";
import FileMenuAnchor from "../components/dialog/FileMenuAnchor";
import { removeNewMsgAlert } from "../redux/reducers/chat";
import { TypingLoader } from "../components/layout/Loaders";


const Chats=({chatId})=>{

    const containerRef=useRef(null)
    const bottomRef=useRef(null)
    const lastMessageRef = useRef(null);
    
    const {user}=useSelector((state)=>state.auth)
    const {isFileMenu}=useSelector((state)=>state.misc)
   const dispatch=useDispatch();

    const [fileMenuAnchor,setFileMenuAnchor]=useState(null);
    const [inputMsg,setinputMsg]=useState("");
    const [messages,setMessages]=useState([]);
    // const [showingAllMsgs,setshowingAllMsgs]=useState([])
    
    const [iAmTyping,setiAmTyping]=useState(false);
    const [userTyping,setusertyping]=useState(false);
    const typingTimeout=useRef(null);

    const [infData,setInfData]=useState([]);
    const [page,setPage]=useState(1);
    const [totalPages,setTotalPages]=useState(0);


    const observer = useRef();
    const socket=getSocket();

    const chatDetails=useGetChatDetailsQuery({chatId});
    const members=chatDetails?.data?.chatu?.members;


    useEffect(()=>{
        socket.emit(Chat_Joined,{userId:user?.data?.data,members})
        dispatch(removeNewMsgAlert({chatId}))
       return ()=>{
            setPage(1);
            setInfData([])
            setMessages([]);
           console.log("Unmoutting")
           socket.emit(Chat_Leaved,{userId:user?.data?.data,members})
        }
    },[chatId])
   
    useEffect(()=>{
        console.log("runnnnnnnn")
        if(bottomRef.current){
            console.log("buton",containerRef.current);
            containerRef.current.scrollTo({
                top:containerRef.current.scrollHeight,
                behavior:"smooth"
            })
        }
        
    },[messages])

    const {data:oldMsgsChunck,isLoading}=useGetOldMsgsQuery({chatId,page:page});
    // console.log("ciel",oldMsgsChunck?.totalPages)

    
  
    useEffect(()=>{
        
        console.log("USEeFFECT LOADS",isLoading)
        if(!isLoading && oldMsgsChunck.msg){
            console.log("mongodb",...oldMsgsChunck.msg)
            setTotalPages(()=>oldMsgsChunck.totalPages-1)
            // const g=[...oldMsgsChunck.msg].reverse()
            // console.log("reverse",g)
            
        setInfData((prev)=>[...prev,...oldMsgsChunck.msg])
        }
        console.log("After update, infData:", infData);
    },[page,oldMsgsChunck])

    // useEffect(() => {
    //     console.log("Updated infData:", infData); 
    //   }, [infData]);
    
    const msgOnChangeHandler=(e)=>{
        setinputMsg(e.target.value)
        if(!iAmTyping){
            socket.emit(Start_Typing,({members,chatId}))
            setiAmTyping(true);
        }
        if(typingTimeout.current) clearTimeout(typingTimeout.current)

        typingTimeout.current=setTimeout(()=>{
            socket.emit(Stop_Typing,{members,chatId})
            setiAmTyping(false)
        },1500)
        
    }


    const submitHandler=(e)=>{
        e.preventDefault();
        if(!inputMsg.trim()) return;
        
        socket.emit(NEW_MSG,{chatId,members,message:inputMsg})

        console.log(inputMsg);
        setinputMsg('')
        
    }
    const newMsgHandler=useCallback((data)=>{
                if(data.chatId !== chatId) return;
                setMessages((prev)=>[data.message,...prev])
                },[chatId]); 
    
    const startTypingListener=useCallback((data)=>{
        if(data.chatId !== chatId) return;
        setusertyping(true);
        console.log("Typing..1..",data);
    },[chatId])

    const stopTypingListener=useCallback((data)=>{
        if(data.chatId !== chatId) return;
        console.log("Stop",data);
        setusertyping(false)
    },[chatId])


    const eventArr={
        [NEW_MSG]:newMsgHandler,
        [Start_Typing]:startTypingListener,
        [Stop_Typing]:stopTypingListener
    }   
    useSocketEvents(socket,eventArr)
   console.log(page)
   
    const t=[...messages,...infData];
    // setshowingAllMsgs((prev)=>[...prev,...infData,...messages])
    const fileMenuHandler=(e)=>{
        console.log("okay")
        dispatch(setIsFileMenu(true))
        setFileMenuAnchor(e.currentTarget)
    }

    return(
        chatDetails.isLoading?<Skeleton /> :
        <>
        <Stack ref={containerRef}  bgcolor={"#1D1E24"} height={"90%"} sx={{padding:"0.5rem"
        ,flexDirection:"column-reverse",
            overflowY:"auto",overflowX:"hidden",
            
            }}>
            
        {
            t.map((i,index)=>(
                <MessageComponent key={`infData-${index}`} 
                 message={i} 
                 user={user}
                 reff={index===t.length-2 ? lastMessageRef :null} 
                 totalPages={totalPages}
                 setPage={setPage}
                 index={index}
                 page={page}
                 />
            ))
        }   
        
       
            {userTyping && <TypingLoader />}

            {/* for Scroll should be at bottom */}
            <div className="madad" ref={bottomRef} />
        </Stack>
        <form onSubmit={submitHandler} style={{height:"10%"}}>
            <Stack direction={"row"} alignItems={"center"} height={"100%"} 
            sx={{backgroundColor:"#303030",height:"100%"}}  >
                
                <IconButton onClick={fileMenuHandler} sx={{color:"red"}}>
                <AttachIcon />
                </IconButton>
                {isFileMenu && <FileMenuAnchor anchorEl={fileMenuAnchor} chatId={chatId} />}
                <InputBox placeholder="Type Messages Here...." value={inputMsg} 
                onChange={msgOnChangeHandler}   ></InputBox>

                <IconButton type="submit">
                <SendIcon sx={{color:"red"}} />
                </IconButton>
                
            </Stack>
        </form>
        </>
    )
}

export default AppLayout()(Chats);