import React, {useEffect} from 'react'
import {useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import Navbar from './LoginNav';
import * as yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
const EditEducation = () => {
  const location = new useLocation();
  const uid = location.state.gent;
  console.log(uid);
  const defaultValues = {
    user_id: uid,
    user_highest_qualification: "",
    user_working_with: "",
    user_profession: "",
    user_annual_income: "",
    show_annual_income:'',  
 }
 const validationSchema = yup.object({
   user_highest_qualification: yup.string().required("Required"),
   user_working_with: yup.string().required("required"),
   user_profession: yup.string().required("profession is required"),
   user_annual_income: yup.string().required("required annual income"),
   show_annual_income: yup.string().required("required permission")
   
});

const formik = useFormik({
  initialValues: defaultValues,
validationSchema:validationSchema,
  onSubmit: async (values) => {

    const { user_highest_qualification, user_working_with, user_profession, user_annual_income, show_annual_income } = values;

    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/update_educational/${uid}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          user_highest_qualification,
          user_working_with,
          user_profession,
          user_annual_income,
          show_annual_income,
        }),
      }
    );
 
    const data = res.json();
    if(!data||res.status===404)
    {
      toast.error("something went wrong");
    }
    else if (res.status===200)
    {
      console.log(data);
      toast.success("Educational Details updated Successful");
      }
  }
});
  
  const getdata = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/geteducationaldata/${uid}`,
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
    else if (res.status === 200) {
      
      formik.setValues(datas);

 
    }
   
  };

  useEffect(() =>
  {
    getdata();
  }, []);
  
  const highest_qualification = ['MTech', 'Msc', 'MCA', 'MBA', 'Mcom', "Btech",'MBBS', 'BCA', 'Bcom', 'Bsc', 'Bvoc', 'BBA', 'Intermediate', 'High School', 'Less than School'];
  const working_with = ['Private Company', 'Government Sector', ' Defense /Civil Services', 'Business', 'Not Working'];
  const annual_income = [' upto 1 LPA','1 LPA - 2 LPA','2 LPA - 3 LPA','3 LPA - 4 LPA','4 LPA - 5 LPA','5 LPA - 6 LPA','6 LPA - 7 LPA','7 LPA - 8 LPA','8 LPA - 10 LPA','10 LPA - 15 LPA','15 LPA - 20 LPA','20 LPA - 30 LPA','30 LPA - 40 LPA','40 LPA - 50 LPA','50 LPA - 60 LPA','70 LPA - 80 LPA','90 LPA - 1 CPA','More than 1 crore','Not Applicable'];
  const profession = ['Banking Professional', 'Charactered Accountant', 'Company Secretary', 'Finance Professional', 'Accountant Professional', 'Actor', 'Actress', 'Event Manager', 'Agricultural Professional', 'Interior Designer', 'Pilot', 'Air Hostess', 'Animator', 'Web Developer', 'Software Engineer', 'Mobile Developer', 'IAS', 'IFS', 'IPS', 'Airforce',
  'Army','Navy','Professor','Teacher','Entrepenuer','Doctor','Dentist','Nurse','Student'];

  
  return (
    <>
       <Navbar/> 
      <div className='backg'>
        <div className='container cardstyle'>''
          <div className='card'>
            <div className='card-body card-mt'>
              <form onSubmit={formik.handleSubmit} method="post">
              <h4 className='text-center heading1 text-danger'> <i className="fa-solid fa-pen-to-square text-dark"></i> Education Details</h4>
                <div className='mb-3'>
                  <label className='form-label'>Highest Qualification:</label>
                  <select name="user_highest_qualification" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.user_highest_qualification} class="form-select">
                    
                    <option selected>Select</option>
                      {
                      highest_qualification.map(element => {
                        return <option>{element}</option>
                      })
                    }
                   
                  </select>
                  {  formik.touched.user_highest_qualification && formik.errors.user_highest_qualification ? (<div className='text-danger mb-3'>{formik.errors.user_highest_qualification}</div>) : null} 
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Working With:</label>
                  <select name="user_working_with" onChange={formik.handleChange} onBlur={ formik.handleBlur} value={formik.values.user_working_with} className='form-select'>
                    
                    <option selected>Select</option>
                      {
                      working_with.map(element => {
                        return <option>{element}</option>
                      })
                    }
                   

                  </select>
                  {  formik.touched.user_working_with && formik.errors.user_working_with ? (<div className='text-danger mb-3'>{formik.errors.user_working_with}</div>) : null} 
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Profession</label>
                  <select name="user_profession" value={formik.values.user_profession} onBlur={ formik.handleBlur} onChange={formik.handleChange} className='form-select'>
                 
                    <option selected>Select</option>
                      {
                      profession.map(element => {
                        return <option>{element}</option>
                      })
                    }

                  </select>
                  {  formik.touched.user_profession && formik.errors.user_profession ? (<div className='text-danger mb-3'>{formik.errors.user_profession}</div>) : null} 
                </div>
                <div className='mb-3'>
                  <div className='row'>
                    <div className='col-sm-7'>
                    <label className='form-label'>Annual Income</label>
                      <select value={formik.values.user_annual_income} onChange={formik.handleChange} onBlur={ formik.handleBlur} name="user_annual_income" className='form-select'>
                 
                    <option selected>Select</option>
                      {
                      annual_income.map(element => {
                        return <option>{element}</option>
                      })
                    }

                      </select>
                      {  formik.touched.user_annual_income && formik.errors.user_annual_income ? (<div className='text-danger mb-3'>{formik.errors.user_annual_income}</div>) : null} 
                    </div>
                    <div className='col-sm-5'>
                      <label>Show Income ?</label>
                      <div className='row'>
                        <div className='col-sm-6'>
                        <div className='mb-3'>
                            <input className='form-check-input' checked={formik.values.show_annual_income === '0' ? true:false} type="radio" name="show_annual_income" value="0" onBlur={formik.handleBlur} onChange={formik.handleChange} />
                      <lable className="form-check-label">No</lable>

                      </div>
                        </div>
                        <div className='col-sm-6'>
      
                        <div className='mb-3'>
                      <input type="radio" checked={formik.values.show_annual_income === '1' ? true:false}  className='form-check-input' name="show_annual_income" onBlur={formik.handleBlur} onChange={formik.handleChange} value="1" />
                      <lable className="form-check-label">Yes</lable>
                      </div>
                        </div>
                        {  formik.touched.show_annual_income && formik.errors.show_annual_income? (<div className='text-danger mb-3'>{formik.errors.show_annual_income}</div>) : null} 
                      </div>
                      
                     
                    </div>
                  </div>
               
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

export default EditEducation;
