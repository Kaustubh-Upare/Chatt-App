import { AppBar, Backdrop, Box, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import {Bolt,Menu as MenuIcon,Search as SearchIcon,Add as AddIcon,Notifications as NotifyIcon,Group as GroupIcon,Logout as LogoutIcon} from '@mui/icons-material'
import {useNavigate} from "react-router-dom"
import { lazy, Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsMobileMenu, setIsNotifications, setIsSearch, } from "../../redux/reducers/misc";


const SearchDialog =lazy(()=> import("../specific/Search"));
const AddDialog =lazy(()=> import("../specific/Add"));
const NotifyDialog=lazy(()=>import("../specific/Notifications"));

const Header=()=>{

    const dispatch=useDispatch();
    const {isMobileMenu,isSearch,isNotifications}=useSelector((state)=> state.misc)
    
    // const handleMobileMenu=()=> ;
    

    // const [isSearch,setIsSearch]=useState(false);
    const [isAddBtn,setisAddBtn]=useState(false);
    const NotificationOpenHandler=()=>{
            dispatch(setIsNotifications(true))
        }
    
    
    
    const IconBtn=({title,icon,onClick})=>{
        return (
            <Tooltip title={title}>
                <IconButton size="large" onClick={onClick}>
                    {icon}
                </IconButton>
            </Tooltip>
        )
    }

    const navigate=useNavigate();

    const handleMobile=()=>{
        console.log("Menu Bar");
        // setIsMobile(prev=>!prev);
        dispatch(setIsMobileMenu(!isMobileMenu))
    }
    const OpenSearch=()=>{
         console.log("Search Btn")
        //  setIsSearch(prev=>!prev);
        dispatch(setIsSearch(!isSearch))
    }
    
    const AddIconDialog=()=>{
        console.log("AddIconDialog Btn")
        setisAddBtn(prev=>!prev);
    }
    const NavigateToGrp=()=>{
        navigate("/groups")
    }
    const LogoutBtn=()=>{
        navigate("/login")
    }
    
    const NotifyDialogBtn=()=>{
        console.log("Notifications Box");
        setIsNotifyBtn(prev=>!prev);
    }

    return(
        <>
        <Box sx={{flexGrow:1}} height={"4rem"} bgcolor={"rgb(25, 29, 29)"}>
                <AppBar>
                <Toolbar>
                <Typography variant="h5" sx={{
                    color:"rgb(228, 243, 11)",
                    padding:"1rem",    
                    display:{xs:"none", sm:"block"}
                }} ><Bolt /> Socket IO
                </Typography>
                
                
                    
                <Box 
                sx={{
                    display:{xs:"block", sm:"none"},
                    padding:"1rem"
                }}
                >
                    <IconButton onClick={handleMobile}>
                        <MenuIcon sx={{
                            textAlign:"center",
                            color:"inherit"
                        }}></MenuIcon>
                    </IconButton>
                    
                </Box>
                <Box sx={{flexGrow:"1"}}></Box>
                <Box>
                    <IconBtn 
                    title={"Search"}
                    icon={<SearchIcon />}
                    onClick={OpenSearch}
                    ></IconBtn>

                    <IconBtn 
                    title={"New Group"}
                    icon={<AddIcon />}
                    onClick={AddIconDialog}
                    ></IconBtn>

                    <IconBtn 
                    title={"Notifications"}
                    icon={<NotifyIcon />}
                    onClick={NotificationOpenHandler}
                    ></IconBtn>
                
                
                    <IconBtn 
                    title={"Group"}
                    icon={<GroupIcon />}
                    onClick={NavigateToGrp}
                    ></IconBtn>
                
                <IconBtn 
                    title={"Logout"}
                    icon={<LogoutIcon />}
                    onClick={LogoutBtn}
                    ></IconBtn>
                    
                </Box>
                
                </Toolbar>
                </AppBar>
        </Box>
        {isSearch && (
            <Suspense fallback={<Backdrop open />}> 
            <SearchDialog />
            </Suspense>)}
        
        {isAddBtn && (
            <Suspense fallback={<Backdrop open />}> 
            <AddDialog />
            </Suspense>)}

        {isNotifications && (
            <Suspense fallback={<Backdrop open />}> 
            <NotifyDialog />
            </Suspense>)}

        </>
    )

   


}   

export default Header;