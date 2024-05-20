import { CircularProgress, Grid } from "@mui/material"


export const ProgressBar = (): JSX.Element => {
  return (
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
      }}
    >
      <Grid container item direction={'row'} justifyContent={'center'} alignContent={'center'}>
          <CircularProgress  />
      </Grid>
    </Grid>
  )
}
