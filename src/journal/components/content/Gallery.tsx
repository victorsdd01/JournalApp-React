import { ImageList } from "@mui/material"
// import { GalleryImage } from "../../../interfaces/journal/journal-interfaces"
import { GalleryCard } from "./GalleryCard"

type GalleryProps = {
    images: string[],
}
export const Gallery = ({ images } : GalleryProps): JSX.Element=> {
  
  return (
    <>
      <ImageList 
        sx={{ height: '100%', overflowY: 'auto' }}
        className="rounded-lg mt-2"
        cols={10}
        rowHeight={'auto'} 
      >
          {images.map(image => 
              <GalleryCard key={image} image={image} />
            )
          }
      </ImageList>
    </>
  )
}

