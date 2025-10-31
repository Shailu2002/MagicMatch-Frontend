import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import HistoryToggleOffSharpIcon from '@mui/icons-material/HistoryToggleOffSharp';
import Person2Icon from '@mui/icons-material/Person2';
import PersonIcon from '@mui/icons-material/Person';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CachedTwoToneIcon from '@mui/icons-material/CachedTwoTone';
import Charts from './Charts';
export const Dash = () => {
const [getdash,setdash]=useState([])
 const getdata1=async()=>{
         const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/dash`, {
           method: "GET",
           headers: {
             "content-Type": "application/json",
           },
         });

         const data=await res.json();
         console.log(data);
         if(!data || res.status === 404){
             alert("error");
         }
         else{
             setdash(data);    
         }
     }
 
 
  //for login history pagination
  const [pageData,setPageData]= useState([])
  const [page,setPage]=useState(1);
  const [pageCount,setPageCount]=useState(0);
  //for login history pagination
  const [pageData1,setPageData1]= useState([])
  const [page1,setPage1]=useState(1);
  const [pageCount1,setPageCount1]=useState(0);
  const [getlogindata,setlogindata]=useState([])
  //creating registration api
  const [getuserdata,setuserdata]=useState([])
 const getdata=async(e)=>{
         const res = await fetch(
           `${process.env.REACT_APP_BACKEND_URL}/user_signup`,
           {
             method: "GET",
             headers: {
               "content-Type": "application/json",
             },
           }
         );

         const data=await res.json();
         console.log(data);
         if(!data || data.status === 404){
             alert("error");
         }
         else{
             setuserdata(data);
             
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
    getdata1();
},[])
  useEffect(()=>{
   const pagedataCount = Math.ceil(getuserdata.length/3); 
   setPageCount(pagedataCount)
   if(page){
    const LIMIT= 3;
   const  skip = LIMIT *page;
    const dataskip = getuserdata.slice(page ===1 ? 0 :skip-LIMIT,skip);
    setPageData(dataskip)
    
   }
  },[getuserdata])

    //for login history table
  
  const getinfo=async(e)=>{
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/user_signin`,
      {
        method: "GET",
        headers: {
          "content-Type": "application/json",
        },
      }
    );

    const data=await res.json();
    console.log(data);
    if(!data || data.status === 404){
        alert("error");
    }
    else{
        setlogindata(data);
        
    }
}
const handleNext1 =()=>{
   if(page1 === pageCount1) return page1;
   setPage1(page1+1);
 }

 const handlePrevious1=()=>{
        if(page1 === 1) return page1;
        setPage1(page1-1);
 }
 useEffect(()=>{
 getinfo();
 },[page1])

 useEffect(()=>{
 const pagedataCount1 = Math.ceil(getlogindata.length/3); 
setPageCount1(pagedataCount1)
 if(page1){
  const LIMIT1= 3;
  const  skip1 = LIMIT1 *page1;
   const dataskip1 = getlogindata.slice(page1 ===1 ? 0 :skip1-LIMIT1,skip1);
      setPageData1(dataskip1)
 
}
  },[getlogindata])




  return (
    <>
   <div class="w3-bar w3-black w3-small" style={{ "height": "50px" }}>
        <h3 class="w3-bar-item mt-1 hd mb-1" >Dashboard</h3>
        
      </div>
      <div className='mt-1'>
 <div className='row'>
  <div className='col-4'>
 <div class="card mt-3 mx-1 ms-4" style={{"width":"350px","height":"100px","backgroundColor":"#191970"}}>
  <div class="row g-0">
    <div class="col-md-4 ms-0">

    <i class="fa-solid fa-users" style={{"fontSize":"50px","marginTop":"30px","marginLeft":"90px","color":"white"}}  ></i>
    </div>
    <div class="col-md-8 ">
      <div class="card-body mt-0">
      <h4 class="card-text dash" ><small >{getdash.user1+getdash.user2}</small></h4>
        <h5 class="card-title dash1">TOTAL USERS</h5>
        
      </div>
    </div>
  </div>
</div>

<div class="card mt-3 mx-1 ms-4" style={{"width":"350px","height":"100px","backgroundColor":"#18A8D8"}}>
  <div class="row g-0">
    <div class="col-md-4 ms-0">
   < PersonIcon style={{"fontSize":"70px","marginTop":"23px","marginLeft":"100px","color":"white"}}/>
    </div>
    <div class="col-md-8 ">
      <div class="card-body mt-0">
      <h4 class="card-text dash" ><small >{getdash.user2}</small></h4>
        <h5 class="card-title dash1">TOTAL MALE</h5>
        
      </div>
    </div>
  </div>
</div>
</div>

<div className='col-4'>
<div class="card mt-3 mx-1 ms-3" style={{"width":"350px","height":"100px","backgroundColor":"#ff1493"}}>
   <div class="row g-0">                                                      
    <div class="col-md-4 ms-0">
    <Person2Icon style={{"fontSize":"70px","marginTop":"23px","marginLeft":"100px","color":"white"}} />
    </div>
    <div class="col-md-8 ">
      <div class="card-body mt-0">
      <h4 class="card-text dash" ><small >{getdash.user1}</small></h4>
        <h5 class="card-title dash1">TOTAL FEMALE</h5>
      </div>
    </div>
  </div>
</div>

<div class="card mt-3 mx-1 ms-3" style={{"width":"350px","height":"100px","backgroundColor":"#32CD32"}}>
   <div class="row g-0">                                                      
    <div class="col-md-4 ms-0">
    <CurrencyRupeeIcon style={{"fontSize":"70px","marginTop":"23px","marginLeft":"100px","color":"white"}} />
    </div>
    <div class="col-md-8 ">
      <div class="card-body mt-0">
      <h4 class="card-text dash" ><small >{getdash.S?.[0].total_amount}</small></h4>
        <h5 class="card-title dash1">TOTAL SALES</h5>
      </div>
    </div>
  </div>
</div>

</div>

<div class="card mt-2 mx-1 ms-3 " style={{"width":"300px","height":"240px"}}>
  <div class="row g-0">  
    <div class="col-md-10">
      <div class="card-body mt-0" style={{"marginLeft":"25px","fontSize":"100px","width":"250px"}}>
          <Charts P1={getdash.P1}  P2={getdash.P2}/>
      </div>
    </div>
  </div>
</div>

</div>
</div> 



<div className='row'>
  <div className="col" >
<div className='mt-1 ms-3 w3-card-4' style={{"width":"70%","height":"170px"}}>
<header class="w3-container w3-red ms-0">
  <h5><HistoryToggleOffSharpIcon/> Account Login History</h5>
</header>
<table className="w3-table-all w3-border  w3-hoverable" style={{"fontSize":"16px"}} >
  <thead>
    <tr className='w3-light'>
      <th>Date</th>
      <th>Email</th>
      <th>ip</th>
    </tr>
    </thead>
    <tbody>
    {
      pageData1.length> 0 ?
   pageData1.map((element,id)=>{
                                return(
                                    <>
                                    <tr className='table-secondary' >
                                      <td >{element.login_date.slice(0,10)}</td>
                            <td>{element.user_email}</td>
                            <td>{element.ip_address}</td>
                        </tr>
                                    </>
                                )
                            }):<div class="text-center"><div class="spinner-border m-5" role="status" style={{"marginLeft":"10px","marginTop":"5px"}}>
                            <span class="visually-hidden">Loading...</span>
                          </div></div>
 }
                </tbody>
                </table>
</div>

<div className='d-flex justify-content-end' style={{"marginLeft":"5px","marginTop":"25px"}}>
<nav aria-label="Page navigation example" >
  <ul class="pagination">
    <li class="page-item" ><button className='page-link' onClick={handlePrevious1}>prev</button></li>
     {
     Array(pageCount1).fill(null).map((ele,index)=>{
      return(
        <>
<li  active={page1 === index+1 ?true : false } className='page-item' style={{"paddingLeft":"0px"}}><button className='page-link'  onClick={()=>setPage1(index+1)}>{index+1} </button></li>
        </>
      )
     })
   } 
    <li class="page-item" style={{"paddingLeft":"0px"}}><button className='page-link' onClick={handleNext1} disabled={page1===pageCount1}  >Next</button></li>
  </ul>
</nav>
</div> 
</div>
<div className='col'>
<div className='mt-2  w3-card-4 ms-4' style={{"width":"70%","height":"190px"}}>
<header class="w3-container w3-red">
  <h5><AccountCircleRoundedIcon/> Lastest Member Registrations</h5>
</header>
<table className="w3-table-all w3-border  w3-hoverable">
<thead>
    <tr className='w3-light'>
      {/* <th>Serial no.</th> */}
      <th>User_id</th>
      <th>Email</th>
    </tr>
    </thead>
    <tbody>
    {
      pageData.length> 0 ?
    pageData.map((element,id)=>{
                                return(
                                    <>
                                    <tr className='table-secondary'>
                            {/* <th scope="row">{1}</th> */}
                            <td>{element.user_id}</td>
                            <td>{element.user_email}</td>
                        </tr>
                                    </>
                                )
                            }):<div class="text-center"><div class="spinner-border m-5" role="status" style={{"marginLeft":"10px","marginTop":"5px"}}>
                            <span class="visually-hidden">Loading...</span>
                          </div></div>
 }
                    </tbody>
  
  </table>
</div>

<div className='d-flex justify-content-end'style={{"marginLeft":"5px"}}>
<nav aria-label="Page navigation example" >
  <ul className="pagination">
    <li className="page-item" style={{"paddingLeft":"0px"}}><button className='page-link' onClick={handlePrevious}>prev</button></li>
    {
     Array(pageCount).fill(null).map((ele,index)=>{
      return(
        <>
            <li  active={page === index+1 ?true : false } className='page-item' style={{"paddingLeft":"0px"}}><button className='page-link'  onClick={()=>setPage(index+1)}>{index+1} </button></li>
        </>
      )
     })
   }
    <li class="page-item" style={{"paddingLeft":"0px"}} ><button className='page-link' onClick={handleNext} disabled={page===pageCount}>Next</button></li>
  </ul>
</nav>
</div>
</div>
</div>    
    </>
  )
}

export default Dash;
