import React from 'react'
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const View = () => {
  let history = useNavigate();
  const {id}= useParams("");
  console.log(id);
const [inpval,setINP]=useState([])
  const getdata=async()=>{
    const res2 = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/getpersonal/${id}`,
      {
        method: "GET",
        headers: {
          "content-Type": "application/json",
        },
      }
    );
    const data2=await res2.json();
    console.log(data2);
    if(!data2 || data2.status === 404){
        alert("error");
    }
    else{
        setINP(data2);
        
    }
}
      useEffect(()=>{
       getdata();
     },[])
 
  return (
    <>
          <div className="backg"> 
  
  <div class="w3-bar w3-red"  style={{"fontFamily":"cursive","fontWeight":"bold"}}>
  <a href="#" class="w3-bar-item w3-button">MagicMatch</a>
   <button  class="w3-bar-item w3-button w3-display-topright"    style={{"fontFamily":"cursive","fontWeight":"bold"}}  onClick={()=>history(-1)}> Back</button> 
</div>

    <div className='row' style={{"marginLeft":"190px","marginTop":"100px","textAlign":"center"}}>
     {/* //Personal details */}
     <div className='col'>
     <div class="card ms-5 mt-4 mb-4 " style={{"width":"80%","borderColor":"red","borderWidth":"10"}}>
  <div class="card-header  hd " style={{"backgroundColor":"lavenderblush"}} >
    Personal Details
  </div>
  <div class="card-body">     
    <div className='row'>
    <div className='left_view col-lg-6 col-md-6 col-12'>

    <h3 className='mb-3 fo'>Name:  <span style={{"fontWeight":"400","fontFamily":"cursive"}}>{inpval.user_name}</span></h3>
    <h3 className='mb-3 fo'>Gender:  <span style={{"fontWeight":"400","fontFamily":"cursive"}}>{inpval.user_gender}</span></h3>
    <h3 className='mb-3 fo'>Age:  <span style={{"fontWeight":"400","fontFamily":"cursive"}}>{inpval.user_age}</span></h3>
    <h3 className='mb-3 fo'>Religion:  <span style={{"fontWeight":"400","fontFamily":"cursive"}}>{inpval.user_religion}</span></h3>
    <h3 className='mb-3 fo'>Caste:  <span style={{"fontWeight":"400","fontFamily":"cursive"}}>{inpval.user_caste}</span></h3>
    <h3 className='mb-3 fo'>Mother Tongue:  <span style={{"fontWeight":"400","fontFamily":"cursive"}}>{inpval.user_mtongue}</span></h3>
    </div>
    <div className='right_view col-lg-6 col-md-6 col-12'>
    <h3 className='mb-3 fo'>Martial Status:  <span style={{"fontWeight":"400","fontFamily":"cursive"}}>{inpval.user_marital}</span></h3>
    <h3 className='mb-3 fo'>Country:  <span style={{"fontWeight":"400","fontFamily":"cursive"}}>{inpval.user_country}</span></h3>
    <h3 className='mb-3 fo'>Sate:  <span style={{"fontWeight":"400","fontFamily":"cursive"}}>{inpval.user_state}</span></h3>
    <h3 className='mb-3 fo'>City:   <span style={{"fontWeight":"400","fontFamily":"cursive"}}>{inpval.user_city}</span></h3>
    <h3 className='mb-3 fo'>About Yourself:                 <span style={{"fontWeight":"400","fontFamily":"cursive"}}>{inpval.user_about_yourself}</span></h3>
    </div>
  </div>
  </div>
</div>
</div>
</div>
</div>
    </>
  )
}
export default View;