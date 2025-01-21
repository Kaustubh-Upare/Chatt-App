import io from "socket.io-client"
import { server } from "./components/constants/config"
import { createContext, useContext, useMemo } from "react";

const SocketContext=createContext();

const getSocket=()=> useContext(SocketContext);

const SocketProvider=({children})=>{
    const socket=useMemo(()=>
        io(server,{withCredentials:true})
        ,[])
    
    return(
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export {SocketProvider,getSocket};