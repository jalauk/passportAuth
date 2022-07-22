import React from 'react'
import axios from 'axios'

function Chat() {
  const fetchUser = async () => {
    const response = await axios.get('http://localhost:5000/auth/user',{withCredentials:true})
    if(response && response.data){
      console.log("user:", response.data)
    }
  }

  return (
    <div onClick={fetchUser}>Chat</div>
  )
}

export default Chat