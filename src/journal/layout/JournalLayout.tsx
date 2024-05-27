import { Button, Grid, TextField } from "@mui/material"
import { ReactNode } from "react"
import { CustomAppBar } from '../components/CustomAppBar';
import { CustomDialog, SnackBar } from "../../components";
import { AppDispatch, useAppDispatch, useAppSelector } from "../../store/store";
import { useForm } from "react-hook-form";
import { Note } from "../../interfaces";
import { showModal } from "../../store";
import { startNewNote } from "../../store/journal/thunks";
import { Dialogs } from "../enums/enums";


type JournalLayoutProps = {
    children: ReactNode
}

export const JournalLayout = ({children}: JournalLayoutProps) => {

  const id: Dialogs = Dialogs.NEW_NOTE
  const {open, message, variant, color, vertical, horizontal} = useAppSelector( state => state.notifications)
  const {showDialog} = useAppSelector(state => state.journal)
  const {register, handleSubmit, formState : {errors}} = useForm<Note>()
  const dispatch : AppDispatch = useAppDispatch()

  const onSubmit = handleSubmit((note: Note) => {
    dispatch(startNewNote(note, id))
  })

  return (
    <Grid container>
        <Grid  container direction={'column'}>
            <CustomAppBar />
            <SnackBar 
              message={message} 
              open={open}
              variant={variant} 
              color={color} 
              vertical={vertical} 
              horizontal={horizontal}
            />
            <CustomDialog 
              id={id}
              show={showDialog[id]}
              paperProps={{
                component: 'form',
                onSubmit: onSubmit
              }}
              title={"Add new note"}
              content={
                <>
                  <Grid container item className="py-3">
                    <TextField
                      label={'Title'}
                      placeholder={'Write the title'}
                      type={'text'}
                      color='primary'
                      fullWidth
                      {...register('title', {
                        required: {
                          value: true,
                          message: 'This field is required'
                        },
                      }
                      )}
                      error={errors.title ? true : false}
                      helperText={errors.title ? errors.title.message?.toString() : ''} />
                  </Grid>
                  <Grid container item className="py-1">
                    <TextField
                      label={'Description'}
                      placeholder={'Write the description'}
                      type={'text'}
                      color='primary'
                      multiline
                      rows={3}
                      fullWidth
                      {...register('body', {
                        required: {
                          value: true,
                          message: 'This field is required'
                        },
                      }
                      )}
                      error={errors.body ? true : false}
                      helperText={errors.body ? errors.body.message?.toString() : ''} />
                  </Grid>
                </>
              }
              actions={
                <>
                  <Button sx={{ marginRight:1}} color="error" variant="contained" onClick={() => dispatch(showModal({id, show:false})) }>Cancel</Button>
                  <Button color="primary" variant="contained" type="submit" onClick={() => onSubmit}>Add</Button>
                </>
              }
            />
            {
                children
            }
        </Grid>
    </Grid>
  )
}
