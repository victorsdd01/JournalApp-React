import { Grid } from "@mui/material"
import { ReactNode } from "react"
import { CustomAppBar } from '../components/CustomAppBar';


type JournalLayoutProps = {
    children: ReactNode
}
export const JournalLayout = ({children}: JournalLayoutProps) => {
  return (
    <Grid container>
        <Grid  container direction={'column'}>
            <CustomAppBar />
            {
                children
            }
        </Grid>
    </Grid>
  )
}
