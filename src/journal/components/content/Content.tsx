
import { Grid } from "@mui/material"
// import { NothingSelected } from ".."
import { SelectedNote } from './SelectedNote';


export const Content = (): JSX.Element => {

  return (
    <>
      <Grid 
        container 
        item
        xs={9} 
        className="p-5"
      >
      {/* <NothingSelected/> */}
      <SelectedNote />
      </Grid> 
    </>
  )
}
