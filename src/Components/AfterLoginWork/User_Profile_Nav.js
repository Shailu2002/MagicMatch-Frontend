import React from 'react';
import { Link } from 'react-router-dom';
const User_Profile_Nav = () => {
  return (
      <>
          <nav  className="navbar navbar-expand-md  bg-light  ">
                 <div className='container  font-weight-bolder'>
                       
                      <button className='navbar-toggler' type="button" data-bs-toggle="collapse" data-bs-target="#collapsenavebar">
                        <span className='navbar-toggler-icon'></span>   
                      </button>
                     <div className="collapse navbar-collapse  text-center" id="collapsenavebar">
                    <ul  className='navbar-nav'>
                             <li  className='nav-item   active'>
                              <Link to="/loginhome" className='nav-link  text-dark' >Dashboard</Link>
                           
                                 </li>
                                
                              <li  className='nav-item active'>
                                  <Link to="/myprofile" className='nav-link text-dark'>My Profile</Link>
                              </li>
                              
                  <li className='nav-item dropdown  active'>
                <Link  role="button" data-bs-toggle="dropdown" className='nav-link dropdown-toggle text-dark'>More</Link>
                    <ul class="dropdown-menu">
                               <li><Link to="" class="dropdown-item" >My Profile</Link></li>
                                  <li><Link to="/horror" class="dropdown-item">Add Horoscope Details</Link></li>
                                  <li></li>
                                  
                                </ul>

                              </li>
                             
                             
                              </ul>
                              
                      </div>
                      
                  </div>
  
              </nav> 
      </>
  )
}

export default User_Profile_Nav;