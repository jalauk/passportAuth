import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { forgetPasswordRoute } from '../utils/APIRoutes'


function ForgotPassword() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
  })

  const [user, setUser] = useState({})

  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) {
      navigate('/')
    }

  }, [user])

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email } = values;
    const { data, response } = await axios.post(forgetPasswordRoute, { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    )
  }


const handleChange = (e) => {
  setValues({ ...values, [e.target.name]: e.target.value })
}

return (
  <>
    <FormConatiner>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="brand">
          <h1>Forgot Password</h1>
        </div>
        <input
          type="text"
          placeholder="Email"
          name="email"
          onChange={(e) => handleChange(e)}
          min="3"
        />
        <button type="submit">Submit</button>

      </form>
    </FormConatiner>
    <ToastContainer />
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
`;

export default ForgotPassword