import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
export default function ResetPassword() {
    const Param = useParams()
    const [values,setValues] = useState({
        password:"",
        confirmPassword:""
      })

      const resetpassword = () => {
        axios.post(`http://localhost:5000/auth/reset-password/${Param.id}`,{
            password: values.password,
            confirmPassword:values.confirmPassword
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: false,
        }
        ).then((res) => console.log(res)).catch((e)=>{
          if (e.response.status === 400) {
            console.log(`HTTP 400 error occured`);}
        });
      };


    const handleChange = (e) => {
        setValues({...values,[e.target.name]:e.target.value})
      }
  return (
    <>
        <p>reset password</p>
        <input type='password' name="password" placeholder="password" onChange={(e) => handleChange(e)} />

      <input type='password' name="confirmPassword" placeholder="confirmPassword" onChange={(e) => handleChange(e)} />

      <button onClick={resetpassword}>Submit</button>
    </>
  )
}

