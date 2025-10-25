import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Pagination from "./Pagination";
import Table from  "./Table";


export const Papproval = () => {


  const [filteruser, setfilteruser] = useState(0);
  const [page,setPage]=useState(1);

  const [search,setsearch]=useState("")
  const [date,setdate]=useState('');
  const [getpaydata,setpaydata]=useState([])
  const getdata=async()=>{
    const res= await fetch(`/user_payment?search=${search}&page=${page}&approval_status=${filteruser}&payment_date=${date}`,{
        method:"GET",
        headers:{
            "content-Type":"application/json"
        }
    });

    const data=await res.json();
    console.log(data);
    if(!data || data.status === 404){
        alert("error");
    }
    else{
        setpaydata(data);
        
        
    }
    
}
   
   
  useEffect(()=>{
  
     getdata();

   },[page,search,filteruser,date])

   


  return (
    <>
      
       <div className="w3-bar w3-black w3-card-2" style={{ "height": "60px" }}>
        <h5 className="w3-bar-item hd" >Payment Approval</h5>
      </div>

      
    <div style={{"marginTop":"50px","marginLeft":"310px","width":"400px"}}>
    <input className="w3-input w3-border w3-round-large" type="search" placeholder='Search' onChange={(e)=>setsearch(e.target.value)} />
    </div>
    <div style={{ "marginTop": "4%", "marginLeft": "80%" }}>    
        <div class="form-check" >
        <input class="form-check-input" type="radio" name="flexRadioDefault" value={0} onChange={(e)=>{setfilteruser(e.target.value)}} />
        <label class="form-check-label" for="flexRadioDefault1">ALL</label>
      </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="flexRadioDefault" value={1} onChange={(e)=>{setfilteruser(e.target.value)}}/>
          <label class="form-check-label" for="flexRadioDefault2">Approved</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" value={-1} onChange={(e)=>{setfilteruser(e.target.value)}}  />
            <label class="form-check-label" for="flexRadioDefault">Defaulter</label>
          </div>
        </div >
        <input type="date" name="sdate"  placeholder='Your Search Date'  onChange={(e)=>setdate(e.target.value)} className='form-control' style={{"marginTop":"2px","marginLeft":"40px","width":"160px"}} />
        <div style={{"marginTop":"10px","marginLeft":"60px","width":"1000px"}}>
        <Table  pay={getpaydata.pay ? getpaydata.pay : []}/> 
      </div>
<Pagination page={page}  limit={getpaydata.limit ? getpaydata.limit :0}  total={getpaydata.total ?getpaydata.total : 0} setPage={(page)=>setPage(page)} />
      </>
      
  )
}
export default  Papproval;
