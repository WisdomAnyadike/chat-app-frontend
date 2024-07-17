import { createSlice } from "@reduxjs/toolkit"


export const tokenSlice = createSlice({
    name: "token",
    initialState: {
        token: null,
    },
    reducers: {
        setToken: (state, action) => {
            const token = action.payload
            state.token = token 
        }
    }
})



export const { setToken } = tokenSlice.actions
export default tokenSlice.reducer