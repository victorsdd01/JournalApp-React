

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
interface AnimationState {
    animate: boolean,
    animation: string,
}
const initialState: AnimationState = {
    animate: false,
    animation: '',
}
export const animationSlice = createSlice({
    name: 'animation',
    initialState,
    reducers: {
       rotateX: (state, action: PayloadAction<string>) => {
            state.animate =  true
            state.animation = action.payload
       }
    },
})
export const { rotateX,  } = animationSlice.actions