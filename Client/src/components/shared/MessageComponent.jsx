import { Typography,Box} from "@mui/material";
import { fileFormat } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";
import { useEffect } from "react";
import {motion} from 'framer-motion'

const MessageComponent =({message,user,setPage,reff,index,totalPages,page})=>{
    
    console.log("induu",reff)
    console.log('totalll',totalPages)
    useEffect(()=>{
        if(!reff || !reff.current || totalPages===1) return;

        const observer=new IntersectionObserver((param)=>{
            console.log("inside induu",index)
            // console.log('bhutanii ket',param)
            if(param[0].isIntersecting && page<totalPages){
                console.log("reference msg component");
                setPage((p)=>p+1);
                window.scrollTo({ top: window.scrollY, behavior: "auto" });
            }
        });

        if(reff){
            observer?.observe(reff.current)
        }
        
        return ()=> {
            if (reff && reff.current){
                console.log("madarbh")
                observer.unobserve(reff.current);
            }
        }

    },[reff,totalPages,page])


    const {sender,content,attachments=[],createdAt}=message;
    
    const sameSender=sender._id===user;
    
    return(
        <motion.div
            initial={{opacity:0,x:"-100%"}}
            animate={{opacity:1,x:0}}
            style={{
                alignSelf:sameSender?"flex-end":"flex-start",
                backgroundColor:sameSender?"#B785F6":"#16171B",
                color:"white",
                borderRadius:"10px",
                padding:"0.7rem",
                width:"fit-content",
                margin:"3px"
            }}
            ref={reff}
            >
                { !sameSender && <Typography variant="button" color="#0F85C1" fontWeight={"400"}>{sender.name}</Typography>}

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
                
                
        </motion.div>
            
    )
}

export default MessageComponent;