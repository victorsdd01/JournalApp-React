import { Divider, Grid } from "@mui/material"
import { JournalLayout } from '../layout/JournalLayout';
import { SideBar,Content } from '../components';
import { useAppSelector } from "../../store/store";


export const JournalPage = (): JSX.Element => {
  const {displayName}  = useAppSelector(state => state.auth)
  return (
    <>
      <JournalLayout>
        <Grid container direction={'row'} sx={{ height:'100vh', width:'100%'}}>
          <SideBar name={displayName!} />
          <Divider orientation="horizontal"/>
          <Content />
        </Grid>
      </JournalLayout>
    </>
  )
}
