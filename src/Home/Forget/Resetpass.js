import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate,useLocation } from 'react-router-dom';
//import Navbar from './SignUpdetails/NavLogobar';
const Resetpass = () => {
    const [getdata, setuserdata] = useState({
        newpass: "",
        confirmnewpass:""
    });
  const location = new useLocation();
  const id = localStorage.getItem("f_id")
  console.log(id);

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
    const addinpdata = async (e) =>
    {
        e.preventDefault();
      const { newpass, confirmnewpass } = getdata;
    
      if (!newpass )
      {
        toast.error("enter password");
      }
      else if (!confirmnewpass)
      {
        toast.error("enter confirmed password");
        
        }
      else if (newpass !== confirmnewpass)
      {
        toast.error("Type the Same password as in Change Password Field");
      }
      else
      {
          const res2 = await fetch(`/update_pass/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(
              {
                newpass,confirmnewpass
              })
      
          });
      
        const data2 = res2.json();
        console.log(data2);

        if (res2.status === 201)
        {
          
          toast.success("password updated");
          setTimeout(() => {
            history('/admin');
         
       }, 2000);  
        }
        else if (res2.status===422)
        {
          toast.success("something went wrong");
        }
        
        }
       
        }
  return (
    <>
    
           <div className='backg'>
        <div className='container cardstyle' >
      <div class="card cardbg">
  <div class="card-body">
       <form>
     <h2>Reset Password</h2>
  
    <div className="mb-3">
    <label  className="form-label"> New Password</label>
     <input name="newpass" type="password" value={getdata.newpass} onChange={ setdata}  className="form-control" />
    </div>
    <div className="mb-3">
    <label  className="form-label"> Confirm New Password</label>
    <input type="password" name="confirmnewpass" value={getdata.confirmnewpass} onChange={ setdata} className="form-control" />
                </div>
                <div className='text-center' >   
                  <button type="submit" onClick={addinpdata} className="btn btn-primary">Confirm</button>
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

export default Resetpass;