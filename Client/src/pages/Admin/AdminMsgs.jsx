import AdminLayout from "./AdminLayout";
import { useEffect, useState } from "react";
import Table from "../../components/shared/Table";
import { sampleTableData } from "../../components/shared/sampledata";
import { Avatar, Stack } from "@mui/material";

const columns=[{
    field:"id",
    headerName:"ID",
    headerClassName:"table-header",
    width:200
},{
    field:"avataar",
    headerName:"Avataar",
    headerClassName:"table-header",
    width:180,
    renderCell:(params)=>(
        <Avatar src={params.row.avataar} />
    )
},{
    field:"name",
    headerName:"Name",
    headerClassName:"table-header",
    width:180
},{
    field:"members",
    headerName:"Members",
    headerClassName:"table-header",
    width:180,
    renderCell:(params)=>(
        <Avatar />

    )
},{
    field:"totalMembers",
    headerName:"Total Members",
    headerClassName:"table-header",
    width:180
},{
    field:"totalMsgs",
    headerName:"Total Messages",
    headerClassName:"table-header",
    width:180
}
// {
//     field:"sender",
//     headerName:"Sent By",
//     headerClassName:"table-header",
//     width:180,
//     renderCell:(params)=>(
//         <Stack>
//             <Avatar />
//             <span>{params.row.sender.name}</span>
//         </Stack>
//     )
// },{
//     field:"chat",
//     headerName:"Chat",
//     headerClassName:"table-header",
//     width:130
// },{
//     field:"group Chat",
//     headerName:"Groups",
//     headerClassName:"table-header",
//     width:160
// }
,{
    field:"creator",
    headerName:"Created By",
    headerClassName:"table-header",
    width:160,
    renderCell:(params)=>(
        
        <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} >
            {
                params.row.creatorAvtaar.map((t)=>(
                    
                    <Avatar src={t}/>
                ))
            }
            
        </Stack>
        
        
    )
}]


const AdminMsgs=()=>{
    
    const [rows,setRows]=useState([]);

    useEffect(()=>{
       
        setRows(sampleTableData.chats.map(i=>(
            {...i,
             id:i._id,
             creatorAvtaar:i.creator.avataar.map((u)=>u)
            
            
            }
        )))



    },[])
    
    return(
    <AdminLayout>
    <Table  heading={"All Messages"} rows={rows} columns={columns} />
        
    </AdminLayout>
    )
}

export default AdminMsgs;