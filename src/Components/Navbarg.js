import { Link } from 'react-router-dom';
import img1 from '../Home/Media/download.jpg';
const Navbarg = () => {
  return (
    <>
      <nav className="navbar navbar-expand-md  fixed-top bg-danger  navbar-dark ">
        <div className="container font-weight-bolder">
          <Link
            to="/"
            style={{ fontFamily: "cursive", fontSize: "22px" }}
            className="navbar-brand"
          >
            <img
              src={img1}
              style={{
                height: "40px",
                marginLeft: "20px",
                marginTop: "10px",
              }}
            />
            MagicMatch
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsenavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse text-center"
            id="collapsenavbar"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link text-white nav-text">
                  Home
                </Link>
              </li>

              <li className="nav-item ">
                <Link
                  to="/success_story"
                  className=" nav-link nav-text text-white"
                >
                  Success Story
                </Link>
              </li>

              <li className="nav-item ">
                <Link to="/feed" className=" nav-link nav-text text-white">
                  Feedback
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  style={{ border: "2px solid white", borderRadius: "25px" }}
                  to="/signup"
                  className="nav-link nav-text text-white"
                >
                  <i className="fa-solid text-black fa-user-plus "></i> Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/login"
                  style={{ border: "2px solid white", borderRadius: "25px" }}
                  className="nav-link nav-text text-white"
                >
                  <i className="fa-solid  text-black fa-right-to-bracket"></i>{" "}
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/admin"
                  style={{ border: "2px solid white", borderRadius: "25px" }}
                  className="nav-link nav-text text-white"
                >
                  <i className="fa-solid  text-black fa-right-to-bracket"></i>
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbarg;