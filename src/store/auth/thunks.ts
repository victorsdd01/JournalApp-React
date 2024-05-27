import { GoogleAuthProvider, User, updateProfile } from "firebase/auth"
import { addNewUser, signIn, signInWithGoogle, signOutGoogle } from "../../firebase/provider"
import { checkingCredentials, login, logout } from "./authSlice"
import { AuthState, AuthStatus, NotificationState } from "../../interfaces"
import { SignUpForm } from '../../interfaces/auth/authInterfaces'
import { FirebaseAuth } from "../../firebase/config"
import { showSnackBar } from "../notifications/notificationsSlice"
import { FirebaseError } from "firebase/app"
import { AppDispatch } from "../store"


 enum AuthAction {
    SIGNINEMAILANDPASSWORD = 'SIGN_IN_EMAIL_AND_PASSWORD',
    SIGNINGOOGLE = 'SIGN_IN_GOOGLE',
    CREATENEWUSER = 'CREATE_NEW_USER'
 }

 const data : AuthState = {
    status: AuthStatus.UNAUTHENTICATED,
    uid: null,
    email: null,
    displayName: null,
    photoUrl: null,
 }

 const snackBar : NotificationState = {
    open: true,
    message: "Register correctly!",
    variant: "soft",
    color: "success",
    vertical: "top",
    horizontal: "right"
  }

  const onSuccess = (dispatch: AppDispatch, user: User, action: AuthAction) => {

    data.status = AuthStatus.AUTHENTICATED
    data.uid = user.uid
    data.email = user.email
    data.displayName = user.displayName
    if (action === AuthAction.SIGNINGOOGLE) data.photoUrl = user.photoURL
    dispatch(login(data))
  }


  const onError = (dispatch: AppDispatch, error: FirebaseError) => {
    dispatch(logout(data))
    snackBar.message=  error.message.includes('Firebase: Error (auth/invalid-credential)') ? 'Invalid email or password' : 'Email already in use'
    snackBar.color = 'danger'
    dispatch(
        showSnackBar(snackBar)
    )
  }  

export const startEmailPassword = (email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials())
    signIn(email,password)
        .then(({user}) => {
            onSuccess(dispatch, user, AuthAction.SIGNINEMAILANDPASSWORD)
        })
        .catch((error: FirebaseError) => {
            onError(dispatch ,error)
        })
    
}

export const startGoogleSignIn =  () => async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials())
    signInWithGoogle()
        .then(result => {
            GoogleAuthProvider.credentialFromResult(result)
            const user = result.user
            onSuccess(dispatch, user, AuthAction.SIGNINGOOGLE)
            
        }).catch((error: FirebaseError) => {
            onError(dispatch, error)
        })
}

export const createNewUser = (user: SignUpForm) => (dispatch: AppDispatch) => {
    dispatch(checkingCredentials())
    addNewUser(user)
        .then(resp => {
            updateProfile(FirebaseAuth.currentUser!, {
                displayName: `${user.name.toLowerCase().trim()} ${user.last_name.toLowerCase().trim()}`
            }).then(() => {
                const user = resp.user
                onSuccess(dispatch, user, AuthAction.CREATENEWUSER)
                snackBar.message= 'User register!'
                dispatch(
                    showSnackBar(snackBar)
                )
            })
        })
        .catch((err : FirebaseError) => {
            onError(dispatch, err)
        })
}

export const signOutFromGoogle = () => (dispatch: AppDispatch) => {
    signOutGoogle()
        .then(()=> {
            data.status = AuthStatus.UNAUTHENTICATED
            data.uid = null
            data.email = null
            data.displayName = null
            data.photoUrl = null
            dispatch(logout(data))
        })
        .catch(() => {
            snackBar.message= 'Error trying to sign out'
            snackBar.color = 'danger'
            dispatch(
                showSnackBar(snackBar)
            )
        })
}