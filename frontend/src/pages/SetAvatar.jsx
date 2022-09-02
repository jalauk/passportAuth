import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";
import loader from "../assets/loader.gif";
import { Buffer } from "buffer";

export default function SetAvatar() {
  const api = "http://api.multiavatar.com/45678945";
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  
  

  useEffect( () => {
    async function redirect(){
    if (!localStorage.getItem("chat-app-user"))
      navigate("/login");
    }
    redirect();
  }, []);



    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleSubmitFile = (e) => {
        e.preventDefault();
        if (!previewSource) return;
        uploadImage(previewSource);
    };

    const uploadImage = async (base64EncodedImage) => {
        console.log(base64EncodedImage);
        try {
            setIsLoading('true');
            const {data} = await axios.post('http://localhost:5000/auth/upload', 
                { data: base64EncodedImage },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            console.log(data);
            console.log(data.msg);
            setFileInputState('');
            setPreviewSource('');
            if(data.msg === 'sent'){
                const user = await JSON.parse(localStorage.getItem("chat-app-user"));
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("chat-app-user",JSON.stringify(user));
                navigate('/');
            }
        } catch (err) {
            console.error(err);
        }
    };

  

  

  

  return (
    <>
      {isLoading ? (
        <Conatiner>
          <img src={loader} alt="loader" className="loader" />
        </Conatiner>
      ) : (
        <Conatiner>
          <div>
            <h1 className="title">Upload an Image</h1>

            <form onSubmit={handleSubmitFile} className="form">
              <input
                id="fileInput"
                type="file"
                name="image"
                onChange={handleFileInputChange}
                value={fileInputState}
                className="form-input"
              />
              <button className="btn" type="submit">
                Submit
              </button>
            </form>
            {previewSource && (
              <img
                src={previewSource}
                alt="chosen"
                style={{ height: "300px" }}
              />
            )}
          </div>
        </Conatiner>
      )}
      <ToastContainer />
    </>
  );
}

const Conatiner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }

  ,
  title-container {
    h1 {
      color: white;
    }
  }

  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
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
`;
