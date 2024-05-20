import { Google } from '@mui/icons-material';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'
import { AuthLayout } from '../layout/AuthLayout';
import { Form } from '../components';
import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {startEmailPassword, startGoogleSignIn } from '../../store/auth/thunks';
import { AuthStatus, LoginForm } from '../../interfaces';
import {useForm} from 'react-hook-form'


export const LoginPage = () => {

  const {register, handleSubmit, formState : {
    errors
  }} = useForm<LoginForm>()

  const dispatch = useAppDispatch()
  const {status} =  useAppSelector((state)=> state.auth)
  const isAuthenticating = useMemo(()=> status === AuthStatus.CHECKING, [status])

  const googleSignIn = () => dispatch(startGoogleSignIn())

  const onSubmit = handleSubmit(data => dispatch(startEmailPassword(data.email, data.password)))
    
  return (
    <AuthLayout label='Login'>
      <Form onSubmit={onSubmit}>
        <Grid item xs={12} sx={{marginBottom:'10px'}}>
          <TextField 
            label={'Email'}
            placeholder={'email@some.com'}
            type={'email'}
            color='primary'
            fullWidth
            {...register('email', {
                  required: {
                    value: true,
                    message: 'This field is required'
                  },
                  pattern:{
                    value: /^\w+@[a-zA-Z_]+?\.(com)$/,
                    message: 'Invalid email'
                  }
                }
              )
            }
            error={errors.email ? true : false}
            helperText={errors.email ? errors.email.message?.toString() : ''}
          />
        </Grid>

        <Grid item xs={12} sx={{marginBottom:'10px'}}>
          <TextField 
            label={'Password'}
            placeholder={'myP@ssword'}
            type={'password'}
            color='primary'
            fullWidth
            {...register('password', {
                  required: {
                    message:'This field is required',
                    value: true,
                  }
                }
              )
            }
            error={errors.password ? true : false}
            helperText={errors.password ? errors.password.message?.toString() : ''}
          />
        </Grid>

        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <Button fullWidth variant='contained' color='primary' type='submit' disabled={isAuthenticating} onClick={() => onSubmit}>
              <Typography variant='caption'>Login</Typography>
            </Button>
          </Grid>

          <Grid item xs={12} md={6}>
            <Button fullWidth variant='contained' color='primary' disabled={isAuthenticating} onClick={googleSignIn}>
              <Grid container direction={'row'} justifyContent={'center'} justifyItems={'center'}>
                <Google fontSize='small' className='mr-1' />
                <Typography variant='caption'>Google</Typography>
              </Grid>
            </Button>
          </Grid>
        </Grid>

        <Grid container direction={'row'} justifyContent={'end'}>
          <Link className='pt-2' component={RouterLink} color="inherit" to="/auth/signup"> 
            Sign up
          </Link>
          {/* onClick={() => dispatch(rotateX('animate__animated animate__flipOutY'))} */}
        </Grid>
      </Form>
    </AuthLayout>
  )
}
