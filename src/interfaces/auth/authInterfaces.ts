import { authSlice } from "../../store/auth/authSlice";

export interface RootState {
    auth: ReturnType<typeof authSlice.reducer>
}

export type ValidationFunction = (value: string) => boolean
export type ValidationRule = [ValidationFunction, string]
export type FormValidations = Record<string, ValidationRule>


export interface AuthState {
    status: AuthStatus
    uid: string | null
    email: string | null
    displayName: string | null
    photoUrl: string | null
    // errorMessage: string | null
}

export enum AuthStatus {
    AUTHENTICATED='AUTHENTICATED',
    UNAUTHENTICATED='UNAUTHENTICATED',
    CHECKING='CHECKING',
}

export interface LoginForm {
    email: string
    password: string
}

export interface SignUpForm {
    name: string
    last_name: string
    email: string
    password: string
    verify_password: string
}