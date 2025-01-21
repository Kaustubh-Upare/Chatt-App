import { DashboardOutlined, Group, Message, Person } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Link } from "../../components/styled/StyleComponents";
import AdminLayout from "./AdminLayout";

const AdminSidebar=()=>{
    const location=useLocation();
    const Easy=({Icons,Name,loca})=>{
        return(
           <Link to={loca}  sx={location.pathname===loca &&{
            backgroundColor:"#1c1c1c",
            color:"white",
            borderRadius:"20px"
           }} >
           <Stack direction={"row"} alignItems={"center"} >
                <IconButton >
                {Icons}
            </IconButton>
            <Typography> {Name}</Typography>
            </Stack>
            </Link>
            )
    
        }
    
    return(
        
        <Stack spacing={"1rem"}>
        <Easy Icons={<DashboardOutlined />} Name={"Dashboard"} loca={"/admin/dashboard"}/>
        <Easy Icons={<Person />} Name={"User"} loca={"/admin/user"} />
        <Easy Icons={<Group />} Name={"Group"} loca={"/admin/group"} />
        <Easy Icons={<Message />} Name={"Message"} loca={"/admin/message"} />

        </Stack>
        
        
    )
}
export default AdminSidebar;
