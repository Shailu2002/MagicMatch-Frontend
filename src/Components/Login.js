import React , {useState,useEffect} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Navbarg from './Navbarg';
import axios from 'axios';
import { useFormik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import * as yup from 'yup';
const Login = () => {
    const [ip_address,setIP] = useState('');
    const history = new useNavigate();
    const defaultValues = {
    user_email: "",
    user_password: "",
    login_date:Date()
  }
  const pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  const validationSchema = yup.object({
    user_email: yup.string().email("Email is invalid").required("email is required"),
    user_password: yup.string().matches(pass,"must contain atleast 8 charcters,1 uppercase ,1 lowercase,1 digit and one special character").required("Enter Password")
  });
  const formik = useFormik({
  initialValues: defaultValues,
  validationSchema:validationSchema,
    onSubmit: async (values) => {
        const { user_email,user_password,login_date } = values;
        const sign = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/check_user_login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_email,
              user_password,
              ip_address,
              login_date,
            }),
          }
        );
      const resp = await sign.json();
      console.log(resp.user_id);
      if (sign.status === 200)
      {
        const gen = (Math.floor(Math.random() * (999999 - 1000000 + 1)) + 10).toString();
        localStorage.setItem("luser_id", resp.user_id);
        localStorage.setItem("lid", resp._id);
        localStorage.setItem("ecount","1");
        localStorage.setItem("user_email", resp.user_email);
        localStorage.setItem("token", gen + resp._id);
        console.log(localStorage.getItem("token"));
        history("/loginhome", {replace:true});
      }
      else if (sign.status === 201)
      {
        toast.error("Wrong Password");
      }
      else if (sign.status === 401)
      {
        toast.error("Wrong Mail id");
      }
      else
      {
        toast.error("Something went wrong");
        }
    }//onsubmit end here
  });

  const genipwork = async () =>
  {
    const res = await axios.get('https://geolocation-db.com/json/')
        console.log(res.data);
        setIP(res.data.IPv4)
    }
  useEffect(() => {
    genipwork(); 
  },[]);
  
  return (
    <>
      <Navbarg/>
      <div  className='backg'>
      <div className='responsive-width cardstyle'>
      <div className='card cardbg'>
      <div className="card-body card-mt">
      <div className='text-center'>
      <i class="fa-solid  fa-user logo"></i>
      <h4 style={{ fontFamily: "cursive", margin: "20px" }}>Login</h4>
      </div>
      <form >
      <div class="mb-3 ">
       <label  class="form-label">Your Email <span className='text-danger'>*</span></label>
   <input name="user_email" value={formik.values.user_email} onBlur={ formik.handleBlur}  onChange={formik.handleChange} type="email" class="form-control"  />
   {  formik.touched.user_email && formik.errors.user_email ? (<div className='text-danger mb-3'>{formik.errors.user_email}</div>) : null}
  </div>
  <div class="mb-3">
    <label class="form-label"> Password <span className='text-danger'>*</span></label>
                  <input name="user_password" onBlur={formik.handleBlur} value={formik.values.user_password} onChange={formik.handleChange} type="password" class="form-control" />
                  {  formik.touched.user_password && formik.errors.user_password ? (<div className='text-danger mb-3'>{formik.errors.user_password}</div>) : null}
  </div>
                
   <div className='text-center'>
  <button onClick={formik.handleSubmit} type="submit" style={{ marginRight: "20px" }} className='btn btn-lg btn-danger'>Login</button>
  <Link  style={{margin:"5px",textDecoration:"none"}} to="/forgotpass">Forgot Password ?</Link>
    <ToastContainer/>
 
               <hr />
    <h4>New on MagicMatch.com</h4>
  <button className='btn btn-lg btn-danger' ><Link style={{textDecoration:"none",color:'white'}} to="/signup">Register Free..</Link></button>
  </div>

                      </form>
                      
                  </div>
                  </div>
            </div>
              
         </div>
      </>
  )
}

export default Login;

