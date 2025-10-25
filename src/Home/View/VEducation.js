import React from 'react'
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const View = () => {
  let history = useNavigate();
  const {id}= useParams("");
  console.log(id);

  const [edudetails,setedudetails]=useState([])
  const getdata=async()=>{
    const res2= await fetch(`/geteducation/${id}`,{
        method:"GET",
        headers:{
            "content-Type":"application/json"
        }
    });
    const data2=await res2.json();
    console.log(data2);
    if(!data2 || data2.status === 404){
        alert("error");
    }
    else{
        setedudetails(data2);
        
    }

}
      useEffect(()=>{
       getdata();
     },[])
 
  return (
    <>
      
      <div className="backg">
                <div class="w3-bar w3-red" style={{ "fontFamily": "cursive", "fontWeight": "bold" }}>
                    <a href="#" class="w3-bar-item w3-button">MagicMatch</a>
               <button class="w3-bar-item w3-button w3-display-topright" style={{ "fontFamily": "cursive", "fontWeight": "bold" }} onClick={()=>history(-1)}> Back</button>
                </div>

                <div className='row' style={{ "marginLeft": "190px", "marginTop": "100px", "textAlign": "center" }}>
                    {/* //Personal details */}
                    <div className='col'>
                        <div class="card ms-5 mt-4 mb-4 " style={{ "width": "80%", "borderColor": "red", "borderWidth": "10" }}>
                            <div class="card-header   hd " style={{ "backgroundColor": "lavenderblush" }} >
                                Partner Preferences
                            </div>
  <div class="card-body">
    <div className='left_view'>
    <h3 className='mb-3 fo'>Highest Qualification: <span style={{"fontWeight":"400","fontFamily":'cursive'}}>{edudetails.user_highest_qualification}</span></h3>
    <h3 className='mb-3 fo'>Working With: <span style={{"fontWeight":"400","fontFamily":'cursive'}}>{edudetails.user_working_with}</span></h3>
    <h3 className='mb-3 fo'>Profession: <span style={{"fontWeight":"400","fontFamily":'cursive'}}>{edudetails.user_profession}</span></h3>
    <h3 className='mb-3 fo'>Annual Income: <span style={{"fontWeight":"400","fontFamily":'cursive'}}>{edudetails.user_annual_income}</span></h3>
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