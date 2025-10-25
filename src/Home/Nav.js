import React from 'react'
import { NavLink,Link, Outlet } from 'react-router-dom';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import FeedRoundedIcon from '@mui/icons-material/FeedRounded';
import KeyboardDoubleArrowRightSharpIcon from '@mui/icons-material/KeyboardDoubleArrowRightSharp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PaidIcon from '@mui/icons-material/Paid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
export const Nav = () => {
  function myAccFunc() {
    var x = document.getElementById("demoAcc");
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
      x.previousElementSibling.className += " w3-green";
    } else { 
      x.className = x.className.replace(" w3-show", "");
      x.previousElementSibling.className = 
      x.previousElementSibling.className.replace(" w3-green", "");
    }
  }
  
  return (
    <>
    <div class="w3-top" >
  <div class="w3-bar w3-red"  >
    <a  class="w3-bar-item w3-button" style={{"fontFamily":"cursive","fontWeight":"bold"}}>MagicMatch</a>
   <Link to="/"> <button  class="w3-bar-item w3-button w3-display-topright"    style={{"fontFamily":"cursive","fontWeight":"bold"}}><LogoutSharpIcon/> Logout</button></Link> 
   
  </div>
</div>
    <div class="w3-sidebar w3-2019-bluestone w3-bar-block" style={{"width":"18%","marginTop":"0px"}}>
  <h3 class="w3-bar-item w3-red mt-0 hd" >Welcome,{localStorage.getItem("lname").substring(0,localStorage.getItem('lname').indexOf(' '))}</h3>
  <NavLink to="/Nav/Dash"><button class="w3-bar-item w3-button "><DashboardCustomizeRoundedIcon/> Dashboard</button></NavLink> 
  <button class="w3-bar-item w3-button  " onClick={myAccFunc}><AccountCircleIcon/>  Accounts</button>
  <div id="demoAcc" className="w3-hide">
  <NavLink to="/Nav/Amember"><button class="w3-bar-item w3-button">< KeyboardDoubleArrowRightSharpIcon/>  All Members</button></NavLink>
  <NavLink to="/Nav/Pmember"><button class="w3-bar-item w3-button">< KeyboardDoubleArrowRightSharpIcon/>  Paid Members</button></NavLink>
  <NavLink to="/Nav/Nmember"><button class="w3-bar-item w3-button">< KeyboardDoubleArrowRightSharpIcon/>  Non-Members</button></NavLink>
  </div>
  <NavLink to="/Nav/MemPlan"> <button  class="w3-bar-item w3-button"><BorderColorRoundedIcon/>  Edit Membership Plan's</button></NavLink>
  <NavLink to="/Nav/Success"> <button  class="w3-bar-item w3-button"><CheckCircleIcon/> Success Stories</button></NavLink>
  <NavLink to="/Nav/Feed"> <button  class="w3-bar-item w3-button"><FeedRoundedIcon/> Feedback</button></NavLink>
  <NavLink to="/Nav/Papproval"> <button  class="w3-bar-item w3-button"><PaidIcon/> Payment approval</button></NavLink>
 
</div>
<div style={{"marginTop":"40px","marginLeft":"18%"}}>
  <Outlet/>
  </div>
    </>
  )
}

export default Nav;