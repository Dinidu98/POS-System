import { createSlice } from "@reduxjs/toolkit";


const pointsSlice=createSlice({
    name:'points',
    initialState:{
        data:[],
        totalAmount:0,
        selectedPayMethod:null,
        balance:0,
        customer:'',
        wholePrice:false,
        specialDiscount:0,
        edit:false,
        charges:{}
    },
    reducers:{
        addPoints:(state,action)=>{
            state.data.push(action.payload)
        },
        addTotal:(state,action)=>{
            state.totalAmount=action.payload
        },
        setPaymentMethod:(state,action)=>{
            state.selectedPayMethod=action.payload
        },

        addBalance:(state,action)=>{
            state.balance=action.payload
        },

        addCustomer:(state,action)=>{
            state.customer=action.payload
        },
        addWholePrice:(state,action)=>{
            state.wholePrice=action.payload
        },
        addDiscount:(state,action)=>{
            state.specialDiscount=action.payload
        },
        addEdit:(state,action)=>{
            state.edit=action.payload
        },
        addCharges:(state,action)=>{
            state.charges=action.payload
        }

        //modal handle
        // resetPoints: () => initialState

    },
   
})
export const {addPoints,addBalance,addWholePrice,addDiscount,addEdit,addCharges}=pointsSlice.actions
export const {addTotal}=pointsSlice.actions
export const {setPaymentMethod}=pointsSlice.actions
export const {addCustomer}=pointsSlice.actions
export default pointsSlice.reducer