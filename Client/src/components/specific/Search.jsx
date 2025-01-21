import { Dialog, DialogTitle, Input, InputAdornment, List, ListItem, Stack, TextField, Typography } from "@mui/material";
import {Person as PersonIcon} from "@mui/icons-material"
import UserSearchItem from "../shared/UserSearchItem";
import { useEffect, useState } from "react";
import { sampleUser } from "../shared/sampledata";
import { useDispatch, useSelector } from "react-redux";
import { setIsSearch } from "../../redux/reducers/misc";
import { useFriendRequestMutation, useLazySearchUsersQuery } from "../../redux/api/api";
import { useAsyncMutation } from "../../hooks/hook";
const Search=()=>{
    const [searchText,setSearchText]=useState("");
    
    const [searchUser]=useLazySearchUsersQuery()
    const dispatch = useDispatch();
    const [sendFriendReq,isLoadingSendFriendReq]=useAsyncMutation(useFriendRequestMutation)
    const addFriendHandler=async (id)=>{
        console.log(id)
        await sendFriendReq("Sending Friend Request...",{userId:id})
        
    }
    const {isSearch}=useSelector((state)=>state.misc)
    // const isLoadingSendFriendReq=false;
    // const {user}=useSelector((state)=>state.auth)
    const [users,setUsers]=useState([]);

    useEffect(()=>{
        const recomend=setTimeout(()=>{
            searchUser(searchText).then(({data})=>setUsers(data.message)).catch((e)=>console.log("error"))
        },1000)

        return ()=>clearTimeout(recomend)

    },[searchText])

    return(    
        <Stack direction={"column"} alignItems={"center"} >
        <Dialog open={isSearch} onClose={()=>dispatch(setIsSearch(false))}>
            <DialogTitle  textAlign={"center"}>
                <Typography variant="h6">Search People</Typography>
                <TextField  value={searchText}  onChange={(e)=>{setSearchText(e.target.value)}}  slotProps={{
                    input:{
                        startAdornment:(
                            <InputAdornment position="start">
                                <PersonIcon />
                            </InputAdornment>
                        )
                    }
                }} ></TextField>
                <List>
                    {users.map((user)=>(
                        <UserSearchItem 
                        user={user}
                        key={user._id} 
                        handler={addFriendHandler}
                        handlerIsLoading={isLoadingSendFriendReq}
                        />
                    ))}
                </List>
            </DialogTitle>
        </Dialog>
        </Stack>
    )
}

export default Search;