import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";




const AdminPage=()=>{

    const submitHandler=(e)=>{
        e.preventDefault();
        console.log("Submit");
    }

    return(    
    <Container component={"main"} maxWidth="xs" sx={{
        height:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    }}>
        <Paper
            elevation={3}
            sx={{
                padding:4,
                display:"flex",
                flexDirection:"column",
                alignItems:"center"
            }}
        >
            <>
            <Typography varient="h5">Login</Typography>
                
                <form style={{
                    width:"100%",
                    marginTop:"1rem"
                }}>

                    <TextField 
                    required 
                    fullWidth 
                    label="Username" 
                    margin="normal" varient="outlined" 
                    />
                    
                    <TextField 
                    required 
                    fullWidth 
                    type="password"
                    label="Password" 
                    margin="normal" varient="outlined" 
                    />
                <Button 
                sx={{marginTop:"1rem"}} 
                    varient="contained" color="primary" type="submit"  onClick={submitHandler}  fullWidth>Login
                </Button>
                
                </form>
                </>
            
        </Paper>

    </Container>
    )
}

export default AdminPage;