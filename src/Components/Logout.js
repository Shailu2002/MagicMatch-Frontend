import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
 import { useNavigate } from 'react-router-dom';
const Logout = () => {
   const history = new useNavigate();
  useEffect(async() =>
  {
    console.log("before api");
    const res = await fetch('/logout', {
      method: "GET",
      headers: {
        "content-Type": "application/json"
      }
    });
    console.log("aftera api")
    const data = await res.json();
    console.log(data);
    if (res.status==200)
    {
      history("/login", {replace:true});
    }
    else
    {
      alert("wrong");
    }
     localStorage.clear();
},[]);
  return (
      <>
          <p className='heading1'> you have been logged out</p>
          <Link to="/login" >Login again</Link>
      </>
  )
}

export default Logout;