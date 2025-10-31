import React from 'react'
import { useState,useEffect } from 'react';

export const Feed = () => {
  const [pageData,setPageData]= useState([])
  const [page,setPage]=useState(1);
  const [pageCount,setPageCount]=useState(0);

  const [getfeedback,setfeedback]=useState([])
  const getdata=async()=>{
          const res = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/feedback`,
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
              setfeedback(data);
              
          }
      }
  
      const handleNext =()=>{
         if(page === pageCount) return page;
         setPage(page+1);
      }
 
      const handlePrevious=()=>{
              if(page === 1) return page;
              setPage(page-1);
      }
      useEffect(()=>{
       getdata();
   },[page])
 
   useEffect(()=>{
    const pagedataCount = Math.ceil(getfeedback.length/3); 
    setPageCount(pagedataCount)
    if(page){
     const LIMIT= 3;
    const  skip = LIMIT *page;
     const dataskip = getfeedback.slice(page ===1 ? 0 :skip-LIMIT,skip);
     setPageData(dataskip)
     
    }
   },[getfeedback])
 
  return (
    <>
      <div class="w3-bar w3-black" style={{"height":"60px"}}>
  <h5 class="w3-bar-item w3-button w3-mobile hd">Feedback</h5>
 </div>
 
<div className='mt-3 mx-4'>
<table class="w3-table-all  w3-card-4">
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Feedback</th>
      <th>Ratings</th>
    </tr>
    {
        pageData.length> 0 ?
        pageData.map((element,id)=>{
                                     return(
                                         <>
                                  <tr >
                                 <td>{element.user_name}</td>
                                 <td>{element.user_email}</td>
                                 <td>{element.user_feedback}</td>
                                 <td>{element.user_ratings}</td>
                             </tr>
                                         </>
                                     )
                                 }):<div class="text-center"><div class="spinner-border m-5" role="status" style={{"marginLeft":"10px","marginTop":"5px"}}>
                                 <span class="visually-hidden">Loading...</span>
                               </div></div>
      }
      
    
    
  </table>
</div>
<div className='d-flex justify-content-end'>
<nav aria-label="Page navigation example" >
  <ul class="pagination">
    <li class="page-item" ><button className='page-link' onClick={handlePrevious}>prev</button></li>
     {
     Array(pageCount).fill(null).map((ele,index)=>{
      return(
        <>
            <li  active={page === index+1 ?true : false } className='page-item' style={{"paddingLeft":"0px"}} ><button className='page-link'  onClick={()=>setPage(index+1)}>{index+1} </button></li>
        </>
      )
     })
   } 
    <li class="page-item" style={{"paddingLeft":"0px"}}><button className='page-link' onClick={handleNext} disabled={page===pageCount} >Next</button></li>
  </ul>
</nav>
</div> 


    
    </>
  )
}
export default Feed;