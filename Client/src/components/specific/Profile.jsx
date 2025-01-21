import { Avatar, Stack, Typography } from "@mui/material";
import {Face,Instagram} from "@mui/icons-material"
import { useSelector } from "react-redux";

const Profile=()=>{
    const ProfileCard=({text,Icon,heading})=>(
        
            <Stack direction={"row"} alignItems={"center"} color={"white"} textAlign={"center"} spacing={"1rem"} >
                {Icon && Icon}
                <Stack>
                <Typography variant="body2" fontSize={"1.4rem"}>{text}</Typography>
                <Typography variant="caption" color="grey" fontSize={"1rem"}>{heading}</Typography>
                </Stack>   
            </Stack>
        
    )
    useSelector((state)=>state.user)
    
    
    return(
        <Stack direction={"column"} spacing={"1rem"} alignItems={"center"}>
        <Avatar sx={{
            width:"8rem",
            height:"8rem",
            marginBottom:"12px"
        }} ></Avatar>
        <ProfileCard text={"Kaustubh Upare"} heading={"Username"}  Icon={<Face />}   />
        
        <ProfileCard text={"Kaust_10"} heading={"Insta"}  Icon={<Instagram />}   />
    
        {/* <ProfileCard text={"Checking"} heading={"Okay"} Icon={<Face />}/> */}
        
        </Stack>
    )
}

export default Profile;