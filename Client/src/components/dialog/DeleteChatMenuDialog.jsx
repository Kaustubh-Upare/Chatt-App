import { Delete as DeleteIcon, ExitToApp as ExitToAppIcon } from "@mui/icons-material"
import { IconButton, Menu, Stack, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { setIsDeleteMenu } from "../../redux/reducers/misc"
import {useNavigate} from "react-router-dom"
import { useAsyncMutation } from "../../hooks/hook"
import { useDeleteGroupMutation, useLeaveMemberMutation } from "../../redux/api/api"
import { useEffect } from "react"

const DeleteChatMenuDialog=({groupChat,deleteMenuAnchor})=>{
    const navigate=useNavigate();
    const dispatch=useDispatch()
    const {isDeleteMenu,selectedDeleteChat}=useSelector((state)=>state.misc)
    const [deleteChats,_,deleteChatsData]=useAsyncMutation(useDeleteGroupMutation)
    const[leaveMember,__,leaveMemberData]=useAsyncMutation(useLeaveMemberMutation)

    const LeaveGroupHandler=()=>{
        dispatch(setIsDeleteMenu(false))
        leaveMember("Leaving The Group",{id:selectedDeleteChat.chatId})
        deleteMenuAnchor.current=null
    }
    const DeleteChatHandler=()=>{
        dispatch(setIsDeleteMenu(false))
        deleteChats("Delteting The Chats",{chatId:selectedDeleteChat.chatId})
        deleteMenuAnchor.current=null
    }
    useEffect(()=>{
        if(deleteChatsData || leaveMemberData){
            navigate('/')
        }
    },[deleteChatsData,leaveMemberData])
    
    return(
            <Menu open={isDeleteMenu} 
                onClose={()=>dispatch(setIsDeleteMenu(false))} 
                anchorEl={deleteMenuAnchor.current}
                anchorOrigin={{
                    vertical:'bottom',
                    horizontal:'right'
                }}
                transformOrigin={
                    {
                        vertical:'center',
                        horizontal:'center'
                    }
                }
            >
            <Stack>
            {selectedDeleteChat.groupChat?
                <IconButton onClick={LeaveGroupHandler}>
                    <ExitToAppIcon /> <Typography>Leave a Group</Typography>
                </IconButton>
                :(
                <IconButton onClick={DeleteChatHandler} >
                    <DeleteIcon /> <Typography>Delete Chat</Typography>
                </IconButton>
                )
            }
            </Stack>
            </Menu>
    )
}

export default DeleteChatMenuDialog