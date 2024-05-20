import { Grid } from "@mui/material"
import { SideBarListItem } from "./SideBarListItem"
import { SideBarItem } from "../../../interfaces/journal/journal-interfaces"
import PropTypes from 'prop-types';


type SideBarListProps = {
    items: SideBarItem[]
}


export const SideBarList = ({items}: SideBarListProps): JSX.Element => {
  
  return (
    <>
        <Grid container direction={'column'}>
            {
                items.map(item => {
                    return <SideBarListItem 
                        key={item.id} 
                        item={item} 
                    />
                })
            }
        </Grid>
    </>
  )
}

SideBarList.propTypes = {
    items: PropTypes.array.isRequired
}