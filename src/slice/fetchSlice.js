import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FETCH_ITEMS,FETCH_CUSTOMERS } from "../api";

export const fetchItems=createAsyncThunk(
    "items/fetchItems",
    async(query,{rejectWithValue})=>{
        try{
            const res=await axios.get(
                FETCH_ITEMS
            )
            // console.log(res.data)
            return res.data ||[]
        }catch(error){
            return rejectWithValue("failed to fetch items")
        }
    }
)

export const fetchCustomers=createAsyncThunk(
    "items/fetchCustomers",
    async(query,{rejectWithValue})=>{
        try{
            const res=await axios.get(FETCH_CUSTOMERS)
            // console.log(res.data)
            return res.data ||[]
        }catch(error){
            return rejectWithValue("failed to fetch")
        }
        
    }
)



const itemsSlice=createSlice({
    name:"items",
    initialState:{
        items:[],
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(fetchItems.pending,(state)=>{
                state.loading=true;
                state.error=null;
            })
            .addCase(fetchItems.fulfilled,(state,action)=>{
                state.loading=false,
                state.items=action.payload
            })
            .addCase(fetchItems.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload;
            })
            .addCase(fetchCustomers.pending,(state)=>{
                state.loading=true;
                state.error=null
            })
            .addCase(fetchCustomers.fulfilled,(state,action)=>{
                state.loading=false,
                state.items=action.payload
            })
            .addCase(fetchCustomers.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload
            })
    }
})

export default itemsSlice.reducer;