import React from 'react';
import * as yup from 'yup';
import Navbarg from './Navbarg';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';//to handle form
import { ToastContainer, toast } from 'react-toastify';
const Signup = () => {
  const history = new useNavigate();
  const genotp1 = (Math.floor(Math.random() * (99 - 10 + 1)) + 10).toString();
  const genotp2 = (Math.floor(Math.random() * (99 - 10 + 1)) + 10).toString();
  const genotp3 = (Math.floor(Math.random() * (99 - 10 + 1)) + 10).toString();
  const genotp = genotp1.concat(genotp2).concat(genotp3);
  const  gent = "MM".concat(genotp); 
  const defaultValues={
    user_id: gent,
    user_email: "",
    user_contact:"",
    user_pass: "",
    user_date: Date(),
    user_cpass: "",
   activeStatus:false
  }
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  const pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  const validationSchema = yup.object({
    user_email: yup.string().email('Email is Invalid').required("Enter your Email"),
    user_contact:yup.string().matches(phoneRegex,"Invalid Mobile number").required("Enter your contact number"),
    user_pass: yup.string().matches(pass,"must contain atleast 8 charcters,1 uppercase ,1 lowercase,1 digit and one special character").required("Enter Password"),
    user_cpass:yup.string().required("Enter confirm password").oneOf([yup.ref("user_pass"),null],"Password must match")
  });
  const formik = useFormik({
    initialValues: defaultValues,
  validationSchema:validationSchema,
    onSubmit: async (values) => {
      const { user_id, user_date, user_email, user_contact, user_pass,activeStatus } = values;
      const sign = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user_signup1`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials:"include",
          body: JSON.stringify({
            user_id,
            user_date,
            user_email,
            user_contact,
            user_pass,
            activeStatus,
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
                  localStorage.setItem("email",formik.values.user_email);
                 await history("/personal",{state:{gent:user_id},replace:"true"});
                }
   
    }//onsubmit end here
    
  });


  return (
    <>
      <Navbarg />

      <div style={{ marginTop: "60px" }} className="backg">
        <div className=" responsive-width cardstyle">
          <div class="card cardbg">
            <div class="card-body">
              <form>
                <h4 className="text-center heading1 text-danger">
                  {" "}
                  <i class="fa-solid text-dark fa-circle-plus"></i> Register
                  Yourself
                </h4>
                <div className="mb-3">
                  <label className="form-label">
                    Email address<span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    name="user_email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.user_email}
                    className="form-control"
                  />
                  {formik.touched.user_email && formik.errors.user_email ? (
                    <div className="text-danger mb-3">
                      {formik.errors.user_email}
                    </div>
                  ) : null}
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Contact Number<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="user_contact"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.user_contact}
                    className="form-control"
                  />
                  {formik.errors.user_contact && formik.touched.user_contact ? (
                    <div className="text-danger">
                      {formik.errors.user_contact}
                    </div>
                  ) : null}
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Password<span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    name="user_pass"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.user_pass}
                    className="form-control"
                  />
                  {formik.errors.user_pass && formik.touched.user_pass ? (
                    <div className="text-danger">{formik.errors.user_pass}</div>
                  ) : null}
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Confirm Password<span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    name="user_cpass"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.user_cpass}
                    className="form-control"
                  />
                  {formik.errors.user_cpass && formik.touched.user_cpass ? (
                    <div className="text-danger">
                      {formik.errors.user_cpass}
                    </div>
                  ) : null}
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    onClick={formik.handleSubmit}
                    className="btn btn-primary"
                  >
                    Submit and Continue
                  </button>
                  <ToastContainer />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;

