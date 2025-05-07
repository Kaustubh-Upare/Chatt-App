import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FucConfirmDeleteDialog=({open,handleclose,deleteGroup,chatId})=>{
    const navigate=useNavigate()
    const deleteGroupHandler=()=>{
        console.log("Deleting Group....");
        deleteGroup("Deleting Fun Group...",{chatId})
        navigate('/groups')
    }
    return(
        <Dialog open={open} onClose={handleclose} 
        PaperProps={{
            sx: {
              backgroundColor: "#191D1D", // change this to your desired color
              color: "white", // optional: change text color 
              border:'1px solid rgba(112, 112, 112, 0.38)',
              borderRadius:'12px'
            },
          }}
        >
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
                <DialogContentText color="white">R u Sure u want to Delete this Group</DialogContentText>
            </DialogContent>
            <DialogActions>

                <Button color="error" variant="outlined" 
                    onClick={deleteGroupHandler} >Delete</Button>
                
                <Button variant="contained"onClick={handleclose} >Cancel</Button>
            
            </DialogActions>
        </Dialog>
    )
}

export default FucConfirmDeleteDialog;