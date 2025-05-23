import Title from "../shared/Title"
import {Drawer, Grid, Skeleton} from "@mui/material"
import Header from "./Header"
import ChatList from "../specific/ChatList"
import { useNavigate, useParams } from "react-router-dom"
import Profile from "../specific/Profile"
import { useMyChatsQuery } from "../../redux/api/api"
import { useDispatch, useSelector } from "react-redux"
import { setIsMobileMenu } from "../../redux/reducers/misc"
import { useErrors, useSocketEvents } from "../../hooks/hook"
import { getSocket } from "../../Socket"
import { NEW_MSG_ALERT, NEW_REQUEST, Online_Users, REFETCH_CHATS } from "../constants/socketevents"
import { useCallback, useEffect, useState } from "react"
import { incNotifications, setNewMsgsAlert } from "../../redux/reducers/chat"
import { getOrSaveFromLocalStorage } from "../../lib/features"
import DeleteChatMenuDialog from "../dialog/DeleteChatMenuDialog"

const AppLayout=()=>WrappedComponent =>{
    return (props)=>{
        const params=useParams();
       const chatId=params.id;
       const navigate=useNavigate()

       const socket=getSocket();
        
       
        const [onlineUsers,setOnlineUsers]=useState([]);

        console.log("ok",socket?.id);
       
        const {newMsgAlert} =useSelector((state)=>state.chat);
        const dispatch=useDispatch();
        console.log("New MSG +1",newMsgAlert)

        const {isLoading,data,isError,error,refetch}=useMyChatsQuery("")
        // console.log(data)

        useErrors([{isError,error}]);
        // For locally Storing msg when we reload it will not get removed
        useEffect(()=>{
            getOrSaveFromLocalStorage({key:NEW_MSG_ALERT,value:newMsgAlert})
        },[newMsgAlert])


        const {isMobileMenu}=useSelector((state)=> state.misc)
        const handleMobileMenu=()=> dispatch(setIsMobileMenu(!isMobileMenu));

        const newRequestHandler=useCallback(()=>{
            dispatch(incNotifications())
        },[dispatch])

        const newMsgAlertHandler=useCallback((data)=>{
            
            if(data.chatId===chatId) return ;
            dispatch(setNewMsgsAlert(data))
            const sds=data.chatId;
            console.log("app alert",sds)
        },[chatId])

        const RefetchHandler=useCallback(()=>{
            refetch();
            navigate("/")
        },[refetch,navigate])

        const onlineUsersListener=useCallback((data)=>{
            setOnlineUsers(data)
        },[])

        const eventArr={
            [NEW_MSG_ALERT]:newMsgAlertHandler,
            [NEW_REQUEST]:newRequestHandler,
            [REFETCH_CHATS]:RefetchHandler,
            [Online_Users]:onlineUsersListener
        }
        useSocketEvents(socket,eventArr)

        return (
            <>
                <Title></Title>
                <Header></Header>
                
                {isLoading ? (
                    <Skeleton />
                ) : (
                <Drawer open={isMobileMenu} onClose={handleMobileMenu}
                
                PaperProps={{
                    sx: {
                      backgroundColor: "#191D1D", // change this to your desired color
                      color: "white", // optional: change text color too
                    },
                  }}
                >
                    <ChatList  chats={data?.chats} chatId={chatId} 
                    newMessagesAlert={newMsgAlert} 
                    onlineUsers={onlineUsers} 
                    w={"50vw"}
                    
                    />
                </Drawer>
                    )
                }


                <Grid container  height={"calc(100vh - 4rem)"}    >
                
                <Grid item 
                sm={4}
                md={3}
                lg={3}  
                sx={{
                    display:{xs:"none",sm:"block"},
                    backgroundColor:"#100c14"
                }}
                height={"100%"} overflow={"auto"}>
                {isLoading ? (
                    <Skeleton />
                ) : (
                    <ChatList 
                    chats={data?.chats}
                    chatId={chatId}
                    newMessagesAlert={newMsgAlert} 
                    onlineUsers={onlineUsers} 
                    />
                )}
                </Grid>
                
                <Grid item xs={12} sm={5} md={5} lg={6} height={"100%"} >
                    <WrappedComponent {...props} chatId={chatId} />
                </Grid>

                <Grid item sm={3} md={4} lg={3} height={"100%"} sx={{
                    display:{xs:"none",
                        sm:"block",
                    },
                    paddingTop:"1rem",
                        bgcolor:"#191D1D"

                }}><Profile /></Grid>
                

                </Grid>
               
                
            </>
        )
    }

}

export default AppLayout;