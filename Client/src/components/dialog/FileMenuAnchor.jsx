import { Image as ImageIcon,MusicNote as MusicNoteIcon,VideoCameraBack as VideoCallOutlinedIcon,FileCopy } from "@mui/icons-material"
import { Menu, MenuItem, MenuList } from "@mui/material"
import { useRef } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { setIsFileMenu, setUploadingLoader } from "../../redux/reducers/misc"
import axios from 'axios'

const FileMenuAnchor=({anchorEl,chatId})=>{
    const {isFileMenu}=useSelector((state)=>state.misc)
    const dispatch=useDispatch();


    const imageRef=useRef(null);
    const audioRef=useRef(null);
    const videoRef=useRef(null);
    const fileRef=useRef(null);

    const selectRef=(ref)=>{
        ref.current?.click();
    }

    const fileChangeHandler=async(e,key)=>{
            const files=Array.from(e.target.files);
            // console.log(files)  
            if(files.length <= 0) return;
            if(files.length>5) return toast.error(`U can Only Send 5 ${key} at a time`)  
            
            const toastId=toast.loading(`Sending ${key}...`)
            dispatch(setUploadingLoader(true));
            try {
                const myForm=new FormData();
                myForm.append("chatId",chatId);
                files.forEach((file)=>myForm.append("Afiles",file))

                const res=await axios.post(`http://localhost:3000/chat/message`,myForm,{
                    headers:{
                        'Content-Type':"multipart/form-data"
                    },
                    withCredentials: true
                })

                console.log(res)
                if(res.data) toast.success(`${key} are uploaded succesfully`,{id:toastId})
                else toast.error(`Images are not Uploaded`,{id:toastId})
            } catch (error) {
                toast.error(error,{id:toastId})
                console.log("error kyaa",error)
            } finally{
                dispatch(setUploadingLoader(false));
            }
    }

    return(
        
        <Menu open={isFileMenu} anchorEl={anchorEl} onClose={()=>dispatch(setIsFileMenu(false))}>
            <MenuList >
                <MenuItem onClick={()=>selectRef(imageRef)}>
                    <ImageIcon /> Images <input type="file" multiple accept="image/png, image/jpg, image/jpeg" 
                    style={{display:"none"}} 
                    onChange={(e)=>fileChangeHandler(e,"image")}
                    ref={imageRef}
                    /> 
                </MenuItem>
                
                <MenuItem onClick={()=>selectRef(audioRef)}>
                    <MusicNoteIcon />Audio <input type="file" multiple accept="audio/mpeg,audio/wav" 
                    style={{display:"none"}} 
                    onChange={(e)=>fileChangeHandler(e,"audio")}
                    ref={audioRef}
                    /> 
                </MenuItem>
                
                <MenuItem onClick={()=>selectRef(videoRef)}>
                    <VideoCallOutlinedIcon />Video <input type="file" multiple accept="video/mp4, video/webm, video/ogg" 
                    style={{display:"none"}} 
                    onChange={(e)=>fileChangeHandler(e,"video")}
                    ref={videoRef}
                    />
                </MenuItem>
                
                <MenuItem onClick={()=>selectRef(fileRef)}>
                    <FileCopy />File <input type="file" multiple accept="*" 
                    style={{display:"none"}} 
                    onChange={(e)=>fileChangeHandler(e,"file")}
                    ref={fileRef}
                    /> </MenuItem>
            </MenuList>
        </Menu>
        
    )
}
export default FileMenuAnchor