import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import UserProfile from '../AfterLoginWork/User_Profile_Nav';
import LoginNav from '../AfterLoginWork/LoginNav';
import { useLocation ,Link,NavLink,useNavigate} from 'react-router-dom';
import '../AfterLoginWork/LoginStyle.css'
const User_Profile = () => {
  const location = new useLocation();
  const history = new useNavigate();
  const [uind] = useState(localStorage.getItem("luser_id"));
  const [photo, setphoto] = useState();
  const [personal, setpersonal] = useState([]);
  const [education, seteducation] = useState([]);
  const [general, setgeneral] = useState([]);
  const [partner, setpartner] = useState([])
  const [hobby, sethobby] = useState([]);
  const [tcontact, setcontact] = useState([]);
  const [kundali, setkundali] = useState([]);
  const [p_religion, setpreligion] = useState([]);
  const [p_diet, setpdiet] = useState([]);
  const [p_mtongue, setpmtongue] = useState([]);
  const [p_qualification, setp_qualification] = useState([]);
  const [p_work, setpwork] = useState([]);
  const [p_profession, setprofession] = useState([]);
  const [p_country, setpcountry] = useState([]);
  const [p_state, setpstate] = useState([]);
  const [p_city, setpcity] = useState([]);
  const [p_marital, setmarital] = useState([]);

    const getdata = async () =>
    {

      const res = await fetch(`/getalldetails_data/${uind}`, {
        method: "GET",
        headers: {
          "content-type":"application/json"
        }
      });
      const data = await res.json();
    
        if (!data || res.status === 404)
        {
            toast.error("Something Went Wrong");
        }
        else if (res.status === 200)
        {
          
          console.log(data);
          setpersonal(data[0]);
          setgeneral(data[0].general[0]);
          setpartner(data[0].partner[0]);
          seteducation(data[0].educational[0]);
          sethobby(data[0].general[0].user_hobbies);
          setcontact(data[0].contact[0]);
          setkundali(data[0].kundalis[0]);
          setpwork(data[0].partner[0].partner_working_with);
          setp_qualification(data[0].partner[0].partner_highest_qualification);
          setpstate(data[0].partner[0].partner_state);
          setpcountry(data[0].partner[0].partner_country);
          setpdiet(data[0].partner[0].partner_diet);
          setpmtongue(data[0].partner[0].partner_mtongue);
          setpreligion(data[0].partner[0].partner_religion);
          setprofession(data[0].partner[0].partner_profession);
          setpcity(data[0].partner[0].partner_city);
          setmarital(data[0].partner[0].partner_marital_status);
          setphoto(data[0].photos[0].user_photo);
        }
    }
    
  const viewkundali = () =>
  {
    history("/viewkundali", { state: {kundali:kundali.user_kundali} });
  }
   

    const checkdiet = (element) =>
    {
        if (element === "Vegeterian")
        {
            return <i style={{fontSize:"30px",color:"green"}} className="fa-sharp fa-solid fa-salad"></i>;
        }
        else if (element === "Non-Vegeterian")
        {
          return <i style={{color:"red"}} class="fa-sharp fa-regular fa-turkey"></i>;
          
        }
        else
        {
            return <i className="fa-sharp fa-solid fa-salad"></i>;   
        }
        
    }
    
    
    useEffect(() =>
    {
      
      getdata();
  
    }, []);
   
  return (
    <>
      <LoginNav />
      <UserProfile/>
          <div className='bimg'>
          <div style={{paddingTop:"2%"}} className='container'>
                  <div style={{ width: "60%", marginLeft: "15%", borderRadius: "28px" }} className='card'>
                
                        <div className='card-body'>
                            <div className='container'>
                           
                              <div className='row'>
                             
                                  <div className=' mt-5 col-sm-5'>
                                 
                         <img style={{width:"80%",height:"80%"}} alt="" src={photo} />
                                      
                                       <ToastContainer/>
                                    </div>
                                    <div className='col-sm-7'>
                                        <h4 className='heading1'>{ personal.user_name}</h4>
                                    
                                        <hr/>
                                        <div style={{}} className='row'>
                                            <div className='col-sm-6'>
                                                <p>{personal.user_age} yrs, { general.user_height}</p>
                                                <p>{personal.user_religion},{personal.user_caste}</p>
                                                <p>{ personal.user_mtongue}</p>
                              </div>
                           <p>{personal.user_city},{personal.user_state},{personal.user_country}</p>
                                            <div className='col-sm-6'>
                                                <p>{ personal.user_marital}</p>
                        
                                                <p>{education.user_profession}</p>
                                            </div>
                                        </div>
                                    </div>
                              </div>
                              <h3  className='mt-4 heading1 text-danger text-center'>Detailed Profile</h3>
                             <h4> <i style={{fontSize:"30px",padding:"10px",color:"brown",borderRadius:"50px",border:"1px solid gray"}} class="fa-sharp fa-solid fa-quote-left"></i> <span className='headingprofile'>About {personal.user_name}</span></h4>
                              <p>{ personal.user_id}</p>
                              <p>{personal.user_about_yourself}</p>
                             <hr />
                
                              <div>
                  <h4><span className='headingprofile'>Basic Details</span></h4>
                  <p>Complexion : <span className='text-secondary'>{general.user_complexion}</span></p>
                  <p>Blood Group : <span className='text-secondary'>{general.user_blood_group}</span></p>
                  <p>Body Type : <span className='text-secondary'>{ general.user_body_type}</span></p>
                  <p></p>
                  <hr/>
                              </div>
                              <div>
                                  <h4> <i style={{fontSize:"30px",padding:"10px",color:"brown",borderRadius:"50px",border:"1px solid gray"}}  class="fa-sharp fa-solid fa-palette"></i><span className='headingprofile'>Hobbies and Interests </span> </h4>
                                  <ul type="none">
                                      {
                                      hobby.map((element) =>
                                      {
                                          return <li>{ element}</li>
                                      })
                                      }
                                 </ul>
                              </div>
                              <hr />
                              <div>
                                  <h4><i style={{fontSize:"30px",padding:"10px",color:"brown",borderRadius:"50px",border:"1px solid gray"}} class="fa-sharp fa-solid fa-phone"></i> <span className='headingprofile'>Contact Details</span>  </h4>
                                  <p>Email :<span className='text-secondary'>{tcontact.user_email}</span> </p>
                                  <p>Contact Number : <span className='text-secondary'>{tcontact.user_contact}</span> </p>
                                  <hr/>
                              </div>
                              <div>
                                  <h3> <i style={{fontSize:"30px",padding:"10px",color:"brown",borderRadius:"50px",border:"1px solid gray"}} class="fa-solid fa-utensils"></i> <span className='headingprofile'>Diet</span> </h3>
                                  <p>{
                                       checkdiet(general.user_diet)
                                  }
                                      <p>{ general.user_diet}</p>
                                  </p>
                                
                                  <hr/>
                              </div>
                              <div>
                                  <h4><i style={{fontSize:"30px",padding:"10px",color:"brown",borderRadius:"50px",border:"1px solid gray"}} class="fa-solid fa-graduation-cap"></i>  <span className='headingprofile'>Educational Details</span> </h4>
                                  <p>Qualification : <span className='text-secondary'>{education.user_highest_qualification}</span></p>
                                  <p>Working in  : <span className='text-secondary'>{education.user_working_with}</span></p>
                                  <p>Income : <span className='text-secondary'>{ education.user_annual_income}</span></p>
                                 <hr/>
                              </div>

                                {
                                  kundali ? ( <div>
                                    <h4><span className='headingprofile'>  Horoscope Details</span>
                                    </h4>
                                    <p>Date of Birth: <span className='text-secondary'>{kundali.user_dob}</span></p>
                    <p>Sun Sign: <span className='text-secondary'>{kundali.user_sunsign}</span></p>
                    <button style={{border:"none",color:"blue",backgroundColor:"white"}} onClick={viewkundali} type="submit"> View Kundali</button>
                                
                                    <p></p>
                                    <hr/>
                                </div>)  : null
                              }  
<div  className='mb-4'>
 <h4>  <i style={{fontSize:"30px",padding:"10px",color:"brown",borderRadius:"50px",border:"1px solid gray"}} class="fa-solid fa-user-group"></i><span className='headingprofile'>Partner Preferences</span></h4>
    <label className='text-danger'>Age</label>
     <p>{partner.partner_min_age} to { partner.partner_max_age}</p>
     <label className='text-danger'>
     Height
</label>
<p> {partner.partner_min_height}   to   {partner.partner_max_height}</p>

  {
  p_marital.includes("open to all") ? null:(<div><label className='text-danger'>Marital Status</label>
  
                      <p>{p_marital.map((e) =>
                      {
                        return <li style={{display:"inline"}}>{e}</li>
                      })}</p><hr/></div>)             
    }
 { p_religion.includes("open to all") ? null:(<div><label className='text-danger'>Religion</label>
    <p>{p_religion.map((e) =>{
   return <li style={{display:"inline"}}>{e}</li>
    })}</p><hr /></div>)}              
    { p_mtongue.includes("open to all") ? null:(<div><label className='text-danger'>Mother Tongue</label>
    <p>{p_mtongue.map((e) =>{
   return <li style={{display:"inline"}}>{e}</li>
    })}</p><hr /></div>)}    
       { p_country.includes("open to all") ? null:(<div><label className='text-danger'>Country</label>
    <p>{p_country.map((e) =>{
   return <li style={{display:"inline"}}>{e}</li>
    })}</p><hr /></div>)}                 
   { p_state.includes("open to all") ? null:(<div><label className='text-danger'>State</label>
    <p>{p_state.map((e) =>{
   return <li style={{display:"inline"}}>{e}</li>
    })}</p><hr /></div>)}  
                  
     { p_city.includes("open to all") ? null:(<div><label className='text-danger'>City</label>
    <p>{p_city.map((e) =>{
   return <li style={{display:"inline"}}>{e}</li>
    })}</p><hr /></div>)}  

         { p_profession.includes("open to all") ? null:(<div><label className='text-danger'>profession</label>
    <p>{p_profession.map((e) =>{
   return <li style={{display:"inline"}}>{e}</li>
    })}</p><hr /></div>)}   

        { p_work.includes("open to all") ? null:(<div><label className='text-danger'>Working With</label>
    <p>{p_work.map((e) =>{
   return <li style={{display:"inline"}}>{e}</li>
    })}</p><hr /></div>)}   

{ p_qualification.includes("open to all") ? null:(<div><label className='text-danger'>Qualification</label>
    <p>{p_qualification.map((e) =>{
   return <li style={{display:"inline"}}>{e}</li>
    })}</p><hr /></div>)}   
                              </div>
                         </div>
                      </div>
                  </div>
              </div>
          </div>
      </>
  )
}

export default User_Profile;




