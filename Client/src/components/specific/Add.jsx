import { Button, Dialog, DialogTitle, InputAdornment, List, Stack, TextField, Tooltip, Typography } from "@mui/material";
import {Search as SearchIcon} from "@mui/icons-material"
import { sampleUser } from "../shared/sampledata";
import UserAddGroupItem from "../shared/UserAddGroupItem";
import {Cancel as CancelIcon} from "@mui/icons-material"
import { useState } from "react";
const Add=()=>{
    const users=sampleUser
    const [Members,setMembers]=useState(sampleUser)
    const [selectedMembers,setSelectedMembers]=useState([])

    const selectedMemberUi=(id)=>{
        console.log("okay",id);
        setSelectedMembers((prev)=>prev.includes(id)?prev.filter((f)=>f!==id):[...prev,id]);
        
    }
    console.log(selectedMembers)
    return(
            <Dialog open >
                <DialogTitle textAlign={"center"} >
                <Stack direction={"column"} alignItems={"center"} maxWidth={"25rem"} >
        
                    <Typography variant="h7">New Group</Typography>
                    <TextField slotProps={{
                    input:{
                        startAdornment:(
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }
                }} ></TextField>
                </Stack>
                </DialogTitle>
                <List sx={{px:"10px"}} >
                {Members.map((user)=>(
                        <UserAddGroupItem selectedMemberUi={selectedMemberUi} selectedMembers={selectedMembers}
                        user={user}
                        key={user._id} 
                        
                        />
                    ))}
                    <Stack direction={"row"} justifyContent={"space-evenly"}>
                <Button variant="outlined" outl>Create</Button>
                <Tooltip title="Cancel">
                <Button color="error" variant="outlined"><CancelIcon /></Button>
                </Tooltip>
            </Stack>
                </List>
            </Dialog>
        
    )
}

export default Add;