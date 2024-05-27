import { Add } from "@mui/icons-material"
import { Grid, Fab, Tooltip } from "@mui/material"
import {  useAppDispatch, useAppSelector } from "../../../store/store"
import { showModal } from "../../../store"
import { Dialogs } from "../../enums/enums"


export const NewNoteButton = (): JSX.Element=> {

  const dispatch = useAppDispatch()
  const {isSaving} = useAppSelector(state => state.journal)
  const onClick = () => {
    dispatch(showModal({id:Dialogs.NEW_NOTE, show:true}))    
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
            className="pr-8"
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
