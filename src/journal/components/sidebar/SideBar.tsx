import { Grid, Typography, Divider, Box, Avatar } from '@mui/material';
import PropTypes from 'prop-types';
import { SideBarList } from './SideBarList';
import { useAppSelector } from '../../../store/store';
import { useMemo } from 'react';

type SideBarProps = {
  name: string,
}

export const SideBar = ({name}: SideBarProps): JSX.Element => {

  const {photoUrl} = useAppSelector(state => state.auth)

  const newName = useMemo(() => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
  }, [name])

  const {notes} = useAppSelector(state => state.journal)

  const showPicture = () => {
    //TODO display a modal to show the picture!!!
  }

  return (
    <>
      <Grid 
        container 
        item 
        xs={3}
        lg={2} 
        direction={'column'}
      >
        <Grid className='my-3' container direction={'row'} alignItems={'center'}>
          <Avatar onClick={showPicture} className='ml-4 mr-2' sx={{height:30, width:30, cursor:'pointer'}} alt={newName} src={photoUrl ? photoUrl : ''} />
          <Typography variant='h6'>
            {newName}
          </Typography>
        </Grid>
        <Divider orientation='horizontal' variant='middle'/>
        <Box component={'div'} style={{ overflow: 'auto' }}>
          <SideBarList items={notes} />
        </Box>
      </Grid>
    </>
  )
}

SideBar.propTypes = {
  name: PropTypes.string.isRequired
}
