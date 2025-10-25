import React, {  useState} from 'react';
// import emailjs from '@emailjs/browser';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
//import Navbar from './SignUpdetails/NavLogobar';
const Otp = () => {
  const location = new useLocation();
  const otp = (location.state.genotp);
  const id =(location.state.id);
  const [getdata, setuserdata] = useState({
    otp_verify:""
  });
  const history = new useNavigate();
  const setdata = (e) =>
    { 
      const { name, value } = e.target;
      setuserdata((primary) => {
      return {
        ...primary,
        [name]: value
      }
    });    
  }
  
  const verifyOtp = async(e) =>
  {
    
    e.preventDefault();
    const { otp_verify } = getdata;
   
    if (otp_verify === otp)
    {
      toast.success("Correct OTP");
      setTimeout(() => {
        history('/resetpass', { state: {id:id} ,replace:"true"});
     
   }, 3000);  
    }
    else
    {
      toast.error("Please enter a Valid Otp");
    }
    
  }
 
  
  return (
 
    <>
      {/* <Navbar/> */}
           <div className='backg'>
          <div className='container cardstyle'>
          <div className='card cardbg'>
          <div className="card-body   ">
          <div className='text-center'>
          <h4 style={{ fontFamily: "cursive", margin: "20px" }}>Forgot Password</h4> 
                          </div>
                         
              <form  className='text-center'>
                          <div class="mb-3">
          <label  class="form-label"> Enter OTP</label>
          <input type="text" name="otp_verify" onChange={setdata} value={getdata.otp_verify } class="form-control"  />
                </div>
                <button onClick={verifyOtp} className="btn btn-success" type='submit'>Verify</button>  
                <ToastContainer />
                <div >
                
                </div>
             
             </form>
</div>
</div>
</div>
</div>
      </>
  )
}

export default Otp;