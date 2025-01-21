import { Container, Paper, Stack, Typography } from "@mui/material";
import AdminLayout from "./AdminLayout";
import { AdminPanelSettings as AdminPanelSettingsIcon, Group as GroupIcon, Message as MessageIcon, Person as PersonIcon} from "@mui/icons-material";
import { SearchField ,BaseBtn} from "../../components/styled/StyleComponents";
import { DoughnutChart, LineChart } from "../../components/specific/Charts";

const Dashboard=()=>{

    const Appbar=(
        <Paper elevation={3} sx={{
            padding:"1rem",margin:"2rem 0",
            borderRadius:"1rem"
        }}>
            <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
                <AdminPanelSettingsIcon sx={{fontSize:"2rem"}} />
                 <SearchField />
                 <BaseBtn>Search</BaseBtn>
            </Stack>
        </Paper>
    )

    const Widget=({Icons,title,value})=>{
        return(
            <Paper elevation={3} >
                <Stack alignItems={"center"} spacing={"1rem"} padding={"2rem"} >
                    <Typography
                    sx={{
                        borderRadius:"50%",
                        border:"5px solid #38BDF8",
                        width:"5rem",
                        height:"5rem",
                        display:"flex",
                        justifyContent:"center",
                        alignItems:"center",
                        backgroundColor:"#1C1C1C",
                        color:"#33C3F7"
                    }}
                    >{value}</Typography>
                    <Stack alignItems={"center"}>
                        {Icons}
                        <Typography>{title}</Typography>
                    </Stack>
                </Stack>
            </Paper>
        )
    }

    const Widgets=(
        <Stack
        direction={{
            xs:"column",
            sm:"row"
        }}
        spacing={"1rem"}
        justifyContent="space-between"
        alignItems={"center"}
        margin={"2rem 0"}
        >

            <Widget title={"User"} value={34} Icons={<PersonIcon />} />
            <Widget title={"Group"} value={21} Icons={<GroupIcon />} />
            <Widget title={"Messages"} value={11} Icons={<MessageIcon />} />


        </Stack>
    )

    return(
        
        <AdminLayout>
         <Container component={"main"} >
            {Appbar}
            <Stack direction={{
                xs:"column",
                lg:"row"
            }} flexWrap={"wrap"} spacing={"2rem"} justifyContent={"center"} alignItems={{
                xs:"center",
                lg:"stretch"
            }}>
                <Paper elevation={3} sx={{
                    padding:"2rem",
                    // width:"100%",
                    
                    width:{xs:"100%",sm:"50%"},
                    maxWidth:"25rem",
                    // minWidth:"25rem",
                    
                    overflow:"auto"
                }} >
                    <Typography variant="h5">Last Messages</Typography>
                    <LineChart />
                </Paper>

                <Paper elevation={3} sx={{
                    padding:"2rem",
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    width:{xs:"100%",sm:"50%"},
                    position:"relative",
                    // width:"100%",
                    maxWidth:"26rem",
                    height:"26rem"
                }}>
                    <DoughnutChart labels={["Single Chats","Group Chats"]} value={[23,66]} />
                    
                    <Stack
                    position={"absolute"}
                    direction={"row"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    spacing={"0.5rem"}
                    width={"100%"}
                    height={"100%"}
                    // bgcolor={"red"}
                    >
                        <GroupIcon /> <Typography>Vs</Typography> <PersonIcon/>
                    </Stack>

                </Paper>
            </Stack>

                {Widgets}

         </Container>
        </AdminLayout>
    )
}

export default Dashboard;