import { Container, Paper, Typography ,TextField,Button, Avatar,Stack, 
    IconButton, Grid, InputAdornment,Box,
    useTheme,
    useMediaQuery} from "@mui/material"
import { useState } from "react";
import {CameraAlt,Lock as LockIcon,AccountCircle,Description as DescIcon } from "@mui/icons-material"
import {VisuallyHiddenInput} from "../components/styled/StyleComponents"
import axios from "axios";
import { server } from "../components/constants/config";
import { useDispatch } from "react-redux";
import { userExists } from "../redux/reducers/auth";
import toast from "react-hot-toast";
import LoginImage from '../assets/LoginImage.jpg';

const Login=()=>{
    
    const theme = useTheme();
        const isMobile = useMediaQuery(theme.breakpoints.down('md'));
      
    const dispatch=useDispatch();
    const [Login,setLogin]=useState(true);
    const [image, setImage] = useState(null);
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [name,setName]=useState("");
    const [bio,setBio]=useState("");
    const [file,setFile]=useState(null)
    const [isLoading,setIsLoading]=useState(false);

    const toggleLogin=()=>{
        setLogin(!Login);
    }

    const handleImageChange=(e)=>{
        const selectedfile=e.target.files[0];
        console.log(e.target.files)
        console.log(selectedfile)
        if(selectedfile){
            setImage(URL.createObjectURL(selectedfile));
            console.log(URL.createObjectURL(selectedfile))
            setFile(selectedfile)
        }
    }

    const handleLogin=async(e)=>{
        e.preventDefault();
        console.log(username);
        console.log(password);
       setIsLoading(true);
        const config={
            withCredentials:true,
            headers:{
                "Content-Type":"application/json",
            }
        }   
        const toasId=toast.loading('Logging you...');
        try {
            const {data} =await axios.post(`${server}/user/login`,{
                username:username,
                password:password
                },config);
            dispatch(userExists(true))
            toast.success(data.message,{id:toasId})
            
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something Went Wrong",{id:toasId})
        }finally{
            setIsLoading(false);
        }
        
    }

    const handleRegister=async(e)=>{
        e.preventDefault();
        setIsLoading(true);
        const toastId=toast.loading('Great Things Take Time King...');
        const frmData=new FormData();
        frmData.append("name",name);
        frmData.append("bio",bio);
        frmData.append("username",username);
        frmData.append("password",password);
       frmData.append("avatar",file);

        const config=({
            withCredentials:true,
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
        try {
            const {data}=await axios.post(`${server}/user/new`,frmData,config)
            dispatch(userExists(true))
            toast.success(data.message,{id:toastId})
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something Went Wrong",{id:toastId})          
        }finally{
            setIsLoading(false);
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
        // overflow: 'hidden',
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
  
  <img
    src={'https://wallpapercave.com/dwp1x/wp8994439.jpg'}
    alt="Character"
    style={{
      width: '80%',
      height:'100%',
      objectFit: 'contain',
      zIndex: 2, // Ensure the image is above the overlay
      mixBlendMode: 'hard-light', // Experiment with blending modes
      opacity: 0.4, // Adjust image opacity if needed
    //   borderRadius:'20px'
    }}
  />
          
        </Grid>

        {/* Left Panel */}
        <Grid item xs={12} sm={6} sx={{ p:2, display: 'flex', overflowY:'auto',flexDirection: 'column', justifyContent: 'center' }}>
        {Login ? (
                <>
                <Typography  variant="button" fontSize={{xs:'35px',sm:'50px'}} textAlign={'center'} >Login</Typography>
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
      '& input': {
        color: 'rgb(207, 207, 207)',
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
          '& input': {
        color: 'rgb(207, 207, 207)',
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
            <Typography variant="h5" textAlign={'center'}>Register</Typography>
            <form style={{
                width:"100%",
            }}>
                {/* <Stack
  direction="column"
  sx={{
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  }} */}
{/* > */}
    <div style={{position:'relative',display:'flex',justifyContent:'center'}}>
    <Avatar
    alt="Image"
    src={image}
    sx={{
      width: { xs: "8rem", sm: "10rem", md: "10rem" },
      height: { xs: "8rem", sm: "10rem", md: "10rem" },
    }}
  />
  <IconButton
    sx={{
      position: "absolute",
    //   bottom: { xs: "1rem", sm: "1.5rem", md: "1.5rem" }, // Position relative to bottom of Avatar
    //   right: { xs: "1rem", sm: "1.5rem", md: "11.5rem" }, // Position relative to right of Avatar
    bottom: "0.3rem",
    right: "5rem", 
        // { xs: "1rem", sm: "1.5rem", md: "11.5rem" },
       
    //   backgroundColor: "white", // Optional: Add background for better visibility
      "&:hover": { backgroundColor: "rgba(8, 8, 8, 0.8)" }, // Optional: Hover effect
    }}
    onClick={() => document.getElementById("hidden-input").click()}
  >
    <CameraAlt sx={{ color: "grey" }} />
    
  </IconButton>

    </div>
  
{/* </Stack> */}
<VisuallyHiddenInput type="file" id="hidden-input" onChange={handleImageChange} />         
                
<TextField 
  required 
  fullWidth 
  label="Name" 
  margin="normal"
  variant="outlined"
  value={name}
  onChange={(e) => setName(e.target.value)}
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
      '& input': {
        color: 'rgb(207, 207, 207)',
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
  label="Bio" 
  margin="normal"
  variant="outlined"
  value={bio}
  onChange={(e) => setBio(e.target.value)}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <DescIcon />
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
      '& input': {
        color: 'rgb(207, 207, 207)',
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
      '& input': {
        color: 'rgb(207, 207, 207)',
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
          '& input': {
        color: 'rgb(207, 207, 207)',
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

export default Login;