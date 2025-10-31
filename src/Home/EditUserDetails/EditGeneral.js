import React, { useState,useEffect } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cheight from './Cheight.json';
const EditGeneral = () => {
  
  let history = useNavigate();
  const { id } = useParams("");
  const uid = id;
  console.log(uid);
  const defaultValues = {
    user_id:uid,
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
  
  const checkarr = (hobby) =>
  {

    for (let i = 0; i < user_hobbies.length;i++)
    {
      if (user_hobbies[i] === hobby)
      {
        console.log(user_hobbies[i]);
        return true;
      }
     
    }
    }
   
    const formik = useFormik({
      initialValues: defaultValues,
    
    validationSchema:validationSchema,
      onSubmit: async (values) => {
      
        if (user_hobbies.length === 0) {
          toast.error("Enter hobbies");
        }
        else {
          const { user_height, user_blood_group, user_body_type, user_complexion, user_diet } = values;

          const upsign = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/update_general/${uid}`,
            {
              method: "PATCH",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                user_height,
                user_blood_group,
                user_body_type,
                user_complexion,
                user_diet,
                user_hobbies,
              }),
            }
          );
    
       
          const res = upsign.json();
          if(!res||upsign.status===404)
          {
            toast.error("something went wrong");
          }
          else if (upsign.status===200)
          {
            console.log(res);
            toast.success("General Details updated Successful");
            history(-1);
            }
          }
        
      }//onsubmit end here
      
    });
  const height = ['4ft 5in - 134cm', '4ft 6in - 137cm', '4ft 7in - 139cm', '4ft 8in - 142cm', '4ft 9in - 144cm', '4ft 10in - 147cm',
  '4ft 11in - 149cm','5ft-152cm','5ft 1in - 154cm','5ft 2in - 157cm','5ft 3in - 160cm','5ft 4in - 162cm','5ft 5in - 165cm','5ft 6in - 167cm'];
  const getdata = async () => {

    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/getgeneral/${uid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    const datas = await res.json();
 
    console.log(datas);
    if (!datas|| res.status === 404) {
    
      toast.error("Data not retrieved");  
    }
    else if (res.status === 201) {
      
      formik.setValues(datas);
      console.log(datas)
      console.log(datas.user_hobbies);
      setuser_hobbies(datas.user_hobbies);
 
    }
   
  };

  useEffect(() =>
  {
    getdata();
  },[]);

  return (
    <>

<div class="w3-bar w3-red" style={{ "fontFamily": "cursive", "fontWeight": "bold" }}>
                    <a href="#" class="w3-bar-item w3-button">MagicMatch</a>
                 <button class="w3-bar-item w3-button w3-display-topright" style={{ "fontFamily": "cursive", "fontWeight": "bold" }} onClick={()=>history(-1)}> Back</button>
                </div>

       <div className='backg'>
        <div className='container cardstyle' >
      <div class="card cardbg">
  <div class="card-body card-mt">
  <form  onSubmit={formik.handleSubmit} method='POST'>
                <h4 className='text-center text-danger hd'> Edit General Details</h4>
                <hr/>
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
  <input checked={ formik.values.user_diet === "Vegeterian" ? true :false} class="form-check-input" type="radio" onBlur={formik.handleBlur} onChange={formik.handleChange} value="Vegeterian" name="user_diet" />
  <label style={{marginRight:"20px"}} class="form-check-label" >
        Vegeterian
      </label>
                    </div>
                    <div className='col-sm-6'>
                    <input checked={ formik.values.user_diet === "Non-Vegeterian" ? true :false}  class="form-check-input" type="radio" onBlur={formik.handleBlur} onChange={formik.handleChange} value="Non-Vegeterian" name="user_diet"/>
      <label class="form-check-label" style={{marginRight:"20px"}} >
        Non-Vegeterian
      </label>
                  </div>
                    <div className='row'>
                      <div className='col-sm-12'>
                      <input checked={ formik.values.user_diet === "Occasionally Non-Vegeterian" ? true :false}  class="form-check-input" onBlur={formik.handleBlur} onChange={formik.handleChange} value="Occasionally Non-Vegeterian" type="radio" name="user_diet"/>
      <label class="form-check-label" style={{marginRight:"20px"}}>
        Occasionally Non-vegeterian
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
                        <input class="form-check-input" checked={ checkarr("Reading")} name="user_hobbies" onChange={handlechange} value="Reading" type="checkbox"  />
                   <label class="form-check-label" >
                        Reading
                        </label>
                      </div>
                      <div className='col-sm-4'>
                        <input class="form-check-input" checked={ checkarr("Cooking")} name="user_hobbies" onChange={handlechange} type="checkbox" value="Cooking" />
                        <label class="form-check-label">
                         Cooking
                            </label>
                      </div>
                      <div className='col-sm-4'>
                      <input class="form-check-input" checked={ checkarr("Photography")} name="user_hobbies" onChange={handlechange} type="checkbox" value="Photography" />
                          <label class="form-check-label" >
                                Photography
                             </label>
                      </div>
                    </div>  
                    {/* second row */}
                    <div className='row mt-3'  >
                      <div className='col-sm-4'>
                      <input class="form-check-input" checked={ checkarr("Poetry")} name="user_hobbies" onChange={handlechange}  type="checkbox" value="Poetry"/>
                   <label class="form-check-label">
                        Poetry
                        </label>
                      </div>
                      <div className='col-sm-4'>
                      <input class="form-check-input" checked={ checkarr("Painting")} name="user_hobbies" onChange={handlechange}  type="checkbox" value="Painting"/>
                        <label class="form-check-label" >
                         Painting
                            </label>
                      </div>
                      <div className='col-sm-4'>
                      <input class="form-check-input" checked={ checkarr("Coding")} name="user_hobbies" onChange={handlechange}  type="checkbox" value="Coding"/>
                          <label class="form-check-label" >
                              Coding
                             </label>
                      </div>
                    </div> 
                     {/* third row */}
                     <div className='row mt-3'  >
                      <div className='col-sm-4'>
                      <input class="form-check-input" checked={ checkarr("Movies")} name="user_hobbies" onChange={handlechange}  type="checkbox" value="Movies" />
                   <label class="form-check-label" >
                         Movies
                        </label>
                      </div>
                      <div className='col-sm-4'>
                      <input class="form-check-input" checked={ checkarr("Entrepreneurship")} type="checkbox" name="user_hobbies" onChange={handlechange}  value="Entrepreneurship"  />
                        <label class="form-check-label">
                         Entrepreneurship
                            </label>
                      </div>
                      <div className='col-sm-4'>
                      <input class="form-check-input" checked={ checkarr("Singing")} type="checkbox"  name="user_hobbies" onChange={handlechange}  value="Singing"/>
                          <label class="form-check-label" >
                              Singing
                             </label>
                      </div>
                    </div> 
                     {/* fourth row */}
                     <div className='row mt-3'  >
                      <div className='col-sm-4'>
                      <input class="form-check-input" checked={ checkarr("Gaming")} type="checkbox" name="user_hobbies" onChange={handlechange}  value="Gaming"/>
                   <label class="form-check-label" >
                        Gaming
                        </label>
                      </div>
                      <div className='col-sm-4'>
                      <input class="form-check-input" checked={ checkarr("Travelling")} type="checkbox" name="user_hobbies" onChange={handlechange}  value="Travelling" />
                        <label class="form-check-label" >
                         Travelling
                            </label>
                      </div>
                      <div className='col-sm-4'>
                      <input class="form-check-input" checked={ checkarr("Reading Books")}  type="checkbox" name="user_hobbies" onChange={handlechange}  value="Reading Books" />
                          <label class="form-check-label" >
                              Reading Books
                             </label>
                      </div>
                    </div> 

                  </div>
                  
              </div>
   
                <div className='text-center'>
                <button type="submit" className="btn btn-primary">Update</button>
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

export default EditGeneral;

