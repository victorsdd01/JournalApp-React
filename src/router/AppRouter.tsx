import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth"
import { JournalRoutes } from "../journal"
import { useAppDispatch, useAppSelector } from "../store/store"
import { ProgressBar } from "../components"
import { AuthState, AuthStatus } from "../interfaces"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { FirebaseAuth } from "../firebase/config"
import { login, logout } from "../store"
import { getAllNotes } from '../store/journal/thunks';


const data : AuthState = {
  status: AuthStatus.UNAUTHENTICATED,
  uid: null,
  email: null,
  displayName: null,
  photoUrl: null,
}

export const AppRouter = (): JSX.Element=> {

  const {status} = useAppSelector(state => state.auth)

  const dispatch = useAppDispatch()

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, (user) => {
      if (!user) return dispatch(logout(data))
      data.status= AuthStatus.AUTHENTICATED,
      data.uid = user.uid
      data.email = user.email
      data.displayName = user.displayName
      data.photoUrl = user.photoURL
      dispatch(login(data))
      dispatch(getAllNotes())
    })
  }, [dispatch])

  if (status === AuthStatus.CHECKING) {
    return <ProgressBar />
  }

  return (
    <>
        <Routes>
          {
            (status === AuthStatus.AUTHENTICATED) 
            ? <Route path={'/*'} element={<JournalRoutes/>} /> 
            : <Route path={'/auth/*'} element={<AuthRoutes />} />
          }
          <Route path="/*" element={<Navigate to={'/auth/login'}/>}></Route>
        </Routes>
    </>
  )
}
