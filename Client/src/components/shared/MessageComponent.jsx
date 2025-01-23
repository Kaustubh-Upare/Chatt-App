import { Typography,Box} from "@mui/material";
import { fileFormat } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";

const MessageComponent =({message,user})=>{
    

    const {sender,content,attachments=[],createdAt}=message;
    
    const sameSender=sender._id===user?.data?.data;
    
    return(
        <div
            style={{
                alignSelf:sameSender?"flex-end":"flex-start",
                backgroundColor:"white",
                color:"black",
                borderRadius:"5px",
                padding:"0.5rem",
                width:"fit-content",
                margin:"3px"
            }}
            >
                { !sameSender && <Typography variant="caption" color="blue" fontWeight={"600"}>{sender.name}</Typography>}
                
                { content && <Typography variant="body2">{content}</Typography>}

                {attachments.length > 0 && attachments.map((attachMnt,index)=>{
                    const url=attachMnt.url;
                    const file=fileFormat(url)

                    return(
                        <Box key={index}>
                            <a href={url} target="_blank" download style={{color:"black"}} ><RenderAttachment /></a>
                        </Box>
                    )

                })}
                
                
        </div>
            
    )
}

export default MessageComponent;