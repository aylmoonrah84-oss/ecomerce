import { configureStore } from "@reduxjs/toolkit";
// import auth from './Slices/AuthSlice'
import authSlice from './Slices/AuthSlice'
const store=configureStore({
    reducer:{
        auth:authSlice,
    }
})
export default store
