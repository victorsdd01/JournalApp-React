import { Logout } from "@mui/icons-material"
import { AppBar, Grid, IconButton, Typography } from "@mui/material"
import { useAppDispatch } from "../../store/store"
import { signOutFromGoogle } from "../../store/auth/thunks"
// import { useNavigate } from "react-router-dom"


export const CustomAppBar = () => {

  // const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const onLogout = () => {
    dispatch(signOutFromGoogle());
    // navigate('/auth/login', {
    //   replace: true
    // })
  }

  return (
    <AppBar position="static" sx={{p:'10px'}} elevation={0}>
        <Grid container direction={'row'} justifyContent={'space-between'}>
          <Typography variant="h6">JournalApp</Typography>
          <IconButton onClick={onLogout}>
            <Logout sx={{color:'white'}} />
          </IconButton>
        </Grid>
    </AppBar>
  )
}
