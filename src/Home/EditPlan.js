import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
export const EditPlan = () => {

    const {id}= useParams("");
    console.log(id);
  const [inpval,setINP]=useState({P_name:"",P_duration:"",P_op:"",P_amount:"",P_discount:0,P_description:"",enable:0})
  const setdata1=(e)=>{
      const {name,value}=e.target;
      setINP((primary)=>{

          return{
              ...primary,
              [name]:value
          }
      })
  } 


    const getdata1=async()=>{
    const res2 = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/getplan/${id}`,
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
const udata=async(e)=>{
 e.preventDefault();
  const {P_name,P_duration,P_op,P_amount,P_discount,P_description,enable}=inpval;
  const res3 = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/updateplan/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        P_name,
        P_duration,
        P_op,
        P_amount,
        P_discount,
        P_description,
        enable,
      }),
    }
  );
  const data3= res3.json();
  if(!data3 || data3.status === 422){
alert("fill all data")
  }
  else{
    alert("data updated")
  }
};
useEffect(()=>{
    getdata1();
},[])
  return (
    <>
      <div class="w3-bar w3-black w3-card-2" style={{ "height": "60px" }}>
        <h5 class="w3-bar-item " style={{ "fontSize": "30px", "fontWeight": "bolder" }}>Membership Plan</h5>
      </div>
  <div >
    <form method='PATCH' style={{"marginLeft":"30%"}}>
    
    <label class="w3-text-blue mt-3 ms-3"><b>Name</b></label>
<input class="w3-input w3-border ms-3"  style={{"width":"500px"}} type="text" name="P_name" value={inpval.P_name} onChange={setdata1} />
<label class="w3-text-blue mt-4 ms-3"><b>Duration</b></label>
<input class="w3-input w3-border ms-3 mb-2" type="Number"  style={{"width":"500px"}}  name="P_duration" value={inpval.P_duration} onChange={setdata1}/>
<label class="w3-text-blue mt-4 ms-3"><b>Amount</b></label>
<input class="w3-input w3-border ms-3 mb-2" type="Number" style={{"width":"500px"}} name="P_amount" value={inpval.P_amount} onChange={setdata1}/>
<label class="w3-text-blue mt-4 ms-3"><b>Discount</b></label>
<input class="w3-input w3-border ms-3 mb-1" type="Number" style={{"width":"500px"}}  name="P_discount" value={inpval.P_discount} onChange={setdata1}/>
<label class="w3-text-blue mt-4 ms-3"><b>Description</b></label>
<input class="w3-input w3-border ms-3 mb-4" type="text"  style={{"width":"920px"}} name="P_description" value={inpval.P_description} onChange={setdata1}/>
      <button className="w3-button w3-white w3-border w3-border-red w3-round-large   mb-2" style={{"marginLeft":"210px"}} onClick={udata}>ADD</button>

    </form>
  </div>
  
    </>
  )
}
export default EditPlan;