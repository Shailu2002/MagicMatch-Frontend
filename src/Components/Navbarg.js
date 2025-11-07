import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../Home/Media/download.jpg';
const Navbarg = () => {
  return (
    <>
     
           <nav  className="navbar navbar-expand-md  bg-danger  navbar-dark ">
                 <div className='container font-weight-bolder'>
          <Link to="/" style={{ fontFamily: "cursive", fontSize: "22px" }} className='navbar-brand'>
          <img src={img1} style={{"height":"40px","marginLeft":"20px","marginTop":"10px"}}/>    MagicMatch</Link>
                      <button className='navbar-toggler' type="button" data-bs-toggle="collapse" data-bs-target="#collapsenavbar">
                        <span className='navbar-toggler-icon'></span>   
                      </button>
                     <div className="collapse navbar-collapse  text-center" id="collapsenavbar">
                          <ul className='navbar-nav'>
                             <li  className='nav-item active'>
                                  <Link to="/" className='nav-link nav-text text-white'>Home</Link>
                              </li>
                              <li className='nav-item '>
                              <Link  to="/success_story" className=' nav-link nav-text text-white'>Success Story</Link>
              </li>
              
                            <li className='nav-item '>
                              <Link  to="/feed" className=' nav-link nav-text text-white'>Feedback</Link>
                             </li>
                          
            <li className='nav-item active'>
           < Link to="/signup"  className='nav-link nav-text text-white'><i class="fa-solid text-black fa-user-plus "></i></Link>
           </li>  
          <li className='nav-item active'>
          <Link to="/login" target="_blank" className='nav-link nav-text text-white'> <i class="fa-solid  text-black fa-right-to-bracket"></i></Link>
                              </li>
                              </ul>
                           
                      </div>
                      
                  </div>
  
              </nav> 
      </>
  )
}

export default Navbarg;