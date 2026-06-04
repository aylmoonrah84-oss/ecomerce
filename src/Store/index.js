import { configureStore, createSlice } from "@reduxjs/toolkit";
// import auth from './Slices/AuthSlice'
import authSlice from './Slices/AuthSlice'
import cartSlice from './Slices/CartSlice'

const store=configureStore({
    reducer:{
        auth:authSlice,
        cart:cartSlice,
    }
})
export default store
