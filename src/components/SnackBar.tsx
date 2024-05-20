import { NotificationState } from '../interfaces/'
import Snackbar from "@mui/joy/Snackbar"
import { useAppDispatch } from '../store/store'
import { hideSnackbar } from '../store'


export const SnackBar = ({ message, open, variant, color, vertical, horizontal } : NotificationState): JSX.Element => {
  const dispatch = useAppDispatch()
  return (
    <>
        <Snackbar
            variant={variant}
            open={open}
            color={color}
            anchorOrigin={{ vertical, horizontal }}
            autoHideDuration={3000}
            onClose={() => dispatch(hideSnackbar())}
        > 
          {message}
      </Snackbar>
    </>
  )
}
