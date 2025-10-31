import React from 'react'
import WindowIcon from '@mui/icons-material/Window';
import { useState } from 'react';
import { useEffect } from 'react';
import Table2 from './Table2';
import Pagination from './Pagination';
export const Nmember = () => {

  const [page,setPage]=useState(1);

  const [search,setsearch]=useState("")

  const [getuserdata,setuserdata]=useState([])
 const getdata=async()=>{
         const res = await fetch(
           `${process.env.REACT_APP_BACKEND_URL}/user_Ndetails?search=${search}&page=${page}`,
           {
             method: "GET",
             headers: {
               "content-Type": "application/json",
             },
           }
         );

         const data=await res.json();
         console.log(data);
         if(!data || res.status === 404){
             alert("error");
         }
         else{
             setuserdata(data);
             
         }
     };


      

     useEffect(()=>{
  
      getdata()
 
    },[page,search])
 
 
 
  return (
    <>
    
    <div class="w3-bar w3-black w3-card-2" style={{"height":"60px"}}>
  <a href="#" class="w3-bar-item w3-button hd" >Non-Paid Members</a>
</div>
 <div style={{"marginTop":"50px","marginLeft":"310px","width":"400px"}}>
    <input className="w3-input w3-border w3-round-large" type="search" placeholder='Search' onChange={(e)=>setsearch(e.target.value)} />
    </div>
  

<div className='mt-3 mx-4'>
<Table2  details={getuserdata.details ? getuserdata.details : []}/> 
</div>
<Pagination  page={page}  limit={getuserdata.limit ? getuserdata.limit :0}  total={getuserdata.total ?getuserdata.total : 0} setPage={(page)=>setPage(page)} />
    </>
  )
}
export default Nmember;