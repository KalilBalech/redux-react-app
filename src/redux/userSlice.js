import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'operation',
    initialState: {
        operation: 'null'
    },
    reducers:{
        changeOperation(state, {payload}){
            return{
                ...state,
                operation: payload
            }
        }
    }
})

export const {changeOperation} = slice.actions

export const selectOperation = state => state.operation

export default slice.reducer