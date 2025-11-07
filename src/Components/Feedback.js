import React from 'react'
import Navbar from './Navbarg';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
const Feedback = () => {
  const defaultValues={
    user_name: "",
    user_email: "",
    user_feedback: "",
    user_ratings:""
  }
  const validationSchema = yup.object({
    user_name: yup.string().matches(/^[a-zA-Z ]+$/, "It must contains alphabets only").max(20, "Name should not be greater than 20 characters").min(2, "Name should contain atleast 2 characters").required("Enter your Name"),
    user_email: yup.string().email('Email is Invalid').required("Enter your Email"),
    user_feedback: yup.string().required("feedback is required field"),
    user_ratings: yup.number().required("required")
  });
  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema:validationSchema,
    onSubmit: async (values) => {
      const { user_name,user_email,user_feedback,user_ratings } = values;
        const sign = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/user_feedback`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_name,
              user_email,
              user_feedback,
              user_ratings,
            }),
          }
        );        
        const resp = await sign.json();
        if (sign.status === 404 || !resp) {
          toast.error("Something went wrong!");
        }
        else if (sign.status === 200) {
          
          toast.success("Thank You For giving us Feedback!");
      }
      else if (sign.status === 201)
        {
          toast.error("Your Email id is not registered");
      }
      else if (sign.status === 202)
        {
          toast.error("Name registered as per your email id not matched");
          }
    }//onsubmit end here
    
  }); 
  return (
      <>
    <Navbar/>
    <div className='feedback'>
    <div className=' responsive-width cardstyle' >
    <div  class="card cardbg">
    <div class="card-body card-mt">
    <form  onSubmit={formik.handleSubmit} method="POST">
    <h4 className='text-center  heading1 text-danger'> <i class="fa-solid fa-comment"></i> Give Your Valuable Feedback!</h4>
    <div  className='row'>
    <div className="mb-3">
    <i class="fa-solid logo-feed fa-user"></i>
    <label  className="form-label"> Name </label>
    <input name="user_name" onChange={formik.handleChange} onBlur={ formik.handleBlur} value={formik.values.user_name}  type="text" className="form-control" />
    {formik.touched.user_name && formik.errors.user_name ? (<div className='text-danger form-error mb-3'>{formik.errors.user_name}</div>) : null}            
    </div>
    <div className="mb-3">
    <label  className="form-label"> <i class="fa-solid fa-envelope"></i> Email</label>
   <input type="email" name="user_email" value={formik.values.user_email} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control" />
  { formik.touched.user_email && formik.errors.user_email ? (<div className='text-danger form-error mb-3'>{formik.errors.user_email}</div>) : null} 
    </div>    
                  <div className="mb-3   mt-3 col-sm-12">
                  <label className="form-label"> <i class="fa-sharp fa-regular fa-comments"></i> Your Feedback</label><br/>
                    <textarea className='form-control' name="user_feedback" value={formik.values.user_feedback} onChange={formik.handleChange} onblur={ formik.handleBlur}  cols={70} rows={ 5} />
                     </div>  
                     { formik.touched.user_feedback && formik.errors.user_feedback ? (<div className='text-danger form-error mb-3'>{formik.errors.user_feedback}</div>) : null} 
                </div>    
                
                <div className="mb-3  ">
        <div> <label className="form-label"> <i class="fa-sharp fa-solid fa-face-smile"></i> Ratings </label>
        </div>              
    <input class="form-check-input" onChange={formik.handleChange} onBlur={ formik.handleBlur}   type="radio"  value="1"  name="user_ratings"/>
  <label style={{marginRight:"20px"}} class="form-check-label" >
   <i  class="fa-solid star-logo fa-star"></i>
  </label>
  <input class="form-check-input" type="radio" value="2" onChange={formik.handleChange} onBlur={ formik.handleBlur} name="user_ratings"/>
  <label style={{marginRight:"20px"}} class="form-check-label" >
  <i class="fa-solid star-logo fa-star"></i>  <i class="fa-solid star-logo fa-star"></i> 
    </label>
  <input class="form-check-input" type="radio" value="3" onChange={formik.handleChange} onBlur={ formik.handleBlur} name="user_ratings"/>
  <label style={{marginRight:"20px"}} class="form-check-label" >
  <i class="fa-solid star-logo fa-star"></i>  <i class="fa-solid star-logo fa-star"></i>  <i class="fa-solid star-logo fa-star"></i> 
  </label>
  <input class="form-check-input" type="radio" value="4" onChange={formik.handleChange} onBlur={ formik.handleBlur} name="user_ratings"/>
  <label style={{marginRight:"20px"}} class="form-check-label" >
  <i class="fa-solid star-logo fa-star"></i>  <i class="fa-solid star-logo fa-star"></i>  <i class="fa-solid star-logo fa-star"></i>  <i class="fa-solid star-logo fa-star"></i> 
  </label>
  <input class="form-check-input" type="radio" value="5" onChange={formik.handleChange} onBlur={ formik.handleBlur} name="user_ratings"/>
  <label style={{marginRight:"20px"}} class="form-check-label" >
  <i class="fa-solid star-logo fa-star"></i>  <i class="fa-solid star-logo fa-star"></i>  <i class="fa-solid star-logo fa-star"></i> 
  <i class="fa-solid star-logo fa-star"></i>  <i class="fa-solid star-logo fa-star"></i> 
  </label>
                  
  {  formik.touched.user_ratings && formik.errors.user_ratings ? (<div className='text-danger form-error mb-3'>{formik.errors.user_ratings}</div>) : null}  
  </div>   
   <div className='text-center'>
  <button type="submit"  className="btn btn-primary">Submit</button>
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

export default Feedback;