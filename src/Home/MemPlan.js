import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';

import { Link } from 'react-router-dom';


export const MemPlan = () => {

    
  //Add new entry
  const [getplandata,setplandata]=useState({P_name:"",P_duration:"",P_op:"",P_amount:"",P_discount:0,P_description:"",enable:0})
    const setdata=(e)=>{
        const {name,value}=e.target;
        setplandata((primary)=>{

            return{
                ...primary,
                [name]:value
            }
        })
    } 

    const addinpdata=async(e)=>{
        e.preventDefault();
        const {P_name,P_duration,P_op,P_amount,P_discount,P_description,enable}=getplandata
        if (!P_name)
        {
            alert("enter name");
            
        }
        else if (!P_duration)
        {
            alert("enter duration");
        }
        else if (!P_op)
        {
            alert("enter op");
        }
        else if(!P_amount){
            alert("enter amount")
        }
        else if(!P_discount){
          alert("enter discount")
        }
        else if(!P_description){
          alert("enter description")
        }
        else{
        const plan = await fetch(`${process.env.REACT_APP_BACKEND_URL}/Plan`, {
          method: "POST",
          headers: {
            "content-Type": "application/json",
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
        });

          const data=await plan.json();
          console.log(data);
          if(!data || data.status === 404){
              alert("error");
          }
          else{
              alert("data is saved");
          }
        }
    }

    //all Plans
    const [getpdata,setpdata]=useState([])
    const getdata=async(e)=>{
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/getplan`, {
        method: "GET",
        headers: {
          "content-Type": "application/json",
        },
      });

      const data1=await res.json();
      console.log(data1);
      if(!data1 || data1.status === 404){
          alert("error");
      }
      else{
          setpdata(data1);
          
      }
  }

  const deleteplan=async (id) => {

const res4 = await fetch(
  `${process.env.REACT_APP_BACKEND_URL}/deleteplan/${id}`,
  {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }
);
const dplan=await res4.json();
if(dplan.status === 422 || !dplan){
  alert("error")
}
else{
  console.log("user deleted")
  getdata();
}

  }


  const udata = async (id) => {
    const res3 = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/enable/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );
    const data3 = res3.json();
    console.log(data3)

  };

  const handleReject = async (id) => {
    const res3 = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/disable/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );
    const data3 = res3.json();
    console.log(data3)

  };
 
  useEffect(()=>{
    getdata();
},[])

  return (
    <>

      <div class="w3-bar w3-black w3-card-2" style={{ "height": "60px" }}>
        <h5 class="w3-bar-item hd" >Membership Plan</h5>
        </div>
      <div className='mt-4 w3-right me-4 mb-2' >
        <button className="w3-button w3-circle w3-red me-1"  style={{"fontWeight":"bolder"}} onClick={()=>{document.getElementById('id01').style.display='block'}}>+</button>
        
      </div>
{/* start of the modal */}
      <div id="id01" class="w3-modal">
  <div class="w3-modal-content">

    <header class="w3-container w3-red">
      <span onClick={()=>{document.getElementById('id01').style.display='none'}}
      class="w3-button w3-display-topright">&times;</span>
      <h2>Add Membership Plan</h2>
    </header>
    <form method='POST'>
    <div class="w3-container mt-2">
    <label class="w3-text-blue mt-2 ms-3" ><b>Name</b></label>
<input class="w3-input w3-border ms-3" type="text" name="P_name" value={getplandata.P_name} onChange={setdata} />
<label class="w3-text-blue mt-1 ms-3"  ><b>Duration</b></label>
<input class="w3-input w3-border ms-3 mb-2" type="number"  name="P_duration" value={getplandata.P_duration} onChange={setdata}/>
<label class="w3-text-blue mt-1 ms-3" ><b>Month/year</b></label>
<input class="w3-input w3-border ms-3 mb-2" type="text" name="P_op" value={getplandata.P_op} onChange={setdata}/>
<label class="w3-text-blue mt-1 ms-3" ><b>Amount</b></label>
<input class="w3-input w3-border ms-3 mb-2" type="number" name="P_amount" value={getplandata.P_amount} onChange={setdata}/>
<label class="w3-text-blue mt-1 ms-3"  ><b>Discount</b></label>
<input class="w3-input w3-border ms-3 mb-4" type="Number" name="P_discount" value={getplandata.P_discount} onChange={setdata}/>
<label class="w3-text-blue mt-1 ms-3"  ><b>Description</b></label>
<input class="w3-input w3-border ms-3 mb-3" type="text" name="P_description" value={getplandata.P_description} onChange={setdata}/>
      
    </div>

    <footer class="w3-container w3-red">
      <button className="w3-button w3-white w3-border w3-border-red w3-round-large  mt-2 mb-2" type="submit" onClick={addinpdata} style={{"marginLeft":"370px"}} >ADD</button>
    </footer>
    </form>
  </div>
  
</div>
{/* end of the modal */}
      <div className='mt-4 w3-left ms-4 mb-0' style={{"border":"30","borderColor":"black"}}>
      <h5 style={{"fontWeight":"bolder"}}>Subscription Plan List</h5>
      </div>
      <div style={{"marginLeft":"17px","width":"98%"}} >
        
      <table class="w3-table-all w3-card-4">
    <thead>
      <tr class="w3-light-dark">
        <th> Name of the Plan</th>
        <th>Duration</th>
        <th>Amount</th>
        <th style={{"width":"320px"}}>Features</th>
        <th>Enabled</th>
        <th>Actions</th>
      </tr>
    </thead>
      {
      getpdata.map((element,id)=>{
          return(
              <>
              <tr>
              <td >{element.P_name}</td>
      <td>{element.P_duration}  {element.P_op}</td>
      <td>{element.P_amount}</td>
      <td>{element.P_description}</td>
      <td>
      <button className='w3-button me-2 w3-green' type='submit' disabled={element.enable===1} onClick={()=>{udata(element._id)}}>Enable</button>
       <button className='w3-button w3-red' type='submit' disabled={element.enable===0} onClick={()=>{handleReject(element._id)}}>Disable</button>
                            </td>
      <td><button className='w3-red w3-button w3-round me-1' style={{"border":"none","float":"left"}} ><Link style={{textDecoration:"none"}} to={`/edit/${element._id}`}><BorderColorIcon style={{"color":"white"}}/></Link></button>
      <button className='w3-red w3-button w3-round ' style={{"border":"none","float":"right"}} onClick={()=>{deleteplan(element._id)}}><DeleteIcon /></button>
      </td>
    </tr>   
              </>
          )
      })
      
      } 
  </table>
</div>

{/* end of the modal */}

{/*<div id="id03" class="w3-modal">
  
  
  <div class="w3-panel w3-pale-green w3-round-xxlarge w3-border" style={{"width":"400px","marginLeft":"600px","height":"100px"}}>
    <h4>Are you sure you want to delete the plan?</h4>
  <button  className='w3-button  w3-white w3-border w3-border-red w3-round mb-2 me-2' onClick={deleteplan(element._id)}>Delete</button>
  <button  className='w3-button  w3-white w3-border w3-border-red w3-round-large mb-2' onClick={()=>{document.getElementById('id03').style.display='none'}}>Cancel</button>
</div>

  
  
  
</div> */}

    </>
  )
}
export default MemPlan;