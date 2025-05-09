import { Avatar, Stack, Typography } from "@mui/material";
import {ElectricBolt, Face,Instagram, Person} from "@mui/icons-material"
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Profile=()=>{


    const ProfileCard=({text,Icon,heading})=>(
        
            <Stack direction={"row"} alignItems={'center'} color={"white"} textAlign={"center"} spacing={1} >
                {Icon && Icon }
                <Stack>
                <Typography variant="body2"
                 sx={{
                    fontSize: {
                      xs: "1rem",   
                      sm: "1.2rem", 
                      md: "1.4rem", 
                    },
                  }}
                >{text}</Typography>
                <Typography variant="caption" color="grey" 
                    sx={{
                        fontSize: {
                          xs: "0.75rem",
                          sm: "0.875rem",
                          md: "1rem",
                        },
                      }}
                >{heading}</Typography>
                </Stack>   
            </Stack>
        
    )
    const {user}=useSelector((state)=>state.auth)
    console.log('profukeee',user)
    

    return(
        <Stack direction={"column"} spacing={"1rem"} alignItems={"center"} sx={{width:'100%',height:'100%'}}>
        <Avatar sx={{
          width: {
            xs: "6rem",
            sm: "7rem",
            md: "8rem",
          },
          height: {
            xs: "6rem",
            sm: "7rem",
            md: "8rem",
          },
          mb: 2,
        }} 
        src={user.avatar?.url}
        />
        {/* <Stack direction={'row'} width={'100%'}>

        </Stack> */}
        <Typography textAlign={'center'} color="rgb(206, 203, 203)" >{user.bio}</Typography>

        <ProfileCard text={user.name} heading={"Name"}  Icon={<Person />}   />
        
        <ProfileCard text={user.username} heading={"Username"}  Icon={<ElectricBolt />}   />
    
        {/* <ProfileCard text={"Checking"} heading={"Okay"} Icon={<Face />}/> */}
        
        </Stack>
    )
}

export default Profile;