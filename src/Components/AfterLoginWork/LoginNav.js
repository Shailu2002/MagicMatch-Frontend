import { Link,useNavigate } from 'react-router-dom';
const LoginNav = () => {
  const history = useNavigate();
  const searchid = () =>
  {
      history('/searchid');
  }
  const sent = () =>
  {
    history("/inbox_sent");
  }
  const receive = () =>
  {
    history('/inbox_received');
    }
  const navlogout = async() =>
  {
    localStorage.setItem("token", null);
    localStorage.clear();

     const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/logout`, {
       method: "GET",
       headers: {
         "content-Type": "application/json",
       },
       credentials:"include",
     });
      if (res.status === 401) {
        console.log("Authentication failed: No token or invalid token");
        localStorage.clear(); // Safety ke liye storage saaf karein
        history("/login", { replace: true }); // Login par redirect
        return; // Function ko yahan stop karein
      }
    const data = await res.json();
    console.log(data);
    if (res.status==200)
    {
      history("/login", {replace:true});
    }
    else
    {
      alert("wrong");
    }
  
    }
  const searchmother = () =>
  {
    history('/searchmother');
  }
  const searchReligion = () =>
  {
    history('/searchreligion');
  }
  const searchAge = () =>
  {
    history('/searchage');
  }
  return (
    <>
      <nav className="navbar navbar-expand-md  bg-danger  navbar-dark ">
        <div className="container font-weight-bolder">
          <div
            style={{ fontFamily: "cursive", fontSize: "22px" }}
            className="navbar-brand"
          >
            MagicMatch
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsenavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse  text-center"
            id="collapsenavbar"
          >
            <ul className="navbar-nav">
              <li className="nav-item  active">
                <Link to="/loginhome" className="nav-link text-white">
                  Home
                </Link>
              </li>
              <li className="nav-item active">
                <Link to="/mymatches" className="nav-link text-white">
                  My Matches
                </Link>
              </li>

              <li className="nav-item dropdown  active">
                <Link
                  role="button"
                  data-bs-toggle="dropdown"
                  className="nav-link dropdown-toggle text-white"
                >
                  Search
                </Link>
                <ul className="dropdown-menu">
                  <li className="dropdown-item" onClick={searchid}>
                    Search By Profile Id
                  </li>
                  <li className="dropdown-item" onClick={searchmother}>
                    Search by Mother Tongue{" "}
                  </li>
                  <li className="dropdown-item" onClick={searchReligion}>
                    Search by Religion
                  </li>
                  <li className="dropdown-item" onClick={searchAge}>
                    Search by Age
                  </li>
                </ul>
              </li>
              <li className="nav-item active">
                <Link to="/membership" className="nav-link text-white">
                  Upgrade Now
                </Link>
              </li>

              <li className="nav-item dropdown  active">
                <Link
                  role="button"
                  data-bs-toggle="dropdown"
                  className="nav-link dropdown-toggle text-white"
                >
                  Inbox
                </Link>
                <ul className="dropdown-menu">
                  <li className="dropdown-item" onClick={sent}>
                    Sent Invitation
                  </li>
                  <li className="dropdown-item" onClick={receive}>
                    Received Invitation{" "}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
         <ul type="none">
          <li className="nav-item  active">
            <Link onClick={navlogout} className="nav-link text-white">
              Logout
            </Link>
            </li>
            </ul>
          <ul type="none">
            <li className="nav-item dropdown  active">
              <Link
                role="button"
                data-bs-toggle="dropdown"
                className="nav-link dropdown-toggle text-white"
              >
                <img
                  style={{
                    borderRadius: "60px",
                    width: "80px",
                    height: "80px",
                    border: "2px solid black",
                  }}
                  alt=""
                  src={localStorage.getItem("user_photo")}
                />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default LoginNav;