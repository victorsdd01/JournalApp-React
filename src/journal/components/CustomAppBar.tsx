import { Logout } from "@mui/icons-material"
import { AppBar, Grid, IconButton, Tooltip, Typography } from "@mui/material"
import { useAppDispatch } from "../../store/store"
import { signOutFromGoogle } from "../../store/auth/thunks"

export const CustomAppBar = () => {

  const dispatch = useAppDispatch()
  const onLogout = () => {
    dispatch(signOutFromGoogle());
  }

  return (
    <AppBar position="static" sx={{p:'10px'}} color="primary" elevation={0}>
        <Grid container direction={'row'} justifyContent={'space-between'}>
          <Typography variant="h6">JournalApp</Typography>
          <Tooltip title="Sign out">
            <IconButton onClick={onLogout}>
              <Logout sx={{color:'white'}} />
            </IconButton>
          </Tooltip>
        </Grid>
    </AppBar>
  )
}
