import { StarBorder } from "@mui/icons-material"
import { Grid, Typography } from "@mui/material"
import { NewNoteButton } from ".."


export const NothingSelected = (): JSX.Element=> {
  return (
    <>
        <Grid 
          container
          direction={'column'}
          alignContent={'center'}
          justifyContent={'center'}
          className="rounded-xl h-full"
          sx={{
            backgroundColor:'primary.main',
            position:'relative',
          }}
        >
          <Grid container direction={'row'} justifyContent={'center'} alignItems={'center'}>
            <StarBorder sx={{fontSize:70}} htmlColor="white" />
          </Grid>
          <Grid container direction={'row'} justifyContent={'center'} alignItems={'center'}>
              <Typography variant="h6" color={'white'}>Choose or create an entry</Typography>
          </Grid>
          <NewNoteButton />
        </Grid>
    </>
  )
}
