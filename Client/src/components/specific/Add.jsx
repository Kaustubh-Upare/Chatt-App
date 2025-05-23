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
import UserAddMemberItem from "../shared/UserAddMemberItem";
const Add=()=>{
    const dispatch=useDispatch();
    const {isNewGroup}=useSelector((state)=>state.misc)
    
    const {isLoading,data}=useAvailableFriendsQuery();
    const [CreateNewGroupy,newGroupLoading]=useAsyncMutation(useCNewGroupMutation);



    console.log("friend",data)
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
            <Dialog open={isNewGroup} onClose={closeHandler}  sx={{
                "& .MuiPaper-root": { backgroundColor: "#191D1D", color: "#fff",border:'1px solid rgb(65, 64, 64)',borderRadius:'10px' },
                }} >
                <DialogTitle textAlign={"center"} >
                <Stack direction={"column"} alignItems={"center"} maxWidth={"25rem"} >
        
                    <Typography variant="h7">New Group</Typography>
                    <TextField value={textfieldValue} onChange={(e)=>setTextfieldValue(e.target.value)} slotProps={{
                    input:{
                        sx:{color:"#e02d09"},
                        startAdornment:(
                            <InputAdornment position="start">
                                <SearchIcon sx={{color:"#109FE7"}} />
                            </InputAdornment>
                        )
                    }
                }} ></TextField>
                </Stack>
                
                </DialogTitle>
                <List sx={{px:"10px"}} >
                { 
                isLoading?<Skeleton />
                :(data?.ff.map((user)=>(
                        <UserAddMemberItem selectedMemberUi={selectedMemberUi} selectedMembers={selectedMembers}
                        user={user}
                        key={user._id} 
                        isAdded={false}
                        />
                    )))}
                    <Stack direction={"row"} justifyContent={"space-evenly"}>
                <Button variant="outlined" onClick={createHandler} disabled={newGroupLoading} >Create</Button>
                <Tooltip title="Cancel">
                <Button color="error" variant="outlined" onClick={()=> dispatch(setIsNewGroup(false))} ><CancelIcon /></Button>
                </Tooltip>
            </Stack>
                </List>
            </Dialog>
        
    )
}

export default Add;