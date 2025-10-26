import  { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const SuccessCard = () => {
  const [data, setdata] = useState([]);
  const Succesd = (element) => {
    return (
      <div className="mb-5 mt-5">
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
  };

  const getdata = async () => {
    const res = await fetch("/getalldata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const datas = await res.json();
    console.log(datas);
    if (!datas || res.status === 404) {
    } else {
      setdata(datas);
      console.log(datas);
      console.log("Data has been retrive");
    }
  };
  useEffect(() => {
    getdata();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1000 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1000, min:700 },
      items: 2,
    },
    mobile: {
      breakpoint: { max:700, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <div className="bimg">
        <h1
          style={{
            textAlign: "center",
            color: "white",
            fontSize: "50px",
            fontFamily: "Kaushan Script",
            fontWeight: "bolder",
          }}
        >
          Success Stories....
        </h1>
          <div>
          {data.length > 0 ? (
            <Carousel
              infinite={true}
              autoPlay={true}
              showDots={true}
              autoPlaySpeed={1000}
              responsive={responsive}
              ssr={true} // means to render carousel on server-side.
              keyBoardControl={true}
              removeArrowOnDeviceType={[
                "tablet",
                "mobile",
                "desktop",
                " superLargeDesktop",
              ]}
            >
              {data.map(Succesd)}
            </Carousel>
          ) : (
            <h4 style={{ textAlign: "center",marginTop:"15%" ,fontSize:"70px",color: "white" }}>
              <i class="fa-solid fa-spinner fa-spin"></i>
            </h4>
          )}
        </div>
      </div>
    </>
  );
};

export default SuccessCard;