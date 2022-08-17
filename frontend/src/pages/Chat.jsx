import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react';

function Chat() {
  const [image,setImage] = useState('');
  const [user,setUser] = useState({})
  const fetchUser = async () => {
    const response = await axios.get('http://localhost:5000/auth/user',{withCredentials:true})
    if(response && response.data){
      console.log("user:", response.data)
      setUser(response.data);
    }
  }
  
  useEffect(() => {
    fetchUser()
  } ,[])

  return (
    <>
      <div><h1>{user.username}</h1><img src={user.image}></img></div>
    </>
  )
}

export default Chat