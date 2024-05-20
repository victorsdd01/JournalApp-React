import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage, SignUpPage} from "../index";


export const AuthRoutes = () => {
  return (
    <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />

        <Route path={'/*'} element={<Navigate to={'/auth/login'}/>}></Route>
    </Routes>
  )
}
