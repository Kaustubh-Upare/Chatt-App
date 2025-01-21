import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const FucConfirmDeleteDialog=({open,handleclose})=>{
    return(
        <Dialog open={open} onClose={handleclose} >
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
                <DialogContentText>R u Sure u want to Delete this Group</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="error" variant="outlined">Delete</Button>
                <Button variant="contained">Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default FucConfirmDeleteDialog;