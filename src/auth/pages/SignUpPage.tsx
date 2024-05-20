import { Button, Grid, TextField } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { Form } from '../components/Form'
import { Link } from "react-router-dom"
import { useForm, useWatch } from "react-hook-form"
import { SignUpForm } from "../../interfaces"
import { createNewUser } from "../../store/auth/thunks"
import { useAppDispatch } from "../../store/store"

export const SignUpPage = (): JSX.Element=> {

  // const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {register, handleSubmit, formState : {errors}, control} = useForm<SignUpForm>()

  const password = useWatch({
    control,
    name: 'password'
  })

  const onSignUp = handleSubmit(data => {
    dispatch(createNewUser(data))
    // navigate('/', {
    //   replace: true,
    // })
  })
  
  return (
    <AuthLayout label={"Sign up"}>
      <Form onSubmit={onSignUp}>
        <Grid item xs={12} sx={{marginBottom:'10px'}}>
          <TextField
            label={"name"} 
            fullWidth
            placeholder={"John"} 
            type={"text"}
            color="primary"
            {...register('name',{
                  required:{
                    value: true,
                    message:'This field is required'
                  }
                }
              )
            }
            error={errors.name ? true : false}
            helperText={errors.name ? errors.name.message?.toString(): ''}
           />
        </Grid>
        <Grid item xs={12} sx={{marginBottom:'10px'}}>
          <TextField 
            label={"last name"} 
            fullWidth
            placeholder={"Smith"} 
            type={"text"}
            {...register("last_name",{
              required:{
                value: true,
                message:'This field is required'
              }
            })}
            error={errors.last_name ? true : false}
            helperText={errors.last_name ? errors.last_name.message?.toString(): ''}
          />
        </Grid>
        <Grid item xs={12} sx={{marginBottom:'10px'}}>
          <TextField 
            label={"email"} 
            fullWidth
            placeholder={"email@some.com"} 
            type={"email"}
            {...register("email",{
                  required:{
                    value: true,
                    message:'This field is required'
                  },
                  pattern:{
                    value: /^\w+@[a-zA-Z_]+?\.(com)$/,
                    message: 'Invalid email'
                  }
                }
              )
            }
            error={errors.email ? true : false}
            helperText={errors.email ? errors.email.message?.toString(): ''}
          />
        </Grid>
        <Grid item xs={12} sx={{marginBottom:'10px'}}>
          <TextField 
            label={'password'} 
            fullWidth
            placeholder={'*****'} 
            type={'password'} 
            {...register("password",{
                  required:{
                    value: true,
                    message:'This field is required'
                  },
                  minLength: {
                    message: 'Min 6 characters',
                    value: 6
                  }
                }
              )
            }
            error={errors.password ? true : false}
            helperText={errors.password ? errors.password.message?.toString(): ''}
          />
        </Grid>
        <Grid item xs={12} sx={{marginBottom:'10px'}}>
          <TextField 
            label={'verify password'} 
            fullWidth
            placeholder={'*****'} 
            type={'password'} 
            {...register("verify_password",{
                  required:{
                    value: true,
                    message:'This field is required'
                  },
                  validate: value => value === password || 'Passwords do not match'
                }
              )
            }
            error={errors.verify_password ? true : false}
            helperText={errors.verify_password ? errors.verify_password.message?.toString(): ''}
          />
        </Grid>
        <Grid container direction={'row'}>
          <Button variant="contained" fullWidth color="primary" type="submit" onClick={()=> onSignUp}>Sign up</Button>
        </Grid>
        <Grid container direction={'row'} justifyContent={'start'}>
          <Link to={'/auth/login'} color={'inherit'} className="pt-2" >back</Link>
          {/* onClick={() => dispatch(rotateX('animate__animated animate__flipOutY')) } */}
        </Grid>
      </Form>
    </AuthLayout>
  )
}


