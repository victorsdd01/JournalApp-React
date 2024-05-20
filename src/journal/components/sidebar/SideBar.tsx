import { Grid, Typography, Divider, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { SideBarList } from './SideBarList';
import { SideBarItem } from '../../../interfaces/journal/journal-interfaces';

type SideBarProps = {
  name: string,
}

const items: SideBarItem[] = [
  {
    header: 'January',
    description: 'Lorem ea in cupidatat adipisicing amet non ex do sint aute pariatur in.',
    id: 0
  },
  {
    header: 'Febrary',
    description: 'Anim proident dolor velit Lorem ut dolor laborum.',
    id: 1
  },
  {
    header: 'March',
    description: 'Veniam Lorem reprehenderit sint id eiusmod consectetur et est voluptate ipsum aliqua minim et.',
    id: 2
  },
]

export const SideBar = ({name}: SideBarProps): JSX.Element => {


  return (
    <>
      <Grid 
        container 
        item xs={3} 
        direction={'column'} 
        sx={{
          borderRightColor: 'blue'
        }}
      >
        <Grid className='mt-3' container direction={'row'} justifyContent={'center'} alignContent={'center'}>
          <Typography variant='h6'>
            {name}
          </Typography>
        </Grid>
        <Divider orientation='horizontal' variant='middle'/>
        <Box component={'div'}>
          <SideBarList items={items} />
        </Box>
      </Grid>
    </>
  )
}

SideBar.propTypes = {
  name: PropTypes.string.isRequired
}
