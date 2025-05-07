import { Button, Dialog, DialogTitle, Skeleton, Stack, Typography } from "@mui/material"
import { sampleUser } from "../shared/sampledata";
import UserSearchItem from "../shared/UserSearchItem";
import UserAddGroupItem from "../shared/UserAddGroupItem";
import { useState } from "react";
import { useAddMembersMutation, useAvailableFriendsQuery } from "../../redux/api/api";
import { setIsAddMembers } from "../../redux/reducers/misc";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation } from "../../hooks/hook";
import CubeLoader from "../layout/CubeLoader";
import UserAddMemberItem from "../shared/UserAddMemberItem";

const AddMemberDialog=({chatId,isAddMember})=>{
    
    const dispatch=useDispatch();
    const {data,isLoading,isFetching}=useAvailableFriendsQuery({chatId})
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
        isFetching?<CubeLoader />:
        <Dialog open={isAddMember} onClose={()=>dispatch(setIsAddMembers(false))}
        PaperProps={{
            sx: {
              backgroundColor: "#191D1D", // change this to your desired color
              color: "white", // optional: change text color 
              border:'1px solid rgba(112, 112, 112, 0.38)',
              borderRadius:'12px'
            },
          }}
        >
            <Stack padding={"0.4rem"}>
            <DialogTitle>Add Member</DialogTitle>
            <Stack>
                {/* handler={addFriendHandler}/> */}
                {   isLoading?(<Skeleton />)
                    :(friendsMember.length>0 ? (friendsMember.map((i)=>(
                        <UserAddMemberItem 
                        key={i._id}    
                        user={i}
                            selectedMemberUi={selectedMemberUi}
                            selectedMembers={selectedMembers}
                            isAdded={false}
                        />
                        
                    ))) :(<Typography variant="h5" textAlign={'center'} marginBottom={2}>No Friends</Typography>))
                }

            </Stack>
                <Stack direction={{xs:"column",sm:"row"}} spacing={"1rem"} padding={1}>
                    <Button variant="outlined" sx={{color:"skyblue",fontSize:"0.8rem",fontWeight:"700"}}
                    onClick={addFriendHandler}
                    >Submit Changes</Button>
                    <Button color="error" variant="outlined" onClick={()=>dispatch(setIsAddMembers(false))}  >Cancel</Button>
                </Stack>
            </Stack>
        </Dialog>
    )
}
export default AddMemberDialog;