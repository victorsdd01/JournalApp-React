import { Grid } from "@mui/material"
import { FormEvent, ReactNode } from "react"
import PropTypes from "prop-types"


type FormProps = {
    children: ReactNode,
    onSubmit: (event: FormEvent<HTMLFormElement>) => void
}


export const Form = ({children, onSubmit}: FormProps) => {
  return (
    <form onSubmit={onSubmit}>
        <Grid container item sx={{height:'100%'}}>
          <Grid container item sx={{height:'100%', width:'100%'}}>
            { children }
          </Grid>
        </Grid>
    </form>
  )
}


Form.propTypes = {
    children: PropTypes.node.isRequired
}
