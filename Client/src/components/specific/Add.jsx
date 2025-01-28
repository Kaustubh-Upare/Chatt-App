import { Button, Dialog, DialogTitle, InputAdornment, List, Skeleton, Stack, TextField, Tooltip, Typography } from "@mui/material";
import {Search as SearchIcon} from "@mui/icons-material"
import { sampleUser } from "../shared/sampledata";
import UserAddGroupItem from "../shared/UserAddGroupItem";
import {Cancel as CancelIcon} from "@mui/icons-material"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAvailableFriendsQuery, useCNewGroupMutation } from "../../redux/api/api";
import { setIsNewGroup } from "../../redux/reducers/misc";
import toast from "react-hot-toast";
import { useAsyncMutation } from "../../hooks/hook";
const Add=()=>{
    const dispatch=useDispatch();
    const {isNewGroup}=useSelector((state)=>state.misc)
    
    const {isLoading,data}=useAvailableFriendsQuery();
    const [CreateNewGroupy,newGroupLoading]=useAsyncMutation(useCNewGroupMutation);



    console.log("friend",data)
    const users=sampleUser
    const [Members,setMembers]=useState(sampleUser)
    const [selectedMembers,setSelectedMembers]=useState([])
    const [textfieldValue,setTextfieldValue]=useState("");

    const selectedMemberUi=(id)=>{
        console.log("okay",id);
        setSelectedMembers((prev)=>prev.includes(id)?prev.filter((f)=>f!==id):[...prev,id]);
        
    }

    const createHandler=()=>{
        if(!textfieldValue) return toast.error("Group Name is Required")

        if(selectedMembers.length<2) return toast.error("To Form a group atleast 3 members is required")
        console.log(textfieldValue,selectedMembers)
        CreateNewGroupy("Creating Group...",{name:textfieldValue,members:selectedMembers})

    }

    const closeHandler=()=>{
        dispatch(setIsNewGroup(false))
    }

    console.log(selectedMembers)
    return(
            <Dialog open={isNewGroup} onClose={closeHandler} >
                <DialogTitle textAlign={"center"} >
                <Stack direction={"column"} alignItems={"center"} maxWidth={"25rem"} >
        
                    <Typography variant="h7">New Group</Typography>
                    <TextField value={textfieldValue} onChange={(e)=>setTextfieldValue(e.target.value)} slotProps={{
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
                { 
                isLoading?<Skeleton />
                :(data.ff.map((user)=>(
                        <UserAddGroupItem selectedMemberUi={selectedMemberUi} selectedMembers={selectedMembers}
                        user={user}
                        key={user._id} 
                        
                        />
                    )))}
                    <Stack direction={"row"} justifyContent={"space-evenly"}>
                <Button variant="outlined" onClick={createHandler} disabled={newGroupLoading} >Create</Button>
                <Tooltip title="Cancel">
                <Button color="error" variant="outlined"><CancelIcon /></Button>
                </Tooltip>
            </Stack>
                </List>
            </Dialog>
        
    )
}

export default Add;