import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    open: false
}

export const drawerSlice = createSlice({
    name: 'drawer',
    initialState,
    reducers: {
        changeOpen: (state, action) => {
            return { open: action.payload }
        }
    }
})

export default drawerSlice.reducer

export const { changeOpen } = drawerSlice.actions