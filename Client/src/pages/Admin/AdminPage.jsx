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
            elevation={19}
            sx={{
                padding:4,
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                boxShadow: '11px 22px 64px 26px rgb(255, 8, 49)',
                bgcolor:"#16181C",
                color:"Red"
            }}
        >
            <>
            <Typography variant="h5">Login</Typography>
                
                <form style={{
                    width:"100%",
                    marginTop:"1rem"
                }}>

                    
                    <TextField 
                    required 
                    fullWidth 
                    type="password"
                    label="Password" 
                    margin="normal" variant="standard"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    sx={{
                        "& .MuiInput-underline:before": { borderBottomColor: "maroon" },
                        "& .MuiInput-underline:hover:before": { borderBottomColor: "red" }, 
                        "& .MuiInput-underline:after": { borderBottomColor: "red" }, 
                        "& label": { color: "maroon" },
                        "& label.Mui-focused": { color: "rgb(235, 14, 14)" },
                        "&:hover label": { color: "rgb(231, 18, 18)" },
                      }}

                    />
                <Button 
                sx={{marginTop:"1rem"}} 
                    variant="outlined" color="error" type="submit"  onClick={submitHandler}  fullWidth>Login
                </Button>
                
                </form>
                </>
            
        </Paper>

    </Container>
    )
}

export default AdminPage;