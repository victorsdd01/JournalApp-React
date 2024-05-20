import { Add } from "@mui/icons-material"
import { Grid, Fab } from "@mui/material"


export const NewNoteButton = (): JSX.Element=> {
  return (
    <>
        <Grid 
            container 
            direction={'row'}
            position={'absolute'}
            bottom={10}
            justifyContent={'end'}
            alignContent={'center'}
            className="px-3"
          >
            <Fab 
              size="medium"
            >
              <Add/>
            </Fab>
        </Grid>
    </>
  )
}
