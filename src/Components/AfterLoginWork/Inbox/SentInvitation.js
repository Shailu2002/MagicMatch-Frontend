import React, { useEffect, useState,Link } from 'react'
import LoginNav from '../LoginNav';
import axios from 'axios';
import Pagination from 'react-bootstrap/Pagination';
const SentInvitation = () => {
    const [data, setdata] = useState([]);
  const [filtercount, setfiltercount] = useState(0);
  const [iddata, setiddata] = useState([]);
  const [interest, setinterest] = useState([]);
  const [pagedata, setpagedata] = useState([]);
    const [page, setpage] = useState(1);
    const [pagecount, setpagecount] = useState(0);
    const uind = localStorage.getItem("luser_id");
    async function getdata1()
    {
      
        return await axios.get(`/getinterest/${uind}`);
    }
    async function getdata2()
    {
      
        return await axios.get(`/getinterest_details/${uind}`);
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
    const checkinvitation=(el,name) =>
    {
      if (el === 0)
      {
        return <div className='text-warning'>"Invitation request Pending"</div>;
      }
      else if (el===1)
      {
        return <div className='text-success'> {name}  has accepted your invitation Request </div>;
      }
      else
      {
    
        return <div className='text-danger'>{name}  has  rejected  your invitation Request  </div>;
        }
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
      
    },[page]);
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
          interest.length == 0 ? null:  <p className='text-center heading1'> <span>{ interest.length}</span> Invitation Sent by you....</p>
        }

      {
        data.length!=0 ? (
        pagedata.map((element) =>
        {
          return (
            <>
               <div style={{paddingTop:"2%"}} className='container'>
               <div style={{ width: "55%", marginLeft: "15%" ,marginBottom:"10px",borderRadius:"28px"}} className='card'>
               <div className='card-body'>
                    <div className='container'>
  
                      <div  className='row'>
                                    <div   className='col-sm-4'>
                          <img style={{ width: "200px" ,height:"200px",borderRadius:"100px"}} src={element.photos[0].user_photo} />
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
                      </div>
                      <div className='row'>
                        <div className='col-sm-12 '>
                        {
                        interest.map((e) =>
                        {
                          if (e.to_uid === element.user_id )
                          {
                            return <div style={{ color: "darkgreen" }}> Invitation Sent Date :{e.sent_date.slice(0, 10)}<br/>
                              <span className='me-3'> {checkinvitation(e.sent_invitation_status, element.user_name)}
                              {
                                  e.reply_date != null ? <span className='me-3'> <span> Reply Date: {e.reply_date.slice(0, 10)}</span>
                                    <p>Response Message:<span className='text-secondary'>{ e.message_reply}</span></p>
                                  </span>:null
                              }
                              </span>
                             
                            </div>
                            }
                        })
                      }
                        </div>
                    
            
                       
                      </div> 
                          </div>
                         </div>
                       </div>
                     </div>
              </>
          )
           
        })
        ):<div className='heading1'>Nothing in inbox! 😕 </div>
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

export default SentInvitation;