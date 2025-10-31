import React, { useState} from 'react'
import Navbar from './LoginNav';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
const HororDetails = () => {
    const [newUser, setNewUser] = useState(
        {
            user_id: localStorage.getItem("luser_id"),
            user_dob: "",
            user_sunsign:"",
            user_kundali: '',
        }
    );
    const setdata = (e) =>
    {
        const { name, value } = e.target;
        setNewUser((primary) =>
        {
            return {
                ...primary,
                [name]:value
            }

        });
        
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newUser.user_kundali)
        {
            toast.error("upload your kundali");
        }
        else
        {
            const formData = new FormData();
            formData.append('user_kundali', newUser.user_kundali);
            formData.append('user_id', newUser.user_id);
            formData.append('user_dob', newUser.user_dob);
            formData.append('user_sunsign', newUser.user_sunsign);
        axios.post('/kundali_router/add/', formData)
            .then(res => {
                console.log(res);
                toast.success("kundali Uploaded");
               
            })
            .catch(err => {

                console.log(err);
                toast.error("something went wrong");

            });
            
            }
        
    }

    const sunsign = ['Aries♈ ','Tauras♉','Gemini♊','Cancer ♋','Leo♌','Virgo♍','Libra♎','Scorpio♏','Sagittarius♐','Capricon♑','Aquarius♒','Pisces♓'];

    const handlePhoto = (e) => {
        setNewUser({ ...newUser, user_kundali: e.target.files[0] });
    }

    return (
        <>
            <Navbar />
            <div className='backg'>
                    <div className='container cardstyle'>
                        <div className='card '>
                            <h2 className='text-center text-danger heading1'><i className="fa-solid fa-pen-to-square text-dark"></i>  Add your Horoscope Details</h2>
                            <hr />
                            <div className='card-body'>
                                <form onSubmit={handleSubmit} encType='multipart/form-data'>
                                <div className='mt-10 mb-4'>
                                    <label className='form-label'>
                                        Add your Kundali
                                    </label>
                                    <input
                                        className='form-control'
                                        type="file"
                                        accept=".pdf"
                                        name="user_kundali"
                                        onChange={handlePhoto}
                                    />
                                    <div className='text-danger mb-3'>only pdf files are allowed</div>
                                    </div>
                                    <div className='mt-3 mb-4'>
                                        <label className='form-label'>Enter Date of Birth </label>
                                    <input name="user_dob" onChange={setdata} value={ newUser.user_dob} className='form-control'
                                        type="date" />
                                    </div>
                                    <div className='mt-3 mb-4'>
                                        <label className='form-label'>Enter your Sunsign </label>
                                    <select onChange={setdata} value={ newUser.user_sunsign} name="user_sunsign" className='form-select'>
                                            <option selected> ------Select--------</option>
                                            {
                                                sunsign.map((element) =>
                                                {
                                                    return <option>{ element}</option>
                                                })
                                            }
                                         </select>
                                    </div>    
                            <div className='mb-3 text-center'>
                                    <input
                                        type="submit" className='btn btn-success'
                                        />  
                                        <ToastContainer/>
                                 </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
      </>
    
  )
}

export default HororDetails;