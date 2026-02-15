import { useState, useEffect } from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import Select from '@mui/material/Select';
import Cheight from '../SignUpdetails/Height.json';
import Checkbox from '@mui/material/Checkbox';
import {useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import Navbar from './LoginNav';
import * as yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
const EditPartner = () => {
  const location = new useLocation();
  const navigate = useNavigate();
  const uid = location.state.gent;
  console.log(uid);
  const ITEM_HEIGHT = 40;
  const ITEM_PADDING_TOP = 0;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const [mother_tongue,setmother_tongue]=useState([])
  const getlang=async()=>{
    const res2 = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/getlanguage`,
      {
        method: "GET",
        headers: {
          "content-Type": "application/json",
        },
        credentials: "include",
      },
    );
      if (res2.status === 401) {
        console.log("Authentication failed: No token or invalid token");
        localStorage.clear(); // Safety ke liye storage saaf karein
        navigate("/login", { replace: true }); // Login par redirect
        return; // Function ko yahan stop karein
      }
    const data2=await res2.json();
    console.log(data2);
    if(!data2 || res2.status === 404){
        alert("error");
    }
    else {
      data2.push({
        'name':'open to all'
      });
     setmother_tongue(data2); 
    }
  }
const [partner_country, setcountry] = useState([]);
const [countryList, setcountryList] = useState([]);
const [partner_state, setstate] = useState([]);
const [statelist,setstateList]=useState([]);
const [partner_city,setcity]=useState([]);
  const [citylist, setcityList] = useState([]);
  
  const getdatacountry=async()=>{
    const res2 = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/getcountry`,
      {
        method: "GET",
        headers: {
          "content-Type": "application/json",
        },
        credentials: "include",
      },
    );
      if (res2.status === 401) {
        console.log("Authentication failed: No token or invalid token");
        localStorage.clear(); // Safety ke liye storage saaf karein
        navigate("/login", { replace: true }); // Login par redirect
        return; // Function ko yahan stop karein
      }
    const data2=await res2.json();
    console.log(data2);
    if(!data2 || res2.status === 404){
        alert("error");
    }
    else {
      data2.push({
        'name':'open to all'
      });
      setcountryList(data2);
    }
    return data2;
}
  const getdata1=async(countrycode)=>{
    const res2 = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/getstateall/${countrycode}`,
      {
        method: "GET",
        headers: {
          "content-Type": "application/json",
        },
        credentials: "include",
      },
    );
      if (res2.status === 401) {
        console.log("Authentication failed: No token or invalid token");
        localStorage.clear(); // Safety ke liye storage saaf karein
        navigate("/login", { replace: true }); // Login par redirect
        return; // Function ko yahan stop karein
      }
    const data2=await res2.json();
    console.log(data2);
    if(!data2 || res2.status === 404){
        alert("error");
    }
    else {
      if (countryList.includes('open to all'))
      {
        setstateList({"name":'open to all'});
      }
      else
      {
        data2.push({
          'name':'open to all'
        });
        setstateList(data2);
        }
    }
    return data2;
}
  const getdata2=async(statecode)=>{
    const res3 = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/getcityall/${statecode}`,
      {
        method: "GET",
        headers: {
          "content-Type": "application/json",
        },
        credentials: "include",
      },
    );
      if (res3.status === 401) {
        console.log("Authentication failed: No token or invalid token");
        localStorage.clear(); // Safety ke liye storage saaf karein
        navigate("/login", { replace: true }); // Login par redirect
        return; // Function ko yahan stop karein
      }
    const data3=await res3.json();
    console.log(data3);
    if(!data3 || res3.status === 404){
        alert("error");
    }
    else {
      if (statelist.includes('open to all'))
      {
       
        setcityList({"name":"open to all"});
      }
      else
      {
        data3.push({
          'name':'open to all'
        });
        setcityList(data3);

        }
    }
} 
  const [religionList, setreligionList] = useState([]);
  const getdata3=async()=>{
    const res2 = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/getreligion`,
      {
        method: "GET",
        headers: {
          "content-Type": "application/json",
        },
        credentials: "include",
      },
    );
      if (res2.status === 401) {
        console.log("Authentication failed: No token or invalid token");
        localStorage.clear(); // Safety ke liye storage saaf karein
        navigate("/login", { replace: true }); // Login par redirect
        return; // Function ko yahan stop karein
      }
    const data2=await res2.json();
    console.log(data2);
    if(!data2 || res2.status === 404){
        alert("error");
    }
    else {
      data2.push({
        'name':'open to all'
      });
        setreligionList(data2);
    }
}
 
  const getdata = async (count) => {
     console.log(count);
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/getpartnerdata/${uid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    );
      if (res.status === 401) {
        console.log("Authentication failed: No token or invalid token");
        localStorage.clear(); // Safety ke liye storage saaf karein
        navigate("/login", { replace: true }); // Login par redirect
        return; // Function ko yahan stop karein
      }
    const datas = await res.json();
    console.log(datas);
    if (!datas || res.status === 404) {
    
      toast.error("Data not retrieved");
    }
    else if (res.status === 200) {
      const countryCodes = datas.partner_country
        .map((cName) => count.find((c) => c.name === cName)?.isCode)
        .filter(Boolean); // undefined values remove
      if (countryCodes.length > 0) {
          const statelistn = await getdata1(countryCodes);
          const stateCodes = datas.partner_state
            .map((sName) => statelistn.find((s) => s.name === sName)?.statecode)
            .filter(Boolean);
          if (stateCodes.length>0) {
            await getdata2(stateCodes);
          }
      }
      formik.setValues(datas);
      setcity(datas.partner_city);
      setcountry(datas.partner_country);
      setstate(datas.partner_state);
    }
  };
  useEffect(() => {
      const loadAll = async () => {
        const count=await getdatacountry();
        getdata3();
        getlang();
        getdata(count);
      };
      loadAll();
},[]);

  const handleCountry = (event) =>
  {
      const selectcountries = event.target.value;
      console.log(selectcountries);
      setcountry(selectcountries);
      const countrynames = selectcountries.map((element) => element.trim());
      const countrycodes = countrynames
        .map((element) => {
          const country = countryList.find((c) => c.name === element);
          return country?.isCode;
        })
        .filter(Boolean);

      getdata1(countrycodes.join(","));
 }
 const handleStateChange = (event) =>
 {
   const selectstates = event.target.value;
   setstate(selectstates);
   const statenames = selectstates.map((element) => element.trim());
   const statecodes = statenames
     .map((element) => {
       const state = statelist.find((c) => c.name === element);
       return state?.statecode;
     })
     .filter(Boolean);
   getdata2(statecodes.join(","));
 }
   const handleCityChange=(event)=>{
     setcity(event.target.value);
     console.log(event.target.value);
   }
  const marital = [
    "Never Married","Divorced","Awaiting Divorce","Widowed",'open to all'
  ];
  const highest_qualification = ['MTech', 'Msc', 'MCA', 'MBA', 'Mcom', 'MBBS', 'BCA', 'Bcom', 'Bsc', 'Bvoc', 'BBA', 'Intermediate', 'High School', 'Less than School','open to all'];
  const working_with = ['Private Company', 'Government Sector', ' Defense /Civil Services', 'Business', 'Not Working', 'open to all'];
  const profession = ['Banking Professional', 'Charactered Accountant', 'Company Secretary', 'Finance Professional', 'Accountant Professional', 'Actor', 'Actress', 'Event Manager', 'Agricultural Professional', 'Interior Designer', 'Pilot', 'Air Hostess', 'Animator', 'Web Developer', 'Software Engineer', 'Mobile Developer', 'IAS', 'IFS', 'IPS', 'Airforce',
  'Army','Navy','Professor','Teacher','Entrepenuer','Doctor','Dentist','Nurse','Student','open to all'];
  const diet = ['Vegeterian','Non-Vegeterian','Occasionally Non-Vegeterian','open to all'];
  const defaultValues = {
    user_id: uid,
    partner_gender:"",
    partner_min_age:"",
    partner_max_age:"",
    partner_min_height: "",
    partner_max_height: "",
    partner_marital_status: [],
    partner_religion: [],
    partner_diet: [],
    partner_mtongue:[],
    partner_highest_qualification: [],
    partner_working_with:[],
    partner_profession:[]
  }
    const validationSchema = yup.object({
      partner_min_age: yup.number().max(50, "Age must not be greater than 50").min(18, "Age must not be less than 18").required("Age is required"),
      partner_max_age: yup.number().max(50, "Age must not be greater than 50").min(18, "Age must not be less than 18").required("Age is required"),
      partner_max_height: yup.string().required("height is required"),
      partner_min_height: yup.string().required("height is required"),
      partner_diet: yup.array().min(1,"diet is required"),
      partner_mtongue: yup.array().min(1,"mother tongue is required"),
      partner_highest_qualification: yup.array().min(1,"required"),
      partner_marital_status: yup.array().min(1,"marital status required"),
      partner_religion: yup.array().min(1,"required"),
      partner_profession: yup.array().min(1,"required"),
      partner_working_with: yup.array().min(1,"required"), 
      });
    const formik = useFormik({
      initialValues: defaultValues,
    
    validationSchema:validationSchema,
      onSubmit: async (values) => {

        const { partner_min_age, partner_max_age, partner_min_height, partner_max_height, partner_marital_status, partner_religion,
        partner_diet,partner_mtongue,partner_highest_qualification,partner_working_with,partner_profession} = values;
        if (partner_country.length===0) {
          toast.error("Enter country");
        }
        else if (partner_state.length===0) {
          toast.error("Enter state");
        }
        else if (partner_city.length===0) {
          toast.error("enter city");
        }
        else {
  
          const res2 = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/update_partner/${uid}`,
            {
              method: "PATCH",
              headers: {
                "content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({
                partner_min_age,
                partner_max_age,
                partner_min_height,
                partner_max_height,
                partner_marital_status,
                partner_religion,
                partner_diet,
                partner_mtongue,
                partner_highest_qualification,
                partner_working_with,
                partner_profession,
                partner_country,
                partner_state,
                partner_city,
              }),
            },
          );
  
            if (res2.status === 401) {
              console.log("Authentication failed: No token or invalid token");
              localStorage.clear(); // Safety ke liye storage saaf karein
              navigate("/login", { replace: true }); // Login par redirect
              return; // Function ko yahan stop karein
            }
          const data2 = res2.json();
          
          if (res2.status === 200)
          {
            toast.success("Partner Preferences Updated Successfully");
          }
          else if (res2.status===400 || !data2)
          {
            toast.success("something went wrong");
          } 
        }
         
      }//onsubmit end here
      
    });
  
  return (
    <>
      <Navbar />
      <div className='backg'>
        <div className='container cardstyle'>
          <div className='card'>
            <div className='card-body card-mt'>
              <form onSubmit={formik.handleSubmit} method="post">
              <h4 className='text-center heading1 text-danger'> <i className="fa-solid fa-pen-to-square text-dark"></i> Edit Partner Preferences</h4>
                <div className='mb-3'>
                  <label className='form-label'>Age Range</label>
                  <div className='row'>
                    <div className='col-sm-5'>
                    <div className="mb-3">
   
   <input type="number" name="partner_min_age" value={formik.values.partner_min_age} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control" />
  { formik.touched.partner_min_age && formik.errors.partner_min_age ? (<div className='text-danger mb-3'>{formik.errors.partner_min_age}</div>) : null} 
    </div>
                     
                    </div>
                    <div className='col-sm-1'>
                        to
                     </div>
                    <div className='col-sm-5'>
                      
                    <div className="mb-3">
  
   <input type="number" name="partner_max_age" value={formik.values.partner_max_age} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control" />
  { formik.touched.partner_max_age && formik.errors.partner_max_age ? (<div className='text-danger mb-3'>{formik.errors.partner_max_age}</div>) : null} 
    </div>
                   
                    </div>
                  </div>
                 
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Height Range</label>
                  <div className='row'>
                    <div className='col-sm-5'>
                      <select value={ formik.values.partner_min_height} name="partner_min_height" onBlur={formik.handleBlur}  onChange={formik.handleChange} className='form-select'>
                    <option selected>Select</option>
                    {
                    
                      Cheight.map(element => {
                        return <option value={element.value}>{element.height+" - "+ element.value}</option>
                      })
                    }
                      </select> 
                      { formik.touched.partner_min_height && formik.errors.partner_min_height ? (<div className='text-danger mb-3'>{formik.errors.partner_min_height}</div>) : null} 
                    </div>
                    <div className='col-sm-1'>
                        to
                     </div>
                    <div className='col-sm-5'>
                      <select value={formik.values.partner_max_height} name="partner_max_height" onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-select'>
                        <option selected>Select</option>
                        {
                    Cheight.map(element => {
                      return <option value={ element.value}>{element.height+" - "+ element.value}</option>
                    })
                  }
                      </select> 
                      { formik.touched.partner_max_height && formik.errors.partner_max_height ? (<div className='text-danger mb-3'>{formik.errors.partner_max_height}</div>) : null}     
                    </div>
                  </div> 
                </div>

                <div className='mb-3 row'>
                  
                  <div className=' mb-4  mt-4 col-sm-6'>
                  <FormControl  fullWidth >
                <label>Marital Status</label>
                 
       <Select onChange={formik.handleChange} onBlur={formik.handleBlur}
                     value={formik.values.partner_marital_status}
                     name="partner_marital_status" multiple
                        renderValue={(selected) => selected.join(', ')}
                     
         MenuProps={MenuProps}>
         {marital.map((name) => (
           <MenuItem key={name} value={name}>
             <Checkbox checked={formik.values.partner_marital_status.indexOf(name) > -1} />
             <ListItemText primary={name} />
           </MenuItem>
         ))}
       </Select>
    </FormControl>
 { formik.touched.partner_marital_status && formik.errors.partner_marital_status ? (<div className='text-danger mb-3'>{formik.errors.partner_marital_status}</div>) : null} 
               </div>
                  <div className='col-sm-6  mb-4  mt-4'>
                  <FormControl  fullWidth >
                   <label>Religion</label>
       <Select onChange={formik.handleChange} onBlur={formik.handleBlur}
                     value={formik.values.partner_religion}
                     name="partner_religion"  multiple
                renderValue={(selected) => selected.join(', ')}
                 MenuProps={MenuProps} >
         {religionList.map((name) => (
           <MenuItem key={name.name} value={name.name}>
             <Checkbox checked={formik.values.partner_religion.indexOf(name.name) > -1} />
             <ListItemText primary={name.name} />
           </MenuItem>
         ))}
       </Select>
    </FormControl>
        { formik.touched.partner_religion && formik.errors.partner_religion ? (<div className='text-danger mb-3'>{formik.errors.partner_religion}</div>) : null} 
             </div>  
                </div>
                
                <div className='mb-3 row'>
                  
                  <div className='col-sm-6'>
                  <FormControl  fullWidth >
                <label>Diet</label>
                 
       <Select onChange={formik.handleChange} onBlur={formik.handleBlur}
                     value={formik.values.partner_diet}
                     name="partner_diet" multiple
                        renderValue={(selected) => selected.join(', ')}
                     
         MenuProps={MenuProps}>
         {diet.map((name) => (
           <MenuItem key={name} value={name}>
             <Checkbox checked={formik.values.partner_diet.indexOf(name) > -1} />
             <ListItemText primary={name} />
           </MenuItem>
         ))}
       </Select>
    </FormControl>
 { formik.touched.partner_diet && formik.errors.partner_diet ? (<div className='text-danger mb-3'>{formik.errors.partner_diet}</div>) : null} 
               </div>
                  <div className='col-sm-6'>
                  <FormControl  fullWidth >
                   <label>Mother Tongue</label>
       <Select onChange={formik.handleChange} onBlur={formik.handleBlur}
                     value={formik.values.partner_mtongue}
                     name="partner_mtongue"  multiple
                renderValue={(selected) => selected.join(', ')}
                 MenuProps={MenuProps} >
         { mother_tongue.map((element) => (
           <MenuItem key={element.name} value={element.name}>
             <Checkbox checked={formik.values.partner_mtongue.indexOf(element.name) > -1} />
             <ListItemText primary={element.name} />
           </MenuItem>
         ))}
       </Select>
    </FormControl>
        { formik.touched.partner_mtongue && formik.errors.partner_mtongue ? (<div className='text-danger mb-3'>{formik.errors.partner_mtongue}</div>) : null} 
             </div>  
                </div>

                <div className='mb-3'>
                  <div className='row'>
                    <div className='col-sm-4'>
                       <FormControl  fullWidth >
                   <label>Country</label>
                        <Select onChange={handleCountry}
                     value={partner_country} multiple
                          name="partner_country" 
                          renderValue={(selected) => selected.join(', ')}
                 MenuProps={MenuProps} >
         { countryList.map((element) => (
           <MenuItem key={element.name} value={element.name}>
             <Checkbox checked={partner_country.indexOf(element.name) > -1} />
             <ListItemText primary={element.name} />
           </MenuItem>
         ))}
       </Select>
        </FormControl>
                    </div>
                    <div className='col-sm-4'>
                       <FormControl  fullWidth >
                   <label>State</label>
                        <Select onChange={handleStateChange}
                     value={partner_state} multiple
                          name="partner_state" 
                          renderValue={(selected) => selected.join(', ')}
                 MenuProps={MenuProps} >
         { statelist.map((name) => (
           <MenuItem key={name.name} value={name.name}>
             <Checkbox checked={partner_state.indexOf(name.name) > -1} />
             <ListItemText primary={name.name} />
           </MenuItem>
         ))}
       </Select>
        </FormControl>
                    </div>
                    
                   < div className='col-sm-4'>
                       <FormControl  fullWidth >
                   <label>City</label>
                        <Select onChange={handleCityChange}
                     value={partner_city} multiple
                          name="partner_city" 
                          renderValue={(selected) => selected.join(', ')}
                 MenuProps={MenuProps} >
         { citylist.map((name) => (
           <MenuItem key={name.name} value={name.name}>
             <Checkbox checked={partner_city.indexOf(name.name) > -1} />
             <ListItemText primary={name.name} />
           </MenuItem>
         ))}
       </Select>
        </FormControl>
                  </div>
                  
                
                  </div>
                </div>
                
                <div className='mb-3 row'>
                  
                  <div className='col-sm-6  mb-4  mt-4'>
                  <FormControl  fullWidth >
                <label>Qualification</label>
                 
       <Select onChange={formik.handleChange} onBlur={formik.handleBlur}
                     value={formik.values.partner_highest_qualification}
                     name="partner_highest_qualification" multiple
                        renderValue={(selected) => selected.join(', ')}
                     
         MenuProps={MenuProps}>
         {highest_qualification.map((name) => (
           <MenuItem key={name} value={name}>
             <Checkbox checked={formik.values.partner_highest_qualification.indexOf(name) > -1} />
             <ListItemText primary={name} />
           </MenuItem>
         ))}
       </Select>
    </FormControl>
 { formik.touched.partner_highest_qualification && formik.errors.partner_highest_qualification ? (<div className='text-danger mb-3'>{formik.errors.partner_highest_qualification}</div>) : null} 
               </div>
                  <div className='col-sm-6  mb-4  mt-4'>
                  <FormControl  fullWidth >
                   <label>Working With</label>
       <Select onChange={formik.handleChange} onBlur={formik.handleBlur}
                     value={formik.values.partner_working_with}
                     name="partner_working_with"  multiple
                renderValue={(selected) => selected.join(', ')}
                 MenuProps={MenuProps} >
         { working_with.map((name) => (
           <MenuItem key={name} value={name}>
             <Checkbox checked={formik.values.partner_working_with.indexOf(name) > -1} />
             <ListItemText primary={name} />
           </MenuItem>
         ))}
       </Select>
    </FormControl>
        { formik.touched.partner_working_with && formik.errors.partner_working_with ? (<div className='text-danger mb-3'>{formik.errors.partner_working_with}</div>) : null} 
             </div>  
                </div>
                <div className='mb-3 row'>
                  <FormControl  fullWidth >
                   <label className='form-label'>Profession</label>
                    <Select onChange={formik.handleChange} onBlur={formik.handleBlur}
                     value={formik.values.partner_profession}
                      name="partner_profession" multiple
                renderValue={(selected) => selected.join(', ')}
                 MenuProps={MenuProps} >
         {profession.map((name) => (
           <MenuItem key={name} value={name}>
             
             <Checkbox checked={formik.values.partner_profession.indexOf(name) > -1} />
             <ListItemText primary={name} />
           </MenuItem>
         ))}
       </Select>
    </FormControl>
                  { formik.touched.partner_profession && formik.errors.partner_profession ? (<div className='text-danger mb-3'>{formik.errors.partner_profession}</div>) : null} 
                </div>
                <div className='text-center'>
                <button type="submit"  className="btn btn-primary">Update</button>
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

export default EditPartner;
