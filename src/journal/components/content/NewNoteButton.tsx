import { Add } from "@mui/icons-material"
import { Grid, Fab, Tooltip } from "@mui/material"
import {  useAppDispatch, useAppSelector } from "../../../store/store"
import { showModal } from "../../../store"
// import { startNewNote } from "../../../store/journal/thunks"


export const NewNoteButton = (): JSX.Element=> {

  const dispatch = useAppDispatch()
  const {isSaving, active} = useAppSelector(state => state.journal)
  const onClick = () => {
    if(active){
      console.log('exist a note selected')
      return
    }
    dispatch(showModal(true))    
  }
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
            <Tooltip title="Add new note" arrow>  
              <Fab 
                disabled={isSaving}
                size="medium"
                onClick={onClick}
              >
                <Add/>
              </Fab>
            </Tooltip>
        </Grid>
    </>
  )
}
