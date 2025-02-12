import { Stack } from "@mui/material";
import ChatItem from "../shared/ChatItem";
import { useDispatch } from "react-redux";
import { setIsDeleteMenu, setSelectedDeleteChat } from "../../redux/reducers/misc";
import { useMemo, useRef } from "react";


const ChatList=({
    w="100%",
    chats=[],
    chatId,
    onlineUsers=[],
    newMessagesAlert,
    
})=>{
    const dispatch=useDispatch();

    const deleteMenuAnchor=useRef(null);
   
    const handleDeleteChat=(e,chatId,groupChat)=>{
        e.preventDefault();
        dispatch(setIsDeleteMenu(true));
        dispatch(setSelectedDeleteChat({chatId,groupChat}))
        deleteMenuAnchor.current=e.currentTarget;
        console.log("Context",chatId,groupChat)
    }
   

    return(

        <Stack  width={w} direction="column" >
            {
                chats?.map((data,index)=>{
                    const {_id,name,groupChat,members}=data;
                 // const isOnline=onlineUsers.includes(_id );
                    
                    const newMsgPop=newMessagesAlert.find((alert)=>alert.chatId ===_id);
                    const isOnline=members?.some((member)=>onlineUsers.includes(member));
                    return <ChatItem newMsgsAlert={newMsgPop} isOnline={isOnline} 
                        name={name}
                        _id={_id}
                        key={_id}
                        groupChat={groupChat}
                        sameSender={chatId=== _id}
                        handleDelteChatOpen={handleDeleteChat}
                        deleteMenuAnchor={deleteMenuAnchor}
                        index={index}
                    />
                })
            }
        </Stack>
    )
}
export default ChatList;