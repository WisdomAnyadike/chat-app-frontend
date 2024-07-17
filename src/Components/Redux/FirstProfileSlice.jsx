import { createSlice } from "@reduxjs/toolkit"


export const firstProfileSlice = createSlice({
    name: "createProfile",
    initialState: {
        profileObj: {}
    },
    reducers: {
        setProfileRole: (state, action) => {
            const role = action.payload
            state.profileObj.roleName = role
        }, setProfileId: (state, action) => {
            const profileId = action.payload
            state.profileObj.profileId = profileId
        },
        setRoleDescription: (state, action) => {
            const describe = action.payload
            state.profileObj.description = describe
        },
        setDreamName: (state, action) => {
            const dream = action.payload
            state.profileObj.dreamName = dream
        }

    



    }
})



export const { setProfileRole, setProfileId, setRoleDescription , setDreamName } = firstProfileSlice.actions
export default firstProfileSlice.reducer