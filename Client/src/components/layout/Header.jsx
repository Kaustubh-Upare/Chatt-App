import { AppBar, Backdrop, Badge, Box, IconButton, Toolbar, Tooltip, Typography, useMediaQuery } from "@mui/material";
import {Bolt,Menu as MenuIcon,Search as SearchIcon,Add as AddIcon,Notifications as NotifyIcon,Group as GroupIcon,Logout as LogoutIcon} from '@mui/icons-material'
import {useNavigate} from "react-router-dom"
import { lazy, Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsMobileMenu, setIsNewGroup, setIsNotifications, setIsSearch, } from "../../redux/reducers/misc";
import { resetNotification } from "../../redux/reducers/chat";
import { server } from "../constants/config.js"
import toast from "react-hot-toast";
import axios from "axios";
import { userNotExists } from "../../redux/reducers/auth.js";

const SearchDialog =lazy(()=> import("../specific/Search"));
const AddDialog =lazy(()=> import("../specific/Add"));
const NotifyDialog=lazy(()=>import("../specific/Notifications"));

const Header=()=>{

    const dispatch=useDispatch();
    const {isMobileMenu,isSearch,isNotifications,isNewGroup}=useSelector((state)=> state.misc)
    const {notificationCount}=useSelector((state)=>state.chat)
    const isSmall = useMediaQuery("(max-width:600px)")
    // const handleMobileMenu=()=> ;
    

    // const [isSearch,setIsSearch]=useState(false);
    // const [isAddBtn,setisAddBtn]=useState(false);
    const NotificationOpenHandler=()=>{
            dispatch(setIsNotifications(true))
            dispatch(resetNotification())
        }
    
    
    
    const IconBtn=({title,icon,onClick,value})=>{
        
        return (
            <Tooltip title={title}>
                <IconButton size={isSmall ? 'small' :'large'} onClick={onClick}>
                    {
                        {value} ? (<Badge badgeContent={value} color="error">{icon}</Badge>)
                            :({icon})
                    }
                    
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
        dispatch(setIsNewGroup(true))
        // setisAddBtn(prev=>!prev);
    }
    const NavigateToGrp=()=>{
        navigate("/groups")
    }
    const LogoutBtn=async()=>{
        const toastId=toast.loading('logging you Out...');
        try {
            await axios.get(`${server}/user/logout`,{
                withCredentials:true
            })
            dispatch(userNotExists())
            toast.success('Logged You Out',{id:toastId})
            navigate("/login")
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong",{id:toastId});
        }
        navigate("/login")
    }
    
    const NotifyDialogBtn=()=>{
        console.log("Notifications Box");
        setIsNotifyBtn(prev=>!prev);
    }

    return(
        <>
        <Box sx={{flexGrow:1}} height={"4rem"} bgcolor={"rgb(25, 29, 29)"}>
                <AppBar color="#0F0F0F">
                <Toolbar>
                <Typography variant="h5" sx={{
                    color:"#A879F8",
                    padding:"1rem",    
                    display:{xs:"none", sm:"block"}
                }} ><Bolt sx={{color:"#E90109",}} /> Chattu
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
                            color:"#5A85F6"
                        }}></MenuIcon>
                    </IconButton>
                    
                </Box>
                <Box sx={{flexGrow:"1"}}></Box>
                <Box>
                    <IconBtn 
                    title={"Search"}
                    icon={<SearchIcon sx={{color:"#5A85F6"}} />}
                    onClick={OpenSearch}
                    ></IconBtn>

                    <IconBtn 
                    title={"New Group"}
                    icon={<AddIcon sx={{color:"#5A85F6"}} />}
                    onClick={AddIconDialog}
                    
                    ></IconBtn>

                    <IconBtn 
                    title={"Notifications"}
                    icon={<NotifyIcon sx={{color:"#5A85F6"}} />}
                    onClick={NotificationOpenHandler}
                    value={notificationCount}
                    ></IconBtn>
                
                
                    <IconBtn 
                    title={"Group"}
                    icon={<GroupIcon sx={{color:"#5A85F6"}} />}
                    onClick={NavigateToGrp}
                    ></IconBtn>
                
                <IconBtn 
                    title={"Logout"}
                    icon={<LogoutIcon sx={{color:"#EF4444"}} />}
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
        
        {isNewGroup && (
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