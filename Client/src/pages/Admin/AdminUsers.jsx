import { useEffect, useState } from "react";
import Table from "../../components/shared/Table";
import AdminLayout from "./AdminLayout"
import { sampleTableData } from "../../components/shared/sampledata";
import { Avatar } from "@mui/material";

const columns=[{
    field:"id",
    headerName:"ID",
    headerClassName:"table-header",
    width:200
},{
    field:"avtaar",
    headerName:"Avtaar",
    headerClassName:"table-header",
    width:180,
    renderCell:()=>(
        <Avatar />
    )
},{
    field:"name",
    headerName:"Name",
    headerClassName:"table-header",
    width:180
},{
    field:"username",
    headerName:"Username",
    headerClassName:"table-header",
    width:180
},{
    field:"friends",
    headerName:"Friends",
    headerClassName:"table-header",
    width:130
},{
    field:"groups",
    headerName:"Groups",
    headerClassName:"table-header",
    width:160
}]

const AdminUsers=()=>{
    
    const [rows,setRows]=useState([]);

    useEffect(()=>{
        setRows(sampleTableData.users.map((i)=>( {...i,id:i._id} )))
    },[])

    return(
        <AdminLayout>
        <div>User</div>
        <Table  heading={"All Users"} rows={rows} columns={columns} />
        </AdminLayout>
    )
}
export default AdminUsers;
