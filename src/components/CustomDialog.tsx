import { Close } from '@mui/icons-material';
import { Dialog, Slide, Grid, IconButton, Typography } from '@mui/material';
import { TransitionProps } from "@mui/material/transitions"
import { ReactNode, forwardRef, useEffect, useState } from "react"


interface CustomDialogProps {
    show: boolean,
    title: string,
    content: ReactNode,
    actions?: ReactNode,
    paperProps?: object,
}
const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      children: React.ReactElement<any, any>
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />
  })

export const CustomDialog = ({show, title, content, actions, paperProps} : CustomDialogProps): JSX.Element => {

  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    if(show) return setOpen(true)
    setOpen(false)
  } ,[show])

  return (
    <Dialog 
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={(_event: object, reason: "backdropClick" | "escapeKeyDown" ) => {
          if (reason === "backdropClick" || reason ===  "escapeKeyDown") return 
        }}
        fullWidth
        PaperProps={{...paperProps}}
    >
      <Grid container item direction={'row'} paddingTop={1} paddingRight={1} justifyContent={'end'}>
        <IconButton onClick={() => setOpen(false)}>
          <Close></Close>
        </IconButton>
      </Grid>
      <Grid container item direction={'row'} paddingLeft={2}>
        {/* <DialogTitle padding={0}> */}
          <Typography variant='h4'>
            {
              title
            }
          </Typography>
        {/* </DialogTitle> */}
      </Grid>
      <Grid container item direction={'row'} paddingLeft={2} paddingRight={2}>
        {/* <DialogContent> */}
          {
            content
          }
        {/* </DialogContent> */}
      </Grid>
      <Grid container item direction={'row'} padding={2} justifyContent={'end'}>
        {/* <DialogActions> */}
          {
            actions
          }
        {/* </DialogActions> */}
      </Grid>
    </Dialog>
  )
}
