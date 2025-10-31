import React from 'react'
import * as yup from 'yup';
import { Link} from 'react-router-dom';
import AccountCircleSharp from '@mui/icons-material/AccountCircleSharp';
import { useFormik } from 'formik';//to handle form
import { ToastContainer, toast,Flip } from 'react-toastify';

export const Register = () => {
    const defaultValues={
        name:"",
        email: "",
        password: "",
        cpassword: "",
       }

       const pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
       const validationSchema = yup.object({
        name:yup.string().required("Enter your name"),
         email: yup.string().email('Email is Invalid').required("Enter your Email"),
         password: yup.string().matches(pass,"must contain atleast 8 charcters,1 uppercase ,1 lowercase,1 digit and one special character").required("Enter Password"),
        cpassword:yup.string().required("Enter confirm password").oneOf([yup.ref("password"),null],"Password must match")
       });
       const formik = useFormik({
         initialValues: defaultValues,
       validationSchema:validationSchema,
         onSubmit: async (values) => {
           const {name, email,password, cpassword } = values;
           const sign = await fetch(
             `${process.env.REACT_APP_BACKEND_URL}/Auser_signup`,
             {
               method: "POST",
               headers: {
                 "Content-Type": "application/json",
               },
               body: JSON.stringify({
                 name,
                 email,
                 password,
                 cpassword,
               }),
             }
           );
         
                     const resp = await sign.json();
                     if (sign.status === 404 || !resp) {
                       toast.error("Something went wrong!");
                     }
                     else if (sign.status === 400) {
                         toast.warning("This Email id  already exist!");
                     }
                     else if (sign.status === 200) {
                        toast.success("Admin Registered");

                     }
        
         }//onsubmit end here
         
       });
     
  return (
    <>
     <div className='b' >
      <div className='container' style={{"marginTop":"99px","marginLeft":"265px"}}>
        <div className="card" style={{ "max-width": "70%","height":"500px","marginTop":"40px"}}>
          <div className="row g-0">
              <div className="card-body d-flex flex-column">
              < AccountCircleSharp style={{"marginLeft":"44%","fontSize":"45","color":"crimson"}}/>
              <div className='d-flex flex-row mt-1'>
                <span className="h1 fw-bold mb-0" style={{"marginLeft":"43%","fontSize":"19px","fontFamily":"Georgia","fontWeight":"bolder"}}>Login</span>
              </div>
              <form method="POST">
              <div class="mt-2 ms-3">
                  <label  class="form-label ff">Name<span className='text-danger'>*</span></label>
                  <input  class="form-control mt-1" name='name'  value={formik.values.name} onBlur={ formik.handleBlur}  onChange={formik.handleChange} type="text" />
                  {  formik.touched.name && formik.errors.name ? (<div className='text-danger mb-3'>{formik.errors.name}</div>) : null}
                </div>
                <div class="mt-2 ms-3">
                  <label  class="form-label ff">Email<span className='text-danger'>*</span></label>
                  <input  class="form-control mt-1" name='email'  value={formik.values.email} onBlur={ formik.handleBlur}  onChange={formik.handleChange} type="email" />
                  {  formik.touched.email && formik.errors.email ? (<div className='text-danger mb-3'>{formik.errors.email}</div>) : null}
                </div>
                <div class="mt-2 ms-3">
                  <label for="formGroupExampleInput2" class="form-label ff">Password</label>
                  <input  class="form-control mt-1" name='password' onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} type="password" />
                  {  formik.touched.password && formik.errors.password ? (<div className='text-danger mb-3'>{formik.errors.password}</div>) : null}
                </div>
                <div class="mt-2 ms-3">
                  <label for="formGroupExampleInput2" class="form-label ff" > Confirm Password</label>
                  <input  class="form-control mt-1" name='cpassword' onBlur={formik.handleBlur} value={formik.values.cpassword} onChange={formik.handleChange} type="password" />
                  {  formik.touched.cpassword && formik.errors.cpassword ? (<div className='text-danger mb-3'>{formik.errors.cpassword}</div>) : null}
                </div>
                <div class="col-12 my-4 fam" style={{"marginLeft":"35%","color":"crimson"}}>
                <Link to="/" style={{"textDecoration":"none","marginLeft":"7%"}}>SIGN IN</Link><br/>
               <button class="btn btn-danger ms-5" onClick={formik.handleSubmit} type="submit" >SIGN UP</button>
               </div>
               </form>
              </div>
            </div>
          </div>
        
      </div>
      </div>
      <ToastContainer position='top-center' autoClose="2000" hideProgressBar="true" bodyClassName="grow-font-size" closeButton={false} transition={Flip}/>

    </>
  )
}
export default Register;