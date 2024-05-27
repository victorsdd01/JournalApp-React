import { SaveOutlined } from "@mui/icons-material"
import { Button, CircularProgress, Grid, TextField, Typography } from "@mui/material"
import { Note } from "../../../interfaces/";
import { Gallery, NewNoteButton } from "..";
import { AppDispatch, useAppDispatch, useAppSelector } from "../../../store/store";
import { Form } from '../../../auth/components/Form';
import { useForm } from "react-hook-form";
import { useEffect, useMemo } from "react";
import { setActiveNote } from "../../../store";
import { updateCurrentNote, uploadPictures } from "../../../store/journal/thunks";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})


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

  const onSelectedFiles = ({target} : React.ChangeEvent<HTMLInputElement>) => {
    if (target.files) {
      const images = Array.from(target.files)
      dispatch(uploadPictures(images))
    }
  }

  if(isSaving) return <Grid container item direction={'column'} justifyContent={'center'} alignContent={'center'}> <CircularProgress /></Grid>


  return (
    <>
      <Grid 
      container
      padding={2}
      direction={'column'}
      className="rounded-xl bg-white box-shadow"
      sx={{position: 'relative', height:'100%', width:'100%'}}
      >
        <Form onSubmit={()=> onUpdate}>  
          <Grid container item direction={'row'} justifyContent={'space-between'} alignContent={'center'}>
                <Grid container item xs={6}>
                  <Typography variant="h3">
                      { dateString }

                  </Typography>
                </Grid>
                <Grid container item  xs={6} justifyContent={'end'}>
                  <Button
                    component="label"
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload file
                    <VisuallyHiddenInput type="file" multiple {...register('imageUrl')} onChange={onSelectedFiles} />
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<SaveOutlined />}
                    onClick={onUpdate}
                    sx={{marginLeft:'5px'}}
                  >
                    Save
                  </Button>
                </Grid>
          </Grid>
          <Grid container item direction={'row'} sx={{marginTop:'10px', marginBottom:'10px'}}>
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
          <Grid container item direction={'row'}>
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
          <Grid container item direction={'row'}>
            <Gallery images={active?.imageUrl ?? []} />
          </Grid>
        </Form>
        <NewNoteButton />
      </Grid>
    </>
  )
}
