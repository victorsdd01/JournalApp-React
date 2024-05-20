import { BookmarkBorder } from "@mui/icons-material"
import { Grid, Typography } from "@mui/material"
import PropTypes from 'prop-types';
import { SideBarItem } from "../../../interfaces/journal/journal-interfaces";


type SideBarListItemProps = {
    item: SideBarItem,
}

export const SideBarListItem = ({ item }: SideBarListItemProps): JSX.Element => {
  return (
    <>
     <Grid container item direction={'row'} className='p-5'>
        <Grid container item direction={'column'} justifyContent={'center'} xs={2}>
            <BookmarkBorder fontSize='medium' />
        </Grid>
        <Grid container item direction={'column'} xs={10}>
            <Typography variant='body1'>
                {item.header}
            </Typography>
            <Typography variant='caption'>
                {item.description}
            </Typography>
        </Grid>
     </Grid>
    </>
  )
}

SideBarListItem.propTypes = {
    item: PropTypes.shape({
        header: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired
    }).isRequired
}
