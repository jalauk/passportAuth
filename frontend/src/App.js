import React from 'react'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Chat from './pages/Chat'
import Login from './pages/Login'
import Register from './pages/Register'
import SetAvatar from './pages/SetAvatar'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/setAvatar" element={<SetAvatar/>} />
      <Route path="/" element={<Chat/>} />
      <Route path="/forgot-password" element={<ForgotPassword/>} />
      <Route path="/reset-password/:id" element={<ResetPassword/>} />

    </Routes>
    </BrowserRouter>
  )
}
