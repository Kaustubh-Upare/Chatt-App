import { Add as AddIcon, ArrowBackIosNew as ArrowBackIcon, Done as DoneIcon, Edit, Menu as MenuIcon} from "@mui/icons-material";
import { Avatar, Backdrop, Button, Drawer, Grid, IconButton, Input, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { lazy, memo, Suspense, useState } from "react";
import { useNavigate,useSearchParams } from "react-router-dom";
import { Link } from "../components/styled/StyleComponents";
import { samplechats, sampleUser } from "../components/shared/sampledata";
import UserAddGroupItem from "../components/shared/UserAddGroupItem";

const GroupList=({w="100%",myGroups=[],chatId})=>(
    <Stack width={w} sx={{bgcolor:"rgb(227, 241, 27)"}} spacing={"1rem"} height={"100vh"} 
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
    const {name,avtaar,_id}=group;
    return(
    <Link to={`?group=${_id}`} onClick={(e)=>{
        if(chatId === _id) e.preventDefault();
    }}>
        <Stack direction={"row"} spacing="1rem" alignItems={"center"}>
            <Avatar ></Avatar>
            <Typography variant="caption" >{name}</Typography>
        </Stack>
    </Link>
    )
})

const FucConfirmDeleteDialog=lazy(()=>import("../components/dialog/FucConfirmDeleteDialog"));


const AddMemberDialog=lazy(()=>import("../components/dialog/AddMemberDialog"));


const Groups=()=>{

    // const chatId="ok"
    const chatId=useSearchParams()[0].get("group");
    const navigate=useNavigate();
    console.log(chatId)

    const moveBack=()=>{
        navigate("/");
    }

    const [groupName,setGroupName]=useState();
    const [groupNameUpdated,setGroupNameUpdated]=useState();


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
        console.log(`Group Name Update %{chatId}`)
    }

    const GroupName=()=>{
        console.log(isEdit);
        return(
            
            <Stack>
                {
                    isEdit ?(
                        <Stack direction={"row"} spacing={"1rem"}>
                        <TextField placeholder="Enter New Name" sx={{bgcolor:"rgba(0,0,0,0.5)",
                            borderRadius:"5px",
                            
                        }}></TextField>
                        <IconButton color="primary" onClick={updateGroupValue}>
                            <DoneIcon></DoneIcon>
                        </IconButton>
                        </Stack>
                    ) :(
                        
                        <Stack direction={"row"} spacing={"1rem"}>
                        <Typography variant="h5" color="white">Group Name</Typography>
                        <IconButton sx={{bgcolor:"grey"}} onClick={()=>setIsEdit(true)} >
                            <Edit />
                        </IconButton>
                        </Stack>
                        
                    )
                }

                </Stack>
        )
    }

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

    const [isAddMember,setAddMemberDialog]=useState(false); 
    const openAddMemberDialog=()=>{
        setAddMemberDialog(true);
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
            <Button variant="contained" startIcon={<AddIcon/>} onClick={setAddMemberDialog}>Add Member</Button>
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

    return(
        <>
        <Grid container height={"100vh"}>
            <Grid item sm={4} sx={{
                display:{xs:"none",sm:"block"},
                bgcolor:"rgba(0,0,0,0.8)",
                overflow:"auto"
                }}>
                <GroupList myGroups={samplechats} chatId={chatId} w={"50vw"} />
            </Grid>
            <Grid item xs={12} sm={8} sx={{
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                position:"relative",
                bgcolor:"rgba(0,0,0,0.9)"
            }}>
                <IconBtn />
                <GroupName />
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
                    sampleUser.length>0 ? (sampleUser.map((i)=>(
                       trial.includes(i._id) ? (<UserAddGroupItem 
                        user={i} selectedMembers={trial} 
                    />) : (
                        <Typography variant="h4">Add Friends</Typography>
                    )
                        
                        
                    ))) :(<Typography variant="h4">No Friends</Typography>)
                }
                    
                    
                    {isAddMember && (<Suspense fallback={<Backdrop open />}>
                    <AddMemberDialog  trial={trial} getdata={getdata} />
                    </Suspense>)}

                </Stack>
                <ButtonGroup />
                {confirmDeleteDialog && (<Suspense fallback={<div>Loading ..</div>}>
                 <FucConfirmDeleteDialog open={confirmDeleteDialog} handleclose={closeConfirmDeleteDialog} />
                 </Suspense>)}
            </Grid>
        </Grid>

        <Drawer open={isMobileMenuOpen} onClose={handleMobileClose} sx={{
            display:{xs:"block",sm:"none"}
        }}><GroupList myGroups={samplechats} w={"40vw"} /></Drawer>
        </>
    )

}
export default Groups;