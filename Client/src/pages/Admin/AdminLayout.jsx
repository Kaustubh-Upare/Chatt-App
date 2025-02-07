import { Drawer, Grid, IconButton, Stack, Typography } from "@mui/material";
import { Menu as MenuIcon ,Close as CloseIcon} from "@mui/icons-material";
import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";



const AdminLayout=({children})=>{
    
const {isAdmin}=useSelector((state)=>state.auth);

    const [isMobile,setIsMobile]=useState(false);
    const Sidebar=({w="100%"})=>{
        return(
            <Stack width={w} padding={"1rem"} spacing={"1rem"}>
                <Typography variant="h3">CHATT ADMIN</Typography>
                {<AdminSidebar />}
            </Stack>
        )
    }
    const HandleClose=()=>{
        setIsMobile(false)
    }
    // const isAdmin=false
    if(!isAdmin){
        return <Navigate to='/admin' />
    }
    
    console.log("haa")

    return(
        <>
        
        <Grid container height={"100vh"}  sx={{overflow:"auto"}}>
            
            <Grid item xs={4} sm={4} bgcolor={"#1c1c1c"} 
            color={"white"}
            sx={{display:{xs:"none",sm:"block"},
                
                }}
            >
                {/* <Stack  padding={"1rem"} spacing={"1rem"}>
                <Typography variant="h3">CHATT ADMIN</Typography>
                {children}
                </Stack> */}
                <Sidebar />
            </Grid>
            
            <Grid item sx={{position:"relative"}} xs={12} sm={8} 
                >
                <IconButton sx={{position:"absolute",right:"1rem",top:"1rem"
                    ,display:{sm:"none"}}} onClick={()=>setIsMobile(!isMobile)}  >
                    {isMobile ? <CloseIcon />: <MenuIcon />  }
                </IconButton>
                    {children}
                

            </Grid>
            <Drawer open={isMobile} onClose={HandleClose} >
                <Sidebar w="50vw"/>
            </Drawer>
        </Grid>
        
        </>
    )
}
export default AdminLayout;
