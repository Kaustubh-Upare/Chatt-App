import {configureStore} from '@reduxjs/toolkit'
import AuthSlice from './reducers/auth';
import api from './api/api';
import miscSlice from './reducers/misc';
import chatSlice from './reducers/chat';

const store=configureStore({
    reducer:{
        [AuthSlice.name]:AuthSlice.reducer,
        [miscSlice.name]:miscSlice.reducer,
        [chatSlice.name]:chatSlice.reducer,
        [api.reducerPath]:api.reducer,
    },
    middleware:(mid)=>[...mid(),api.middleware]
});

export default store;