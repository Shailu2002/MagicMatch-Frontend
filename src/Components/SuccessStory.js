import React, { useState} from 'react';
import Navbar from './Navbarg';
import * as yup from 'yup';
import { useFormik } from 'formik';//to handle form
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const SuccessStory = () => {
    const history = new useNavigate();
    const handlePhoto = (e) => {
        setNewUser({ ...newUser, success_story_photo: e.target.files[0] });
    }
    const defaultValues = {
        
        partner1_name: "",
        partner2_name: "",
        partner1_mailid: "",
        partner2_mailid: "",
        wedding_date:"",
        About_wedding:"",
        post_date: Date(),
        story_approval_status: 0,
        
    }
    const [newUser, setNewUser] = useState(
        {
          success_story_photo:""
        }
    );
    const validationSchema = yup.object({

        partner1_name: yup.string().matches(/^[a-zA-Z ]+$/, "It must contains alphabets only").max(40, "Name should not be greater than 20 characters").min(2, "Name should contain atleast 2 characters").required("Enter your Name"),
        partner2_name: yup.string().matches(/^[a-zA-Z ]+$/, "It must contains alphabets only").max(40, "Name should not be greater than 20 characters").min(2, "Name should contain atleast 2 characters").required("Enter your Name"),
        About_wedding: yup.string().min(150, "It must have atleast 100 characters"),
        partner1_mailid: yup.string().email('Email is Invalid').required("Enter your Email"),
        partner2_mailid: yup.string().email('Email is Invalid').required("Enter Email").notOneOf([yup.ref("partner1_mailid"),null],"Your email id and partner email id cannot be same"),
        wedding_date: yup.string().required("enter your Wedding date")
        
     
      });
    
      const formik = useFormik({
        initialValues: defaultValues,
      
      validationSchema:validationSchema,
          onSubmit: async (values) => {
              if (!newUser.success_story_photo)
              {
                  toast.error("upload your wedding photo");
              }
              else {
                const { partner1_name,partner2_name, partner1_mailid, partner2_mailid, wedding_date, About_wedding, post_date, story_approval_status} = values;
                const formData = new FormData();
                formData.append('success_story_photo', newUser.success_story_photo);
                  formData.append('partner1_name', partner1_name);
                  formData.append('partner2_name', partner2_name);
                  formData.append('partner1_mailid', partner1_mailid);
                  formData.append('partner2_mailid', partner2_mailid);
                  formData.append('wedding_date', wedding_date);
                  formData.append('About_wedding', About_wedding);
                  formData.append('post_date', post_date);
                  formData.append('story_approval_status', story_approval_status);
            
        
                axios.post('http://localhost:8003/success_router/add/', formData)
                    .then(res => {
                        
                        console.log(res);
                        toast.success("Success Story uploaded");
                    })
                    .catch(err => {
                        
                        if (err.request.status=== 403) {
                            toast.error("Both mail id's are not registered");
                        }
                        else if (err.request.status === 401)
                        {
                            toast.error("your mail id is not registered");
                            
                        }
                        else if (err.request.status === 402)
                        {
                            toast.error("Your Partner's mail id is not registered");  
                        }
                        else if (err.request.status === 408)
                        {
                            toast.error("you have already uploaded your success story");
                            
                        }
                        else if (err.request.status === 301)
                        {
                            toast.error("Names are not registered");
                        }
                        else
                        {
                            toast.error("something went wrong");
                        }
                    });
            
              
                  
            
                  
                  
              }
          
       
        }//onsubmit end here
        
      });
    
    
  return (
      <>
          <Navbar/>
          <div className='backg'>
          <h1  className='text-danger  heading1 pt-4 text-center'>Thank You for Sharing your Story with us !</h1>
              <div className='container cardstyle'>
                  <div className='card cardbg'>
                      <div className='card-body card-mt'>
                          <p  style={{fontSize:"20px",color:"gray"}}>We would like to wish you and your better half, a life full of love, laughter and togetherness! We would also love to know a little more of your story. Who knows,
                              it might inspire many others to find their life partners too! Do scroll down and fill in your details below.</p>
                          <hr />
                          <h5 className='text-center mt-4 mb-5'>Give us details of you & your partner</h5>
                          <form onSubmit={formik.handleSubmit} >
                              <div className='row mb-4 '>
                                  <div className='col-sm-6'>
                               <input type="text" name="partner1_name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.partner1_name}  className='form-control' placeholder='Your Name' />
                                      {  formik.touched.partner1_name && formik.errors.partner1_name ? (<div className='text-danger mb-3'>{formik.errors.partner1_name}</div>) : null}
                                  </div>
                                  <div className='col-sm-6'>
                                      <input type="text" name="partner2_name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.partner2_name} className='form-control' placeholder="Your Partner's Name" />
                                      {  formik.touched.partner2_name && formik.errors.partner2_name ? (<div className='text-danger mb-3'>{formik.errors.partner2_name}</div>) : null}
                                  </div>
                                  </div>
                                  <div className='row mb-4 '>
                                  <div className='col-sm-6'>
                                     
                                <input type="email" name="partner1_mailid" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.partner1_mailid} className='form-control' placeholder='Your Email Id' />
                                {formik.touched.partner1_mailid && formik.errors.partner1_mailid ? (<div className='text-danger mb-3'>{formik.errors.partner1_mailid}</div>) : null}
                                  </div>
                                  <div className='col-sm-6'>
                                      <input type="email" name="partner2_mailid" onChange={formik.handleChange} onBlur={formik.handleBlur} value={ formik.values.partner2_mailid} className='form-control' placeholder="Your Partner's email id" />
                                      {  formik.touched.partner2_mailid && formik.errors.partner2_mailid ? (<div className='text-danger mb-3'>{formik.errors.partner2_mailid}</div>) : null}
                                  </div>
                              </div>
                              <div className='row'>
                                  <div className='col-sm-4'>
                                      <label className='form-label'>Your Wedding Date:</label>
                            
                                  </div>
                                  <div className=' ms-0 col-sm-8'>
                                      <input type="date" name="wedding_date" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.wedding_date} placeholder='Your Wedding Date' className='form-control' />
        {formik.touched.wedding_date && formik.errors.wedding_date ? (<div className='text-danger mb-3'>{formik.errors.wedding_date}</div>) : null}
                                  </div>
                              </div>
                              <div className='row mb-5 mt-4'>
                                  <div className='col-sm-12'>
                                      <textarea placeholder='Tell us how you met each other' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.About_wedding} name="About_wedding" className='form-control' cols={70} rows={5} />
        {formik.touched.About_wedding && formik.errors.About_wedding ? (<div className='text-danger mb-3'>{formik.errors.About_wedding}</div>) : null}
                                  </div>
                              </div>
                              <div className='row'>
                                  <div className='col-sm-12'>
                                  <label className='form-label'>Your Couple or Wedding Photo:</label>
                                  <input
                                        className='form-control'
                                        type="file"
                                        accept=".png, .jpg, .jpeg"
                                        name="success_story_photo"
                                        onChange={handlePhoto}
                                      />
                                      <div className='text-danger mb-3'>Only png , jpeg , jpg files are allowed  </div>
                                  </div>
                             </div>
                              <div className='text-center mt-5'>
                                  <input  type="submit" className='btn btn-success'/>
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




export default SuccessStory;