import { Stack } from "@mui/material";
import ChatItem from "../shared/ChatItem";


const ChatList=({
    w="100%",
    chats=[],
    chatId,
    onlineUsers=[],
    newMessagesAlert=[{
        chatId:"",
        count:0
    }],
    handleDeleteChat
})=>{
    return(
        <Stack  width={w} direction="column" >
            {
                chats?.map((data,index)=>{
                    const {_id,name,groupChat,members}=data;
                    // const isOnline=onlineUsers.includes(_id );
                    
                    const newMsgPop=newMessagesAlert.find((alert)=>alert.chatId ===_id);
                    const isOnline=members?.some((member)=>onlineUsers.includes(member._id));
                    return <ChatItem newMsgsAlert={newMsgPop} isOnline={isOnline.toString()} 
                        name={name}
                        _id={_id}
                        key={_id}
                        groupChat={groupChat}
                        sameSender={chatId=== _id}
                        handleDelteChatOpen={handleDeleteChat}
                    
                    />
                })
            }
        </Stack>
    )
}
export default ChatList;