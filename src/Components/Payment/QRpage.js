import React from 'react';
import img1 from '../Images/Qrcode.jpg';
import * as yup from 'yup';
import { useNavigate , useLocation } from 'react-router-dom';
import { useFormik } from 'formik';//to handle form
import { ToastContainer, toast } from 'react-toastify';
const QRpage = () => {
  const location = new useLocation();
  const navigate = useNavigate();
    const plan_name = location.state.plan_name;
    const duration = location.state.duration;
    const amount =parseInt( location.state.amount);
    console.log(plan_name, duration, amount);
    const defaultValues={
        user_id: localStorage.getItem("luser_id"),
        transaction_id: "",
        total_amount: amount,
        plan_name: plan_name,
        plan_duration: duration,
        approval_status: 0,
        active_status:false,
        payment_date: Date(),
        amount_received: 0,
        user_email_id:localStorage.getItem("user_email"),
      }
      const validationSchema = yup.object({
      
          user_id: yup.string().max(8, "It must be of 8 Characters").matches(/^MM+[0-9]+$/,"Enter correct Id").min(8, "It must be of 8 Characters").required("Enter your User Id"),
          transaction_id:yup.string().max(12,"Must be of 12 digits").matches(/^[0-9]+$/,"It  should only digits").min(12,"Must be of 12 Digits").required("Enter Transaction Id")
      });
      const formik = useFormik({
        initialValues: defaultValues,
      validationSchema:validationSchema,
        onSubmit:async(values)  => {
          const { user_id,  transaction_id,total_amount,plan_name,plan_duration,approval_status,active_status,payment_date,amount_received,user_email_id } = values;
          const pay = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/user_payment1`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials:"include",
              body: JSON.stringify({
                user_id,
                transaction_id,
                total_amount,
                plan_name,
                plan_duration,
                approval_status,
                active_status,
                payment_date,
                amount_received,
                user_email_id,
              }),
            }
          ); 
          if (pay.status === 401) {
            console.log("Authentication failed: No token or invalid token");
            localStorage.clear(); // Safety ke liye storage saaf karein
            navigate("/login", { replace: true }); // Login par redirect
            return; // Function ko yahan stop karein
          }
          const resp = await pay.json();
          if (pay.status === 404 || !resp) {
            toast.error("Something went wrong!");
          }
          else if (pay.status === 200) {
              toast.success("Payment Done");
          }       
       
        }//onsubmit end here
        
      });

  return (
      <>
         <div className='backg'>
              <div style={{paddingTop:"5%"}} className='container'>
                  <div style={{width:"70%",marginLeft:"15%"}} className='card qrsearch'>
                      <div className='card-body'>
                          <h4>  Scan this  QR code to Pay </h4>
                          <form method='POST' onSubmit={formik.handleSubmit}>
                              <div className='row'>
                                  <div className='col-sm-5 text-center'>
                                      <img style={{ height: "90%", width: "70%", borderRadius: "30%" }} src={img1} /> 
                                      <h4 style={{color:"Purple"}}> pay ₹{amount} </h4>
                                  </div>
                                  <div className='col-sm-7'>
                                      <label style={{color:"darkblue",fontSize:"20px",fontFamily:"monospace"}}  className='form-label'>After Paying Fill the details below</label>
                                    <div style={{paddingTop:"5%"}}>   
            <input type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.user_id} placeholder="User Id" name="user_id" className='form-control' />
       {formik.touched.user_id && formik.errors.user_id ? (<div className='text-danger mb-3'>{formik.errors.user_id}</div>) : null}

                                    </div>
                                
                                    <div style={{paddingTop:"5%"}}>
                                
                                          <input name="transaction_id" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.transaction_id} type="text" placeholder='Transaction Id' className='form-control' />
                                          
                                          {  formik.touched.transaction_id && formik.errors.transaction_id ? (<div className='text-danger mb-3'>{formik.errors.transaction_id}</div>) : null}
    
                                      </div>
                                      <div  className='text-center'  style={{marginTop:"10%"}}>
                                          < button type="submit" className='btn btn-success'> Save </button> 
                                     <ToastContainer/>     
                                      </div>
                                    
                                  </div>
                              </div>
                          </form>
                      </div>
                  </div>
            </div>
              
         </div>
      </>
  )
}

export default QRpage;