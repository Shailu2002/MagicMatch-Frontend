import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import BlockIcon from '@mui/icons-material/Block';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip';
export const Table2 = ({details}) => {

 
  const deleteuser = async(id)=>{
    const res2 = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/delete_user/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

  const deletedata= await res2.json();
  console.log(deletedata);

  if(res2.status === 200 || !deletedata){
    console.log("error");
  }else{
    console.log("user deleted")
  }
}
  const deleteuser1 = async(id)=>{
    const res2 = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/deletedetail/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

  const deletedata= await res2.json();
  console.log(deletedata);

  if(res2.status === 200 || !deletedata){
    console.log("error");
  }else{
    console.log("user deleted")
  }
  }
  
  const Astats = async (id) => {
    console.log(id);
    const res3 = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/activate_status/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );
    const data3 = res3.json();
    console.log(data3)

  };

  const Dstats = async (id) => {
    const res4 = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/deactivate_status/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );
    const data4 = res4.json();
    
    console.log(data4)

  };

  //  useEffect(() => {
  //   details.map((element,id)=>{
  //     return(
  //     <>
  //       {getstatus(element.user_id)}
  //    </>
  //     )})
  //     }, [])
  return (
    <>
    <table class="w3-table-all  w3-card-4">
      <thead>
    <tr>
      <th>User id</th>
      <th>Name</th>
      <th>Gender</th>
      <th>Age</th>
      <th>Country</th>
      <th>Actions</th>
       <th>Status</th> 
    </tr>
    </thead>
    <tbody>
    {
      details.length > 0 ?
   details?.map((element,id)=>{
                                return(
                                    <>
                                    <tr className='table-secondary'>
                                      <td>{element.user_id}</td>
                                    <td>{element.user_name}</td>
      <td>{element.user_gender}</td>
      <td>{element.user_age}</td>
      <td>{element.user_country}</td>
      <td>
      <div class="w3-dropdown-hover">
      <button className='me-3 btn w3-red' data-tooltip-id="my-tooltip" data-tooltip-content="View your Details"><RemoveRedEyeIcon/></button>
  <div class="w3-dropdown-content w3-bar-block w3-border">
   <Link to={`/Amember/VPersonal/${element._id}`}> <a class="w3-bar-item w3-button">Personal Details</a></Link>
   <Link to={`/Amember/VGeneral/${element.user_id}`}> <a  class="w3-bar-item w3-button">General Details</a></Link>
   <Link to={`/Amember/VPartner/${element.user_id}`}><a class="w3-bar-item w3-button">Partner Preferences</a></Link>
   <Link to={`/Amember/VEducation/${element.user_id}`}><a class="w3-bar-item w3-button">Educational Details</a></Link>
  </div>
</div>
<div class="w3-dropdown-hover">
    <button className='me-3 btn w3-red' data-tooltip-id="my-tooltip" data-tooltip-content="Edit User Details">  <ModeEditIcon/></button>
    <div class="w3-dropdown-content w3-bar-block w3-border">
   <Link to={`/Amember/EPersonal/${element._id}`}> <a class="w3-bar-item w3-button">Personal Details</a></Link>
   <Link to={`/Amember/EGeneral/${element.user_id}`}> <a  class="w3-bar-item w3-button">General Details</a></Link>
   <Link to={`/Amember/EPartner/${element.user_id}`}><a class="w3-bar-item w3-button">Partner Preferences</a></Link>
   <Link to={`/Amember/EEducation/${element.user_id}`}><a class="w3-bar-item w3-button">Educational Details</a></Link>
  </div>
</div>
    <button className='me-3 btn w3-red' data-tooltip-id="my-tooltip" data-tooltip-content="Delete User" onClick={()=>{deleteuser(element._id);deleteuser1(element.user_id)}} ><DeleteIcon/></button>
    </td>
    <td>
      { element.contact?.map((ele,id)=>{
                                return(
                        <>

{
     ele.activeStatus === true
     ? <div>
       <button className='me-3 btn w3-red' data-tooltip-id="my-tooltip" data-tooltip-content="Activate User" onClick={()=>{Astats(element.user_id)}}><DoneOutlineIcon/></button> 
     </div>
     :
     <div>
     <button className='me-3 btn w3-red' data-tooltip-id="my-tooltip" data-tooltip-content="Deactivate User" onClick={()=>{Dstats(element.user_id)}}> <BlockIcon/></button> 
     </div>
   } 
                    </>
                                )
       } )
                    
   }
      
     </td> 
    </tr>     
     </>
    )
   }):<div class="text-center"><div class="spinner-border m-5" role="status" style={{"marginLeft":"10px","marginTop":"5px"}}>
  <span class="visually-hidden">Loading...</span>
 </div></div>
 } 
    </tbody>
  </table> 
  <Tooltip id="my-tooltip" /> 
    </>
  )
}
export default Table2;