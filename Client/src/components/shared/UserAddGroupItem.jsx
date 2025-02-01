import { Avatar, IconButton, Stack, Typography } from "@mui/material";
import { Add as AddIcon ,Remove as RemoveIcon} from "@mui/icons-material";
import { useState } from "react";

const UserAddGroupItem=({user,selectedMemberUi,selectedMembers,removeMembers,isAdded})=>{
    const {name,_id,avatar}=user;
    return(
        <Stack direction={"row"} spacing={"1rem"}  width={"100%"} alignItems={"center"} sx={{
            my:"10px"
        }}>
            <Avatar src={avatar}/>
            <Typography variant="body2" sx={{
                flexGrow:"1",
                // bgcolor:"red",
                width:"100%",
                
            }}>{name}</Typography>
            {isAdded
                ?(<IconButton onClick={()=>removeMembers(_id)} >
                {<RemoveIcon color="error"/>}
                </IconButton>)
                :(
                <IconButton onClick={()=>selectedMemberUi(_id)} >
                {selectedMembers.includes(_id)?(<RemoveIcon color="error"/>):(<AddIcon color="primary" />)}
            </IconButton>
                 )
            }
        </Stack>
        
    )
}

export default UserAddGroupItem;