import { Add as AddIcon, ArrowBackIosNew as ArrowBackIcon, Done as DoneIcon, Edit, Menu as MenuIcon} from "@mui/icons-material";
import { Avatar, Backdrop, Button, CircularProgress, Drawer, Grid, IconButton, Input, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { lazy, memo, Suspense, useEffect, useState } from "react";
import { useNavigate,useSearchParams } from "react-router-dom";
import { Link } from "../components/styled/StyleComponents";
import UserAddGroupItem from "../components/shared/UserAddGroupItem";
import { useAddMembersMutation, useAvailableFriendsQuery, useDeleteGroupMutation, useGetChatDetailsQuery, useMyGroupsQuery, useRemoveMembersMutation, useRenameGroupMutation } from "../redux/api/api";
import { LayoutLoaders } from "../components/layout/Loaders";
import { useAsyncMutation } from "../hooks/hook";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMembers } from "../redux/reducers/misc";


const FucConfirmDeleteDialog=lazy(()=>import("../components/dialog/FucConfirmDeleteDialog"));
const AddMemberDialog=lazy(()=>import("../components/dialog/AddMemberDialog"));


const GroupList=({w="100%",myGroups=[],chatId})=>(
    <Stack width={w} sx={{
        bgcolor:"rgb(227, 241, 27)",
        
    }} spacing={"1rem"} height={"100vh"} 
    overflow={"auto"}   >
        {myGroups.length>0 ? (
            myGroups.map((group)=><GroupListItem group={group} chatId={chatId} key={group._id}/>)
        )    : (
            <Typography>
                No Groups Available
            </Typography>
            )}
    </Stack>
)
 
const GroupListItem=memo(({group,chatId})=>{
    const {name,avatar,_id}=group;
    return(
    <Link to={`?group=${_id}`} onClick={(e)=>{
        if(chatId === _id) e.preventDefault();
    }}>
        <Stack direction={"row"} spacing="1rem" alignItems={"center"}>
            <Stack direction={"row"}>{avatar.map((u,index)=><Avatar src={u} key={`ava${_id}${index}`}></Avatar>)}</Stack>
            <Typography variant="caption" >{name}</Typography>
        </Stack>
    </Link>
    )
})

const Groups=()=>{

    const chatId=useSearchParams()[0].get("group");
    const navigate=useNavigate();
    console.log(chatId)

    const dispatch=useDispatch();
    const {isAddMember}=useSelector((state)=>state.misc)

    const myGroups=useMyGroupsQuery();
    console.log("girup",myGroups?.data)

    const moveBack=()=>{
        navigate("/");
    }

    const [groupMembers,setgroupMembers]=useState([]);

    const ChatDetails=useGetChatDetailsQuery({chatId:chatId,populate:true},{skip:!chatId});
    console.log("Chat detajs",ChatDetails)

    const [renameGroup,isLoadingReGroupName]=useAsyncMutation(useRenameGroupMutation);
    const [removeMembers,isLoadingReMem]=useAsyncMutation(useRemoveMembersMutation);
    const [addMembers,isLoadingAdMem]=useAsyncMutation(useAddMembersMutation);
    const [deleteGroup,deleteGrpLoading]=useAsyncMutation(useDeleteGroupMutation);
    

    const [groupName,setGroupName]=useState();
    const [groupNameUpdated,setGroupNameUpdated]=useState("");    

    useEffect(()=>{
        if(ChatDetails.data)
        {
            setGroupName(ChatDetails.data.chatu.name)
            setGroupNameUpdated(ChatDetails.data.chatu.name)
            setgroupMembers(ChatDetails?.data?.chatu?.members)
        }

        // return ()=>{
        //     setGroupName("")
        //     setGroupNameUpdated("")
        //     setgroupMembers("");
        //     setIsEdit(false);
        // }

    },[ChatDetails.data])

    console.log("ChatDeta",ChatDetails?.data?.chatu.members)
    const [isMobileMenuOpen,setIsMobileMenuOpen]=useState(false)

    const [isEdit,setIsEdit]=useState(false);

    const [confirmDeleteDialog,setConfirmDeleteDialog]=useState(false);

    
    const handleMobile=()=>{
        setIsMobileMenuOpen((prev)=>!prev)
    }

    const handleMobileClose=()=>{
        setIsMobileMenuOpen(false)
    }

    const IconBtn=()=>{
        return(
            <>
            <Tooltip title="Back">
                    <IconButton color="primary" onClick={moveBack} sx={{
                        position:"absolute",
                        left:"1.5rem",
                        top:"1rem",
                        bgcolor:"black",
                        
                    }}>
                        <ArrowBackIcon></ArrowBackIcon>
                    </IconButton>
                </Tooltip> 

                <Tooltip title="Menu">
                    <IconButton color="primary" onClick={handleMobile} sx={{
                        display:{sm:"none"},
                        position:"absolute",
                        
                        top:"1rem",
                        right:"1rem",
                        bgcolor:"black",
                        
                    }}>
                        <MenuIcon></MenuIcon>
                    </IconButton>
                </Tooltip>
            </>
        )
    }

    const updateGroupValue=(e)=>{
        setIsEdit(false)
        console.log(`Group Name Update ${chatId}`)
        renameGroup("Renaming Group",{name:groupNameUpdated,chatId:chatId})
    }

    const GroupName=memo(()=>{
        
        return(
            
            <Stack
             direction={"row"}
             padding={"3rem"}
            >
                {
                    isEdit ?(
                        <Stack direction={"row"} spacing={"1rem"}>
                        <TextField placeholder="Enter New Name" sx={{ color:"white",
                            border:"3px solid white"
                        }}
                          value={groupNameUpdated}
                        onChange={(e)=>setGroupNameUpdated(e.target.value)}
                        ></TextField>
                        <IconButton color="primary" onClick={updateGroupValue} disabled={isLoadingReGroupName}>
                            <DoneIcon></DoneIcon>
                        </IconButton>
                        </Stack>
                    ) :(
                        
                        <Stack direction={"row"} spacing={"1rem"}>
                        <Typography variant="h5" color="white">{groupName}</Typography>
                        <IconButton sx={{bgcolor:"grey",color:"purple"}} onClick={()=>setIsEdit(true)} >
                            <Edit />
                        </IconButton>
                        </Stack>
                        
                    )
                }

                </Stack>
        )
    })

    const openConfirmDeleteDialog=()=>{
        setConfirmDeleteDialog(true);
        console.log("Delete the Group");
        // return (<Suspense fallback={<div>Loading...</div>}>
        //     
        //   </Suspense>
        //   )
          }

    const closeConfirmDeleteDialog=()=>{
        setConfirmDeleteDialog(false);

    }

    // const [isAddMember,setAddMemberDialog]=useState(false); 
    const openAddMemberDialog=()=>{
        dispatch(setIsAddMembers(true));
    }
    const ButtonGroup=()=>(
        <Stack direction={{
            xs:"column",
            sm:"row"
        }}
        spacing={"1rem"}
        p={{
            xs:"1rem",
            sm:"1rem",
            md:"1rem 4rem"
        }}
        >
            <Button variant="contained" startIcon={<AddIcon />} onClick={openAddMemberDialog}>Add Member</Button>
            <Button color="error" variant="contained" onClick={openConfirmDeleteDialog}>Delete Group</Button>
        </Stack>
    )

    const [trial,setTrial]=useState([])
    const getdata=(d)=>{
        setTrial(d);
    }
    console.log(trial)
    // const [selectedMembers,setSelectedMembers]=useState([])
    // const selectedMemberUi=(id)=>{
    //     console.log("okay",id);
    //     setSelectedMembers((prev)=>prev.includes(id)?prev.filter((f)=>f!==id):[...prev,id]);
        
    // }

    // useEffect(()=>{
    //     // setGroupName(`Group Name ${chatId}`);
    //     // setGroupNameUpdated(`Group Name ${chatId}`)

    //     return ()=>{
    //         setGroupName("");
    //         setGroupNameUpdated("");
            
    //     }

    // },[chatId])
    const removeMemberHandler=(id)=>{
        removeMembers("Removing Members...",{chatId,userId:id})
        console.log("okr",d);
    }


    return(
        myGroups.isLoading?<LayoutLoaders />
        :<>
        <Grid container height={"100vh"}>
            <Grid item sm={4} sx={{
                display:{xs:"none",sm:"block"},
                bgcolor:"rgba(0,0,0,0.8)",
                overflow:"auto"
                }}>
                <GroupList myGroups={myGroups?.data?.GChats} chatId={chatId} w={"50vw"} />
            </Grid>

            <Grid item xs={12} sm={8} sx={{
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                position:"relative",
                bgcolor:"rgba(0,0,0,0.9)"
            }}>
                <IconBtn />
                {groupName && <GroupName />}
                <Typography margin={"2rem"} variant="h4" >Members</Typography>
                <Stack
                bgcolor={"white"}
                maxWidth={"45rem"}
                width={"100%"}
                boxSizing={"border-box"}
                padding={{
                    sm:"1rem",
                    xs:"0",
                    md:"1re 4rem"
                }}
                spacing={"2rem"}
                height={"50vh"}
                overflow={"auto"}
                >
                {
                    deleteGrpLoading?<CircularProgress />
                    :
                    (groupMembers.length>0 ? (groupMembers.map((i)=>(
                        (<UserAddGroupItem 
                        user={i}
                        removeMembers={removeMemberHandler} 
                        isAdded={true}
                    />) 
                        
                    ))) :(<Typography variant="h4">No Friends</Typography>)
                    )
                }
                    
                    {isAddMember && (<Suspense fallback={<Backdrop open />}>
                    <AddMemberDialog isAddMember={isAddMember}  chatId={chatId}  />
                    </Suspense>)}

                </Stack>
                <ButtonGroup />
                {confirmDeleteDialog && (<Suspense fallback={<div>Loading ..</div>}>
                 <FucConfirmDeleteDialog open={confirmDeleteDialog} 
                 handleclose={closeConfirmDeleteDialog} deleteGroup={deleteGroup} chatId={chatId} />
                 </Suspense>)}
            </Grid>
        </Grid>

        <Drawer open={isMobileMenuOpen} onClose={handleMobileClose} sx={{
            display:{xs:"block",sm:"none"}
        }}><GroupList myGroups={myGroups?.data?.GChats} w={"50vw"} /></Drawer>
        </>
    )

}
export default Groups;