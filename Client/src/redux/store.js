import {configureStore} from '@reduxjs/toolkit'
import AuthSlice from './reducers/auth';
import api from './api/api';
import miscSlice from './reducers/misc';

const store=configureStore({
    reducer:{
        [AuthSlice.name]:AuthSlice.reducer,
        [miscSlice.name]:miscSlice.reducer,
        [api.reducerPath]:api.reducer,
    },
    middleware:(mid)=>[...mid(),api.middleware]
});

export default store;