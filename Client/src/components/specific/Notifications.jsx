import { Dialog, DialogTitle, List, Skeleton, Stack, TextField, Typography } from "@mui/material";
import UserNotifyItems from "../shared/UserNotifyItems";
import { useGetNotificationsQuery } from "../../redux/api/api";
import { useDispatch } from "react-redux";
import { setIsNotifications } from "../../redux/reducers/misc";

const Notifications=()=>{
    const {isLoading,isError,error,data = { sender: []}}= useGetNotificationsQuery();
    // console.log(users)
    const dispatch=useDispatch();
    
    
    const NotificationCloseHandler=()=>{
        dispatch(setIsNotifications(false))
    }


    return(
        <Stack direction={"column"} alignItems={"center"} >
        <Dialog open onClose={NotificationCloseHandler}  
        PaperProps={{
            sx: {
              backgroundColor: "#191D1D", // change this to your desired color
              color: "white", // optional: change text color too
              border:'1px solid rgb(65, 64, 64)',borderRadius:'10px'
            },
          }}
        >
            <DialogTitle  textAlign={"center"}>
              {isLoading?<Skeleton /> :
              <>
                <Typography variant="h6">Notifications</Typography>
               {
                data.sender.length>0 ? data.sender.map(({sender,_id})=><UserNotifyItems user={sender} reqId={_id}/>):<Typography variant="body1">No Notifications</Typography>
               }
              </>
              
              } 
               
            </DialogTitle>
        </Dialog>
        </Stack>
    )
}

export default Notifications;