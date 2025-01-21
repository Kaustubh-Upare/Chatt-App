import { Add as AddIcon } from "@mui/icons-material";
import { Avatar, IconButton, ListItem, Stack, Typography } from "@mui/material";
const UserSearchItem=({user,handler,handlerIsLoading})=>{
    const {name,_id,avatar}=user;
    return(
        <ListItem >
        <Stack direction={"row"} spacing={"1rem"} textAlign={"center"} width={"100%"} alignItems={"center"}>
            <Avatar src={avatar} />
            <Typography variant="body2" sx={{
                flexGrow:"1",
                // bgcolor:"red",
                width:"100%",
                
            }}>{name}</Typography>
            <IconButton onClick={()=>handler(_id)}
                disabled={handlerIsLoading}
                >
             <AddIcon />
            </IconButton>
        </Stack>
        </ListItem>
    )
}

export default UserSearchItem;