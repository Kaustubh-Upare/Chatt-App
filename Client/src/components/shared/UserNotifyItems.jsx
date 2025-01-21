import { Avatar, Button, ListItem, Stack, Typography } from "@mui/material"
import { memo } from "react"
import { useRequestAccRejMutation } from "../../redux/api/api";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const UserNotifyItems=({user,reqId})=>{
   const {name,_id,avatar}=user;
   const [RequestThing]=useRequestAccRejMutation();

   const dispatch=useDispatch();
  
   const AcceptHandler=async()=>{
    console.log("Accept");
    console.log(_id);
    console.log("ReqId",reqId)
    try {
        const res=await RequestThing({requestId:reqId,accept:true});
        toast.success(res.data.message);
    } catch (error) {
        toast.error("Something Went Wrong");
        console.log(error);
    }

    }

   const RejectHandler=async ()=>{
    console.log("Reject");
    console.log(_id);
    console.log("ReqId",reqId)
    try {
        const res=await RequestThing({requestId:reqId,accept:false});
        toast.error(res.data?.error || "Request Rejected");
    } catch (error) {
        toast.error("Something Went Wrong");
        console.log(error);
    }
   }


    return(
        <ListItem>
            <Stack direction={"row"} gap={"1rem"} alignItems={"center"} width={"100%"} maxWidth={"25rem"} >
                <Avatar sx={{margin:"5px"}} src={avatar} />
                <Typography variant="body1"  sx={{
                    flexGrow:"1"
                }} >{name}</Typography>
                <Stack direction={{
                    xs:"column",
                    sm:"row"
                }} >
                    <Button onClick={AcceptHandler} >Accept</Button>
                    <Button sx={{
                        color:"red",

                    }} onClick={RejectHandler}>Reject</Button>
                 </Stack>
            </Stack>


        </ListItem>
    )
}

export default memo(UserNotifyItems)