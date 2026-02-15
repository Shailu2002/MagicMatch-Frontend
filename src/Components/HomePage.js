import { Link } from 'react-router-dom';
import SuccessCard from './SuccessCard';
import Navbarg from './Navbarg';
const HomePage = () => {
  return (
    <>
      <div className="bimg bgbody">
        <Navbarg/>
        <div className="container text-center  text-white headerset">
          <h1 className="tagline">We bring People Together.</h1>
          <h1 className="tagline">Love Unites Them.....</h1>
          <button className=" btn btn-danger text-white btn-lg">
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="signup"
            >
              Sign Up Now..
            </Link>
          </button>
        </div>
      </div>

      <section className="container text-center specialsomeone">
        <h1 className="specialtagline">Find Your special Someone...</h1>

        <div className="row rowsetting">
          <div className="col-lg-4 col-md-4 col-sm-4  col-10 m-auto">
            <div className="imgsetting d-block m-auto">
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/signup"
              >
                <i className="fa-solid fa-pen-to-square logo"></i>
              </Link>
            </div>
            <h3 className="heading1">Sign Up</h3>
            <h5 className="content">
              Register for free and put up your matrimony profile
            </h5>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-4 col-10  m-auto">
            <div className="imgsetting d-block m-auto">
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/signup"
              >
                {" "}
                <i className="fa-solid fa-users logo"></i>
              </Link>
            </div>
            <h3 className="heading1">Connect</h3>
            <h5 className="content">
              Select and Connect with Matches you like
            </h5>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-4 col-10 m-auto">
            <div className="imgsetting d-block m-auto">
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/signup"
              >
                {" "}
                <i className="fa-sharp fa-solid fa-comments logo"></i>
              </Link>
            </div>
            <h3 className="heading1">Interact</h3>
            <h5 className="content">
              Become a Premium Member and start a Conversation
            </h5>
          </div>
        </div>
      </section>
      <SuccessCard />
      <section
        style={{ padding: "25px" }}
        className="bg-danger text-center  text-white"
      >
        <h3 className="heading1">Your Story is Waiting to happen !</h3>
        <button
          style={{ padding: "15px", fontWeight: "bold" }}
          className="btn butw btn-lg btn-outline-light"
        >
          {" "}
          <Link style={{ textDecoration: "none", color: "white" }} to="/signup">
            Get Started
          </Link>
        </button>
      </section>
      <div className="text-center ">
        <h3>MagicMatch has......</h3>
        <hr />
        <div className="row">
          <div className="col-sm-3 privacylogo d-block m-auto">
            <div className="privacylogo2 m-auto">
              <i
                style={{ fontSize: "30px", color: "gray", marginTop: "12px" }}
                class="fa-solid fa-user-group"
              ></i>
            </div>
            <p style={{ paddingBottom: "20px" }}>Best Matches</p>
          </div>

          <div className="col-sm-3 privacylogo m-auto d-block">
            <div className="privacylogo2 m-auto">
              <i
                style={{ fontSize: "30px", color: "green", marginTop: "12px" }}
                class="fa-solid fa-circle-check "
              ></i>
            </div>
            <p style={{ paddingBottom: "20px" }}>Verified Profiles</p>
          </div>

          <div className=" privacylogo d-block  m-auto col-sm-3">
            <div className="privacylogo2 m-auto">
              <i
                style={{ fontSize: "30px", color: "brown", marginTop: "12px" }}
                class="fa-solid fa-lock"
              ></i>
            </div>
            <p style={{ paddingBottom: "20px" }}>100% privacy</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;

