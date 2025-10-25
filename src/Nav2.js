import React, { useEffect } from 'react'
import { NavLink,Link, Outlet } from 'react-router-dom';
import img from './Home/Media/login.JPG';
import img1 from './Home/Media/download.jpg';
import './styles.css';

export const Nav2 = () => {
     

    function mydemo(){
        let arrow = document.querySelectorAll(".arrow");
    for (var i = 0; i < arrow.length; i++) {
       arrow[i].addEventListener("click", (e)=>{
      let arrowParent = e.target.parentElement.parentElement;//selecting main parent of arrow
      arrowParent.classList.toggle("showMenu");
       });
     }
     let sidebar = document.querySelector(".sidebar");
     let sidebarBtn = document.querySelector(".bx-menu");
     var x = document.getElementById("demoAcc");
     sidebarBtn.addEventListener("click", ()=>{
       sidebar.classList.toggle("close");
     });
     if(x.className.indexOf("w3-show") != -1){
      x.className = x.className.replace(" w3-show", "");
      x.previousElementSibling.className = 
      x.previousElementSibling.className.replace(" colorop", "");
     }
     var y = document.getElementById("demoAcc1");
     if(y.className.indexOf("w3-show") != -1){
      y.className = y.className.replace(" w3-show", "");
      y.previousElementSibling.className = 
      y.previousElementSibling.className.replace(" colorop", "");
     }
    }
     
    function myAccFunc() {
        var x = document.getElementById("demoAcc");
        if (x.className.indexOf("w3-show") == -1) {
          x.className += " w3-show";
          x.previousElementSibling.className += " colorop";
        } else { 
          x.className = x.className.replace(" w3-show", "");
          x.previousElementSibling.className = 
          x.previousElementSibling.className.replace(" colorop", "");
        }
      }

      function myAccFunc1() {
        var x = document.getElementById("demoAcc1");
        if (x.className.indexOf("w3-show") == -1) {
          x.className += " w3-show";
          x.previousElementSibling.className += " colorop";
        } else { 
          x.className = x.className.replace(" w3-show", "");
          x.previousElementSibling.className = 
          x.previousElementSibling.className.replace(" colorop", "");
        }
      }
  return (
    <>
   <div class="sidebar close">
    <div class="logo-details">
    <img src={img1} style={{"height":"40px","marginLeft":"20px","marginTop":"10px"}}/>
      <span class="logo_name">MagicMatch</span>
    </div>
    <ul class="nav-links ">
      <li className='mb-3'>
      <Link to="/Nav/Dash">  <a >
          <i class='bx bx-grid-alt' style={{"fontSize":"45px","marginLeft":"-16px"}}></i>
          <span class="link_name" style={{"fontSize":"18px"}}>Dashboard</span>
        </a></Link>
        <ul class="sub-menu blank">
          <li><a class="link_name" >Dashboard</a></li>
        </ul>
      </li>
      <li className='mb-3'>
        <div class="iocn-link">
          <a >
            <i class='bx bx-user' style={{"fontSize":"45px","marginLeft":"-16px"}} ></i>
            <span class="link_name" style={{"fontSize":"18px"}}>Accounts</span>
          </a>
          <i class='bx bxs-chevron-down arrow' onClick={myAccFunc}></i>
        </div>
        <ul class="sub-menu" id="demoAcc" className="w3-hide">
          <li><Link to="/Nav/Amember" style={{"color":"white","marginLeft":"25px"}}><a >All Members</a></Link></li>
          <li> <Link to="/Nav/Pmember" style={{"color":"white","marginLeft":"25px"}}><a >Paid Members</a></Link></li>
          <li><Link to="/Nav/Nmember" style={{"color":"white","marginLeft":"25px"}}><a >Non-Paid Members</a></Link></li>
        </ul>
        <ul class="sub-menu" >
          <li><a class="link_name" >Accounts</a></li>
          <li><a >All Membes</a></li>
          <li> <a >Paid Members</a></li>
          <li><a >Non-Paid Members</a></li>
        </ul>
      </li>
      <li className='mb-3'>
        <div class="iocn-link">
          <Link to="/Nav/MemPlan"><a >
          <i class='bx bxs-edit-alt bx-lg' style={{"fontSize":"45px","marginLeft":"-16px"}}></i>
            <span class="link_name" style={{"fontSize":"18px"}}>Subscription Plan</span>
          </a></Link>
        </div>
        <ul class="sub-menu blank">
          <li><a class="link_name" >Subscription Plan</a></li>
        </ul>
      </li>
      <li className='mb-3'>
        <Link to="/Nav/Success"><a >
          
        <i class='bx bxs-message-rounded-check' style={{"fontSize":"45px","marginLeft":"-16px"}}></i>
          {/* <i class='bx bx-pie-chart-alt-2' ></i> */}
          <span class="link_name" style={{"fontSize":"18px"}}>Success Stories</span>
        </a></Link>
        <ul class="sub-menu blank">
          <li><a class="link_name" >Success Stories</a></li>
        </ul>
      </li>
      <li className='mb-3'>
      <div class="iocn-link">
        <a >
        <i class='bx bxs-add-to-queue'  style={{"fontSize":"45px","marginLeft":"-16px"}}></i>
          <span class="link_name" style={{"fontSize":"18px"}} >Add Attributes</span>
        </a>
        <i class='bx bxs-chevron-down arrow' onClick={myAccFunc1}></i>
        </div>
        <ul class="sub-menu" id="demoAcc1" className="w3-hide">
          <li><Link to="/Nav/Country" style={{"color":"white","marginLeft":"25px"}}><a >Add Country</a></Link></li>
          <li> <Link to="/Nav/State" style={{"color":"white","marginLeft":"25px"}}><a >Add State</a></Link></li>
          <li><Link to="/Nav/City" style={{"color":"white","marginLeft":"25px"}}><a >Add City</a></Link></li>
          <li> <Link to="/Nav/Religion" style={{"color":"white","marginLeft":"25px"}}><a >Add Religion</a></Link></li>
          <li><Link to="/Nav/Caste" style={{"color":"white","marginLeft":"25px"}}><a >Add Caste</a></Link></li>
          <li><Link to="/Nav/Language" style={{"color":"white","marginLeft":"25px"}}><a >Add Language</a></Link></li>
        </ul>
        <ul class="sub-menu">
        <li><a class="link_name" >Add Attributes</a></li>
          <li><a >Add Country</a></li>
          <li> <a >Add State</a></li>
          <li><a >Add City</a></li>
          <li><a >Add Religion</a></li>
          <li> <a >Add Caste</a></li>
          <li><a >Add Language</a></li>
        </ul>
      </li> 
      <li className='mb-3'>
      <Link to="/Nav/Feed"><a >
      <i class='bx bxs-spreadsheet ' style={{"fontSize":"45px","marginLeft":"-16px"}}></i>
          <span class="link_name" style={{"fontSize":"18px"}}>Feedback</span>
        </a></Link>
        <ul class="sub-menu blank">
          <li><a class="link_name" >Feedback</a></li>
        </ul>
      </li>
      <li className='mb-3'>
      <Link to="/Nav/Papproval">  <a >
      <i class='bx bxs-dollar-circle' style={{"fontSize":"45px","marginLeft":"-16px"}}></i>
          <span class="link_name" style={{"fontSize":"18px"}}>Payment Approval</span>
        </a></Link>
        <ul class="sub-menu blank">
          <li><a class="link_name" href="#">Payment Approval</a></li>
        </ul>
      </li>
      <li>
   
  </li>
</ul>
  </div>
  <section class="home-section">
    <div class="home-content" style={{"background":"white"}}>
      <i class='bx bx-menu'  onClick={mydemo}></i>
      {/* <span class="text"></span> */}
      <div class="profile-details  w3-display-topright" style={{"marginTop":"0px","marginLeft":"950px"}}>
      <div class="profile-content">
        <img src={img} alt="profileImg"/> 
      </div>
      <div class="name-job">
        <div class="profile_name">{localStorage.getItem("lname")}</div>
        <div class="job">Admin</div>
      </div>
      <Link to="/admin"> <i class='bx bx-log-out' style={{"fontSize":"40px","color":"black"}}></i></Link>
    </div>
    </div>
  <Outlet/>

  </section>
  
    </>
  )
}
export default Nav2;