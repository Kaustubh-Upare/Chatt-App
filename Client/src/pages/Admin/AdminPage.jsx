import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {Navigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { adminLogin, getAdmin } from "../../redux/Thunks/admin";

// const isAdmin=true
const AdminPage=()=>{
    const {isAdmin}=useSelector((state)=>state.auth)
    const dispatch=useDispatch();

    const [password,setPassword]=useState("")

    const submitHandler=(e)=>{
        e.preventDefault();
        console.log("Submit");
        dispatch(adminLogin(password))
    }

        useEffect(()=>{
            dispatch(getAdmin());
            console.log(isAdmin)
            console.log("working")
        },[dispatch])


    if(isAdmin) return <Navigate to="/admin/dashboard" /> 
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
                    type="password"
                    label="Password" 
                    margin="normal" varient="outlined"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
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