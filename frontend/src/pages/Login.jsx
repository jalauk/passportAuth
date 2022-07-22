import React,{useEffect,useState} from 'react'
import axios from 'axios'
export default function Login() {

  const [values,setValues] = useState({
    username:"",
    password:"",
  })

  const login = () => {
    axios.post('http://localhost:5000/auth/login',{
      username: values.username,
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
          name="username"
          onChange={(e) => handleChange(e)}
        />
        <input
          name="password"
          onChange={(e) => handleChange(e)}
        />
        <button onClick={login}>Submit</button>
      </div>
  )
}
