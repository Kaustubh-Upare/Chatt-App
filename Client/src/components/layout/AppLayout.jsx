import Title from "../shared/Title"
import {Drawer, Grid, Skeleton} from "@mui/material"
import Header from "./Header"
import ChatList from "../specific/ChatList"
import { useParams } from "react-router-dom"
import Profile from "../specific/Profile"
import { useMyChatsQuery } from "../../redux/api/api"
import { useDispatch, useSelector } from "react-redux"
import { setIsMobileMenu } from "../../redux/reducers/misc"
import { useErrors, useSocketEvents } from "../../hooks/hook"
import { getSocket } from "../../Socket"
import { NEW_MSG, NEW_REQUEST } from "../constants/socketevents"
import { useCallback, useEffect } from "react"
import { incNotifications } from "../../redux/reducers/chat"

const AppLayout=()=>WrappedComponent =>{
    return (props)=>{
        const params=useParams();
       const chatId=params.id;
       
       const socket=getSocket();
        // useEffect(()=>{
        //     
        //     if (!socket) return;
        //     socket.on('connect', () => {
        //         console.log(`Connected with socket ID: ${socket.id}`);
        //     });
        //     return () => {
        //         socket.off('connect');
        //         socket.disconnect();  // Optionally disconnect on unmount
        //     };
        // },[socket])

        console.log("ok",socket?.id);
       

        const dispatch=useDispatch();

        const {isLoading,data,isError,error,refetch}=useMyChatsQuery("")
        // console.log(data)

        useErrors([{isError,error}]);


        const {isMobileMenu}=useSelector((state)=> state.misc)
        const handleMobileMenu=()=> dispatch(setIsMobileMenu(!isMobileMenu));

        const newRequestHandler=useCallback(()=>{
            dispatch(incNotifications())
        },[dispatch])
        const newMsgAlertHandler=useCallback(()=>{},[])

        const eventArr={
            [NEW_MSG]:newMsgAlertHandler,
            [NEW_REQUEST]:newRequestHandler    
        }
        useSocketEvents(socket,eventArr)

        return (
            <>
                <Title></Title>
                <Header></Header>

                {isLoading ? (
                    <Skeleton />
                ) : (
                <Drawer open={isMobileMenu} onClose={handleMobileMenu} >
                    <ChatList  chats={data?.chats} chatId={chatId} newMessagesAlert={[{
                        chatId,
                        count:4
                    }]} onlineUsers={["1","2"]} 
                    />
                </Drawer>
                    )
                }


                <Grid container height={"calc(100vh - 4rem)"} >
                
                <Grid item 
                sm={4}
                md={3}
                lg={3}  
                sx={{
                    display:{xs:"none",sm:"block"},
                }}
                height={"100%"} overflow={"auto"}>
                {isLoading ? (
                    <Skeleton />
                ) : (
                    <ChatList chats={data?.chats} chatId={chatId} newMessagesAlert={[{
                        chatId,
                        count:4
                    }]} onlineUsers={["1","2"]} 
                    />
                )}
                </Grid>
                
                <Grid item xs={12} sm={5} md={5} lg={6} height={"100%"} >
                    <WrappedComponent {...props} chatId={chatId} />
                </Grid>

                <Grid item xs={3} sm={3} md={4} lg={3} height={"100%"} sx={{
                    display:{xs:"none",
                        sm:"block",
                    },
                    padding:"2rem",
                        bgcolor:"rgb(0, 0, 0)"

                }}><Profile /></Grid>
                

                </Grid>
               
                
            </>
        )
    }

}

export default AppLayout;