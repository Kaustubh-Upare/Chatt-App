import { Box, Button, Fade, Stack, Typography } from "@mui/material";
import ChatItem from "../shared/ChatItem";
import { useDispatch } from "react-redux";
import { setIsDeleteMenu, setIsSearch, setSelectedDeleteChat } from "../../redux/reducers/misc";
import { useMemo, useRef } from "react";
import { People } from "@mui/icons-material";
import {motion} from 'framer-motion'

const ChatList=({
    w="100%",
    chats=[],
    chatId,
    onlineUsers=[],
    newMessagesAlert,
    
})=>{
    const dispatch=useDispatch();

    console.log('Checking New',chats)
    const deleteMenuAnchor=useRef(null);
   
    const handleDeleteChat=(e,chatId,groupChat)=>{
        e.preventDefault();
        dispatch(setIsDeleteMenu(true));
        dispatch(setSelectedDeleteChat({chatId,groupChat}))
        deleteMenuAnchor.current=e.currentTarget;
    }
   const handleAddFriends=()=>{
    dispatch(setIsSearch(true))
   }

    return(

        <Stack  width={w} direction="column" sx={{bgcolor:"#191D1D"}} height={"100%"} >
            {chats.length === 0 && (
        <Fade in={true} timeout={1000}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '2rem',
              padding: '2rem',
              borderRadius: '12px',
            //   background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              maxWidth: '400px',
              margin: '2rem auto',
              
            }}
          >
            {/* Animated Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <People sx={{ fontSize: '4rem', color: '#ff9800' }} />
            </motion.div>

            {/* Animated Typography */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Typography
                variant="h6"
                color="error"
                textAlign="center"
                sx={{ fontWeight: 'bold', mb: 2 }}

              >
                Your Chat List is Empty!
              </Typography>
              <Typography
                variant="h6"
                color="info"
                textAlign="center"
                sx={{ mb: 3 }}
              >
                Connect with friends and start chatting now.
              </Typography>
            </motion.div>

            {/* Interactive Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={<People />}
                onClick={handleAddFriends}
                sx={{
                  borderRadius: '20px',
                  textTransform: 'none',
                  padding: '0.5rem 1.5rem',
                  backgroundColor: '#ff9800',
                  '&:hover': {
                    backgroundColor: '#fb8c00',
                  },
                }}
              >
                Add Friends Now
              </Button>
            </motion.div>
          </Box>
        </Fade>
      )}
            
            {
                chats?.map((data,index)=>{
                    const {_id,name,groupChat,members,avatar}=data;
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
                        avatar={avatar}
                    />
                })
            }
        </Stack>
    )
}
export default ChatList;