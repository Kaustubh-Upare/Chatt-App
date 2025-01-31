import { Avatar, IconButton, Stack, Typography } from "@mui/material";
import { Add as AddIcon ,Remove as RemoveIcon} from "@mui/icons-material";

const UserAddGroupItem=({user,selectedMemberUi,selectedMembers})=>{
    const {name,_id,avatar}=user;
    return(
        <Stack direction={"row"} spacing={"1rem"}  width={"100%"} alignItems={"center"} sx={{
            my:"10px"
        }}>
            <Avatar src={avatar.url}/>
            <Typography variant="body2" sx={{
                flexGrow:"1",
                // bgcolor:"red",
                width:"100%",
                
            }}>{name}</Typography>
            <IconButton onClick={()=>selectedMembers(_id)} >
                <RemoveIcon color="error"/>
            </IconButton>
            
        </Stack>
        
    )
}

export default UserAddGroupItem;