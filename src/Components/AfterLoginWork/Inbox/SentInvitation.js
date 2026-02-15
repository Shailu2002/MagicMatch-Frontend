import { useEffect, useState } from "react";
import LoginNav from "../LoginNav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";

const SentInvitation = () => {
  const history = useNavigate();
  const [data, setdata] = useState([]);
  const [interest, setinterest] = useState([]);
  const [pagedata, setpagedata] = useState([]);
  const [page, setpage] = useState(1);
  const [pagecount, setpagecount] = useState(0);
  const uind = localStorage.getItem("luser_id");

  async function getdata1() {
    try {
      return await axios.get(`/getinterest/${uind}`, { withCredentials: true });
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
      return await axios.get(`/getinterest_details/${uind}`, {
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
      setinterest(message.data || []);
      const datas = await getdata2();
      setdata(datas.data || []);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  const checkinvitation = (el, name) => {
    if (el === 0)
      return <div className="text-warning">"Invitation request Pending"</div>;
    if (el === 1)
      return (
        <div className="text-success">
          {name} has accepted your invitation Request
        </div>
      );
    return (
      <div className="text-danger">
        {name} has rejected your invitation Request
      </div>
    );
  };

  const handlenext = () => {
    if (page < pagecount) setpage(page + 1);
  };
  const handleprevious = () => {
    if (page > 1) setpage(page - 1);
  };

  useEffect(() => {
    getdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Sirf mount par chalao, pagination niche handle ho rahi hai

  useEffect(() => {
    if (data && data.length > 0) {
      const pagedatacount = Math.ceil(data.length / 2);
      setpagecount(pagedatacount);
      const LIMIT = 2;
      const skip = LIMIT * page;
      const dataskip = data.slice(page === 1 ? 0 : skip - LIMIT, skip);
      setpagedata(dataskip);
    } else {
      setpagedata([]);
    }
  }, [data, page]);

  return (
    <>
      <LoginNav />
      <div className="backg">
        {interest.length > 0 && (
          <p className="text-center heading1">
            {" "}
            <span>{interest.length}</span> Invitation Sent by you....
          </p>
        )}

        {pagedata.length > 0 ? (
          pagedata.map((element, idx) => (
            <div
              key={element.user_id || idx}
              style={{ paddingTop: "2%" }}
              className="container"
            >
              <div
                style={{
                  width: "55%",
                  marginLeft: "15%",
                  marginBottom: "10px",
                  borderRadius: "28px",
                }}
                className="card"
              >
                <div className="card-body">
                  <div className="container">
                    <div className="row">
                      <div className="col-sm-4">
                        {/* Optional Chaining yahan add ki hai */}
                        <img
                          style={{
                            width: "200px",
                            height: "200px",
                            borderRadius: "100px",
                          }}
                          src={
                            element.photos?.[0]?.user_photo ||
                            "https://via.placeholder.com/200"
                          }
                          alt="user"
                        />
                      </div>
                      <div className="col-sm-7">
                        <h4 className="heading1">{element.user_name}</h4>
                        <p>{element.user_id}</p>
                        <hr />
                        <div className="row">
                          <div
                            style={{ fontSize: "16px" }}
                            className="col-sm-6"
                          >
                            <p>
                              {element.user_age}yrs,{" "}
                              {element.general?.[0]?.user_height || "N/A"}
                            </p>
                            <p>
                              {element.user_religion}, {element.user_caste}
                            </p>
                            <p>{element.user_marital}</p>
                          </div>
                          <div
                            style={{ fontSize: "16px" }}
                            className="col-sm-6"
                          >
                            <p>
                              {element.user_city}, {element.user_state}
                            </p>
                            <p>
                              {element.educational?.[0]?.user_profession ||
                                "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        {interest.map((e) => {
                          if (e.to_uid === element.user_id) {
                            return (
                              <div key={e._id} style={{ color: "darkgreen" }}>
                                Invitation Sent Date:{" "}
                                {e.sent_date?.slice(0, 10)}
                                <br />
                                <span className="me-3">
                                  {" "}
                                  {checkinvitation(
                                    e.sent_invitation_status,
                                    element.user_name,
                                  )}
                                  {e.reply_date && (
                                    <span className="me-3">
                                      <span>
                                        {" "}
                                        Reply Date: {e.reply_date.slice(0, 10)}
                                      </span>
                                      <p>
                                        Response Message:{" "}
                                        <span className="text-secondary">
                                          {e.message_reply}
                                        </span>
                                      </p>
                                    </span>
                                  )}
                                </span>
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="heading1 text-center mt-5">
            No Sent Invitations Found! 😕
          </div>
        )}

        {pagecount > 1 && (
          <div className="d-flex justify-content-center mt-4">
            <Pagination>
              <Pagination.Prev disabled={page === 1} onClick={handleprevious} />
              {[...Array(pagecount)].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  onClick={() => setpage(index + 1)}
                  active={page === index + 1}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={handlenext}
                disabled={page === pagecount}
              />
            </Pagination>
          </div>
        )}
      </div>
    </>
  );
};

export default SentInvitation;
