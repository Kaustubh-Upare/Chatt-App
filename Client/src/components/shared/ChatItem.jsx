import { Box, Stack, Typography } from "@mui/material";
import {Link} from "../styled/StyleComponents";
import { memo } from 'react';
import DeleteChatMenuDialog from "../dialog/DeleteChatMenuDialog";
import {motion} from 'framer-motion'


const ChatItem=({
    // avtaar:[],
    name,
    _id,
    groupChat=false,
    sameSender,
    isOnline,
    newMsgsAlert,
    handleDelteChatOpen,
    deleteMenuAnchor,
    index
})=>{
    return(
        <>
        <DeleteChatMenuDialog groupChat={groupChat} deleteMenuAnchor={deleteMenuAnchor} />

        <Link to={`/chats/${_id}`} onContextMenu={(e)=> handleDelteChatOpen(e,_id,groupChat)}>
            <motion.div
                initial={{opacity:0,targetY:"-100%"}}
                whileInView={{opacity:1,y:0}}
                transition={{delay:index*0.1}}

                style={{
                display:"flex",
                gap:"1rem",
                alignItems:"center",
                padding:"1rem",
                backgroundColor:sameSender?"black":"unset",
                color:sameSender?"white":"unset",
                position:"relative"
            }} >

            <Stack>
                <Typography >{name}</Typography>
                {
                    newMsgsAlert &&(
                        <Typography varient="h6">{newMsgsAlert.count}+ new Msg</Typography>
                    )
                }
            </Stack>
            {isOnline && (
                <Box 
                sx={{
                    width:"10px",
                    height:"10px",
                    borderRadius:"50%",
                    backgroundColor:"green",
                    position:"absolute",
                    top:"50%",
                    right:"1rem",
                    transform:"translateY(-50%)"
                }}
                />
            )}

            </motion.div>
        </Link> 
        </>
    )
}
export default memo(ChatItem);