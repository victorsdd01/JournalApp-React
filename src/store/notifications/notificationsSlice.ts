import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { NotificationState } from '../../interfaces'

const initialState: NotificationState = {
    open: false,
    message: '',
    variant: 'solid',
    color: 'success',
    vertical: 'top',
    horizontal: 'right'
}
export const notificationsSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        showSnackBar : (state, action: PayloadAction<NotificationState>) => {
            state.open = action.payload.open
            state.color = action.payload.color
            state.variant =  action.payload.variant
            state.message = action.payload.message
        },
        hideSnackbar: (state) => {
            state.open = false
        }
    },
})
export const { showSnackBar, hideSnackbar } = notificationsSlice.actions