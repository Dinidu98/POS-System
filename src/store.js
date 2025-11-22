import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "./slice/fetchSlice"
import pointsReducer from './slice/modalSlice'


const store=configureStore({
    reducer:{
        items:itemReducer,
        points:pointsReducer
    }
})

export default store;