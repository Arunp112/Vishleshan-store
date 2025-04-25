import { createSlice } from "@reduxjs/toolkit";

const initialState=JSON.parse(localStorage.getItem('cart')) ?? [];

const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart(state,action){
            state.push(action.payload)
        },
        removeFromCart(state,action){
            return state.filter(item => item.id !=action.payload.id)

        }
    }
})

export const {addToCart,removeFromCart}=cartSlice.actions

export default cartSlice.reducer