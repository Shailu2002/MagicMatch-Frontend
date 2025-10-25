import React, {  useEffect,useState,useRef,Link} from 'react';
import LoginNav from '../AfterLoginWork/LoginNav';
import '../AfterLoginWork/LoginStyle.css';
import { toast, ToastContainer } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
const Profile = () => {
    const location = new useLocation();
    const data = location.state.data;
    const form = useRef();
    const userdata = location.state.iddata;
    console.log(data);
    console.log(userdata.Payment.length);
    let flag = 1;
    let count = 2;
    let i = -1;
    const history = new useNavigate();
    const [getuserdata, setuserdata] = useState({
        user_id:userdata.user_id,
        to_uid:data.user_id,
        message_sent: "Hello, I found your profile to be interesting and would like to connect with you. If you like my profile too, kindly accept this Invitation.",
        sent_date: Date(),
        sent_invitation_status: 0,
        message_reply: null,
        reply_date:null
        
    });
    const match = [];
    const usermatchdata = [];
    const [matchfield, setmatchfield] = useState(match);
    const [usermatch, setusermatch] = useState(usermatchdata);
    const [totalp, settotalp] = useState(0);
    const searchmatching = () =>
    {
         flag = 2;
        let currentuserage = userdata.user_age;
        let preminage = data.partner[0].partner_min_age;
        let premaxage = data.partner[0].partner_max_age;
        if ((currentuserage >= preminage) && (currentuserage <= premaxage))
        {
            match.push("partner_min_age");
            setmatchfield(match);   
        }
        usermatchdata.push(currentuserage);
        setusermatch(usermatchdata);
        let currentuserheight = Number( (userdata.general[0].user_height).slice(0,3));
        let preminheight =Number((data.partner[0].partner_min_height).slice(0,3));
        let premaxheight =Number((data.partner[0].partner_max_height).slice(0,3));
        //matching both profiles height
        if ((currentuserheight >= preminheight) && (currentuserage <= premaxheight))
        {
            match.push("partner_min_height");
            setmatchfield(match);
        }
        usermatchdata.push(userdata.general[0].user_height);
        setusermatch(usermatchdata);
      
      //matching both profiles marital status
        if (data.partner[0].partner_marital_status.includes("open to all")) {

            console.log(data.partner[0].partner_marital_status);
        }
        else
        {
            count++;
        usermatchdata.push(userdata.user_marital);
        setusermatch(usermatchdata);

            if (data.partner[0].partner_marital_status.includes(userdata.user_marital))
            {
              match.push("partner_marital_status");
              setmatchfield(match);
             
          }
        }
       
        //matching religion
        if (data.partner[0].partner_religion.includes("open to all")) {
            console.log(data.partner[0].partner_religion);
        }
        else {
            count++;
            usermatchdata.push(userdata.user_religion);
            setusermatch(usermatchdata);
            if (data.partner[0].partner_religion.includes(userdata.user_religion))
            {
                match.push("partner_religion");
                setmatchfield(match);
            }
        }
    
        if (data.partner[0].partner_diet.includes("open to all")) {
            console.log(data.partner[0].partner_diet);
        }
        else
        {
            count++;
            usermatchdata.push(userdata.general[0].user_diet);
            setusermatch(usermatchdata);
            if (data.partner[0].partner_diet.includes(userdata.general[0].user_diet)) {
                match.push("partner_diet");
                setmatchfield(match);
              
            }
        }


        if (data.partner[0].partner_mtongue.includes("open to all")) {
            console.log(data.partner[0].partner_mtongue);
        }
        else
        {
            count++;
            usermatchdata.push(userdata.user_mtongue);
            setusermatch(usermatchdata); 
            if (data.partner[0].partner_mtongue.includes(userdata.user_mtongue))
            {
                match.push("partner_mtongue");
                setmatchfield(match);
            }
        }

        if (data.partner[0].partner_highest_qualification.includes("open to all"))
        {
            console.log(data.partner[0].partner_highest_qualification);
        }
        else
        {
            count++;
            usermatchdata.push(userdata.educational[0].user_highest_qualification);
            setusermatch(usermatchdata);
            if (data.partner[0].partner_highest_qualification.includes(userdata.educational[0].user_highest_qualification))
            {
                match.push("partner_highest_qualification");
                setmatchfield(match);
            
            }
        }
    

        if (data.partner[0].partner_working_with.includes("open to all")) {
            console.log(data.partner[0].partner_working_with);
        }
        else {
            count++;
            usermatchdata.push(userdata.educational[0].user_working_with);
            setusermatch(usermatchdata);
            if (data.partner[0].partner_working_with.includes(userdata.educational[0].user_working_with)) {
                match.push("partner_working_with");
                setmatchfield(match);
            }
        }

    
        if (data.partner[0].partner_profession.includes("open to all")) {

          
        }
        else {
            count++;
            usermatchdata.push(userdata.educational[0].user_profession);
            setusermatch(usermatchdata);
            if (data.partner[0].partner_profession.includes(userdata.educational[0].user_profession)) {
                match.push("partner_profession");
                setmatchfield(match);
            }
        }
      
        if (data.partner[0].partner_country.includes("open to all")) {
          
        }
        else
        {
            count++;
            usermatchdata.push(userdata.user_country);
            setusermatch(usermatchdata);
            if (data.partner[0].partner_country.includes(userdata.user_country))
            {
                match.push("partner_country");
                setmatchfield(match);
            }
        }

        if (data.partner[0].partner_state.includes("open to all")) {
            console.log(data.partner[0].partner_state);
        }
        else {
            count++;
            usermatchdata.push(userdata.user_state);
            setusermatch(usermatchdata);
            if (data.partner[0].partner_state.includes(userdata.user_state))
            {
                match.push("partner_state");
                setmatchfield(match);
            }
        }
       

        if (data.partner[0].partner_city.includes("open to all")) {
            console.log(data.partner[0].partner_city);
        }
        else {
            count++;
            usermatchdata.push(userdata.user_city);
            setusermatch(usermatchdata);
            if (data.partner[0].partner_city.includes(userdata.user_city)) {
                match.push("partner_city");
                setmatchfield(match);
            }
        }
       
        settotalp(count);
     
    }
    useEffect(() => {
        if (flag == 1) {
            
            flag++;
            console.log("flag inside");
            searchmatching();
        }
        
    }, []);
    
    const printdata = () =>
    {
        i++;
        return usermatch[i]
        }
    
    const viewkundali = () =>
  {
    history("/viewkundali", { state: {kundali:data.kundalis[0].user_kundali} });
    }
    const checkdiet = (element) =>
    {
        if (element === "Vegeterian")
        {
            return <i style={{fontSize:"50px",color:"green"}} class="fa-sharp fa-solid fa-leaf"></i>;
        }
        else if (element === "Non-Vegeterian")
        {
            return;
            
        }
        else
        {
            return ;
        
         }
        
    }
    
   

    const sendemail = async (e) => {
      
        const { user_id,to_uid,message_sent, sent_date, sent_invitation_status,message_reply,reply_date } = getuserdata;
        const sign = await fetch("/interest_sent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
              user_id,to_uid,message_sent,sent_date,sent_invitation_status,message_reply,reply_date
    
            })
          
        });
        
        const resp = await sign.json();
        if (sign.status === 404 || !resp) {
            toast.error("Something went wrong!");
          }
        else if (sign.status === 200) {
            toast.success("Your Invitation request has been sent !");
            e.preventDefault();
            //inviation mail
            emailjs.sendForm('service_a6qdosh', 'template_qf787ti', form.current, 'BhPUrRnVL-hQNOxI2')
                                .then((result) => {
                                    console.log(result.text);
                                }, (error) => {
                                    console.log(error.text);
                                });
        }
        else if (sign.status === 203)
        {
            toast.error("You have already sent this Connect Request .Kindly Check your Inbox");
        }
    
    }

    const sendpayment = () =>
    {
        history("/membership");
        }
  
    return (
        <>
          
            <LoginNav />
         <div className='backg'>
          <div style={{paddingTop:"2%"}} className='container'>
                  <div style={{ width: "70%", marginLeft: "15%", borderRadius: "28px" }} className='card'>
                
                        <div className='card-body'>
                        {data.Payment[0] ?( data.Payment[0].approval_status === 1 ? <p className='text-danger'>Premium Member</p>:null):null}
                            <div className='container'>
                              <div className='row'>
                                  <div className='col-sm-4 mt-5'>
                         <img style={{width:"240px",height:"250px",borderRadius:"100%"}} alt="" src={data.Details[0].user_photo} />   
                                    </div>
                                    <div style={{borderRight:"1px solid gray"}} className='col-sm-6'>
                                        <h4 className='heading1'>{ data.user_name}</h4>
                                        <hr/>
                                        <div className='row'>
                                            <div className='col-sm-6'>
                                                <p>{data.user_age} yrs, { data.general[0].user_height}</p>
                                                <p>{data.user_religion},{data.user_caste}</p>
                                                <p>{ data.user_mtongue}</p>
                                            </div>
                                            <div className='col-sm-6'>
                                                <p>{ data.user_marital}</p>
                                                <p>{data.user_city},{data.user_state},{ data.user_country}</p>
                                                <p>{data.educational[0].user_profession}</p>
                                             </div>
                                        </div>
                                    </div>
  
                                    <div className='col-sm-2 text-center'>
                                       <p className='pt-5'>Send Invitation Request</p>
                                      
                                        {
                                      userdata.Payment.length == 0  ? <div><button onClick={sendpayment} style={{ border: "none", backgroundColor: "white" }}><i style={{ fontSize: "50px", color: "green" }} class="fa-solid fa-circle-check"></i></button> <p>Upgrade to Connect</p></div> : (( userdata.Payment[0].approval_status === 0 ||userdata.Payment[0].approval_status === -1) ? <div> <button onClick={sendpayment} style={{ border: "none", backgroundColor: "white" }}><i style={{ fontSize: "50px", color: "green" }} class="fa-solid fa-circle-check"></i></button>
                                            <p>Upgrade to Connect</p></div> : <div><button onClick={sendemail} style={{ border: "none", backgroundColor: "white" }}><i style={{ fontSize: "50px", color: "green" }} class="fa-solid fa-circle-check"></i></button>
                                          <p>Connect now</p>  </div> )
                                        }
                                    </div>
                    
                                </div>
<form ref={form}>       
 <input hidden type="email" value={data.contact[0].user_email} name="user_email"  /> 
<input hidden type="text" name="user_name" value={userdata.user_name + "(" + userdata.user_id + ")" } />                             
<input hidden type="text" name="send_name" value={data.user_name } />
 </form>
                                
 <h3 className='mt-4 text-danger heading1 text-center'>Detailed Profile</h3>
 <h4> <i style={{fontSize:"30px",padding:"10px",color:"brown",borderRadius:"50px",border:"1px solid gray"}} class="fa-sharp fa-solid fa-quote-left"></i><span className='headingprofile'>About {data.user_name}</span> </h4>
 <p>{ data.user_id}</p>
<p>{data.user_about_yourself}</p>
<hr />
<div>
<h4><span className='headingprofile'>Basic Details</span></h4>
<p>Complexion : <span className='text-secondary'> {data.general[0].user_complexion}</span></p>
<p>Blood Group : <span className='text-secondary'> {data.general[0].user_blood_group}</span></p>
<p>Body Type : <span className='text-secondary'> {data.general[0].user_body_type}</span></p>
 <p></p>
                  <hr/>
                              </div>
                              <div>
                                  <h4> <i style={{fontSize:"30px",padding:"10px",color:"brown",borderRadius:"50px",border:"1px solid gray"}}  class="fa-sharp fa-solid fa-palette"></i><span className='headingprofile'>Hobbies and Interests </span> </h4>
                                  <ul type="none">
                                      {
                                         
                                    data.general[0].user_hobbies.map((element) =>
                                      {
                                          return <li>{ element}</li>
                                      })
                                      }
                                 </ul>
                              </div>
                              <hr />
                              <div>
                                <h4><i style={{ fontSize: "30px", padding: "10px", color: "brown", borderRadius: "50px", border: "1px solid gray" }} class="fa-sharp fa-solid fa-phone"></i><span className='headingprofile'>Contact Details</span>  </h4>
                                    

                                {
                                      userdata.Payment.length == 0  ? 
                                            <div>
                                      
                  Email   <button style={{border:"none",backgroundColor:"white",color:"blue"}}  onClick={sendpayment} type="submit">----------Upgrade to view-----------</button>
                                           
                <p> Contact Number   <button style={{border:"none",backgroundColor:"white",color:"blue"}}  onClick={sendpayment} type="submit">----------Upgrade to view-------------</button></p>    
                                            <hr/>
                                            </div>  
                                            :
((userdata.Payment[0].approval_status == 0 || userdata.Payment[0].approval_status == -1) ?
                                                <div>
                                    
                                     Email <button style={{border:"none",backgroundColor:"white",color:"blue"}}  onClick={sendpayment} type="submit">Upgrade to view</button>     
                                   <p> Contact Number  <button style={{border:"none",backgroundColor:"white",color:"blue"}}  onClick={sendpayment} type="submit">Upgrade to view</button></p>
                                     <hr/>
                                     </div> 
                                            :
                                            <div>
                                            <p>Email : <span className='text-secondary'> {data.contact[0].user_email}</span></p>
                                             <p>Contact Number : <span className='text-secondary'>{data.contact[0].user_contact }</span></p>
                                          <hr/>
                                            </div>
                                        
                                        )
                                        }
                                     
                                  
                                
                              </div>

                              <div>
                                    <h3> <i style={{ fontSize: "30px", padding: "10px", color: "brown", borderRadius: "50px", border: "1px solid gray" }} class="fa-solid fa-utensils"></i><span className='headingprofile'>Diet</span></h3>
                                    <div className='ms-5'>
                                      {
                                       checkdiet(data.general[0].user_diet)
                                     }
                                      <p>{ data.general[0].user_diet}</p>
                                  
                                    </div>
                                 
                                
                                  <hr/>
                              </div>
                              <div>
                                  <h4><i style={{fontSize:"30px",padding:"10px",color:"brown",borderRadius:"50px",border:"1px solid gray"}} class="fa-solid fa-graduation-cap"></i><span className='headingprofile'>Educational Details</span> </h4>
                                  <p>Qualification : <span className='text-secondary'>{data.educational[0].user_highest_qualification}</span></p>
                                    <p>Working in  : <span className='text-secondary'>{data.educational[0].user_working_with}</span></p>
                                    {
                                        data.educational[0].show_annual_income == 1 ? <p>Income : <span className='text-secondary'>{ data.educational[0].user_annual_income}</span></p> :null
                                    } 
                                 <hr/>
                              </div>

                                {
                                  data.kundalis[0] ? ( <div>
                                    <h4> <span className='headingprofile'>Horoscope Details</span></h4>
                                    {
                                            userdata.Payment.length === 0 ?
                                        <div className='mb-3 mt-3'><button style={{border:"none",backgroundColor:"white",color:"blue"}}  onClick={sendpayment} type="submit">-----------Upgrade to view-------------</button><hr/>  </div>
                                                : ((userdata.Payment[0].approval_status === 0 || userdata.Payment[0].approval_status === -1) ?
                                                <div className='mb-3 mt-3'><button style={{border:"none",backgroundColor:"white",color:"blue"}}  onClick={sendpayment} type="submit">-----------Upgrade to view-------------</button>  </div>
                                                    :
                                                    <div>
                                                    <p>Date of Birth: <span>{data.kundalis[0].user_dob}</span></p>
                                    <p>Sun Sign: <span>{data.kundalis[0].user_sunsign}</span></p>
                                    <button style={{border:"none",color:"blue",backgroundColor:"white"}} onClick={viewkundali} type="submit"> View Kundali</button>
                                                
                                                    <p></p>
                                                            <hr />
                                                            </div>
                                                 )
                                        }  
                                     
                                </div>)  : null
                              }  
<div  className='mb-4'>
<h4>  <i style={{ fontSize: "30px", padding: "10px", color: "brown", borderRadius: "50px", border: "1px solid gray" }} class="fa-solid fa-user-group"></i><span className='headingprofile'> Partner Preferences</span> </h4>
                                      <div className='row mt-5'>
                                        <div className='col-sm-3'>
                                        <img style={{borderRadius:"60px",width:"80px",height:"80px",border:"2px solid black"}}  alt="" src={data.Details[0].user_photo }/>
                                        </div> 
                                        <div className='col-sm-6'> 
                                            <h3>  You match {matchfield.length} / {totalp} preferences</h3>
                                          
                                         </div>
                                        <div className='col-sm-3'>
                                        <img style={{borderRadius:"60px",width:"80px",height:"80px",border:"2px solid black"}}  alt="" src={userdata.photos[0].user_photo }/>
                                        </div>

                                    </div>  
                                    <div className='row mt-5'>
                                            <div className='col-sm-9'>
                                            <label className='text-danger'>Age</label>
                              <p>{data.partner[0].partner_min_age} to {data.partner[0].partner_max_age}</p>
                                            </div>
                                            <div className='col-sm-3'>
                                            {matchfield.includes("partner_min_age") ? <i class="fa-solid fa-check logomatch"></i> :
                                                <i class="fa-solid logonotmatch fa-xmark"></i>}  {printdata()}
                                        </div>
                                        <hr/>
                                    </div> 
                                    
                                    <div className='row mt-2'>
                                            <div className='col-sm-9'>
                                            <label className='text-danger'> Height </label>
             <p> {data.partner[0].partner_min_height}   to   {data.partner[0].partner_max_height}</p>
                                            </div>
                                            <div className='col-sm-3'>
                                            {matchfield.includes("partner_min_height") ? <i class="fa-solid fa-check logomatch"></i> :
                                                <i class="fa-solid logonotmatch fa-xmark"></i>}  {printdata()}
                                        </div>
                                        <hr/>
                                    </div>  
                                    
<div className='row mt-2'>
<div className='col-sm-9'>                                        
  {
  data.partner[0].partner_marital_status.includes("open to all") ? null:(<div><label className='text-danger'>Marital Status</label>
   <p>{ data.partner[0].partner_marital_status.map((e) =>{
    return <li style={{display:"inline"}}>{e}</li>
     })}</p><hr/></div>)             
 }
 </div> <div className='col-sm-3'>
  {
 data.partner[0].partner_marital_status.includes("open to all") ? null : <div> {matchfield.includes("partner_marital_status") ? <i class="fa-solid fa-check logomatch"></i> :
<i class="fa-solid logonotmatch fa-xmark"></i>} {printdata()} </div>
}</div> </div> 

< div className='row mt-2'>
<div className='col-sm-9'>                                        
{data.partner[0].partner_religion.includes("open to all") ? null:(<div><label className='text-danger'>Religion</label>
    <p>{ data.partner[0].partner_religion.map((e) =>{
   return <li style={{display:"inline"}}>{e}</li>
    })}</p><hr /></div>)}    
 </div> <div className='col-sm-3'>
 {
 data.partner[0].partner_religion.includes("open to all") ? null : <div> {matchfield.includes("partner_religion") ? <i class="fa-solid fa-check logomatch"></i> :
 <i class="fa-solid logonotmatch fa-xmark"></i> } {printdata()} </div>
}                                        
 </div> </div> 

<div className='row mt-2'>
<div className='col-sm-9'>                                        
   {
  data.partner[0].partner_diet.includes("open to all") ? null:(<div><label className='text-danger'>Diet</label>
  <p>{ data.partner[0].partner_diet.map((e) =>
    {
 return <li style={{display:"inline"}}>{e}</li>
 })}</p><hr/></div>)                                           
    }
 </div> <div className='col-sm-3'>
 {
 data.partner[0].partner_diet.includes("open to all") ? null : <div> 
  {matchfield.includes("partner_diet") ? <i class="fa-solid fa-check logomatch"></i> :
 <i class="fa-solid logonotmatch fa-xmark"></i> }  {printdata()} </div>
}  </div> </div>  
<div className='row mt-2'>
<div className='col-sm-9'>                                        
{  data.partner[0].partner_mtongue.includes("open to all") ? null:(<div><label className='text-danger'>Mother Tongue</label>
    <p>{ data.partner[0].partner_mtongue.map((e) =>{ 
   return <li style={{display:"inline"}}>{e}</li>
    })}</p><hr /></div>)} 
</div> <div className='col-sm-3'>
{
 data.partner[0].partner_mtongue.includes("open to all") ? null : <div> 
 {matchfield.includes("partner_mtongue") ? <i class="fa-solid fa-check logomatch"></i> :
 <i class="fa-solid logonotmatch fa-xmark"></i> } {printdata()} </div>
} </div> </div>                                    

<div className='row mt-2'>
<div className='col-sm-9'>                                        
{ data.partner[0].partner_highest_qualification.includes("open to all") ? null:(<div><label className='text-danger'>Qualification</label>
    <p>{data.partner[0].partner_highest_qualification.map((e) =>{
   return <li style={{display:"inline"}}>{e}</li>
    })}</p><hr /></div>)}   
 </div> <div className='col-sm-3'>
 {
 data.partner[0].partner_highest_qualification.includes("open to all") ? null : <div>  {matchfield.includes("partner_highest_qualification") ? <i class="fa-solid fa-check logomatch"></i> :
 <i class="fa-solid logonotmatch fa-xmark"></i> }
 {printdata()} </div>
}                                          

</div> </div>                                    
                                  
<div className='row mt-2'>
<div className='col-sm-9'>                                        
{ data.partner[0].partner_working_with.includes("open to all") ? null:(<div><label className='text-danger'>Working With</label>
    <p>{data.partner[0].partner_working_with.map((e) =>{
   return <li style={{display:"inline"}}>{e}</li>
    })}</p><hr /></div>)}   
    </div> <div className='col-sm-3'>
    {
 data.partner[0].partner_working_with.includes("open to all") ? null : <div>  
 {matchfield.includes("partner_working_with") ? <i class="fa-solid fa-check logomatch"></i> :
 <i class="fa-solid logonotmatch fa-xmark"></i> } 
 {printdata()} </div>
}   

</div> </div>                                    

<div className='row mt-2'>
<div className='col-sm-9'>                                        
{ data.partner[0].partner_profession.includes("open to all") ? null:(<div><label className='text-danger'>profession</label>
    <p>{data.partner[0].partner_profession.map((e) =>{
   return <li style={{display:"inline"}}>{e}</li>
    })}</p><hr /></div>)}   
 </div> <div className='col-sm-3'>
 {
 data.partner[0].partner_profession.includes("open to all") ? null : <div>  
 {matchfield.includes("partner_profession") ? <i class="fa-solid fa-check logomatch"></i> :
  <i class="fa-solid logonotmatch fa-xmark"></i> } 
 {printdata()} </div>
}   
</div> </div>                                        
                                    

<div className='row mt-2'>
<div className='col-sm-9'>                                        
{  data.partner[0].partner_country.includes("open to all") ? null:(<div><label className='text-danger'>Country</label>
    <p>{data.partner[0].partner_country.map((e) =>{
   return <li style={{display:"inline"}}>{e}</li>
    })}</p><hr /></div>)}  
  </div> <div className='col-sm-3'>
  {
 data.partner[0].partner_country.includes("open to all") ? null : <div>  
 {matchfield.includes("partner_country") ? <i class="fa-solid fa-check logomatch"></i> :
  <i class="fa-solid logonotmatch fa-xmark"></i> } {printdata()} </div>
}                                        
</div> </div>                                     
                                   
<div className='row mt-2'>
<div className='col-sm-9'>                                                                     
{ data.partner[0].partner_state.includes("open to all") ? null:(<div><label className='text-danger'>State</label>
    <p>{data.partner[0].partner_state.map((e) =>{
   return <li style={{display:"inline"}}>{e}</li>
    })}</p><hr /></div>)} 
</div> <div className='col-sm-3'>
{
 data.partner[0].partner_state.includes("open to all") ? null : <div> {matchfield.includes("partner_state") ? <i class="fa-solid fa-check logomatch"></i> :
 <i class="fa-solid logonotmatch fa-xmark"></i> }   
 {printdata()} </div>
}                                            
</div> </div>                                     

 <div className='row mt-2'>
<div className='col-sm-9'>                                        
{data.partner[0].partner_city.includes("open to all") ? null:(<div><label className='text-danger'>City</label>
    <p>{data.partner[0].partner_city.map((e) =>{
   return <li style={{display:"inline"}}>{e}</li>
    })}</p><hr /></div>)} 
 </div> <div className='col-sm-3'>
 {
data.partner[0].partner_city.includes("open to all") ? null : <div> 
  {matchfield.includes("partner_city") ? <i class="fa-solid fa-check logomatch"></i> :
  <i class="fa-solid logonotmatch fa-xmark"></i> }
 {printdata()} </div>
}                                            
                                        </div> </div>   
                                    <ToastContainer/>
   </div></div>
 </div>
                  </div>
              </div>
          </div>
       
         
        </>

  )
}

export default Profile;