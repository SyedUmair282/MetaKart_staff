import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name:"staff",
    initialState:{
        currentUser:null,
        isFetching:false,
        error:false
    },
    reducers:{
        loginStart:(state)=>{ 
            state.isFetching=true;
        },
        loginSuccess:(state,action)=>{ 
            state.isFetching=false;
            state.currentUser=action.payload
            state.error=false;
        },
        loginFailure:(state,action)=>{ 
            state.isFetching=false;
            state.error=action.payload
        },
        Logout:(state)=>{ 
           state.currentUser=null
           state.error=false;
        },
    },
})

export const {loginStart,loginSuccess,loginFailure,Logout} = userSlice.actions
export default userSlice.reducer;