import React, { useEffect, useState,Link,useRef } from 'react'
import LoginNav from '../LoginNav';
import Pagination from 'react-bootstrap/Pagination';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import { toast, ToastContainer } from 'react-toastify';
const ReceivedInvitation = () => {
  const form = useRef();
  const [pagedata, setpagedata] = useState([]);
  const [page, setpage] = useState(1);
  const [ref, setref] = useState(0);
  const [pagecount, setpagecount] = useState(0);
  
  const [getuserdata, setuserdata] = useState({
    message_reply:" Hello, I liked your profile as well. It would be good to communicate and get to know each other better. Please feel free to contact me to take this conversation ahead.",
    reply_date:Date()
});
  const [data, setdata] = useState([]);
  const [interest, setinterest] = useState([]);
  const uind = (localStorage.getItem("luser_id"));
    async function getdata1()
    {
        return await axios.get(`http://localhost:8003/getreceived/${uind}`);
    }
    async function getdata2()
    {
        return await axios.get(`http://localhost:8003/getreceived_details/${uind}`);
  }
  
  
  
    const getdata = async() =>
    {
  
      const message = await getdata1();
      setinterest(message.data);
      console.log(message.data);
      const datas = await getdata2();
      setdata(datas.data);
      console.log(datas.data);
  }
  

   
  
    const handlenext = () =>
    {
        if (page === pagecount) 
        {
            return page;
        }
        else
        {
            setpage(page + 1);
        }
        
    }
    const handleprevious = () =>
    {
        if (page === 1)
        {
            return page;
        }
        else {
            setpage(page - 1);
        }
    }

    useEffect(() =>
    {
        getdata();
    }, [ref,page]);
  
    useEffect(() =>
    {
        const pagedatacount = Math.ceil( data.length/2);
        setpagecount(pagedatacount);
        console.log(pagedatacount);
        if (page)
        {
            const LIMIT = 2;
            const skip = LIMIT * page;
            const dataskip = data.slice(page === 1 ? 0 : skip - LIMIT , skip);
            setpagedata(dataskip);
            }
    },[data]);
  return (
    <>
      <LoginNav />
      <div className='backg'>
      {
          interest.length == 0 ? null: <p className=' text-center heading1'>  <span>{ interest.length}</span> Invitation Received...  </p>
        }


      {
          data.length != 0 ? (
           
        pagedata.map((element,index) =>
        {
          return (
            <>
             
               <div style={{paddingTop:"2%"}} className='container '>
               <div style={{ width: "55%", marginLeft: "15%" ,borderRadius:"28px"}} className='card'>
               <div className='card-body'>
                    <div className='container'>
                    <div  className='row'>
                                    <div   className='col-sm-4'>
                          <img style={{ width: "200px" ,height:"200px",borderRadius:"100px"}}  src={element.photos[0].user_photo} />
                                    </div>
                                    <div   className='col-sm-7'>
                                        <h4 className='heading1'>{element.user_name}</h4>
                                        <p>{ element.user_id}</p>
                                        <hr />
                                          <div  className='row'>
                                             <div style={{fontSize:"16px"}} className='col-sm-6'>
                                                <p>{element.user_age}yrs, { element.general[0].user_height}</p>
                                                <p>{element.user_religion},{ element.user_caste}</p>
                                                <p>{ element.user_marital}</p>
                                             
                            </div>
                            <div style={{fontSize:"16px"}} className='col-sm-6'>
                
                              <p>{element.user_city},{element.user_state},{element.user_country}</p>
                                                <p>{element.educational[0].user_profession}</p>
                                            </div>
                     
                                           </div>
                                       
                        </div> 
                      
                       
            
                     
                     <div style={{color:"darkblue"}}> <i class="fa-solid fa-message"></i> { interest[index].message_sent}</div>
                         
                  {
                      interest[index].sent_invitation_status == 0 ? <div>
                              <button onClick={() =>
                              {
                                setref(1);
                                let statust = 1;
                                toast.success("You have accepted invitation of " + element.user_name);
                                let e1 = interest[index].user_id
                                const { message_reply, reply_date } = getuserdata;
                                console.log(e1, statust);
                                 fetch(`/update_interest/${e1}/${uind}`, {
                                  method: "PATCH",
                                  headers: {
                                    "content-Type":"application/json"
                                  },
                                  body: JSON.stringify({
                                  statust,message_reply,reply_date   
                                  })
                                });
                              
                                form.current.user_email.value = element.contact[0].user_email;
                                form.current.user_name.value = localStorage.getItem("name") + "("+ localStorage.getItem("luser_id")+")";
                                form.current.send_name.value = element.user_name;
                                form.current.message.value = "has accepted your Invitation Request 🎉";
                                emailjs.sendForm('service_442j1ys', 'template_ouh4lmh', form.current, 'DA8BgdQHSMf19mJov')
                                                    .then((result) => {
                                                        console.log(result.text);
                                                    }, (error) => {
                                                        console.log(error.text);
                                                    });
                           
                             
                              }} className='btn btn-success me-5'>Accept</button>
                              <button onClick={() =>
                            {
                              setref(1);
                              let statust = -1;
                              getdata();
                                toast.warn("You have Rejected invitation of " + element.user_name);
                                let e1 = interest[index].user_id;
                                let message_reply="Thank You for the Connect request but I am not interested "
                                const { reply_date } = getuserdata;
                         
                                  console.log(e1,statust)
                                  fetch(`/update_interest/${e1}/${uind}`, {
                                    method: "PATCH",
                                    headers: {
                                      "content-Type":"application/json"
                                    },
                                    body: JSON.stringify({
                                    statust,message_reply,reply_date  
                                    })
                                  });
                                form.current.user_email.value = element.contact[0].user_email;
                                form.current.user_name.value = localStorage.getItem("name") + localStorage.getItem("luser_id");
                                form.current.send_name.value = element.user_name;
                                form.current.message.value = "rejected your Invitation to connect ❌";
                                emailjs.sendForm('service_442j1ys', 'template_ouh4lmh', form.current, 'DA8BgdQHSMf19mJov')
                                                    .then((result) => {
                                                        console.log(result.text);
                                                    }, (error) => {
                                                        console.log(error.text);
                                                    });
                                }}  className=' ms-4 btn btn-danger'>Reject </button>
                          </div> :
                            (interest[index].sent_invitation_status === 1 ? <div className='text-success'>Invitation Accepted by you ! </div> : <div className='text-danger'> Invitation Rejected by you </div>)
                            }
                     
                      </div> 
                    </div>
                  </div>
                  <form ref={form}>       
 <input hidden type="email" value="" name="user_email"  /> 
<input hidden type="text" name="user_name" value={data.user_name} />                             
 <input hidden type="text" name="send_name" value="" />
  <input hidden type="text" name="message" value={ getuserdata.message_reply} />
 </form>
                </div>
                <ToastContainer/>
                     </div>
            </>
            
          )
          
           
        })
            
          ) : <div className='heading1'>Nothing in inbox! 😕</div>
          
           
        }
        {
          data.length !=0 ?  <div className='d-flex  justify-content-center  mt-12 '>
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
          </div>:<div></div>
        }
          
         
        
              </div>
      </>
  )
}

export default ReceivedInvitation;