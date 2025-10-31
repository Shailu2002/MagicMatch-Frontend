import React, { useState } from 'react';
import Cheight from './Height.json';
import Navbar from '../Navbarg';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
const GeneralInfo = () => { 
  const history = new useNavigate();
  const location = new useLocation();
  const id = location.state.gent;
  const gender = location.state.gender;
  const name = location.state.name;
  console.log(id);
  const defaultValues = {
    user_id:id,
    user_height: "",
    user_blood_group: "",
    user_body_type: "",
    user_complexion: "",
    user_diet: "",
   }
    
   const validationSchema = yup.object({
     user_height: yup.string().required("Height is required "),
     user_diet: yup.string().required("Diet is required"), 
  });

  const [user_hobbies, setuser_hobbies] = useState([]);


  const handlechange = (e) =>
  {
    
   
    const value = e.target.value;
    const checked = e.target.checked;
    if (checked)
    {
      setuser_hobbies([
        ...user_hobbies,value
       
      ]);
      
    }
    else
    {
      setuser_hobbies(user_hobbies.filter((e) =>
      (
        e !== value
      )));
        
      }
    }
   
    const formik = useFormik({
      initialValues: defaultValues,
    
    validationSchema:validationSchema,
      onSubmit: async (values) => {
      
        if (user_hobbies.length===0)
        {
          toast.error("Enter hobbies");
        }
        else
        {
      const { user_id, user_height, user_blood_group, user_body_type, user_complexion,user_diet } = values;
        const sign = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/user_general`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id,
              user_height,
              user_blood_group,
              user_body_type,
              user_complexion,
              user_diet,
              user_hobbies,
            }),
          }
        );
                 
        const resp = await sign.json();
        if (sign.status === 404 || !resp) {
          toast.error("Something went wrong!");
        }
        else if (sign.status === 200) {
          
          history("/education", { state: {gent:id,gender:gender,name:name},replace:"true" });
        }
     
          }
        
      }//onsubmit end here
      
    });
  return (
    <>
      <Navbar/>
           <div className='backg'>
        <div className='container cardstyle' >
      <div class="card cardbg">
  <div class="card-body card-mt">
  <form  onSubmit={formik.handleSubmit} method='POST'>
  <h4 className='text-center heading1 text-danger'> <i class="fa-solid text-dark fa-circle-plus"></i> General Details</h4>
                <div className="mb-3 ">
                    <label className="form-label">Height</label>
                  <select name="user_height" onChange={formik.handleChange} onBlur={ formik.handleBlur} value={formik.values.user_height} class="form-select" >
                    <option selected>Select</option>
                      {
                      Cheight.map(element => {
                        return <option value={element.value}>{element.height+" - "+ element.value}</option>
                      })
                    }
  
                  </select>
                  {  formik.touched.user_height && formik.errors.user_height ? (<div className='text-danger mb-3'>{formik.errors.user_height}</div>) : null} 
            </div> 
 
   <div className="mb-3">
    <label  className="form-label">Blood Group</label>
  <select name="user_blood_group" onChange={formik.handleChange} value={formik.values.user_blood_group } class="form-select"  >
  <option selected>Select</option>
  <option >A+</option>
  <option >B+</option>
  <option >B-</option>
  <option>A-</option>
  <option >O+</option>
  <option>O-</option>
  <option >AB+</option>
  <option >AB-</option>
 
</select>
</div>

<div className="mb-3">
  <label  className="form-label">Body Type</label>
  <select class="form-select"  name="user_body_type" onChange={formik.handleChange}  value={formik.values.user_body_type}>
  <option selected>Select</option>
  <option >Slim</option>
  <option >Medium</option>
  <option >Heavy</option>

</select>
</div>  
  <div className="mb-3">
  <label  className="form-label">Complexion</label>
  <select class="form-select" value={formik.values.user_complexion} onChange={formik.handleChange} name="user_complexion">
  <option selected>Select</option>
  <option >Very fair</option>
  <option >fair</option>
  <option>medium tone</option>
  <option >Tan</option>
  <option >Dark</option>
</select>
</div>  
 <div className="mb-3">
  <label  className="form-label">Diet</label>
                  <div className='row'>
                    <div className='col-sm-6'>
                      <input class="form-check-input" type="radio" onBlur={formik.handleBlur} onChange={formik.handleChange} value="Vegeterian" name="user_diet" />
  <label style={{marginRight:"20px"}} class="form-check-label" >
        Vegeterian
      </label>
                    </div>
                    <div className='col-sm-6'>
                    <input class="form-check-input" type="radio" onBlur={formik.handleBlur} onChange={formik.handleChange} value="Non-Vegeterian" name="user_diet"/>
      <label class="form-check-label" style={{marginRight:"20px"}} >
        Non-Vegeterian
      </label>
                  </div>
                    <div className='row'>
                      <div className='col-sm-12'>
                      <input class="form-check-input" onBlur={formik.handleBlur} onChange={formik.handleChange} value="Occasionally Non-Vegeterian" type="radio" name="user_diet"/>
      <label class="form-check-label" style={{marginRight:"20px"}}>
        Occasionally Non-Vegeterian
                    </label>
                      </div>
                     
                    </div>
                  </div>
                {  formik.touched.user_diet && formik.errors.user_diet ? (<div className='text-danger mb-3'>{formik.errors.user_diet}</div>) : null} 
                </div> 
                <div className='mb-3'>
                  <label>Hobbies/Interests</label>
                  <div>
                    {/* first row */}
                    <div className='row' >
                      <div className='col-sm-4'>
                        <input class="form-check-input" name="user_hobbies" onChange={handlechange} value="Reading" type="checkbox"  />
                   <label class="form-check-label" >
                        Camping
                        </label>
                      </div>
                      <div className='col-sm-4'>
                        <input class="form-check-input" name="user_hobbies" onChange={handlechange} type="checkbox" value="Cooking" />
                        <label class="form-check-label">
                         Cooking
                            </label>
                      </div>
                      <div className='col-sm-4'>
                      <input class="form-check-input"  name="user_hobbies" onChange={handlechange} type="checkbox" value="Photography" />
                          <label class="form-check-label" >
                                Photography
                             </label>
                      </div>
                    </div>  
                    {/* second row */}
                    <div className='row mt-3'  >
                      <div className='col-sm-4'>
                      <input class="form-check-input" name="user_hobbies" onChange={handlechange}  type="checkbox" value="Poetry"/>
                   <label class="form-check-label">
                        Poetry
                        </label>
                      </div>
                      <div className='col-sm-4'>
                      <input class="form-check-input" name="user_hobbies" onChange={handlechange}  type="checkbox" value="Painting"/>
                        <label class="form-check-label" >
                         Painting
                            </label>
                      </div>
                      <div className='col-sm-4'>
                      <input class="form-check-input" name="user_hobbies" onChange={handlechange}  type="checkbox" value="Coding"/>
                          <label class="form-check-label" >
                              Coding
                             </label>
                      </div>
                    </div> 
                     {/* third row */}
                     <div className='row mt-3'  >
                      <div className='col-sm-4'>
                      <input class="form-check-input" name="user_hobbies" onChange={handlechange}  type="checkbox" value="Watching Movies" />
                   <label class="form-check-label" >
                         Watching  Movies
                        </label>
                      </div>
                      <div className='col-sm-4'>
                      <input class="form-check-input" type="checkbox" name="user_hobbies" onChange={handlechange}  value="Entrepreneurship"  />
                        <label class="form-check-label">
                         Entrepreneurship
                            </label>
                      </div>
                      <div className='col-sm-4'>
                      <input class="form-check-input" type="checkbox"  name="user_hobbies" onChange={handlechange}  value="Singing"/>
                          <label class="form-check-label" >
                              Singing
                             </label>
                      </div>
                    </div> 
                     {/* fourth row */}
                     <div className='row mt-3'  >
                      <div className='col-sm-4'>
                      <input class="form-check-input" type="checkbox" name="user_hobbies" onChange={handlechange}  value="Gaming"/>
                   <label class="form-check-label" >
                        Gaming
                        </label>
                      </div>
                      <div className='col-sm-4'>
                      <input class="form-check-input" type="checkbox" name="user_hobbies" onChange={handlechange}  value="Travelling" />
                        <label class="form-check-label" >
                         Travelling
                            </label>
                      </div>
                      <div className='col-sm-4'>
                      <input class="form-check-input" type="checkbox" name="user_hobbies" onChange={handlechange}  value="Reading Books" />
                          <label class="form-check-label" >
                              Reading Books
                             </label>
                      </div>
                    </div> 

                  </div>
                  
              </div>
   
                <div className='text-center'>
                <button type="submit" className="btn btn-primary">Submit and Continue</button>
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

export default GeneralInfo;