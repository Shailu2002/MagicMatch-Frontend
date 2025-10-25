import { Link, useNavigate } from 'react-router-dom';
import img from './Media/login.JPG';
import AccountCircleSharp from '@mui/icons-material/AccountCircleSharp';
import "./mystyle.css";
import { useFormik } from 'formik';
import { ToastContainer, toast,Flip } from 'react-toastify';
import * as yup from 'yup';

export const Login = () => {
  const history= new useNavigate();
  const defaultValues = {
    email: "",
    password:""
  }
  const validationSchema = yup.object({
    email: yup.string().email("Email is invalid").required("email is required"),
    password:yup.string().required("password is required")  
  });
  const formik = useFormik({
    initialValues: defaultValues,
  
  validationSchema:validationSchema,
    onSubmit: async (values) => {
      const { email,password } = values;
        const sign = await fetch("/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
                
            email,password
    
          })
   
        });         
      const resp = await sign.json();
      console.log(resp.user_id);
      console.log(resp.name);
      if (sign.status === 201)
      {
        localStorage.setItem("luser_id", resp.user_id);
        localStorage.setItem("lid",resp._id);
        localStorage.setItem("lname",resp.name);
        toast.success("Login Successfully",{autoClose:2000,hideProgressBar:"true",closeButton:false,bodyClassName:"grow-font-size"});
        setTimeout(() => {
          history("/Nav",{replace:true}); }, 4000);
        
      }
      else if (sign.status === 401  )
      {
        toast.error("password invalid");
      }
      else if ( sign.status === 406 )
      {
        toast.error("user not found");
      }
      else if ( sign.status === 402  )
      {
        toast.error("Something went wrong");
        }
      
    }//onsubmit end here
    
  });
  
  return (
    <>
     <div className='b' >
      <div className='container' style={{"marginTop":"100px","marginLeft":"165px"}}>
        <div className="card" style={{ "max-width": "90%"}}>
          <div className="row g-0">
            <div className="col-md-6">
              <div className="card-body d-flex flex-column">
              < AccountCircleSharp style={{"marginTop":"1%","marginLeft":"44%","fontSize":"55","color":"crimson"}}/>
              <div className='d-flex flex-row mt-2'>
              
                <span className="h1 fw-bold mb-0" style={{"marginLeft":"43%","fontSize":"25px","fontFamily":"Georgia","fontWeight":"bolder"}}>Login</span>
              </div>
              <form method="POST">
                <div class="mt-4 ms-3">
                  <label for="formGroupExampleInput" class="form-label ff">Email</label>
                  <input  class="form-control mt-2" name='email'  value={formik.values.email} onBlur={ formik.handleBlur}  onChange={formik.handleChange} type="email" />
                  {  formik.touched.email && formik.errors.email ? (<div className='text-danger mb-3'>{formik.errors.email}</div>) : null}
                </div>
                
                <div class="mt-3 ms-3">
                  <label for="formGroupExampleInput2" class="form-label ff">Password</label>
                  <input  class="form-control mt-2" name='password' onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} type="password" />
                  {  formik.touched.password && formik.errors.password ? (<div className='text-danger mb-3'>{formik.errors.password}</div>) : null}
                </div>
                
                <div class="col-12 my-5 fam" style={{"marginLeft":"35%","color":"crimson"}}>
                <Link to="/Forget" style={{"textDecoration":"none"}}>Forget your Password?</Link><br/>
                {/* <Link to="/register" style={{"textDecoration":"none","marginLeft":"33px"}}>Add admin</Link><br/> */}
               <button class="btn btn-danger ms-5" onClick={formik.handleSubmit} type="submit" >sign in</button>
               </div>
               </form>
              </div>
            </div>
            <div className="col-md-6">
              <img src={img}  class="img-fluid rounded-start" alt="admin" style={{"marginTop":"10%","marginLeft":"15%"}} />
                 
            </div>
          </div>
        </div>
      </div>
      </div>
      <ToastContainer position='top-center' autoClose="2000" hideProgressBar="true" bodyClassName="grow-font-size" closeButton={false} transition={Flip}/>
    </>
  )
}
export default Login;