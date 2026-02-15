   
import { useEffect, useState } from 'react';
import LoginNav from '../AfterLoginWork/LoginNav';
import { useNavigate } from 'react-router-dom';
const Membership = () => {
    const history = new useNavigate();
    const [plan, setplan] = useState([]);
    const getdata = async () =>
    {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/getallplans`,
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
            credentials:"include",
          }
        );
        if (res.status === 401) {
          console.log("Authentication failed: No token or invalid token");
          localStorage.clear(); // Safety ke liye storage saaf karein
          history("/login", { replace: true }); // Login par redirect
          return; // Function ko yahan stop karein
        }
        const data = await res.json();
        console.log(data.length);
        setplan(data);
        }
    useEffect(() =>
    {
        getdata();
        
    }, []);
    const calculatediscount = (discount,amount) =>
    {
        let mul;
        mul = Math.round((discount * amount) / 100);
        mul = amount - mul;
        return mul;
        
    }
    const calculatedays = (discount,amount,duration) =>
    {
        let mul = calculatediscount(discount, amount);
        let month = Math.round(mul / duration);
        return month;
    }
    
  return (
    <>
      <LoginNav/>
      <div className="backg text-center">
        <h4 style={{ margin: "10px" }} className=" heading1 text-danger">
          Select Membership Plan
        </h4>
        <div className="d-flex  flex-column flex-wrap  justify-content-center flex-sm-row ">
          {plan.map((element, id) => {
            return (
              <>
                <div className="card  m-3  border border-primary cardp text-center">
                  <div className="card-body">
                    <p>
                      <span style={{ fontWeight: "bold" }}>
                        {element.P_name}
                      </span>{" "}
                      {element.P_duration} Months
                    </p>
                    <p>
                      <span style={{ color: "green" }}>
                        {" "}
                        {element.P_discount}% off{" "}
                      </span>
                      <span style={{ textDecoration: "line-through" }}>
                        {" "}
                        ₹ {element.P_amount}{" "}
                      </span>{" "}
                    </p>
                    <h2>
                      ₹{calculatediscount(element.P_discount, element.P_amount)}
                    </h2>
                    <p>
                      ₹
                      {calculatedays(
                        element.P_discount,
                        element.P_amount,
                        element.P_duration
                      )}{" "}
                      per month
                    </p>
                    <button
                      onClick={() => {
                        history("/qrpage", {
                          state: {
                            plan_name: element.P_name,
                            duration: element.P_duration,
                            amount: calculatediscount(
                              element.P_discount,
                              element.P_amount
                            ),
                          },
                        });
                      }}
                      className="btn btnp btn-lg btn-outline-dark"
                    >
                      Continue
                    </button>
                    <p>
                      <ul>
                        {element.P_description.split(",").map((element) => {
                          return <li className="listp">{element}</li>;
                        })}
                      </ul>
                    </p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Membership;

