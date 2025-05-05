import { createSlice } from "@reduxjs/toolkit";
import { getOrSaveFromLocalStorage } from "../../lib/features";
import { NEW_MSG_ALERT } from "../../components/constants/socketevents";

const initialState={
    notificationCount:0,
    newMsgAlert:getOrSaveFromLocalStorage({key:NEW_MSG_ALERT,get:true}) || [{
        chatId:"",
        count:0
    }]  
}

const chatSlice=createSlice({
    name:"chat",
    initialState,
    reducers:{
        incNotifications:(state)=>{
            state.notificationCount+=1;
        },
        resetNotification:(state)=>{
            state.notificationCount=0;
        },
        setNewMsgsAlert:(state,action)=>{
            const index=state.newMsgAlert.findIndex(
                (item)=>item.chatId === action.payload.chatId
                );   
            if(index !== -1){
                state.newMsgAlert[index].count+=1;
            }else{
                state.newMsgAlert.push({
                    chatId:action.payload.chatId,
                    count:1
                })
            }
        },
        removeNewMsgAlert:(state,action)=>{
            state.newMsgAlert=state.newMsgAlert.filter(
                (item)=> item.chatId !== action.payload.chatId
            )
        }

    }
})

export default chatSlice;

export const {incNotifications,resetNotification,setNewMsgsAlert,removeNewMsgAlert}=chatSlice.actions;