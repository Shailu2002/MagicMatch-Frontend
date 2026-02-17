import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginNav from "./LoginNav";
import "../AfterLoginWork/LoginStyle.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const LoginHome = () => {
  const history = useNavigate();
  const uid = localStorage.getItem("luser_id");
  const [isAuth, setIsAuth] = useState(null);
  // Initial States ko empty objects/arrays ke bajaye logically set kiya hai
  const [interest, setint] = useState([]);
  const [express, setexp] = useState([]);
  const [pay, setpay] = useState(null); // Null rakha hai check karne ke liye
  const [datajoin, setdatajoin] = useState({}); // Empty object
  const [photod, setphotod] = useState(null); // Null rakha hai crash se bachne ke liye
  const [newUser, setNewUser] = useState({
    user_id: uid,
    user_photo: "",
  });
   if (isAuth === null) {
     return (
       <div
         className="d-flex justify-content-center align-items-center"
         style={{ height: "100vh" }}
       >
         <div className="text-center">
           <div className="spinner-border text-danger" role="status"></div>
           <h4 className="mt-3">Loading MagicMatch...</h4>
         </div>
       </div>
     );
   }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newUser.user_photo) {
      toast.error("upload your photo");
    } else {
      const formData = new FormData();
      formData.append("user_photo", newUser.user_photo);
      formData.append("user_id", newUser.user_id);
      axios
        .put("/photo_router/add/", formData, {withCredentials:true})
        .then((res) => {
          toast.success("Photo Updated successfully");
          getdata();
        })
        .catch((err) => {
          console.log(err);
          toast.error("something went wrong");
        });
    }
  };

  // Navigation functions (No changes needed here)
  const naveditp = () => history("/editpersonal", { state: { gent: uid } });
  const naveditg = () => history("/editgeneral", { state: { gent: uid } });
  const navedite = () => history("/editeducational", { state: { gent: uid } });
  const naveditpa = () => history("/editpartner", { state: { gent: uid } });

  const getdata = async () => {
    const uind = localStorage.getItem("luser_id");
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/gethomedata/${uind}`,
        {
          method: "GET",
          headers: { "content-type": "application/json" },
          credentials:"include",
        },
      );

      if (res.status === 401) {
        console.log("Authentication failed: No token or invalid token");
        localStorage.clear(); // Safety ke liye storage saaf karein
        setIsAuth(false);
        history("/login", { replace: true }); // Login par redirect
        return; // Function ko yahan stop karein
      }
      else {
        setIsAuth(true);
      }
      const data = await res.json();
   
      if (!data || res.status === 404 || data.length === 0) {
        toast.error("Something Went Wrong or No Data Found");
      } else if (res.status === 200) {
        const mainData = data[0];
        setdatajoin(mainData);
        localStorage.setItem("user_gender", mainData.user_gender);
        localStorage.setItem("name", mainData.user_name);

        // Safety checks before setting nested data
        if (mainData.Details && mainData.Details.length > 0) {
          setphotod(mainData.Details[0]);
          localStorage.setItem("user_photo", mainData.Details[0].user_photo);
        }

        if (mainData.Payment && mainData.Payment.length > 0) {
          setpay(mainData.Payment[0]);
        }

        setint(mainData.Interest || []);
        setexp(mainData.Express || []);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handlePhoto = (e) => {
    setNewUser({ ...newUser, user_photo: e.target.files[0] });
  };

  const displaydate = () => {
    // Optional chaining yahan bhi use kiya hai
    return pay?.payment_date ? pay.payment_date.slice(0, 10) : null;
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
      <LoginNav />
      <nav className="navbar navbar-expand-md bg-light">
        <div className="container font-weight-bold">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsenavebar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse text-center"
            id="collapsenavebar"
          >
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link to="/loginhome" className="nav-link text-dark">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item active">
                <Link to="/myprofile" className="nav-link text-dark">
                  My Profile
                </Link>
              </li>
              <li className="nav-item dropdown active">
                <Link
                  role="button"
                  data-bs-toggle="dropdown"
                  className="nav-link dropdown-toggle text-dark"
                >
                  More
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="" className="dropdown-item">
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/horror" className="dropdown-item">
                      Add Horoscope Details
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="backg">
        <div className="container lg-cardstyle">
          {/* Optional chaining on datajoin */}
          <h3
            style={{ fontWeight: "bolder" }}
            className="text-center heading1 mb-5"
          >
            Hello, {datajoin?.user_name || "User"} Welcome back!
          </h3>
          <div className="row">
            <div className="card col-sm-4 ms-2 mb-4 me-4">
              <div className="card-body">
                <div className="text-center">
                  {/* photod check add kiya */}
                  <img
                    style={{
                      width: "200px",
                      height: "200px",
                      borderRadius: "100px",
                    }}
                    alt="user_img"
                    src={
                      photod?.user_photo || "https://via.placeholder.com/200"
                    }
                  />
                </div>

                <div className="w3-container mt-3 text-center">
                  <button
                    onClick={() => {
                      document.getElementById("id012").style.display = "block";
                    }}
                    className="w3-teal w3-round w3-button"
                  >
                    update Photo
                  </button>
                  <div id="id012" className="w3-modal">
                    <div
                      style={{ height: "40%", width: "40%" }}
                      className="w3-animate-top w3-modal-content"
                    >
                      <div className="w3-container">
                        <span
                          onClick={() => {
                            document.getElementById("id012").style.display =
                              "none";
                          }}
                          className="w3-button w3-display-topright"
                        >
                          &times;
                        </span>
                        <div className="mt-5">
                          <form
                            onSubmit={handleSubmit}
                            encType="multipart/form-data"
                          >
                            <div className="mt-10 mb-4">
                              <img
                                style={{ width: "100px", height: "100px" }}
                                alt="preview"
                                src={photod?.user_photo}
                              />
                              <input
                                className="form-control"
                                type="file"
                                accept=".png, .jpg, .jpeg"
                                name="user_photo"
                                onChange={handlePhoto}
                              />
                            </div>
                            <div className="mb-3">
                              <input
                                type="submit"
                                className="btn btn-success"
                              />
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-center">
                  <span>ID: {datajoin?.user_id}</span>
                </div>
                <hr />
                <div>
                  <h6>Account Type</h6>
                  {/* Nested condition with safety checks */}
                  {pay ? (
                    pay.approval_status === 0 ? (
                      <span>Payment not approved</span>
                    ) : (
                      <div className="w3-container">
                        <button
                          onClick={() => {
                            document.getElementById("id02").style.display =
                              "block";
                          }}
                          style={{ backgroundColor: "white", color: "blue" }}
                          className="btn"
                        >
                          {pay?.plan_name} Membership
                        </button>
                        <div id="id02" className="w3-modal">
                          <div
                            style={{
                              height: "auto",
                              width: "40%",
                              paddingBottom: "20px",
                            }}
                            className="w3-animate-zoom w3-modal-content"
                          >
                            <div className="w3-container">
                              <span
                                onClick={() => {
                                  document.getElementById(
                                    "id02",
                                  ).style.display = "none";
                                }}
                                className="w3-button w3-display-topright"
                              >
                                &times;
                              </span>
                              <div
                                style={{ paddingTop: "5%" }}
                                className="container"
                              >
                                <h2 className="text-center heading1 text-danger">
                                  {" "}
                                  Membership Details{" "}
                                </h2>
                                <div className="details-pay text-center">
                                  <div className="mb-2">
                                    User Id :{" "}
                                    <span className="paytext">
                                      {pay?.user_id}
                                    </span>
                                  </div>
                                  <div className="mb-2">
                                    Transaction Id :{" "}
                                    <span className="paytext">
                                      {pay?.transaction_id}
                                    </span>
                                  </div>
                                  <div className="mb-2">
                                    Plan:{" "}
                                    <span className="paytext">
                                      {pay?.plan_duration} ({pay?.plan_name})
                                    </span>
                                  </div>
                                  <div className="mb-2">
                                    Payment Date :{" "}
                                    <span className="paytext">
                                      {displaydate()}
                                    </span>
                                  </div>
                                  <div className="mb-2">
                                    Amount :{" "}
                                    <span className="paytext">
                                      {pay?.amount_received}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  ) : (
                    <span>Free membership</span>
                  )}
                </div>
              </div>
            </div>

            <div className="col-sm-5">
              <div
                style={{ height: "fit-content", border: "2px solid gray" }}
                className="container mt-3 card col-sm-12"
              >
                <div className="p-2">Total Invitations Sent</div>
                <div className="card-body">
                  <div>{interest ? interest.length : 0}</div>
                </div>
              </div>
              <div
                style={{ height: "fit-content", border: "2px solid gray" }}
                className="container mt-3 card col-sm-12"
              >
                <div className="p-2">Total Invitations Received</div>
                <div className="card-body">
                  <div>{express ? express.length : 0}</div>
                </div>
              </div>
              <div
                style={{ height: "fit-content", border: "2px solid gray" }}
                className="container mt-3 card col-sm-12"
              >
                <p className="text-center text-success mt-2">Edit Profile</p>
                <ul type="none">
                  <li onClick={naveditp} style={{ cursor: "pointer" }}>
                    <span className="editp text-primary">
                      Edit Personal Details
                    </span>
                  </li>
                  <li onClick={naveditg} style={{ cursor: "pointer" }}>
                    <span className="editp text-primary">
                      Edit General Details
                    </span>
                  </li>
                  <li onClick={naveditpa} style={{ cursor: "pointer" }}>
                    <span className="editp text-primary">
                      Edit Partner Preferences
                    </span>
                  </li>
                  <li onClick={navedite} style={{ cursor: "pointer" }}>
                    <span className="editp text-primary">
                      Edit Educational Details
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default LoginHome;
