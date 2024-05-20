import { SaveOutlined } from "@mui/icons-material"
import { Grid, TextField, Typography } from "@mui/material"
import { GalleryImage } from "../../../interfaces/journal/journal-interfaces";
import { Gallery, NewNoteButton } from "..";

const itemData: GalleryImage[] = [
  {
    id:0,
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    id:2,
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    id:3,
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    id:4,
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    id:5,
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    id:6,
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    id:7,
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    id:8,
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    id:9,
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  },
  {
    id:10,
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    id:11,
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    id:12,
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },
];


export const SelectedNote = (): JSX.Element => {
  return (
    <>
      <Grid 
      container
      direction={'column'}
      className="rounded-xl h-full bg-white"
      sx={{position: 'relative'}}
      >
        <Grid container direction={'row'} justifyContent={'space-between'} alignContent={'center'}>
          <Typography variant="h3">
              August 28, 2023
          </Typography>
          <Grid container  item direction={'column'} xs={1} justifyContent={'center'}>
            <Grid container item direction={'row'} justifyContent={'end'} sx={{cursor:'pointer'}}>
                <SaveOutlined />
                <Typography className="mx-3" variant="button" color={'primary.main'}>Save</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid className="mt-3" container direction={'row'}>
          <TextField variant="filled" fullWidth placeholder="Title"></TextField>
        </Grid>
        <Grid className="mt-3" container direction={'row'}>
          <TextField variant="filled" fullWidth multiline rows={3} placeholder="What is happening today?"></TextField>
        </Grid>
        <Grid className="mt-2" container direction={'row'}>
          <Gallery images={itemData} />
        </Grid>
        <NewNoteButton />
      </Grid>
    </>
  )
}
