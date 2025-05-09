import React, { useState } from 'react';
import {
  Box,
  Button,
  Avatar,
  Typography,
  TextField,
  IconButton,
  Grid,
  useMediaQuery,
  useTheme,
  InputAdornment
} from '@mui/material';
import {Lock as LockIcon,ArrowBack as ArrowBackIcon,AccountCircle} from '@mui/icons-material'
import LoginImage from '../assets/LoginImage.jpg'
import BatmanImage from '../assets/Batman.jpeg'
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthPage=()=>{
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
    const [Login,setLogin]=useState(true);
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    
    const toggleLogin=()=>{
        setLogin(!Login);
    }

    
    const handleLogin=async(e)=>{
            e.preventDefault();
            console.log(username);
            console.log(password);
           
            const config={
                withCredentials:true,
                headers:{
                    "Content-Type":"application/json",
                }
            }   
    
            try {
                const {data} =await axios.post(`${server}/user/login`,{
                    username:username,
                    password:password
                    },config);
                dispatch(userExists(true))
                toast.success(data.message)
            } catch (error) {
                toast.error(error?.response?.data?.message || "Something Went Wrong")
            }
            
        }
    
    return(
    <Box
      sx={{
        height: '100vh',
        background: 'linear-gradient(to bottom, #121212, #1e1e1e)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        color: '#fff',
        padding: isMobile ? 3 : 0, // Add padding for better mobile view
      }}
    >
         <Grid container spacing={0} sx={{  width: '100%',height:'100%',alignItems:'center'}}>
        {/* Right Panel (Character + Chat Bubbles) */}
        <Grid item sm={6} sx={{
             display: {xs:'none',sm:'flex'}, justifyContent: 'center', alignItems: 'center',
             position: 'relative',
             overflow: 'hidden',
             height: '100%',
             }}> {/* Added overflow: 'hidden' for potential clipping */}
  {/* <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(to bottom, rgba(18, 18, 18, 0.5), rgba(30, 30, 30, 0.5))', // Subtle dark gradient overlay
      zIndex: 1, // Ensure it's above the image
      opacity: 0.6, // Adjust opacity for the blending effect
    }}
  /> */}
  <img
    src={BatmanImage}
    alt="Character"
    style={{
      width: '80%',
      height:'100%',
      objectFit: 'contain',
      zIndex: 2, // Ensure the image is above the overlay
      mixBlendMode: 'darken', // Experiment with blending modes
      opacity: 0.7, // Adjust image opacity if needed
      
    }}
  />
          {/* <Box
            sx={{
              position: 'absolute',
              top: isMobile ? '10%' : '25%',
              right: isMobile ? '5%' : '10%',
              background: '#333',
              p: 2,
              borderRadius: 2,
              boxShadow: 4,
              maxWidth: '40%', // Control width on smaller screens
            }}
          >
            <Typography variant="body2">
              <strong>Retr0:</strong> Dreamed to play. Thank you a lot!
            </Typography>
            <Typography variant="caption">5m ago</Typography>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              top: isMobile ? '35%' : '45%',
              left: isMobile ? '5%' : 'auto',
              right: isMobile ? 'auto' : '5%',
              background: '#444',
              p: 2,
              borderRadius: 2,
              boxShadow: 4,
              maxWidth: '40%', // Control width on smaller screens
            }}
          >
            <Typography variant="body2">
              <strong>Dedsec (Support):</strong> You are welcome! Enjoy!
            </Typography>
            <Typography variant="caption">25m ago</Typography>
          </Box> */}
        </Grid>

        {/* Left Panel */}
        <Grid item xs={12} sm={6} sx={{ p:3, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {Login ? (
                <>
                <Typography  variant="button" fontSize={{xs:'35px',sm:'50px'}} >Login</Typography>
                <form style={{
                    width:"100%",
                    marginTop:"1rem"
                }}>

<TextField 
  required 
  fullWidth 
  label="Username" 
  margin="normal"
  variant="outlined"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <AccountCircle />
      </InputAdornment>
    ),
  }}
  sx={{
    borderRadius: '8px',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.2)',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.4)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'grey',
      },
      '&.Mui-focused': {
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
        boxShadow: 'none', // remove blue glow
      },
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
      },
    },
    '& label': {
      color: 'rgba(207, 207, 207, 0.6)',
    },
    '& label.Mui-focused': {
      color: 'rgb(231, 229, 229)',
    },
  }}
/>
                    
                    <TextField
      required
      fullWidth
      type="password"
      label="Password"
      margin="normal"
      variant="outlined"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LockIcon />
          </InputAdornment>
        ),
      }}
      sx={{
        borderRadius: '8px',
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.2)',
          },
          '&:hover fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.4)',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'grey',
          },
          '&.Mui-focused': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
            boxShadow: 'none', // remove blue glow
          },
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
          },
        },
        '& label': {
          color: 'rgba(207, 207, 207, 0.6)',
        },
        '& label.Mui-focused': {
          color: 'rgb(231, 229, 229)',
        },
      }}
    />
                <Button 
                sx={{marginTop:"1rem",marginBottom:1
                    // ,boxShadow:"17px 10px 23px -11px skyblue"
                }} 
                variant="outlined" color="warning" type="submit" fullWidth
                onClick={handleLogin}
                >
                    Login
                </Button>
                
                <Typography textAlign={"center"} marginBottom={1}>OR</Typography>

                <Button  
                variant="outlined"
                fullWidth
                onClick={toggleLogin}
                >Register Instead</Button>

                </form>
                </>
            ) :  <>
            <Typography variant="h5">Register</Typography>
            <form style={{
                width:"100%",
            }}>
                <Stack direction="column" sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    position:"relative"
                }}>
                    <Avatar alt="Image" src={image} sx={{
                        width:"10rem",
                        height:"10rem",
                        
                    }}>
                    
                    </Avatar>
                    <IconButton sx={{
                        position:"absolute",
                        top:100,
                        right:80,
                    }}
                        onClick={() => document.getElementById("hidden-input").click()}
                    >
                        <>
                        <CameraAltIcon sx={{color:"black"}} />
                        <VisuallyHiddenInput type="file" id="hidden-input" onChange={handleImageChange}/>
                        </>
                    </IconButton>

                </Stack>

                

                <TextField 
                required 
                fullWidth 
                label="Name" 
                margin="normal" variant="standard" 
                value={name}
                
                onChange={(e)=>(setName(e.target.value))}
                sx={{
                    input:{color:"white"},
                    "& .MuiInput-underline:before": { borderBottomColor: "skyblue" },
                    "& .MuiInput-underline:hover:before": { borderBottomColor: "#0ec6f0" }, 
                    "& .MuiInput-underline:after": { borderBottomColor: "#c70ef0" },
                        
                    "& label": { color: "white" },
                    "& label.Mui-focused": { color: "rgb(14, 202, 235)" },
                    "&:hover label": { color: "rgb(11, 153, 179)" },
                  }}
                />
                <TextField 
                fullWidth 
                label="Bio" 
                margin="normal" variant="standard" 
                value={bio}
                onChange={(e)=>setBio(e.target.value)}
                sx={{
                    input:{color:"white"},
                    "& .MuiInput-underline:before": { borderBottomColor: "skyblue" },
                    "& .MuiInput-underline:hover:before": { borderBottomColor: "#0ec6f0" }, 
                    "& .MuiInput-underline:after": { borderBottomColor: "#c70ef0" },
                        
                    "& label": { color: "white" },
                    "& label.Mui-focused": { color: "rgb(14, 202, 235)" },
                    "&:hover label": { color: "rgb(11, 153, 179)" },
                  }}
                />
                
               
                <TextField 
                required 
                fullWidth 
                label="Username" 
                margin="normal" variant="standard" 
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                sx={{
                    input:{color:"white"},
                    "& .MuiInput-underline:before": { borderBottomColor: "skyblue" },
                    "& .MuiInput-underline:hover:before": { borderBottomColor: "#0ec6f0" }, 
                    "& .MuiInput-underline:after": { borderBottomColor: "#c70ef0" },
                        
                    "& label": { color: "white" },
                    "& label.Mui-focused": { color: "rgb(14, 202, 235)" },
                    "&:hover label": { color: "rgb(11, 153, 179)" },
                  }}
                />
                
                <TextField 
                required 
                fullWidth 
                type="password"
                label="Password" 
                margin="normal" variant="standard" 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                sx={{
                    input:{color:"white"},
                    "& .MuiInput-underline:before": { borderBottomColor: "skyblue" },
                    "& .MuiInput-underline:hover:before": { borderBottomColor: "#0ec6f0" }, 
                    "& .MuiInput-underline:after": { borderBottomColor: "#c70ef0" },

                    "& label": { color: "white" },
                    "& label.Mui-focused": { color: "rgb(14, 202, 235)" },
                    "&:hover label": { color: "rgb(11, 153, 179)" },
                  }}
                />
            <Button 
            sx={{marginTop:"1rem",marginBottom:"1rem"}} 
            variant="contained" color="primary" type="submit" fullWidth
            onClick={handleRegister} 
                >Register
            </Button>
            
            <Typography textAlign={"center"}>OR</Typography>

            <Button  
            variant="outlined"
            fullWidth
            onClick={toggleLogin}
            color="warning"
            >Login Instead</Button>

            </form>
            </>}
        </Grid>
      </Grid>
    </Box>
    )
}
export default AuthPage