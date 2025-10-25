import React, { useEffect } from 'react';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const Success = () => {
  
  const [filteruser, setfilteruser] = useState(1);
  const [btn, setbtn] = useState(0);
  const [pageData, setPageData] = useState([])
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [getsuccessdata, setsuccessdata] = useState([])
  let f = 0
  const getdata = async () => {
    const res = await fetch(`/success_story?filteruser=${filteruser}`, {
      method: "GET",
      headers: {
        "content-Type": "application/json"
      }
    });

    const data = await res.json();
    console.log(data);
    if (!data || data.status === 404) {
      alert("error");
    }
    else {
      setsuccessdata(data);

    }
  }

  const udata = async (id) => {

    toast.success("success story approved successfully!");
    setbtn(1);
    const res3 = await fetch(`/approve_success/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
    })

    const data3 = res3.json();
    console.log(data3)
    
    
  };

  const handleReject = async (id) => {
    toast.warn("you have rejected success story ");
    setbtn(-1);
    const res3 = await fetch(`/reject_success/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
    })
    setbtn(-1);
    const data3 = res3.json();
    console.log(data3)
  
  };
  useEffect(() => {
    getdata();
  }, [filteruser,page,btn])
  const handleNext = () => {
    if (page === pageCount) return page;
    setPage(page + 1);
  }
  const handlePrevious = () => {
    if (page === 1) return page;
    setPage(page - 1);
  }
  useEffect(() => {
    const pagedataCount = Math.ceil(getsuccessdata.length / 1);
    setPageCount(pagedataCount)
    if (page) {
      const LIMIT = 1;
      const skip = LIMIT * page;
      const dataskip = getsuccessdata.slice(page === 1 ? 0 : skip - LIMIT, skip);
      setPageData(dataskip)

    }
  }, [getsuccessdata])

  const renderCard = (element, index) => {
    return (
      <div class="carousel-inner" key={element._id}>
        <div class="carousel-item active" style={{ "marginLeft": "10%" }}>
          <div class="card mb-3" style={{ "height": "30%", "width": "81%" }}>
            <img style={{ width: "300px", height: "200px", borderRadius: "100px", marginLeft: "28%" }} src={ element.success_story_photo} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class=" hd card-title">{element.partner1_name} & {element.partner2_name}</h5>
              <p>Wedding Date:{element.wedding_date.slice(0,10)}</p>
              <p>{element.About_wedding}</p>
              {
              element.story_approval_status===0
               ?
              <div>
              <button  className='w3-button me-2 w3-green' type='submit' onClick={() => { udata(element._id); }}>Approve</button>
              <button className='w3-button w3-red' type='submit' onClick={() => { handleReject(element._id); }}>Reject</button>
              </div>
              :
              element.story_approval_status === 1 ? <p className='text-success'>Approved</p> : <p className='text-danger'>Rejected</p>
            }
              </div>

          </div>
        </div>
      </div>
      
    )
  }
  return (
    <>
      <div class="w3-bar w3-black" style={{"height":"50px"}}>
        <h5  class="w3-bar-item w3-button w3-mobile hd">Success Stories</h5>
      </div>
      <div  className='row'>
      <div  className='col-2' style={{ "marginTop": "1%","marginLeft":"20px"}}>    
        <div class="form-check" >
        <input class="form-check-input" type="radio" name="flexRadioDefault" value={0} onChange={(e)=>{setfilteruser(e.target.value)}}  />
        <label class="form-check-label" for="flexRadioDefault1">New</label>
      </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" defaultChecked name="flexRadioDefault" value={1} onChange={(e)=>{setfilteruser(e.target.value)}}/>
          <label class="form-check-label" for="flexRadioDefault2">Approved</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" value={-1} onChange={(e)=>{setfilteruser(e.target.value)}}  />
            <label class="form-check-label" for="flexRadioDefault">  Rejected</label>
          </div>
        </div>
    
        <div className='col'  style={{ "marginLeft": "8%","marginRight":"4%","marginTop":"1%" }}>
          <div id="demo" class="carousel slide carousel-dark " data-bs-ride="carousel">


            {pageData.map(renderCard)}

            {/* Left and right controls/icons  */}
            <button class="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev" onClick={handlePrevious}>
              <span class="carousel-control-prev-icon ccarousel-control-red" ></span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next" style={{"marginLeft":"5px"}} onClick={handleNext}>
              <span class="carousel-control-next-icon "></span>
            </button>
          </div>
<ToastContainer/>
        </div>

        </div>
      </>
      )
}

export default Success;