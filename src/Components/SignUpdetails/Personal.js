import React, { useState } from 'react'
import Navbar from '../Navbarg';
import { useNavigate,useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
const Personal = () => {
  const location = new useLocation();
  const id = location.state.gent;
  console.log(id);
  const marital = [
  "Never Married","Divorced","Awaiting Divorce","Widowed"
  ];
  const [mother_tongue,setmother_tongue]=useState([])
  const getlang=async()=>{
    const res2= await fetch('/getlanguage',{
        method:"GET",
        headers:{
            "content-Type":"application/json"
        }
    });

    const data2=await res2.json();
    console.log(data2);
    if(!data2 || res2.status === 404){
        alert("error");
    }
    else{
        setmother_tongue(data2);
        
    }
}

  const [user_country, setcountry] = useState('');
  const [countryList, setcountryList] = useState([]);

  const getdata=async()=>{
    const res2= await fetch('/getcountry',{
        method:"GET",
        headers:{
            "content-Type":"application/json"
        }
    });

    const data2=await res2.json();
    console.log(data2);
    if(!data2 || res2.status === 404){
        alert("error");
    }
    else{
        setcountryList(data2);
        
    }
}
  const [user_state, setstate] = useState('');
  const [stateList, setstateList] = useState([]);
  const getdata1=async(countrycode)=>{
    const res2= await fetch(`/getstate/${countrycode}`,{
        method:"GET",
        headers:{
            "content-Type":"application/json"
        }
    });

    const data2=await res2.json();
    console.log(data2);
    if(!data2 || res2.status === 404){
        alert("error");
    }
    else{
        setstateList(data2);
    }
}

  const [user_city,setcity]=useState("");
  const [citylist, setcityList] = useState([]);
  const getdata2=async(statecode)=>{
    const res3= await fetch(`/getcity/${statecode}`,{
        method:"GET",
        headers:{
            "content-Type":"application/json"
        }
    });

    const data3=await res3.json();
    console.log(data3);
    if(!data3 || res3.status === 404){
        alert("error");
    }
    else{
        setcityList(data3);
       
    }
} 
  const [user_religion, setreligion] = useState("");
  const [religionList, setreligionList] = useState([]);
  const getdata3=async()=>{
    const res2= await fetch('/getreligion',{
        method:"GET",
        headers:{
            "content-Type":"application/json"
        }
    });

    const data2=await res2.json();
    console.log(data2);
    if(!data2 || res2.status === 404){
        alert("error");
    }
    else{
        setreligionList(data2);
        
    }
}
  const [user_caste, setcaste] = useState("");
  const [castelist, setcastelist] = useState([]);
  const getdata4=async(religioncode)=>{
    const res3= await fetch(`/getcaste/${religioncode}`,{
        method:"GET",
        headers:{
            "content-Type":"application/json"
        }
    });
    const data3=await res3.json();
    console.log(data3);
    if(!data3 || res3.status === 404){
        alert("error");
    }
    else{
        setcastelist(data3);
    }
}

  const history = new useNavigate();
  const defaultValues={
    user_id: id,
    user_name: "",
    user_age:"",
    user_gender:"",
    user_marital: "",
    user_mtongue: "",
    user_about_yourself: "",
    user_premium_status: 0,
    user_no_of_invitation_sent: 0,
    user_no_of_invitation_received: 0
  }
  const validationSchema = yup.object({
    user_name: yup.string().matches(/^[a-zA-Z ]+$/, "It must contains alphabets only").max(20, "Name should not be greater than 20 characters").min(2, "Name should contain atleast 2 characters").required("Enter your Name"),
    user_age: yup.number().max(50, "Age must not be greater than 50").min(18,"Age must not be less than 18").required("Age is required"),
    user_gender: yup.string().required("gender is required"),
    user_marital: yup.string().required("marital status is required"),
    user_about_yourself: yup.string().min(100, "It must contain atleast 100 characters").required("About yourself is required field"),
    user_mtongue:yup.string().required("Mother tongue is required"),
  });
  const formik = useFormik({
    initialValues: defaultValues,
  
  validationSchema:validationSchema,
    onSubmit: async (values) => {
 
      let gen = "";
      const { user_id, user_name, user_age, user_gender, user_marital, user_mtongue, user_about_yourself, user_premium_status, user_no_of_invitation_sent, user_no_of_invitation_received } = values;
       
      if (user_gender == "male")
      {
        gen = "female";
      }
      else {
        gen = "male";
      }
      console.log(gen);
      if (!user_country)
      {
        toast.error("Enter country");
      }
      else if (!user_religion)
      {
        toast.error("Enter Religion");
        }
      else if (!user_state)
      {
        toast.error("Enter state");
      }
      else if (!user_city)
      {
        toast.error("enter city");
      }
      else if (!mother_tongue)
      {
        toast.error("enter mother tongue");
        }
      else
      {
        const sign = await fetch("/user_personal", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
                
            user_id, user_name,user_age,user_gender,user_religion,user_caste,user_marital,user_mtongue,user_about_yourself,user_premium_status,user_no_of_invitation_sent,user_no_of_invitation_received,user_country,user_state,user_city
    
          })
          
        });
                 
        const resp = await sign.json();
        if (sign.status === 404 || !resp) {
          toast.error("Something went wrong!");
        }
        else if (sign.status === 200) {
          localStorage.setItem("name",formik.values.user_name);
          history("/general", { state: {gent:id,gender:gen,name:user_name},replace:"true" });
        }
        
        }
    }//onsubmit end here
    
  });
    
   const handleCountry = (event) =>
   {
     let countryCode;
     for (let i = 0; i < countryList.length; i++)
     {
       if (countryList[i].name == event.target.value)
       {
         countryCode = countryList[i].isCode;
         }
      } 
     setcountry(event.target.value);
     getdata1(countryCode);
  }
  const handlereligion = (event) =>
  {
    setreligion(event.target.value);
    getdata4(event.target.value);
  }
  const handlecaste = (event) =>
  {
    setcaste(event.target.value);
  }

  const handleStateChange = (event) =>
  {
    let statecode;
     for (let i = 0; i < stateList.length; i++) {
       if (stateList[i].name == event.target.value) {
         statecode = stateList[i].statecode;
       }
     } 
    setstate(event.target.value);
    getdata2(statecode); 
  }
    const handleCityChange=(event)=>{
      setcity(event.target.value);
    }
    useEffect(()=>{
      getdata();
      getdata3();
      getlang();
  },[]);

  return (
     
    <>
      <Navbar/>
       <div className='backg'>
        <div className='container cardstyle' >
          <div  class="card cardbg">
            <div class="card-body card-mt">
      <form onSubmit={formik.handleSubmit} method="POST">
    <h4 className='text-center heading1 text-danger'> <i class="fa-solid text-dark fa-circle-plus"></i> Personal Details</h4>
   <div className='row'>
     <div className="mb-3 ">
    <label  className="form-label">Full Name</label>
    <input name="user_name" onChange={formik.handleChange} onBlur={ formik.handleBlur} value={formik.values.user_name}  type="text" className="form-control" />
    {  formik.touched.user_name && formik.errors.user_name ? (<div className='text-danger mb-3'>{formik.errors.user_name}</div>) : null}            
    </div>
   
        <div className="mb-3 ">
        <div> <label className="form-label">Gender </label>
        </div>              
    <input class="form-check-input" onChange={formik.handleChange} onBlur={ formik.handleBlur}   type="radio"  value="male"  name="user_gender"/>
  <label style={{marginRight:"20px"}} class="form-check-label" >
    Male
  </label>
  <input class="form-check-input" type="radio" value="female" onChange={formik.handleChange} onBlur={ formik.handleBlur} name="user_gender"/>
  <label class="form-check-label" >
    Female
  </label>
  {  formik.touched.user_gender && formik.errors.user_gender ? (<div className='text-danger mb-3'>{formik.errors.user_gender}</div>) : null}  
    </div>           
    <div className="mb-3">
    <label  className="form-label">Age</label>
   <input type="number" name="user_age" value={formik.values.user_age} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control" />
  { formik.touched.user_age && formik.errors.user_age ? (<div className='text-danger mb-3'>{formik.errors.user_age}</div>) : null} 
    </div>
                    
                
   <div className="mb-3 ">
    <label  className="form-label">Religion</label>
                    <select value={user_religion} name="user_religion" onChange={handlereligion} class="form-select" >
                    <option selected>Select</option>
                      {
                         religionList.map((element,id) => {
                          return <option key={id}  value={element.name}>{element.name}</option>
                        })
                     
                    }
                    
                    </select>
            
</div>

<div className="mb-3">
  <label className="form-label">Caste</label>
                    <select name="user_caste" value={user_caste}  onChange={handlecaste} class="form-select">
            
                       <option selected>Select</option>
                    {
                      castelist.map((element,id) => {
                        return <option key={id} value={ element.name}>{ element.name}</option>
                      })
                    }
 
                    </select>
                
</div>  
    <div className="mb-3 ">
    <label className="form-label">Marital Status</label>
                    <select name="user_marital" onBlur={formik.handleBlur} value={formik.values.user_marital} onChange={formik.handleChange} class="form-select" >
    <option selected>Select</option>
                    {
                      marital.map(element => {
                        return <option>{element}</option>
                      })
                    }
                    </select>
                    { formik.touched.user_marital && formik.errors.user_marital ? (<div className='text-danger mb-3'>{formik.errors.user_marital}</div>) : null} 
</div>  
 <div className="mb-3 ">
                    <label className="form-label">Mother Tongue</label>
                    <select name="user_mtongue" onBlur={formik.handleBlur} onChange={ formik.handleChange} value={ formik.values.user_mtongue} class="form-select" >
                    <option selected>Select</option>
                      {
                      mother_tongue.map((element,id) => {
                        return <option key={id} value={element.name}>{element.name}</option>
                      })
                    }
  
                    </select>
                 
</div> 
                
<div className="mb-3">
                    <label className="form-label">Country</label>
                    <select className='form-select' name="user_country" value={user_country} onChange={handleCountry} >
                      <option selected>Select</option>
                      {  
                        countryList.map((element, index) => {
                          return   <option key={index} value={element.name} >{element.name}</option>
                        })
                      }
                    </select>  
        
    </div> 
    <div className="mb-3">
  <label  className="form-label">State</label>
 
                  
                    <select className='form-select' name="user_state"  value={user_state} onChange={ handleStateChange} >
                      <option selected>Select</option>
                      {
                        stateList.map((element,id) => {
                          return <option  key={id} value={element.name} >{ element.name}</option>
                        })
                      }
                    </select>
</div> 
<div className="mb-3 ">
  <label  className="form-label">City</label>
                
                    <select className='form-select' name="user_city" value={user_city} onChange={ handleCityChange} >
                      <option selected>Select</option>
                      {
                        citylist.map((cities,id) => {
                          return <option  key={id} value={cities.name}>{ cities.name}</option>
                        })
                      }
                    </select>
                </div>    
              
                  <div className="mb-3  mt-3 col-sm-12">
                  <label for="exampleInputName" className="form-label">About Yourself..</label><br/>
                    <textarea className='form-control' name="user_about_yourself" value={formik.values.user_about_yourself} onChange={formik.handleChange} onblur={ formik.handleBlur}  cols={70} rows={ 5} />
                     </div>  
                     { formik.touched.user_about_yourself && formik.errors.user_about_yourself ? (<div className='text-danger mb-3'>{formik.errors.user_about_yourself}</div>) : null} 
                     </div>         
           
    
                <div className='text-center'>
                 
                <button type="submit"  className="btn btn-primary">Submit and Continue</button>
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

  export default Personal; 
