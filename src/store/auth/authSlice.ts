import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AuthStatus, AuthState } from '../../interfaces'

const initialState: AuthState = {
    status: AuthStatus.UNAUTHENTICATED,
    uid: null,
    email: null,
    displayName: null,
    photoUrl: null,
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<AuthState>) => {

            state.status = action.payload.status
            state.uid = action.payload.uid
            state.email = action.payload.email
            state.displayName = action.payload.displayName
            state.photoUrl = action.payload.photoUrl

        },
        logout: (state, action: PayloadAction<AuthState>) => {

            state.status = action.payload.status
            state.uid = action.payload.uid
            state.email = action.payload.email
            state.displayName = action.payload.displayName
            state.photoUrl = action.payload.photoUrl
            
        },
        checkingCredentials: (state) => {

            state.status = AuthStatus.CHECKING
            
        }
    },
})
export const { login, logout, checkingCredentials } = authSlice.actions