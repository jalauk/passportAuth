import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer,toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'


function Register(props) {
  const [values,setValues] = useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:"",
  })

  const googleSignin = async() => {
    const newwindow = window.open('http://localhost:5000/auth/google','_blank','width=300px,height=600px')
  }


  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };


  // const handleValidation = ()=>{
  //   const {username,email,password,confirmPassword} = values;
  //   if(password!==confirmPassword){
  //     toast.error("password and confirmPassword not same",toastOptions);
  //     return false;
  //   }
  //   else if (username.length < 3) {
  //     toast.error("Username should be greater than 3 characters.",toastOptions);
  //     return false;
  //   } 
  //   else if (password.length < 8) {
  //     toast.error("Password should be equal or greater than 8 characters.",toastOptions);
  //     return false;
  //   } 
  //   else if (email === "") {
  //     toast.error("Email is required.", toastOptions);
  //     return false;
  //   }

  //   return true;
  // }
  const register = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/auth/register",
      {
        username: values.username,
        password: values.password,
        email:values.email,
      },
      {withCredentials: true}
      
    ).then((res) => console.log(res));
  };

  const handleChange = (e) => {
    setValues({...values,[e.target.name]:e.target.value})
  }

  return (
    <>
      <FormConatiner>
        <form onSubmit={register} >
          <div className="brand">
            <h1>CHATROOM</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <i className="fa-brands fa-google-plus-square" onClick={googleSignin}></i>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>
      </FormConatiner>
      <ToastContainer/>
    </>
  )
}

const FormConatiner = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .brand{
    display:flex;
    justify-content:center;
  }

  h1{
    color:white;
  }

  form{
    display:flex;
    flex-direction:column;
    gap:2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }

  input{
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }

  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }

  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }

  i{
    color:white;
    font-size:90px;
  }
`;

export default Register