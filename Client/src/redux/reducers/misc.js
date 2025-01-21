import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isNewGroup:false,
    isSearch:false,
    isMobileMenu:false,
    isNotifications:false,
    isAddMember:false,
    isFileMenu:false,
    isDeleteMenu:false,
    uploadingLoader:false,
    selectedDeleteChat:{
        chatId:"",
        groupChat:false
    }
}


const miscSlice=createSlice({
    name:"misc",
    initialState,
    reducers:{
        setIsNewGroup:(state,action)=>{
            state.isNewGroup=action.payload
        },
        setIsAddMembers:(state,action)=>{
            state.isAddMember=action.payload
        },
        setIsSearch:(state,action)=>{
            state.isSearch=action.payload
        },
        setIsNotifications:(state,action)=>{
            state.isNotifications=action.payload
        },
        setIsFileMenu:(state,action)=>{
            state.isFileMenu=action.payload
        },
        setIsDeleteMenu:(state,action)=>{
            state.isDeleteMenu=action.payload
        },
        setIsMobileMenu:(state,action)=>{
            state.isMobileMenu=action.payload
        },
        setUploadingLoader:(state,action)=>{
            state.uploadingLoader=action.payload
        },
        setSelectedDeleteChat:(state,action)=>{
            state.selectedDeleteChat=action.payload
        }

    }
})

export default miscSlice;

export const {
    setIsSearch,setIsAddMembers,
    setIsNewGroup,setIsDeleteMenu,
    setIsFileMenu,
    setIsMobileMenu,setIsNotifications,
    setSelectedDeleteChat,
    setUploadingLoader}=miscSlice.actions;