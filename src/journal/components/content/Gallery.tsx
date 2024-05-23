import { Grid, ImageList } from "@mui/material"
import { GalleryImage } from "../../../interfaces/journal/journal-interfaces"
import { GalleryCard } from "./GalleryCard"

type GalleryProps = {
    images: GalleryImage[],
}
export const Gallery = ({ images } : GalleryProps): JSX.Element=> {
  return (
    <>
    <Grid container item direction={'column'} sx={{ height:'100%'}}>
        <ImageList 
          className="rounded-lg"
          sx={{width:'100%', height:'100%'}} 
          cols={12} 
          rowHeight={'auto'}>
            {images.map(image => 
                <GalleryCard key={image.id} image={image} />
              )
            }
        </ImageList>
    </Grid>
    </>
  )
}

