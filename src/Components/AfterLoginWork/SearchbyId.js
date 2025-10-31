import React from 'react';
import SCard from './SearchCard';
import { useState ,useEffect} from 'react';
import LoginNav from './LoginNav';
const SearchbyId = () => {
  const [ID, setID] = useState()
  const [gender, setgender] = useState();
  const [getsearchdata, setsearchdata] = useState([])
  const getdata = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/searchID/${ID}/${gender}`,
      {
        method: "GET",
        headers: {
          "content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);
    if (!data || res.status === 404) {
      alert("error");
    }
    else {
      setsearchdata(data);
    }
  }
  useEffect(()=>{
    const gender = localStorage.getItem("user_gender");
    if (gender === "female")
    {
      setgender("male");
    }
    else
    {
      setgender("female");
      }
    getdata();

  },[ID])
  
  return (
    <>
    <LoginNav/>
      <div className='searchbg'>
      <div style={{paddingTop:"2%"}} className='container'>
          <div style={{ width: "70%", marginLeft: "15%", borderRadius: "30px",backgroundColor:"black" }} className=' cardsearch card'>
            <div className='card-body'>
              <h3 className='text-center' style={{ fontFamily: "cursive", color: "#de3163" }}> <i style={{color:"Blue"}} class="fa-solid fa-magnifying-glass"></i> Search Profiles By Profile Id</h3>
              <hr/>
            <div className='container'>
           <form class="d-flex">
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>setID(e.target.value)}/>
    </form>
     </div>
     </div>
    </div>
  </div>
    <SCard user={getsearchdata ? getsearchdata : []}/>
      </div>
    </>
  )
}

export default SearchbyId;