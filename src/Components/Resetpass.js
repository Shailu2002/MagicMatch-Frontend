import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate,useLocation } from 'react-router-dom';
import Navbar from './SignUpdetails/NavLogobar';
import { useFormik } from 'formik';
import * as yup from 'yup';
const Resetpass = () => {
  
  const location = new useLocation();
  const id = location.state.id;
  console.log(id);
  const history = new useNavigate();
  const defaultValues={
    user_pass: "",
    user_cpass:""
  }
  const pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  const validationSchema = yup.object({
    user_pass: yup.string().matches(pass,"must contain atleast 8 charcters,1 uppercase ,1 lowercase,1 digit and one special character").required("Enter Password"),
    user_cpass:yup.string().required("Enter confirm password").oneOf([yup.ref("user_pass"),null],"Password must match")
  });
  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema:validationSchema,
    onSubmit: async (values) => {
      const { user_pass,user_cpass } = values;
      const res2 = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/update_pass_user/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_pass,
            user_cpass,
          }),
        }
      );
    const data2 = res2.json();
    console.log(data2);
    if (res2.status === 201)
    {
         toast.success("password updated");
         setTimeout(() => {
         history('/login', {replace:"true"});
   }, 2000);  
    }
    else if (res2.status==422)
    {
      toast.success("something went wrong");
    }
   
    }//onsubmit end here
    
  });   
  return (
    <>
      <Navbar/>
    <div className='backg'>
    <div className='container cardstyle' >
    <div class="card cardbg">
     <div class="card-body">
     <form onSubmit={formik.handleSubmit}>
    <h2 className=" heading1 text-center">Update Password</h2>
    <div className="mb-3">
    <label  className="form-label"> New Password</label>
   <input name="user_pass" type="password" value={formik.values.user_pass} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control" />
    {formik.errors.user_pass && formik.touched.user_pass ? <div className='text-danger' >{formik.errors.user_pass}</div> : null}
    </div>
    <div className="mb-3">
    <label  className="form-label"> Confirm New Password</label>
                  <input type="password" name="user_cpass" value={formik.values.user_cpass} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control" />
                  {formik.errors.user_cpass && formik.touched.user_cpass ? <div className='text-danger' >{formik.errors.user_cpass}</div> : null}
                </div>
                <div className='text-center' >   
                  <button type="submit" className="btn btn-primary">Update</button>
                  <ToastContainer/>
     </div>           
              </form>
            </div> </div> </div> </div>
      </>
  )
}

export default Resetpass;