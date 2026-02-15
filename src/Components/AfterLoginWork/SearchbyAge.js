import SCard from './SearchCard';
import LoginNav from './LoginNav';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const SearchbyAge = () => {
  const [Age,setAge]=useState(0)
  const [getsearchdata, setsearchdata] = useState([])
  const [gender, setgender] = useState();
  const navigate = useNavigate();
  const getdata = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/searchage/${Age}/${gender}`,
      {
        method: "GET",
        headers: {
          "content-Type": "application/json",
        },
        credentials: "include",
      },
    );
      if (res.status === 401) {
        console.log("Authentication failed: No token or invalid token");
        localStorage.clear(); // Safety ke liye storage saaf karein
        navigate("/login", { replace: true }); // Login par redirect
        return; // Function ko yahan stop karein
      }
    const data = await res.json();
    console.log(data);
    if (!data || data.status === 404) {
      alert("error");
    }
    else {
      setsearchdata(data);

    }
  }

  
  useEffect(() => {
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

  },[Age])
  return (
    <>
      <LoginNav/>
      <div className='searchbg'>
       
      <div style={{paddingTop:"2%"}} className='container'>
          <div style={{ width: "70%", marginLeft: "15%", borderRadius: "30px",backgroundColor:"black" }} className=' cardsearch card'>
          
            <div className='card-body'>
              <h3 className='text-center' style={{ fontFamily: "cursive", color: "#de3163" }}> <i style={{color:"Blue"}} class="fa-solid fa-magnifying-glass"></i> Search Profiles By Age</h3>
              <hr/>
                      <div className='container'>
                      <form class="d-flex">
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>setAge(e.target.value)}/>

    </form>
                            </div>
           </div>
          </div>
        </div>
        <SCard  user={getsearchdata ? getsearchdata : []}/>

      </div>
    </>
  )
}

export default SearchbyAge;
