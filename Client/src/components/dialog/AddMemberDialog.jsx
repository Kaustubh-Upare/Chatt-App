import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material"
import { sampleUser } from "../shared/sampledata";
import UserSearchItem from "../shared/UserSearchItem";
import UserAddGroupItem from "../shared/UserAddGroupItem";
import { useState } from "react";

const AddMemberDialog=({trial,setTrial,getdata})=>{
    const addFriendHandler=()=>{

    }
    const [selectedMembers,setSelectedMembers]=useState([])
    const selectedMemberUi=(id)=>{
        console.log("okay",id);
        setSelectedMembers((prev)=>prev.includes(id)?prev.filter((f)=>f!==id):[...prev,id]);
        
    }
    const MembersShowing=()=>{
        getdata(selectedMembers);
    }

    return(
        <Dialog open>
            <Stack padding={"1rem"}>
            <DialogTitle>Add Member</DialogTitle>
            <Stack>
                {/* handler={addFriendHandler}/> */}
                {
                    sampleUser.length>0 ? (sampleUser.map((i)=>(
                        <UserAddGroupItem 
                            user={i}
                            selectedMemberUi={selectedMemberUi}
                            selectedMembers={selectedMembers}
                        />
                        
                    ))) :(<Typography variant="h4">No Friends</Typography>)
                }

            </Stack>
                <Stack direction={{xs:"column",sm:"row"}} spacing={"1rem"}>
                    <Button variant="outlined" sx={{color:"skyblue",fontSize:"0.8rem",fontWeight:"700"}}
                    onClick={MembersShowing}
                    >Submit Changes</Button>
                    <Button color="error" variant="outlined">Cancel</Button>
                </Stack>
            </Stack>
        </Dialog>
    )
}
export default AddMemberDialog;