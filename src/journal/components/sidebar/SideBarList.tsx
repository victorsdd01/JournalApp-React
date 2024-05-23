import { Grid, Typography } from "@mui/material"
import { SideBarListItem } from "./SideBarListItem"
import { Note } from "../../../interfaces/journal/journal-interfaces"
import PropTypes from 'prop-types';
import { useAppSelector } from "../../../store/store";


type SideBarListProps = {
    items: Note[]
}


export const SideBarList = ({items}: SideBarListProps): JSX.Element => {

  const {active} = useAppSelector(state => state.journal)
  
  
  return (
    <>
        <Grid 
            container 
            direction={'column'}
            alignContent={items.length > 0 ? '' : 'center'}
            justifyContent={items.length > 0 ? '' : 'center'}
        >
            {
                items.length > 0 ? (
                  items.map(item => {
                    return <SideBarListItem 
                        key={item.id} 
                        item={item}
                        color={active?.id === item.id ? '#f0f0f0' : ''}
                    />
                  }) 
                ) 
                : 
                
                <Typography className="py-3" variant="body2">
                    No notes available
                </Typography>
                
            }
        </Grid>
    </>
  )
}

SideBarList.propTypes = {
    items: PropTypes.array.isRequired
}