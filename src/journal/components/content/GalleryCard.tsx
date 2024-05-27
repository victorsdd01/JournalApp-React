import { ImageListItem } from '@mui/material';
// import { GalleryImage } from '../../../interfaces/journal/journal-interfaces';

type GalleryCardProps = {
    image: string
}

export const GalleryCard = ({image}: GalleryCardProps): JSX.Element=> {
  return (
    <>
      <ImageListItem className='rounded-lg'>
        <img
            srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${image}?w=164&h=164&fit=crop&auto=format`}
            alt={image}
            loading="lazy"
        />
       </ImageListItem>
    </>
  )
}
