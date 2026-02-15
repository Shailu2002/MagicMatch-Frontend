import React, { useEffect,useRef, useState} from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Pagination from 'react-bootstrap/Pagination';
import emailjs from '@emailjs/browser';
const SearchCard = ({ user }) => {
    const [iddata, setiddata] = useState([]);
    const form = useRef();
    const history = new useNavigate();
    const [pagedata, setpagedata] = useState([]);
    const [page, setpage] = useState(1);
    const [pagecount, setpagecount] = useState(0);
    console.log(user.length);
    const [getuserdata, setuserdata] = useState({
        user_id:localStorage.getItem("luser_id"),
        to_uid:"",
        message_sent: "Hello, I found your profile to be interesting and would like to connect with you. If you like my profile too, kindly accept this Invitation.",
        sent_date: Date(),
        sent_invitation_status: 0,
        message_reply: null,
        reply_date:null
    });
    const sendpayment = () =>
    {
        history("/membership");
    } 
    const getdata = async () =>
     {
    const uind = (localStorage.getItem("luser_id"));
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/getalldetails_data/${uind}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      },
        );
        if (res.status === 401) {
          console.log("Authentication failed: No token or invalid token");
          localStorage.clear(); // Safety ke liye storage saaf karein
          history("/login", { replace: true }); // Login par redirect
          return; // Function ko yahan stop karein
        }
      const data = await res.json();
        if (!data || res.status === 404)
        {
            toast.error("Something Went Wrong");
        }
        else if (res.status === 200)
        {
            console.log(data[0].partner[0]);
            setiddata(data);
        }
    }
    // const handlenext = () =>
    // {
    //     if (page === pagecount) 
    //     {
    //         return page;
    //     }
    //     else
    //     {
    //         setpage(page + 1);
    //     }
        
    // }
    // const handleprevious = () =>
    // {
    //     if (page === 1)
    //     {
    //         return page;
    //     }
    //     else {
    //         setpage(page - 1);
    //     }
    // }

    // useEffect(() =>
    // {
    //     getdata();
      
    // },[page]);
    // useEffect(() =>
    // {
    //     const pagedatacount = Math.ceil( user.length/2);
    //     setpagecount(pagedatacount);
    //     console.log(pagedatacount);
    //     if (page)
    //     {
    //         const LIMIT = 2;
    //         const skip = LIMIT * page;
    //         const dataskip = user.slice(page === 1 ? 0 : skip - LIMIT , skip);
    //         setpagedata(dataskip);
    //         }
    // },[user]);
    useEffect(() =>
    {
        getdata();
    },[]);
  return (
      <>
          <div>
              {
                  user.length != 0 ? <p className='heading1 text-success'>You have {user.length} Search Results</p>:null
              } 
              </div>
          {
              user.map((element, id) => {   
            return(
                <>       
          <div style={{paddingTop:"2%"}} className='container'>
                <div style={{ width: "70%", marginLeft: "15%" ,borderRadius:"28px"}} className='card'>
                            <div className='card-body'>
                            {element.Payment[0] ?( element.Payment[0].approval_status === 1 ? <p className='text-danger'>Premium Member</p>:null):null}
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-sm-4'>
                                        <img style={{height:"90%",width:"80%",borderRadius:"30%"}} src={element.Details[0].user_photo} />
                                    </div>
                                    <div className='col-sm-6'>
                                        <h4>{element.user_name}</h4>
                                        <p>{ element.user_id}</p>
                                        <hr />
                                        <div  className='row'>
                                            <div className='col-sm-6'>
                                                <p>{element.user_age}yrs, { element.general[0].user_height}</p>
                                                <p>{element.user_religion},{ element.user_caste}</p>
                                                <p>{ element.user_mtongue}</p>
                                            </div>
                                            <div className='col-sm-6'>
                                                <p>{ element.user_marital}</p>
                                                    <p>{element.user_city},{element.user_state},{element.user_country}</p>
                                                    <p>{element.educational[0].user_profession}</p>
                                                    </div>
                                            </div>
                                            <p> {element.user_about_yourself} <Link to="/allprofile" state={{data:element,iddata:iddata[0]}} style={{textDecoration:"none",border:"none",color:"blue",backgroundColor:"white"}} >view full profile.....</Link> </p>   
                                    </div>
                                    <div  className='col-sm-2 text-center'>  
                                            <p className='pt-5'> Send Invitation Request </p>
                                            {
                                                iddata[0].Payment.length === 0 ? <div><button onClick={sendpayment} style={{ border: "none", backgroundColor: "white" }}><i style={{ fontSize: "50px", color: "green" }} class="fa-solid fa-circle-check"></i></button> <p>Upgrade to Connect</p></div>
                                                    : ((iddata[0].Payment[0].approval_status === 0 || iddata[0].Payment[0].approval_status === -1) ?
                                    <div> <button onClick={sendpayment} style={{ border: "none", backgroundColor: "white" }}><i style={{ fontSize: "50px", color: "green" }} class="fa-solid fa-circle-check"></i></button>
                                                    <p>Upgrade to Connect</p></div> : <div><button onClick={async() =>
                                                        {
                                                            
                                                            let to_uid = element.user_id;
                                                            console.log(to_uid);
                                                            const { user_id,message_sent, sent_date, sent_invitation_status,message_reply,reply_date } = getuserdata;
                                                            const sign =
                                                              await fetch(
                                                                `${process.env.REACT_APP_BACKEND_URL}/interest_sent`,
                                                                {
                                                                  method:
                                                                    "POST",
                                                                  headers: {
                                                                    "Content-Type":
                                                                      "application/json",
                                                                  },
                                                                  credentials:
                                                                    "include",
                                                                  body: JSON.stringify(
                                                                    {
                                                                      user_id,
                                                                      to_uid,
                                                                      message_sent,
                                                                      sent_date,
                                                                      sent_invitation_status,
                                                                      message_reply,
                                                                      reply_date,
                                                                    },
                                                                  ),
                                                                },
                                                              );
                                                             if (sign.status ===401) {
                                                               console.log(
                                                                 "Authentication failed: No token or invalid token",
                                                               );
                                                               localStorage.clear(); // Safety ke liye storage saaf karein
                                                               history(
                                                                 "/login",
                                                                 {
                                                                   replace: true,
                                                                 },
                                                               ); // Login par redirect
                                                               return; // Function ko yahan stop karein
                                                             }
                                                            const resp = await sign.json();
                                                            console.log(resp);
                                                            if (sign.status === 404 || !resp) {
                                                                toast.error("Something went wrong!");
                                                              }
                                                            else if (sign.status === 200) {
                                                                form.current.user_email.value = element.contact[0].user_email;
                                                                form.current.send_name.value = element.user_name;
                                                                form.current.user_name.value = iddata[0].user_name+"("+localStorage.getItem("luser_id")+")";
                                                                toast.success("Invitation has been sent to " + element.user_name);
                                                               // invitation mail
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
                                        
                                            }} style={{ border: "none", backgroundColor: "white" }}><i style={{ fontSize: "50px", color: "green" }} class="fa-solid fa-circle-check"></i></button>
                                          <p>Connect now</p>  </div> )
                                        }
                                       
                                        </div>
                                        <form ref={form}>       
 <input hidden type="email" value={element.contact[0].user_email} name="user_email"  /> 
<input hidden type="text" name="user_name" value={iddata[0].user_name } />                             
 <input hidden type="text" name="send_name" value={element.user_name} />
                                            
 </form>
           
                                    </div> 
                                    <ToastContainer/>
                            </div>
                         </div>
                       </div>
                     </div>
                     </>
            )})
          }
           {/* <div className='d-flex  justify-content-center  mt-12 '>
              <Pagination >

                  <Pagination.Prev disabled={page === 1} onClick={handleprevious} />

                  {
                      Array(pagecount).fill(null).map((element, index) => {
                          return (
                              <>
                          <Pagination.Item onClick={() => {
                              setpage(index + 1)
                                  }} active={page === index + 1 ? true : false}>{index + 1}</Pagination.Item>
                                  </>
                          )
                      
                      })
                  }
                  <Pagination.Next onClick={handlenext} disabled={ page === pagecount} />
              </Pagination>
              </div> */}
                
              {/* card ends here */}
              
      </>
  )
}
export default SearchCard;