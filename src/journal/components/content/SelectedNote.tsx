import { SaveOutlined } from "@mui/icons-material"
import { CircularProgress, Grid, TextField, Typography } from "@mui/material"
import { GalleryImage, Note } from "../../../interfaces/";
import { Gallery, NewNoteButton } from "..";
import { AppDispatch, useAppDispatch, useAppSelector } from "../../../store/store";
import { Form } from '../../../auth/components/Form';
import { useForm } from "react-hook-form";
import { useEffect, useMemo } from "react";
import { setActiveNote } from "../../../store";
import { updateCurrentNote } from "../../../store/journal/thunks";

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
]


export const SelectedNote = (): JSX.Element => {

  const dispatch : AppDispatch =  useAppDispatch()
  const {active, isSaving} = useAppSelector(state => state.journal)
  const {register, handleSubmit, formState : {errors}, reset} =  useForm<Note>({
    defaultValues: {
      id:active?.id,
      title:active?.title,
      body:active?.body,
      date:active?.date,
      imageUrl:active?.imageUrl,
    }
  })

  const dateString = useMemo(() => {

    return new Date(active!.date).toLocaleDateString('en-EN', {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }, [active])

  useEffect(() => {
    if (active) {
      reset({
        title: active.title,
        body: active.body
      })
    }
  }, [active, reset]);

  const onUpdate = handleSubmit( note => {
    if (isSaving) return

    const data : Note = {
      id: active!.id,
      title:note.title,
      body:note.body,
      date:active!.date,
      imageUrl:active!.imageUrl,
    }
    dispatch(setActiveNote(data))
    dispatch(updateCurrentNote())
  })
  

  if(isSaving) return <Grid container item direction={'column'} justifyContent={'center'} alignContent={'center'}> <CircularProgress /></Grid>


  return (
    <>
      <Grid 
      container
      direction={'column'}
      className="rounded-xl bg-white"
      sx={{position: 'relative', height:'100%'}}
      >
        <Grid container direction={'row'} justifyContent={'space-between'} alignContent={'center'}>
          <Typography variant="h3">
              { dateString }
          </Typography>
          <Grid container  item direction={'column'} xs={1} justifyContent={'center'}>
            <Grid onClick={onUpdate} container item direction={'row'} justifyContent={'end'} sx={{cursor:'pointer'}}>
                <SaveOutlined />
                <Typography className="mx-3" variant="button" color={'primary.main'}>Save</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Form onSubmit={()=> onUpdate}>  
          <Grid className="mt-3" container direction={'row'}>
            <TextField 
              variant="filled" 
              fullWidth 
              placeholder="Title" 
              {...register('title', {
                maxLength: 17,
                required:{
                  value: true,
                  message: 'This field is required'
                },
                validate: (value) => active?.title.toLowerCase().trim() === value.toLowerCase().trim() ? 'You need change the title' : undefined
              })}
              error={errors.title ? true : false}
              helperText={errors.title ? errors.title.message?.toString() : ''}
            />
          </Grid>
          <Grid className="mt-3" container direction={'row'}>
            <TextField 
              variant="filled" 
              fullWidth 
              multiline 
              rows={3} 
              placeholder="What is happening today?"
              {...register('body', {
                required:{
                  value: true,
                  message: 'This field is required'
                },
                validate: (value) => active?.body.toLowerCase().trim() === value.toLowerCase().trim() ? 'You need change the description' : undefined
              })}
              error={errors.body ? true : false}
              helperText={errors.body ? errors.body.message?.toString() : ''}
            />
          </Grid>
          <Grid className="mt-2" container direction={'row'}>
            <Gallery images={itemData} />
          </Grid>
        </Form>
        <NewNoteButton />
      </Grid>
    </>
  )
}
