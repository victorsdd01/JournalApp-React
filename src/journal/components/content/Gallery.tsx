import { ImageList } from "@mui/material"
import { GalleryImage } from "../../../interfaces/journal/journal-interfaces"
import { GalleryCard } from "./GalleryCard"

type GalleryProps = {
    images: GalleryImage[],
}
export const Gallery = ({ images } : GalleryProps): JSX.Element=> {
  return (
    <>
        <ImageList 
          className="rounded-lg" 
          sx={{ width: '100%', height: '100%' }} 
          cols={3} 
          rowHeight={200}>
            {images.map(image => 
                <GalleryCard key={image.id} image={image} />
              )
            }
        </ImageList>
    </>
  )
}

