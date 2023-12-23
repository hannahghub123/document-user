import {createSlice} from "@reduxjs/toolkit";


const INITITALSTATE={
    title:[],
    content:[],
    created_at:[],
}


const documentSlice = createSlice(
    {
        name:"documentSlice",
        initialState:{
            value:INITITALSTATE
        },
        reducers:{
            changeTitle:(state,action)=>{
                state.value.title.push(action.payload)
            },
            changeContent:(state,action)=>{
                state.value.content.push(action.payload)
            },
            changeCreatedAt:(state,action)=>{
                state.value.created_at.push(action.payload)
            },
        }

    }

)

export const {changeTitle,changeContent, changeCreatedAt} = documentSlice.actions

export default documentSlice.reducer