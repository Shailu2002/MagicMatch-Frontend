import React, { useState, useRef} from 'react';
import Navbarg from '../Navbarg';
import emailjs from '@emailjs/browser';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
const Photo = () => {
      const history =  useNavigate();
    const location =  useLocation();
    
      const id = location.state?.gent;
      const form = useRef();
      console.log(id);
        const [newUser, setNewUser] = useState(
            {
                user_id:id,
                user_photo: '',
            }
        );
    
        const handleSubmit = (e) => {
            e.preventDefault();
            if (!newUser.user_photo) {
                toast.error("upload your photo");
            }
            else {
                const formData = new FormData();
                formData.append('user_photo', newUser.user_photo);
                formData.append('user_id', newUser.user_id);
                axios
                    .post("/photo_router/add/", formData, {
                        headers: { "Content-Type": "multipart/form-data" },withCredentials:true
                  })
                  .then((res) => {
                    console.log(res);
                    toast.success("Photo Uploaded");
                    emailjs
                      .sendForm(
                        "service_442j1ys",
                        "template_1s4hxf8",
                        form.current,
                        "DA8BgdQHSMf19mJov"
                      )
                      .then(
                        (result) => {
                          console.log(result.text);
                        },
                        (error) => {
                          console.log(error.text);
                        }
                      );
                      localStorage.clear();
                      setTimeout(() => {
                        history("/login", { replace: true });
                      }, 1500);
                  })
                  .catch((err) => {
                    console.log(err);
                    toast.error("something went wrong");
                  });
                
            }   
        }
        const handlePhoto = (e) => {
            setNewUser({ ...newUser, user_photo: e.target.files[0] });
        }

        return (
            <>
                <Navbarg />
                <div className='backg'>
                    <div className='container cardstyle'>
                        <div className='card text-center'>
                            <h2 className='heading1 text-danger '> <i class="fa-solid text-dark fa-circle-plus"></i>Add your Profile Photo</h2>
                            <hr />
                            <div className='card-body'>
                                <form onSubmit={handleSubmit} encType='multipart/form-data'>
                                    <div className='mt-10 mb-4'>
                                    <input
                                        className='form-control'
                                        type="file"
                                        accept=".png, .jpg, .jpeg"
                                        name="user_photo"
                                        onChange={handlePhoto}
                                        
                                    />
                                    </div> 
                            <div className='mb-3'>
                                    <input
                                        type="submit" className='btn btn-success'
                                        />  
                                        <ToastContainer/>
                                 </div>
                                   
                                </form>
                                <form ref={form}>
                                    <input type="text" hidden name="user_name" value={ localStorage.getItem("name")}/>
                                    <input type="text" hidden name="user_email" value={ localStorage.getItem("email")}/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

export default Photo;