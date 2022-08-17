import React from "react";
import { useState } from "react";
import axios from "axios";
export default function ForgotPassword() {
    const [values,setValues] = useState({
        email:"",
        username:""
      })

      const sendmail = () => {
        axios.post('http://localhost:5000/auth/forget-password',{
          username: values.username,
          email:values.email
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
        <p>forget password</p>
          <input type='text' name="username" placeholder="username" onChange={(e) => handleChange(e)} />

      <input type='email' name="email" placeholder="email" onChange={(e) => handleChange(e)} />

      <button onClick={sendmail}>Submit</button>
    </>
  );
}
