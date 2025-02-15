import { Container, Paper, Typography ,TextField,Button, Avatar,Stack, IconButton} from "@mui/material"
import { useState } from "react";
import {CameraAlt as CameraAltIcon } from "@mui/icons-material"
import {VisuallyHiddenInput} from "../components/styled/StyleComponents"
import axios from "axios";
import { server } from "../components/constants/config";
import { useDispatch } from "react-redux";
import { userExists } from "../redux/reducers/auth";
import toast from "react-hot-toast";

const Login=()=>{
    
    const dispatch=useDispatch();
    const [Login,setLogin]=useState(true);
    const [image, setImage] = useState(null);
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [name,setName]=useState("");
    const [bio,setBio]=useState("");
    const [file,setFile]=useState(null)
    

    const toggleLogin=()=>{
        setLogin(!Login);
    }

    const handleImageChange=(e)=>{
        const selectedfile=e.target.files[0];
        console.log(e.target.files.path)
        if(selectedfile){
            setImage(URL.createObjectURL(selectedfile));
            console.log(URL.createObjectURL(selectedfile))
            setFile(selectedfile)
        }
    }

    const handleLogin=async (e)=>{
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

    const handleRegister=async(e)=>{
        e.preventDefault();
        
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
            toast.success(data.message)
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something Went Wrong")
                   
        }


    }


    return(    
    <Container component={"main"} maxWidth="xs" sx={{
        height:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    }}>
        <Paper
            elevation={16}
            sx={{
                padding:4,
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                bgcolor:"#191D1D",
                color:"white",
                boxShadow: '1px 8px 18px rgb(14, 202, 235)'
            }}
        >
            {Login ? (
                <>
                <Typography  variant="button" fontSize={"50px"} color="" >Login</Typography>
                <form style={{
                    width:"100%",
                    marginTop:"1rem"
                }}>

                    <TextField 
                    required 
                    fullWidth 
                    label="Username" 
                    margin="normal" variant="standard" 
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    
                    sx={{
                        
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
                        
                        "& label": { color: "white" },
                        "& label.Mui-focused": { color: "rgb(14, 202, 235)" },
                        "&:hover label": { color: "rgb(11, 153, 179)" },
                      }}

                    />
                <Button 
                sx={{marginTop:"1rem",marginBottom:"1rem",boxShadow:"17px 10px 23px -11px skyblue"}} 
                variant="contained" color="#212121" type="submit" fullWidth
                onClick={handleLogin}
                
                >
                    Login
                </Button>
                
                <Typography textAlign={"center"}>OR</Typography>

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
                    <Avatar alt="Remy Sharp" src={image} sx={{
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
        </Paper>

    </Container>
    )
}

export default Login;