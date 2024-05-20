import { useEffect, useState } from 'react';
import { FormValidations } from '../interfaces';


type FormState = {
    [key:string]: string
}

export const useForm = (initialForm: FormState, formValidations: FormValidations) => {
    const [formState, setFormState] = useState(initialForm)
    const [formValidation, setFormValidation] = useState({})

    useEffect(() => {
        createValidators()
    }, [formState])

    const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        })
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    const createValidators = () => {
        const formCheckedValues: { [key: string]: string | null } = {}
        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage] = formValidations[formField]
            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage
        }

        setFormValidation(formCheckedValues)
    }

    return {
        formState,
        onInputChange,
        onResetForm,
        ...formValidation
    }
};