import { Grid, Typography } from "@mui/material"
import PropTypes  from "prop-types"
import { ReactNode } from "react"
import { useAppSelector } from "../../store/store"
import { AuthStatus } from "../../interfaces"
import { ProgressBar, SnackBar } from "../../components"


type AuthLayoutProps = {
    label: string,
    children: ReactNode
}

export const AuthLayout = ({label, children}: AuthLayoutProps): JSX.Element=> {

  const {status} =  useAppSelector(state => state.auth)
  const {open, message, variant, color, vertical, horizontal} = useAppSelector( state => state.notifications)
  const {animate, animation} = useAppSelector(state => state.animations)

  return (
    <>
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems="center"
        justifyContent="center"
        sx={{ 
          minHeight: '100vh', 
          width: '100%',
          backgroundColor:'primary.50', 
          padding:4
        }}
      >
        <SnackBar 
          message={message} 
          open={open}
          variant={variant} 
          color={color} 
          vertical={vertical} 
          horizontal={horizontal}
        />
        {
          status === AuthStatus.CHECKING 
          ? (<ProgressBar />)
          : (
              <Grid 
                item
                className={`box-shadow ${animate ? animation : '' }`}
                xs={3}
                sx={{
                  backgroundColor: 'white', 
                  width: { sm: 450, }, 
                  padding:3, 
                  borderRadius: 2
                }}
              >
                <Typography variant='h5' sx={{mb:1}}>{label}</Typography>
                { children }
              </Grid>
            )
        }
      </Grid>
    </>
  )
}

AuthLayout.propTypes = {
    label: PropTypes.string.isRequired   
}
