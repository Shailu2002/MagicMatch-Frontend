import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import LoginNav from './LoginNav';
import '../AfterLoginWork/LoginStyle.css';
import axios from 'axios';
import { toast, ToastContainer} from 'react-toastify';
const LoginHome = () => {
  const history = useNavigate();
  const uid = localStorage.getItem("luser_id");
  const id = localStorage.getItem("lid");  
  console.log(uid, id);
  const [interest, setint] = useState([]);
  const [express, setexp] = useState([]);
  const [pay, setpay] = useState([]);
  const [datajoin, setdatajoin] = useState([]);
  const [photod, setphotod] = useState([]);
  const [newUser, setNewUser] = useState(
    {
        user_id:uid,
        user_photo: '',
    }
);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newUser.user_photo) {
      toast.error("upload your photo");
    }
    else {
      const formData = new FormData();
      formData.append('user_photo', newUser.user_photo);
      formData.append('user_id', newUser.user_id);
      axios.put('/photo_router/add/', formData)
        .then(res => {
          console.log(res);
          toast.success("Photo Updated successfully");
          getdata();
        })
        .catch(err => {
          console.log(err);
          toast.error("something went wrong");

        });
        
    }
  };
  const naveditp = () =>
  {
    history('/editpersonal', {state:{gent:uid}});
  }
  const naveditg = () =>
  {
    history('/editgeneral', { state: {gent:uid} });
  }
  const navedite = () =>
  {
    history('/editeducational', { state: {gent:uid} });
    }
  const naveditpa = () =>
  {
    history('/editpartner', { state: {gent:uid} });
  }
  const getdata = async () =>
  {
    const uind = localStorage.getItem("luser_id");
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/gethomedata/${uind}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const data = await res.json();
  
    if (!data || res.status === 404)
    {
      toast.error("Something Went Wrong");
    }
    else if(res.status ===200)
    {
      setdatajoin(data[0]);
      localStorage.setItem("user_gender", data[0].user_gender);
      localStorage.setItem("name",data[0].user_name);
      setphotod(data[0].Details[0]);
      setpay(data[0].Payment[0]);
      setint(data[0].Interest);
      setexp(data[0].Express);
      localStorage.setItem("user_photo", data[0].Details[0].user_photo);
      }
  }
  const handlePhoto = (e) => {
    setNewUser({ ...newUser, user_photo: e.target.files[0] });
    // getdata()
}
  const displaydate = () =>
  {
    let slicedate;
     slicedate=  pay.payment_date ? pay.payment_date.slice(0, 10) : null;
    return slicedate;
    }
  useEffect(() =>
  {
    getdata();

  }, []);
  
  
  return (
    <>
      <LoginNav /> 
      <nav  className="navbar navbar-expand-md  bg-light  ">
                 <div className='container  font-weight-bold'>
                      <button className='navbar-toggler' type="button" data-bs-toggle="collapse" data-bs-target="#collapsenavebar">
                        <span className='navbar-toggler-icon'></span>   
                      </button>
                     <div className="collapse navbar-collapse  text-center" id="collapsenavebar">
                    <ul  className='navbar-nav'>
                             <li  className='nav-item   active'>
                              <Link to="/loginhome" className='nav-link  text-dark' >Dashboard</Link>
                                 </li>
                              <li  className='nav-item active'>
                                  <Link to="/myprofile" className='nav-link text-dark'>My Profile</Link>
                              </li>
                              
                  <li className='nav-item dropdown  active'>
                <Link  role="button" data-bs-toggle="dropdown" className='nav-link dropdown-toggle text-dark'>More</Link>
                    <ul class="dropdown-menu">
                               <li><Link to="" class="dropdown-item" >My Profile</Link></li>
                                  <li><Link to="/horror" class="dropdown-item">Add Horoscope Details</Link></li>
                                  <li></li>
                                </ul>
                              </li>
                          </ul>    
                      </div> 
                  </div>
              </nav>
      <div className='backg'>
        <div  className='container lg-cardstyle'>
        
          <h3 style={{color:"",fontWeight:"bolder"}} className='text-center heading1 mb-5'> Hello , {datajoin.user_name} Welcome back!</h3>
          <div className='row'>
              <div  className='card col-sm-4 ms-2 mb-4 me-4'>
                <div className='card-body'>
                  <div  className='text-center'>
                    <img style={{ width: "200px",height:"200px", borderRadius: "100px" }} alt="user_img" src={photod.user_photo} />
                
                </div>

                <div className='w3-container'>
                <button onClick={()=>{document.getElementById('id012').style.display='block'}} className='w3-teal w3-round w3-button'>update Photo</button>
                <div id="id012" class="w3-modal">
    <div style={{height:"40%",width:"40%"}} class=" w3-animate-top w3-modal-content">
      <div class="w3-container">
         <span onClick={() => { document.getElementById('id012').style.display = 'none' }} class="w3-button w3-display-topright">&times;</span>
             <div className='mt-5'>      
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                            <div className='mt-10 mb-4'>
                            <img style={{ width:"100px",height:"100px" }} alt="user_img" src={photod.user_photo} />
                                    <input
                                className='form-control'
                                type="file"
                                accept=".png, .jpg, .jpeg"
                                name="user_photo"
                                onChange={handlePhoto}
                                    />
                                    </div> 
                            <div className='mb-3'>
                                    <input
                                        type="submit" className='btn btn-success'
                                        />  
                                        <ToastContainer/>
                                 </div>
                                   
                                </form>
                   </div>     
      </div>
    </div>
                  </div>
                  </div>

                  <div>
                <span>{datajoin.user_id}</span>
                  </div>
                  <hr/>
                <div>
                <h6>Account Type</h6>
                 
                   {
                    pay ?  (pay.approval_status === 0 ? (<span>Payment not approved</span>) :
                     <div className='w3-container'>
                        <button onClick={() => { document.getElementById('id02').style.display = 'block' }} style={{backgroundColor:"white",color:"blue"}} className='btn'>{ pay.plan_name} Membership</button>
                        <div id="id02"  class="w3-modal">
       <div style={{height:"40%",width:"40%"}} class=" w3-animate-zoom w3-modal-content">
         <div class="w3-container">
        <span onClick={()=>{document.getElementById('id02').style.display='none'}} class="w3-button w3-display-topright">&times;</span>
        <div style={{paddingTop:"5%"}} className='container'>  
                      <h2 className='text-center heading1 text-danger'> Membership Details </h2>
                      <div className='details-pay text-center' >
                          <div className='mb-2'>
                             User Id :  <span className='paytext'>{pay.user_id}</span>     
                          </div>
                          <div className='mb-2'>
                            Transaction Id :  <span className='paytext'>{ pay.transaction_id}</span> 
                          </div>
                          <div className='mb-2'>
                              plan Duration:  <span className='paytext'>{pay.plan_duration} ({ pay.plan_name})</span>
                          </div>
                          <div className='mb-2'>
                              Payment Date :  <span className='paytext'>{ displaydate()}</span>
                          </div>
                          <div className='mb-2'>
                              Amount Paid :  <span className='paytext'>{ pay.amount_received}</span>
                          </div>
                      </div>             
      
              </div>
                              
      </div>
    </div>
                  </div>
                  </div>)  : <span>Free membership</span>
                  }
                  </div>
               </div>
              </div>
              {/* left card ends here */}
            <div className='col-sm-5'>

            <div style={{ height: "fit-content", border: "2px solid gray" }} className='container mt-3  card col-sm-12'>
                Total Invitations Sent
                <div className='card-body'>
                  {
                    interest ?  <div>{ interest.length}</div>:<div> 0</div>
                  }
      
                  </div>
              </div>
              <div style={{ height: "fit-content", border: "2px solid gray" }} className='container mt-3 card col-sm-12'>
                Total Invitations Received
                <div className='card-body'>
                {
                    express ?  <div>{ express.length}</div>:<div> 0</div>
                  }
             
                  </div>
              </div>
              <div style={{ height: "fit-content", border: "2px solid gray" }} className='container mt-3  card col-sm-12'>
              
                <p className='text-center text-success'>Edit Profile</p>
                    <ul type="none">
                      <li onClick={naveditp}><Link className='editp' >Edit Personal Details</Link></li>
                      <li onClick={naveditg}><Link className='editp' to="">Edit General Details </Link></li>
                      <li onClick={naveditpa}><Link className='editp' to="">Edit Partner Preferences</Link></li>
                      <li onClick={navedite}><Link className='editp' to="">Edit Educational Details</Link></li>
                     </ul>
                
                
              </div>
              </div>
             
              <ToastContainer/>
          </div>
          {/* </div>
          </div> */}
        </div>
        </div>
 
      </>
  )
}

export default LoginHome;