import { Button, Dialog, DialogTitle, Skeleton, Stack, Typography } from "@mui/material"
import { sampleUser } from "../shared/sampledata";
import UserSearchItem from "../shared/UserSearchItem";
import UserAddGroupItem from "../shared/UserAddGroupItem";
import { useState } from "react";
import { useAddMembersMutation, useAvailableFriendsQuery } from "../../redux/api/api";
import { setIsAddMembers } from "../../redux/reducers/misc";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation } from "../../hooks/hook";

const AddMemberDialog=({chatId,isAddMember})=>{
    
    const dispatch=useDispatch();
    const {data,isLoading}=useAvailableFriendsQuery({chatId})
    console.log("friends",data?.msg)
    const friendsMember=data?.msg

    const [updateMembers,updateMembersLoading]=useAsyncMutation(useAddMembersMutation)

    
    
    const [selectedMembers,setSelectedMembers]=useState([])

    const selectedMemberUi=(id)=>{
        console.log("okay",id);
        setSelectedMembers((prev)=>prev.includes(id)?prev.filter((f)=>f!==id):[...prev,id]);
        console.log(selectedMembers)
    }
    const addFriendHandler=()=>{
        {updateMembersLoading
            ?<div>Loading</div>
            :(updateMembers("Updating Members",{chatId,members:selectedMembers}))}
    }

    
    return(
        <Dialog open={isAddMember} onClose={()=>dispatch(setIsAddMembers(false))} >
            <Stack padding={"1rem"}>
            <DialogTitle>Add Member</DialogTitle>
            <Stack>
                {/* handler={addFriendHandler}/> */}
                {   isLoading?(<Skeleton />)
                    :(friendsMember.length>0 ? (friendsMember.map((i)=>(
                        <UserAddGroupItem 
                        key={i._id}    
                        user={i}
                            selectedMemberUi={selectedMemberUi}
                            selectedMembers={selectedMembers}
                            isAdded={false}
                        />
                        
                    ))) :(<Typography variant="h4">No Friends</Typography>))
                }

            </Stack>
                <Stack direction={{xs:"column",sm:"row"}} spacing={"1rem"}>
                    <Button variant="outlined" sx={{color:"skyblue",fontSize:"0.8rem",fontWeight:"700"}}
                    onClick={addFriendHandler}
                    >Submit Changes</Button>
                    <Button color="error" variant="outlined">Cancel</Button>
                </Stack>
            </Stack>
        </Dialog>
    )
}
export default AddMemberDialog;