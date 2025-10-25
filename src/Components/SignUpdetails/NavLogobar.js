import React from 'react';
import { Link } from 'react-router-dom';
const NavLogobar = () => {
  return (
      <>
           <nav  className="navbar navbar-expand-md  bg-danger  navbar-dark ">
                 <div className='container font-weight-bolder'>
                       <Link to="/" style={{fontFamily:"cursive",fontSize:"22px"}} className='navbar-brand'>MagicMatch</Link>
                     
                          
                           </div>
  
              </nav> 
      </>
  )
}

export default NavLogobar;