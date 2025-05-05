import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from 'axios'
import {server} from '../../components/constants/config'

const adminLogin=createAsyncThunk("admin/login",async(secretKey)=>{
    try {
        const config={
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            },
        };
        const {data}=await axios.post(
            `${server}/admin/verify`,
            {secretKey},
            config
        );
        return data.message;

    } catch (error) {
        throw error.response.data.message
    }
})

const getAdmin=createAsyncThunk("admin/getAdmin",async()=>{
    try {
        const {data}=await axios.get(`${server}/admin`,{
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            },
        });
        console.log("enoy",data.admin)
        return data.admin
    } catch (error) {
        console.error("error Fetchong",error)
        throw error.response.data.message       
    }
})
const adminlogout=createAsyncThunk('admin/logout',async()=>{
    try {
        const {data}=axios.get(`${server}/admin/logout`,{
            withCredentials:true,
        })
        return data.msg
    } catch (error) {
        throw error.response.data.message
    }
})



export {adminLogin,getAdmin,adminlogout}