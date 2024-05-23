import { BookmarkBorder, Delete } from "@mui/icons-material"
import { Grid, IconButton, Typography } from "@mui/material"
import PropTypes from 'prop-types';
import { Note } from "../../../interfaces/journal/journal-interfaces";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { setActiveNote } from "../../../store";
import { deleteNote } from "../../../store/journal/thunks";


type SideBarListItemProps = {
    item: Note,
    color: string,
}

export const SideBarListItem = ({ item, color }: SideBarListItemProps): JSX.Element => {
  
  const dispatch = useAppDispatch()
  const {active} = useAppSelector(state => state.journal)
  const onClick = (note : Note) => dispatch(setActiveNote(note))

  const onDelete = () => {
    dispatch(deleteNote())
  }
//   const newTitle = useMemo(() => {
//     return item.title.length > 17 ? item.title.substring(0,17) + '...' : item.title
//   }, [item.title])

  return (
    <>
     <Grid 
        onClick={() => onClick(item)} 
        style={{
            cursor:"pointer",
            backgroundColor: color,
            borderRadius:5,
            overflowX: 'hidden',
            overflowY:'hidden'
        }} 
        container 
        item 
        direction={'row'} 
        className='p-5'
      >
        <Grid container item direction={'column'} justifyContent={'center'} xs={2}>
            <BookmarkBorder fontSize='medium' />
        </Grid>
        <Grid container item direction={'column'} xs={9}>
          <Grid container item direction={'row'}>
            <Typography variant='body1'>
                {item.title}
            </Typography>
          </Grid>
          <Grid container item direction={'row'}>
            <Typography variant='caption'>
                {item.body}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item direction={'column'} xs={1} justifyContent={'center'} >
          <Grid container item direction={'row'}>
            {
              item.id === active?.id && 
                <IconButton 
                  className="animate__animated animate__slideInRight" 
                  onClick={onDelete}
                  sx={{
                    cursor:'pointer'
                  }}
                >
                  <Delete color="error"></Delete>
                </IconButton>
            }
          </Grid>
        </Grid>
     </Grid>
    </>
  )
}

SideBarListItem.propTypes = {
    item: PropTypes.shape({
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired
    }).isRequired
}
