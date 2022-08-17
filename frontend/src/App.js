import axios from 'axios'
import React from 'react'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Chat from './pages/Chat'
import Login from './pages/Login'
import Register from './pages/Register'
import Upload from './pages/Upload'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'


export default function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/upload" element={<Upload/>} />
      <Route path="login/forgot-password" element={<ForgotPassword/>} />
      <Route path="/reset-password/:id" element={<ResetPassword/>} />
      <Route path="/" element={<Chat/>} />
    </Routes>
    </BrowserRouter>
  )
}
