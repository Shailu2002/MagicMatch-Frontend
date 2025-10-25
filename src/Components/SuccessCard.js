import React, { useEffect, useState } from 'react';
import Carousel from 'react-elastic-carousel';
const SuccessCard = () => {
  const [data, setdata] = useState([]);
  const Succesd = (element) =>
  {
    return (
      <div className="">
        <div
          style={{ width: "300px", height: "70vh" }}
          className="card text-center"
        >
          <img
            style={{ width: "300px", height: "200px" }}
            src={element.success_story_photo}
            alt="image"
          />
          <div className="card-body">
            <h3 className="partnerhead">
              {element.partner1_name} and {element.partner2_name}
            </h3>
            <p style={{ color: "gray", fontSize: "15px" }}>
              {element.About_wedding.split(" ").slice(0, 30).join(" ")}
              {element.About_wedding.split(" ").length > 30 && "..."}
            </p>
            <p>
              {" "}
              <span className="text-danger">wedding date:</span>{" "}
              {element.wedding_date.slice(0, 10)}
            </p>
          </div>
        </div>
      </div>
    );
    }

    const getdata = async () => {


        const res = await fetch('/getalldata', {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
    
        }
        );
        const datas = await res.json();
        console.log(datas);
        if (!datas|| res.status === 404) {
        
             
        }
        else {
          
          setdata(datas);
          console.log(datas)
          console.log("Data has been retrive");
       
         }
      };
      useEffect(() => {
        getdata();
      },[])
    

   
    
const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 1 },
    { width: 768, itemsToShow: 2 },
    { width: 1200, itemsToShow: 3 },
    ];
  
  
  return (
      <>
       
          <div className='bimg'>
          <h1  style={{ textAlign: "center" ,color:"white", fontSize:"50px",fontFamily:"Kaushan Script",fontWeight:"bolder"}}>Success Stories....</h1>
              <div style={{ paddingTop: "3%" }}>
            
                  <Carousel enableAutoPlay autoPlaySpeed={5000} breakPoints={breakPoints}>                          
               {
              data.map(Succesd)             
             }    

         
          </Carousel>
                  
      </div>
      </div>  
      </>
  )
}

export default SuccessCard;