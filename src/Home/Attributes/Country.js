import React from 'react';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import 'react-tooltip/dist/react-tooltip.css';
import { ToastContainer, toast,Flip } from 'react-toastify';
import { Tooltip } from 'react-tooltip';
export const Country = () => {

  const [pageData1,setPageData1]= useState([])
  const [page1,setPage1]=useState(1);
  const [pageCount1,setPageCount1]=useState(0);
  const [getCountry, setCountry] = useState({ name: "", isCode: "" })
  const setdata = (e) => {
    const { name, value } = e.target;
    setCountry((primary) => {

      return {
        ...primary,
        [name]: value
      }
    })
  }

  const addinpdata = async (e) => {
    e.preventDefault();
    const { name, isCode } = getCountry
    if (!name) {
      toast.error("enter Country name");

    }
    else if (!isCode) {
      toast.error("enter iso code");
    }
    else {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/add_c`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ name, isCode }),
      });

      const data = await res.json();
      console.log(data);
      if (!data || res.status === 404) {
        toast.error("error");
      }
      else {
        toast.success("data is saved");
      }
    }
  }

  const [country, setcountry] = useState([])
  const getdata = async () => {
    const res2 = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/getallcountry`,
      {
        method: "GET",
        headers: {
          "content-Type": "application/json",
        },
      }
    );

    const data2 = await res2.json();
    console.log(data2);
    if (!data2 || res2.status === 404) {
     toast.error("error");
    }
    else {
      setcountry(data2);

    }
  }

  const handleNext1 = () => {
    if (page1 === pageCount1) return page1;
    setPage1(page1 + 1);
  }

  const handlePrevious1 = () => {
    if (page1 === 1) return page1;
    setPage1(page1 - 1);
  }
  
    useEffect(() => {
      getdata();
    }, [page1]);


    useEffect(() => {
      const pagedataCount1 = Math.ceil(country.length / 10);
      setPageCount1(pagedataCount1)
      if (page1) {
        const LIMIT1 = 10;
        const skip1 = LIMIT1 * page1;
        const dataskip1 = country.slice(page1 === 1 ? 0 : skip1 - LIMIT1, skip1);
        setPageData1(dataskip1)

      }
    }, [country])
 
    const deletecountry = async(id,c)=>{
      const res2 = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/delete_country/${id}/${c}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
    const deletedata= await res2.json();
    console.log(deletedata);
  
    if(res2.status === 422 || !deletedata){
      toast.error("Unsuccessful in deleting country")
      console.log("error");
    }else{
      toast.success("country deleted successfully")
    }
  }

    return (

      <>
        <div className='row'>
          <div className='col'>
            <div class="w3-card-4 mt-5 ms-5" style={{ "width": "450px", "height": "286px" }}>
              <header class="w3-container w3-grey">
                <h3>ADD COUNTRY</h3>
              </header>
              <form method="post">
                <div class="w3-container w3-white">
                  <div class="mb-3">

                    <label class="form-label ms-2 mt-2">Country</label>
                    <input type="text" class="form-control ms-2 mt-2" name="name" value={getCountry.name} onChange={setdata} placeholder="" style={{ "width": "100px" }} />
                  </div>
                  <div class="mb-3">
                    <label class="form-label ms-2 mt-2">ISO Code</label>
                    <input type="text" class="form-control ms-2 mt-2" name="isCode" value={getCountry.isCode} onChange={setdata} placeholder="" style={{ "width": "100px" }} />
                  </div>
                </div>
                <footer className="w3-container w3-grey">
                  <button type="submit" class="btn btn-primary mt-2 mb-2 " style={{ "marginLeft": "40%" }} onClick={addinpdata}>Save</button>
                </footer>
              </form>
            </div>
          </div>
          <div className=' col' >
            <table class="table mt-5 ms-5" style={{ "width": "450px","height":"150px" }}>
              <thead className='w3-black'>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Country</th>
                  <th scope="col">ISO Code</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody className='w3-white'>
                {
                  pageData1.length > 0 ?
                    pageData1.map((element, id) => {
                      return (
                        <>
                          <tr className='table-secondary'>
                          <td> {id+1}</td>
                            <td>{element.name}</td>
                            <td>{element.isCode}</td>
                            <td> <button className='me-3 btn w3-red' data-tooltip-id="my-tooltip" data-tooltip-content="Delete country" onClick={()=>{deletecountry(element._id,element.name);}} ><DeleteIcon/></button>
    </td>
                          </tr>
                        </>
                      )
                    }) : <div class="text-center"><div class="spinner-border m-5" role="status" style={{ "marginLeft": "10px", "marginTop": "5px" }}>
                      <span class="visually-hidden">Loading...</span>
                    </div></div>
                }
              </tbody>
            </table>
            <div className='d-flex justify-content-end'>
              <nav aria-label="Page navigation example" >
                <ul class="pagination">
                  <li class="page-item" ><button className='page-link' onClick={handlePrevious1}>prev</button></li>
                  {
                    Array(pageCount1).fill(null).map((ele, index) => {
                      return (
                        <>
                          <li active={page1 === index + 1 ? true : false} className='page-item' style={{"paddingLeft":"0px"}}><button className='page-link' onClick={() => setPage1(index + 1)}>{index + 1} </button></li>
                        </>
                      )
                    })
                  }
                  <li class="page-item" style={{"paddingLeft":"0px"}}><button className='page-link' onClick={handleNext1} disabled={page1 === pageCount1} >Next</button></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <Tooltip id='my-tooltip'/>
        <ToastContainer position='top-center' autoClose="2000" hideProgressBar="true" bodyClassName="grow-font-size" closeButton={false} transition={Flip}/>
   
      </>
    )
  }

export default Country;
