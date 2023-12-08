import { createSlice } from "@reduxjs/toolkit"

const place = {
    email: '',
    name: '',
    phone: '',
    password: '',
    notifications: ''
}

const initialState = {}

export const placeSlice = createSlice({
    name: 'place',
    initialState,
    reducers: {
        addPlace: (state, action) => {
            return action.payload
        },
        removePlace: (state, action) => {
            return {}
        },
        addDeadLine: (state, action) => {
            if (!state.deadLine) {
                return {
                    ...state,
                    deadLine: {
                        [action.payload.property]: action.payload.value
                    }
                }
            }
            return {
                ...state,
                deadLine: {
                    ...state.deadLine,
                    [action.payload.property]: action.payload.value
                }
            }
        },
        addTypeDelivery: (state, action) => {
            return {
                ...state,
                typeDelivery: {name: action.payload.name, totalName: action.payload.totalName}
            }
        }
    }
})

export default placeSlice.reducer

export const { addPlace, removePlace, addDeadLine, addTypeDelivery } = placeSlice.actions