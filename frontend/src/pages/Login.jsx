import React,{useState} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";

export default function Login() {

  const [values,setValues] = useState({
    email:"",
    password:"",
  })
  
  const login = () => {
    axios.post('http://localhost:5000/auth/login',{
      username: values.email,
      password: values.password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
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
    <div>
        <h1>Login</h1>
        <input
          name="email"
          onChange={(e) => handleChange(e)}
        />
        <input
          name="password"
          onChange={(e) => handleChange(e)}
        />
        <button onClick={login}>Submit</button>

        <Link to="forgot-password">Forget Password?</Link>
      </div>
  )
}
