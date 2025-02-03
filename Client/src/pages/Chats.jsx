import { Box, IconButton, Input, Skeleton, Stack, TextField, Typography } from "@mui/material";
import AppLayout from "../components/layout/AppLayout";
import {AttachFile as AttachIcon,Send as SendIcon} from "@mui/icons-material"
import { InputBox } from "../components/styled/StyleComponents";
import MessageComponent from "../components/shared/MessageComponent";
import { useCallback, useEffect, useRef, useState } from "react";
import { getSocket } from "../Socket";
import { NEW_MSG, Start_Typing, Stop_Typing } from "../components/constants/socketevents";
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
    
    const {user}=useSelector((state)=>state.auth)
    const {isFileMenu}=useSelector((state)=>state.misc)
   const dispatch=useDispatch();

    const [fileMenuAnchor,setFileMenuAnchor]=useState(null);
    const [inputMsg,setinputMsg]=useState("");
    const [messages,setMessages]=useState([]);
    const [infData,setInfData]=useState(()=>[]);
    
    const [iAmTyping,setiAmTyping]=useState(false);
    const [userTyping,setusertyping]=useState(false);
    const typingTimeout=useRef(null);

    const [page,setPage]=useState(1);
    const socket=getSocket();
    
    useEffect(()=>{
        dispatch(removeNewMsgAlert({chatId}))
       return ()=>{
            setPage(1);
            setInfData([])
            setMessages([]);
           console.log("Unmoutting")
        }
    },[chatId])
   
    useEffect(()=>{
        if(bottomRef.current) bottomRef.current.scrollIntoView({behavior:"smooth"})
        
    },[messages])

    // console.log("mmm",oldMsgsChunck?.data)
    const {data:oldMsgsChunck,isLoading}=useGetOldMsgsQuery({chatId,page:page});

    const chatDetails=useGetChatDetailsQuery({chatId});
    const members=chatDetails?.data?.chatu?.members;
  
    useEffect(()=>{
        
        if(oldMsgsChunck && Array.isArray(oldMsgsChunck?.msg) && oldMsgsChunck?.msg?.length){
        setInfData((prev)=>[...prev,...oldMsgsChunck?.msg])
        }
        console.log("After update, infData:", infData);
    },[page,oldMsgsChunck])
    
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
                setMessages((prev)=>[...prev,data.message])
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
   
    useEffect(()=>{
        const chatContainer=containerRef.current;
        const hasScrollbar = chatContainer?.scrollHeight > chatContainer?.clientHeight;
        
        console.log("hasScrolBar",hasScrollbar)
        const handleScroll=()=>{
            console.log("ScrollTop:", chatContainer.scrollTop);
            if (chatContainer.scrollTop === 0 && !isLoading) {
              console.log("Scrollbar is at the tops");
              console.log("Fetching older messages...");
              setPage((p)=>p+1)
            }
        }
            console.log("forMyself1",chatContainer?.scrollTop);
       
        chatContainer?.addEventListener("scroll", handleScroll);
        
        return ()=> {
            chatContainer?.removeEventListener("scroll", handleScroll);
            console.log("removed bc");
          };

    },[isLoading,chatId])

    console.log("tota1k",infData)
    console.log("tota2k",messages)
    const t=[...infData,...messages];
    console.log("tota",t)


    const fileMenuHandler=(e)=>{
        console.log("okay")
        dispatch(setIsFileMenu(true))
        setFileMenuAnchor(e.currentTarget)
    }

    return(
        chatDetails.isLoading?<Skeleton /> :
        <>
        <Stack ref={containerRef}  bgcolor={"#0e0e0e"} height={"90%"} sx={{padding:"0.5rem",overflowY:"auto",overflowX:"hidden"}}>
            
        {
            infData.map((i,index)=>(
                <MessageComponent key={`infData-${index}`} message={i} user={user} />
            ))
        }   
        
        {
            messages.map((i)=>(
                <MessageComponent message={i} user={user} />
            ))
        }   
       
            {userTyping && <TypingLoader />}

            {/* for Scroll should be at bottom */}
            <div ref={bottomRef} />
        </Stack>
        <form onSubmit={submitHandler}>
            <Stack direction={"row"} alignItems={"center"} height={"10%"} >
                
                <IconButton onClick={fileMenuHandler}>
                <AttachIcon />
                </IconButton>
                {isFileMenu && <FileMenuAnchor anchorEl={fileMenuAnchor} chatId={chatId} />}
                <InputBox placeholder="Type Messages Here...." value={inputMsg} onChange={msgOnChangeHandler}></InputBox>

                <IconButton type="submit">
                <SendIcon />
                </IconButton>
                
            </Stack>
        </form>
        </>
    )
}

export default AppLayout()(Chats);