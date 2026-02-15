import React, { useEffect, useState, useRef } from "react"; // Link yahan se hataya
import LoginNav from "../LoginNav";
import Pagination from "react-bootstrap/Pagination";
import { useNavigate, Link } from "react-router-dom"; // Link yahan add kiya
import axios from "axios";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";

const ReceivedInvitation = () => {
  const history = useNavigate();
  const form = useRef();
  const [pagedata, setpagedata] = useState([]);
  const [page, setpage] = useState(1);
  const [ref, setref] = useState(0);
  const [pagecount, setpagecount] = useState(0);

  const [getuserdata, setuserdata] = useState({
    message_reply:
      " Hello, I liked your profile as well. It would be good to communicate and get to know each other better. Please feel free to contact me to take this conversation ahead.",
    reply_date: new Date().toDateString(),
  });
  const [data, setdata] = useState([]);
  const [interest, setinterest] = useState([]);
  const uind = localStorage.getItem("luser_id");

  async function getdata1() {
    try {
      return await axios.get(`/getreceived/${uind}`, { withCredentials: true });
    } catch (err) {
      if (err.response && err.response.status === 401) {
        localStorage.clear();
        history("/login", { replace: true });
      }
      throw err;
    }
  }

  async function getdata2() {
    try {
      return await axios.get(`/getreceived_details/${uind}`, {
        withCredentials: true,
      });
    } catch (err) {
      if (err.response && err.response.status === 401) {
        localStorage.clear();
        history("/login", { replace: true });
      }
      throw err;
    }
  }

  const getdata = async () => {
    try {
      const message = await getdata1();
      setinterest(message.data);
      const datas = await getdata2();
      setdata(datas.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlenext = () => {
    if (page < pagecount) setpage(page + 1);
  };
  const handleprevious = () => {
    if (page > 1) setpage(page - 1);
  };

  useEffect(() => {
    getdata();
  }, [ref, page]);

  useEffect(() => {
    const pagedatacount = Math.ceil(data.length / 2);
    setpagecount(pagedatacount);
    if (page) {
      const LIMIT = 2;
      const skip = LIMIT * page;
      const dataskip = data.slice(page === 1 ? 0 : skip - LIMIT, skip);
      setpagedata(dataskip);
    }
  }, [data]);

  return (
    <>
      <LoginNav />
      <div className="backg">
        {interest.length === 0 ? null : (
          <p className=" text-center heading1">
            {" "}
            <span>{interest.length}</span> Invitation Received...{" "}
          </p>
        )}

        {data.length !== 0 ? (
          pagedata.map((element, index) => {
            return (
              <div
                key={index}
                style={{ paddingTop: "2%" }}
                className="container "
              >
                <div
                  style={{
                    width: "55%",
                    marginLeft: "15%",
                    borderRadius: "28px",
                  }}
                  className="card"
                >
                  <div className="card-body">
                    {/* Profile Info UI Logic... */}
                    <div className="container">
                      <div className="row">
                        <div className="col-sm-4">
                          <img
                            style={{
                              width: "200px",
                              height: "200px",
                              borderRadius: "100px",
                            }}
                            src={element.photos?.[0]?.user_photo}
                            alt="user"
                          />
                        </div>
                        <div className="col-sm-7">
                          <h4 className="heading1">{element.user_name}</h4>
                          <p>{element.user_id}</p>
                          <hr />
                          {/* Row with age, height etc... */}
                        </div>
                      </div>
                      <div style={{ color: "darkblue" }}>
                        {" "}
                        <i className="fa-solid fa-message"></i>{" "}
                        {interest[index]?.message_sent}
                      </div>

                      {interest[index]?.sent_invitation_status === 0 ? (
                        <div>
                          <button
                            onClick={async () => {
                              setref(ref + 1);
                              let statust = 1;
                              let e1 = interest[index].user_id;
                              const { message_reply, reply_date } = getuserdata;

                              const res = await fetch(
                                `${process.env.REACT_APP_BACKEND_URL}/update_interest/${e1}/${uind}`,
                                {
                                  method: "PATCH",
                                  headers: {
                                    "content-Type": "application/json",
                                  },
                                  credentials: "include",
                                  body: JSON.stringify({
                                    statust,
                                    message_reply,
                                    reply_date,
                                  }),
                                },
                              );

                              if (res.status === 401) {
                                localStorage.clear();
                                history("/login", { replace: true });
                                return;
                              }

                              toast.success(
                                "You have accepted invitation of " +
                                  element.user_name,
                              );
                              // EmailJS integration...
                            }}
                            className="btn btn-success me-5"
                          >
                            Accept
                          </button>

                          <button
                            onClick={async () => {
                              setref(ref + 1);
                              let statust = -1;
                              let e1 = interest[index].user_id;
                              let message_reply =
                                "Thank You for the Connect request but I am not interested";
                              const { reply_date } = getuserdata;

                              const res = await fetch(
                                `${process.env.REACT_APP_BACKEND_URL}/update_interest/${e1}/${uind}`,
                                {
                                  method: "PATCH",
                                  headers: {
                                    "content-Type": "application/json",
                                  },
                                  credentials: "include",
                                  body: JSON.stringify({
                                    statust,
                                    message_reply,
                                    reply_date,
                                  }),
                                },
                              );

                              if (res.status === 401) {
                                localStorage.clear();
                                history("/login", { replace: true });
                                return;
                              }

                              toast.warn(
                                "You have Rejected invitation of " +
                                  element.user_name,
                              );
                            }}
                            className=" ms-4 btn btn-danger"
                          >
                            Reject{" "}
                          </button>
                        </div>
                      ) : interest[index]?.sent_invitation_status === 1 ? (
                        <div className="text-success">
                          Invitation Accepted by you !{" "}
                        </div>
                      ) : (
                        <div className="text-danger">
                          {" "}
                          Invitation Rejected by you{" "}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="heading1 text-center">Nothing in inbox! 😕</div>
        )}

        {/* Pagination Logic... */}
        <ToastContainer />
      </div>
    </>
  );
};

export default ReceivedInvitation;
