import { FileOpen as FileOpenIcon } from "@mui/icons-material"

const RenderAttachment=({file,url})=>{
    switch (file) {
        case "image":
            return <img src="url" alt="Attachment" width={"200px"} height={"150px"} style={{
                objectFit:"contain"
            }}></img>
        
        case "video":
            return <video src={url} preload="none" width={"200px"} controls></video>
        
        case "audio":
            return <audio src={url} preload="none"  controls></audio>
       
        default:
            return <FileOpenIcon />;
    }
}

export default RenderAttachment;