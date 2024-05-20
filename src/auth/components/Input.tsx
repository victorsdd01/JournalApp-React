import { TextField } from "@mui/material"
import { UseFormRegister, FieldValues } from "react-hook-form"

type InputProps = {
    label: string,
    name: string,
    placeholder: string,
    type: string,
    // onChange: ({target}: React.ChangeEvent<HTMLInputElement>) => void,
    register: (name: string) =>UseFormRegister<FieldValues>,
    value: string,
    error: boolean,
    helperText: string,
    
}

export const Input = ({label, name, placeholder, type, register, value, error, helperText}: InputProps) => {
  return (
    <TextField 
        label={label}
        placeholder={placeholder}
        type={type}
        color='primary'
        fullWidth
        value={value}
        error={error}
        helperText={helperText}
        {...register(name)}
    />
  )
}
