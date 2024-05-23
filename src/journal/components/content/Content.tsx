
import { CircularProgress, Grid } from "@mui/material"
import { SelectedNote } from './SelectedNote';
import { useAppSelector } from "../../../store/store";
import { NothingSelected } from "..";


export const Content = (): JSX.Element => {

  const {active, isSaving}= useAppSelector(state => state.journal)

  return (
    <>
      <Grid 
        container 
        item
        alignContent={'center'}
        xs={9}
        lg={10}
        className="p-5"
      >
        {
          (isSaving) ?
          <Grid container item direction={'row'} justifyContent={'center'}>
            <CircularProgress /> 
          </Grid>
          : (active !== null) ? 
          <SelectedNote /> 
          :
          <NothingSelected/>
        }
      </Grid> 
    </>
  )
}
