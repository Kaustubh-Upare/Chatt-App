import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { server } from '../../components/constants/config';

const api=createApi({
    reducerPath:"api",
    baseQuery: fetchBaseQuery({baseUrl:`${server}/`}),
        tagTypes:['Chat','User','Message'],
        endpoints:(builder)=>({
            myChats:builder.query({
                query:()=>({
                    url:"chat/my",
                    credentials:"include"
                }),
                providedTags:['Chat'],
            }),
            searchUsers:builder.query({
                query:(name)=>({
                    url:`user/search?name=${name}`,
                    credentials:"include"
                }),
                providesTags:["User"]

            }),
            friendRequest:builder.mutation({
                query:(chatuId)=>({
                    url:"user/sendRequest",
                    method:"PUT",
                    credentials:"include",
                    body:chatuId,
                    // headers: {
                    //     "Content-Type": "application/json", 
                    // },
                }),
                invalidatesTags:['User']
            }),
            getNotifications:builder.query({
                query:()=>({
                    url:"user/notifications",
                    credentials:"include"
                }),
                keepUnusedDataFor:0,
            }),
            requestAccRej:builder.mutation({
                query:(data)=>({
                    url:"user/acceptRequest",
                    method:"PUT",
                    credentials:"include",
                    body:data
                }),
                invalidatesTags:['Chat']
            }),
            getChatDetails:builder.query({
                query:({chatId,populate=false})=>{
                   let url=`chat/${chatId}`;
                   if(populate) url+="?populate=true"
                    return{
                        url:url,
                        credentials:"include"
                    }
                },
                providesTags:['Chat']
            }),
            getOldMsgs:builder.query({
                query:({chatId,page})=>({
                    url:`chat/message/${chatId}?page=${page}`,
                    credentials:'include'
                }),
                keepUnusedDataFor:0
            }),
            myGroups:builder.query({
                query:()=>({
                    url:`chat/my/groups`,
                    credentials:'include'
                }),
                providesTags:['Chat']
            }),
            availableFriends:builder.query({
                query:(chatId)=>{
                   let url=`user/friends`;
                   if(chatId) url+=`?chatId=${chatId}`
                    return{
                        url:url,
                        credentials:"include"
                    }
                },
                providesTags:['Chat']
            }),
            cNewGroup:builder.mutation({
                query:({name,members})=>({
                    url:'chat/new',
                    method:"POST",
                    credentials:'include',
                    body:{
                        name,
                        members
                    }
                }),
                invalidatesTags:['Chat']
            })    

        })
        
})

export default api;

export const 
{
    useMyChatsQuery,useLazySearchUsersQuery,
    useFriendRequestMutation,useGetNotificationsQuery,
    useRequestAccRejMutation,
    useGetChatDetailsQuery,useGetOldMsgsQuery,
    useSendAttachyMutation,useMyGroupsQuery,useAvailableFriendsQuery,useCNewGroupMutation
}=api;