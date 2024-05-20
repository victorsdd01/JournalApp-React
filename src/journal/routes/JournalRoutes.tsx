import { Navigate, Route, Routes } from "react-router-dom"
import { JournalPage } from "../index"

export const JournalRoutes = () => {
  return (
    <Routes>
        <Route path={'/'} element={<JournalPage />}></Route>
        
        <Route path={'/*'} element={<Navigate to={'/'} />}></Route>
    </Routes>
  )
}
