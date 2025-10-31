import React from 'react'
import emailjs from '@emailjs/browser';
import { useRef } from 'react';
import { Link } from 'react-router-dom';


export const Table = ({pay}) => {

  
  
    const udata=async(id)=>{
        const res3 = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/approve/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          }
        );
        const data3= res3.json();
        console.log(data3)
       
      };
      
      const pstatus=async(id)=>{
        const res3 = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/P_status/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          }
        );
        const data3= res3.json();
        console.log(data3)
       
      };
      
       const handleReject=async(id)=>{
        const res3 = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/reject/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          }
        );
        const data3= res3.json();
        console.log(data3)
      
     };
   
    const form =useRef();
    const form1=useRef();
 

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_ld05vis', 'template_u06e5fz', form.current, '70Ho-B7eWNbR3aqLZ')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };


  const sendEmail1 = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_ld05vis', 'template_o269r8v', form1.current, '70Ho-B7eWNbR3aqLZ')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };
  return (
    <>
    
    <table className="table table-success table-striped">
      <thead>
    <tr>
      <th scope="col">Date</th>
      <th scope="col">Time</th>
      <th scope="col">User ID</th>
      <th scope="col">Transcation ID</th>
      <th scope="col">Total Amount</th>
      <th scope="col">Received Amount</th>
      <th scope='col'>Status</th>
      <th scope='col'>Action</th>
    </tr>
  </thead>
  <tbody>

  {
    pay.length>0 ?
   pay.map((element,id)=>{
         return(
                                    <>
  
                             <tr className='table-secondary' key={element._id}>
                            <th >{element.payment_date.slice(0,10)}</th>
                            <td >{element.payment_date.slice(11,19)}</td>
                            <td>{element.user_id}</td>
                            <td>{element.transaction_id}</td>
                            <td>{element.total_amount}</td>
                      <td>{
                        element.approval_status===0 ?
                      <Link to={`/Enter/${element._id}`}>  <button className='w3-button w3-blue' >Enter</button></Link>
                        : <div>{element.amount_received}</div>
                      }</td>
                            <td>{element.approval_status}</td>
                            <td>
                              {
                                element.approval_status===0 ?<>
                                <div className="me-1" style={{"float":"left"}}>
                              <form ref={form} onClick={sendEmail}>
                                <input name="amount" hidden value={element.total_amount}/>
                                <input name="plan" hidden value={element.plan_name}/>
                                <input name="email" hidden value={element.user_email_id}/>
                                <input name="due" hidden value={element.total_amount-element.amount_received}/>
                              <button className='w3-button me-2 w3-green' type='submit' onClick={()=>{udata(element._id);pstatus(element.user_id);}}>Approve</button> 
                               </form>
                               </div > 
                               <div className="ms-1" style={{"float":"right"}}>
                                <form ref={form1}  onClick={sendEmail1}>
                                <input name="amount" hidden value={element.total_amount}/>
                                <input name="plan" hidden value={element.plan_name}/>
                                <input name="email" hidden value={element.user_email_id}/>
                                <input name="due" hidden value={element.total_amount-element.amount_received}/>
                             <button className='w3-button w3-red' type='submit' onClick={()=>{handleReject(element._id);}}>Reject</button> 
                               </form>
                               </div>
   </>
                               : 
                               <div>
                                {
                                  element.approval_status===1 ? <div>Accepted</div> : <div>Rejected</div>
                                }
                               </div>
                               }
                            </td>
                        </tr>
                                    </>
                                )
                            })
                            :<div class="text-center"><div class="spinner-border m-5" role="status" style={{"marginLeft":"10px","marginTop":"5px"}}>
                            <span class="visually-hidden">Loading...</span>
                          </div>
                          </div>
 }
                    </tbody>
</table>

    
    </>
  )
}
export default Table;