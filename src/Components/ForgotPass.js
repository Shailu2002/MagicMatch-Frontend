import React, { useRef, useState} from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from './SignUpdetails/NavLogobar';
const ForgotPass = () => {
    const form = useRef();
    let history = useNavigate();
    const genotp = ( Math.floor(Math.random() * (9999-1000+1))+1000).toString();
    const [getdata, setuserdata] = useState({
        user_email:""
    });
    const setdata = (e) =>
    {
        
        const { name, value } = e.target;
         setuserdata((primary) => {
          return {
        ...primary,
        [name]:value
         }
    })
}

    const sendemail = async(e) =>
    {
        e.preventDefault();
        const { user_email } = getdata;
        if (user_email === "") {
            toast.error("Enter Your Email");
            
        }
        else if (!user_email.includes("@"))
        {
          toast.warning("Enter a Valid Email")  
            }
        else {
            const sign = await fetch("/check_emailotp", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                user_email
              })
            
            });
          
                      const resp = await sign.json();
                      if (sign.status === 404 || !resp) {
                        toast.error("Something went wrong!");
                      }
                      else if (sign.status === 400) {
                          toast.error("Email is not registered ");
                      }
                      else if (sign.status === 200) {
                         
                        toast.success("OTP has been sent to your Mail");  
                        setTimeout(() => {
                             emailjs.sendForm('service_s7bc7so', 'template_6cs1j9y', form.current, '7apsjFDK6tP05LZc-')
                            .then((result) => {
                                console.log(result.text);
                            }, (error) => {
                                console.log(error.text);
                            });
                        
                            history('/sendotpuser', { state: { genotp: genotp ,id:resp._id} ,replace:"true"});
                          
                        }, 6000);
                          
                      }
        }
     }
  return (
      <>
          <Navbar/>
          <div className='backg'>
          <div className='container cardstyle'>
          <div className='card cardbg'>
          <div className="card-body   ">
          <div className='text-center'>
          <h4 className='heading1'>Forgot Password</h4> 
          <hr/>
          </div>
          <div className='text-center'>
          <p style={{ margin: "20px" }}>We will send you OTP to reset your Password</p>
          </div>
    <form ref={form} >
    <div class="mb-3 ">
    <label  class="form-label"> Enter Email address</label>
    <input type="email" onChange={setdata} value={ getdata.user_email} name="user_email" class="form-control"  />
    <input hidden name="message" value={genotp} />
  </div>
  <div className='text-center'>
 <button type="submit" style={{ marginRight: "20px" }} onClick={sendemail} className='btn btn-lg btn-danger'>Send Otp </button>
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

export default ForgotPass;